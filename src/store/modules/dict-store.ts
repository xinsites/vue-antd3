/**
 * 数据字典store
 * 统一数据格式{value: 'value', label: 'label', children: []}，可以添加其他字段，这三个字段必需有
 */
import {defineStore} from 'pinia';
import {message} from 'ant-design-vue/es';
import {commStaticDict} from './static-dict/comm-static-dict';
import {demoStaticDict} from './static-dict/demo-static-dict';
import {systemStaticDict} from './static-dict/system-static-dict';
import {convertTreeNodeLabel, deepClone, DictState, FieldNamesType, isDef, transformDictData} from "xin-antd3-ui";
import {httpRequest} from "../../utils/request";
import {iconsPath} from "../../utils/comm-util";

// dict默认值，静态数据字典key固定前缀：STATIC_
const DEFAULT_DICT: DictState = Object.freeze({
    dictUrl: 'dict/list',
    dictInfo: {},
    staticDictInfo: {
        ...commStaticDict,
        ...demoStaticDict,
        ...systemStaticDict,
    },
    lastRequestTime: {}, // 最后请求时间
});

/**
 * 数据字典状态管理
 */
export const useDictStore = defineStore({
    id: 'dict',
    state: (): DictState => {
        const state = {...DEFAULT_DICT} as DictState;
        state.svgPath = iconsPath('svg');
        state.imgPath = iconsPath('img');
        return state;
    },
    getters: {
        dictList(state) {
            return function (dictKey) {
                return [];
            };
        },
    },
    actions: {
        /**
         * 是否静态数据字典
         */
        isStaticDict(dictKey: string) {
            if (!dictKey) return false;
            return this.staticDictInfo[dictKey] != null;
        },
        /**
         * 获取数据字典信息
         * @param dictKey 数据字典key，静态dictKey优先级大于动态dictKey
         */
        getDictInfo(dictKey: string) {
            if (!dictKey) return [];
            if (this.isStaticDict(dictKey)) {
                return this.staticDictInfo[dictKey] || [];
            }
            return this.dictInfo[dictKey] || [];
        },
        /**
         * 数据字典获取文本
         * @param dictKey 数据字典key
         * @param values 数据字典值
         * @param separator 多值时分隔符
         */
        getText(dictKey: string, values: string | number, separator = ',') {
            if (isDef(values)) return values;
            const dictData = this.getDictInfo(dictKey);
            if (dictData.length > 0) {
                const attrValues = typeof values == 'number' ? [values] : values.split(',');
                let isTree = false;
                dictData.forEach((item) => {
                    if (item.children && item.children.length > 0) isTree = true;
                });
                if (isTree) {
                    convertTreeNodeLabel(dictData, attrValues);
                } else {
                    attrValues.forEach((value, i) => {
                        const target = dictData.find((item) => item['value']?.toString() == value || item['value1']?.toString() == value); //这里屏蔽掉0==''为true的情况
                        if (target) attrValues[i] = target['label'];
                    });
                }
                return attrValues.join(separator ? separator : ',');
            } else if (!this.isStaticDict(dictKey)) {
                this.requestDict({dictKey});
            }
            return values;
        },
        /**
         * 更新数据字典信息
         */
        setDictInfo(dictKey: string, dictData) {
            this.dictInfo[dictKey] = deepClone(dictData);
        },
        /**
         * 请求数据字典信息，过滤10秒之内重复请求
         * @param params 数据字典请求参数，dictKey必传
         * @param fieldNames 自定义默认格式字段value label children
         * 例如后端数据：{ id: 1, text: '品质部1', childList: [], a: 1, b: 2 }
         * fieldNames = {value: 'id', label: 'text', children: 'childList'} ===> { value: 1, label: '品质部1'，children: [] }
         * fieldNames = {value: 'id', label: 'text', children: 'childList', fields: 'a'} ===> { value: 1, label: '品质部1'，children: [], a: 1 }
         */
        requestDict(params, fieldNames: FieldNamesType = null) {
            const dictKey = params?.dictKey;
            if (!dictKey) return;
            if (this.isStaticDict(dictKey)) return; //静态数据源不请求
            if (this.isOutOfTime(this.lastRequestTime[dictKey + '_last_request_time'])) {
                this.lastRequestTime[dictKey + '_last_request_time'] = Date.now();

                httpRequest(this.dictUrl, 'POST', params).then((data) => {
                    const dictData = transformDictData(data, fieldNames);
                    this.setDictInfo(dictKey, dictData);
                }).catch((e: Error) => {
                    message.error(e.message || '数据字典信息获取出错！');
                });
            }
        },
        /**
         * 请求数据信息，封装的下拉组件调用
         * x-select、a-select-tree、x-select-table、x-cascader、
         * x-checkbox-group、x-radio-group、x-table等组件都使用到
         */
        requestInfo(url: string, method = 'post', params: object | null) {
            return httpRequest(url, method || 'post', params);
        },
        /**
         * 图标选择输入框默认类型图标获取，x-select-icon组件调用
         * @param jsonFileName 默认图标json文件名，统一存放config/icons
         */
        async requestTypeIcons(fileName: string) {
            const jsons = import.meta.glob(`@/config/icons/*.json`);
            let icons = [];
            for (const path of Object.keys(jsons)) {
                if (path.endsWith(fileName)) {
                    const module = await jsons[path]();
                    icons = module?.default || [];
                }
            }
            return icons;
        },
        /**
         * 请求cron表达式最近运行时间，x-select-cron组件调用
         */
        requestCronLastRunTimes(cron: string, count: number) {
            return httpRequest('/cron/runtimes', 'post', {cron: cron, timeCount: count});
        },
        /**
         * 文件上传通用接口，封装的文件上传组件调用x-upload
         * @return 返回上传文件相关信息(id、文件路径等)
         */
        requestUploadFile(file: File) {
            const formData = new FormData();
            formData.append('file', file);
            return httpRequest('/upload', 'post', formData);

            // return uploadFileAPI(file);
        },
        /**
         * 是否过时
         */
        isOutOfTime(lastRequestTime: number) {
            if (!lastRequestTime) return true;
            if ((Date.now() - lastRequestTime) / 1000 > 10) return true; //超过10秒，数据过时
            return false;
        },
    },
});
