import {onMounted, onUnmounted, ref} from 'vue';
import {IS_DEV, VITE_FILE_HOST, VITE_BASE_URL} from "../config/common";
import {useDictStore} from "../store/modules/dict-store";
import {isDef, isHttpLink, PageParam, QueryParam, SearchParam} from "xin-antd3-ui";
import {message} from "ant-design-vue";
import {pushPageTab} from "@/utils/tabs-util";

/**
 * 获取图标文件地址
 */
export function iconSrc(icon: string) {
    if (icon && typeof icon == 'string') {
        let iconType;
        if (icon.toString().endsWith('.png')) iconType = 'img'; //img图标
        else if (icon.toString().endsWith('.svg')) iconType = 'svg'; //svg图标

        return `${getPublicPath()}/icons/${iconType}/${icon}`; //开发环境
    }
    return icon;
}

/**
 * 获取img、svg图标路径
 */
export function iconsPath(iconType: string) {
    return `${getPublicPath()}/icons/${iconType}`;
}

/**
 * 获取发布路径地址
 */
export function getPublicPath() {
    let publicPath = import.meta.env.VITE_PUBLIC_PATH ?? '';
    if (publicPath.endsWith('/')) publicPath = publicPath.slice(0, -1);
    return IS_DEV ? '/public' : publicPath;
}

/**
 * 数据字典文本值
 */
export function dictText(formData, valueField, dictKey = '', separator = ',') {
    return fieldText(formData, valueField, dictKey, separator)
}

/**
 * 表单键值对字段，返回文本值
 */
export function fieldText(formData, valueField, dictKey = '', separator = ',') {
    const text = formData[valueField + 'Text'];
    if (!isDef(text)) return text;

    const value = formData[valueField];
    if (!dictKey) return value; //没有数据字典dictKey，无法从数据字典获取文本值

    const dictStore = useDictStore();
    return dictStore.getText(dictKey, value, separator);
};

/**
 * 是否有记录可以删除
 */
export function hasDeleteRows(rowKeys) {
    if (Array.isArray(rowKeys)) {
        if (rowKeys.length == 0) {
            message.info('请选择要删除的记录！');
        }
        return rowKeys.length > 0;
    }
    return false;
};

/**
 * 打开链接地址
 * @param path 要打开的路由地址
 */
export function linkOpen(path) {
    if (isHttpLink(path)) {
        window.open(path);
    } else {
        pushPageTab(path);
    }
};

/**
 * 获取本地时间
 */
export function useTime() {
    let timer; // 定时器
    const year = ref(0); // 年份
    const month = ref(0); // 月份
    const week = ref(''); // 星期几
    const day = ref(0); // 天数
    const hour = ref<number | string>(0); // 小时
    const minute = ref<number | string>(0); // 分钟
    const second = ref(0); // 秒

    // 更新时间
    const updateTime = () => {
        const date = new Date();
        year.value = date.getFullYear();
        month.value = date.getMonth() + 1;
        week.value = '日一二三四五六'.charAt(date.getDay());
        day.value = date.getDate();
        hour.value = `${date.getHours()}`?.padStart(2, '0') || new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2}).format(date.getHours());
        minute.value = `${date.getMinutes()}`?.padStart(2, '0') || new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2}).format(date.getMinutes());
        second.value = date.getSeconds();
    };

    updateTime();

    onMounted(() => {
        clearInterval(timer);
        timer = setInterval(() => updateTime(), 1000);
    });

    onUnmounted(() => {
        clearInterval(timer);
    });

    return {month, day, hour, minute, second, week};
}

/**
 * 确认对话框，关闭处理
 */
export function modalConfirmClose(msg: string | any, resolve?, reject?) {
    if (typeof msg === 'string') {
        if (resolve) setTimeout(resolve, 10);
        if (msg) message.info(msg);
    } else if (typeof msg === 'object') {
        if (reject) reject(msg);
        if (typeof msg.message === 'string') {
            if (msg.message) message.error(msg.message);
        }
    }
};

/**
 * tab标签标题类型后缀
 */
export function getTabTitleSuffix(actionType: string, prefix = '') {
    if (actionType === 'add') return `${prefix}新增`;
    if (actionType === 'query') return `${prefix}查看`;
    if (actionType === 'edit') return `${prefix}修改`;

    return '';
}

/**
 * 文件host地址
 */
export function fileHost() {
    return import.meta.env.VITE_FILE_HOST ?? window.location.origin;
};

/**
 * 根据文件虚拟地址，返回文件全路径地址
 */
export function fileUrl(visualUrl: string, host?: string) {
    if (isDef(visualUrl)) return visualUrl;
    if (isHttpLink(visualUrl)) return visualUrl;
    return (host ?? VITE_FILE_HOST) + visualUrl;
};

/**
 * 文件下载
 */
export function fileDownload(visualUrl: string, fileName?: string) {
    window.open(VITE_FILE_HOST + '/download/' + visualUrl + "?fileName=" + fileName);
};

/**
 * 格式化文件大小, 输出成带单位的字符串
 */
export function fileSize(size, pointLength = 2, unit?) {
    if (!size || typeof size != 'number') return size;

    const units = unit || ['B', 'K', 'M', 'G', 'TB'];
    while ((unit = units.shift()) && size > 1024) {
        size = size / 1024;
    }
    return (unit === 'B' ? size : size.toFixed(pointLength || 2)) + unit;
};

/**
 * 对称加密算法
 */
export function encryptText(text: string, key: string) {
    if (!key) return text;
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        if (char >= 48 && char <= 57) {
            const shift = key.charCodeAt(i % key.length) % 10;
            encryptedText += String.fromCharCode((char - 48 + shift) % 10 + 48);
        } else if (char >= 65 && char <= 90) {
            const shift = key.charCodeAt(i % key.length) % 26;
            encryptedText += String.fromCharCode((char - 65 + shift) % 26 + 65);
        } else if (char >= 97 && char <= 122) {
            const shift = key.charCodeAt(i % key.length) % 26;
            encryptedText += String.fromCharCode((char - 97 + shift) % 26 + 97);
        } else {
            encryptedText += text.charAt(i);
        }
    }
    return encryptedText;
};

/**
 * excel、word文件预览
 */
export const previewFile = (visualPath) => {
    const url = fileUrl(visualPath);
    window.open('https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(url));
}

/**
 * 获取表格查询统一参数
 */
export const getQueryParam = (pageParam: PageParam, searchParam: SearchParam): QueryParam => {
    const queryParam = {link: 'and',  ...pageParam, ...searchParam} as QueryParam;

    if (pageParam.where) {
        if (Array.isArray(queryParam.where) && Array.isArray(pageParam.where)) {
            queryParam.where = queryParam.where.concat(pageParam.where);
        } else if (typeof queryParam.where == 'object' && typeof pageParam.where == 'object') {
            Object.assign(queryParam.where, pageParam.where);
        }
    }
    return queryParam;
}

/**
 * 重置列表排序号
 */
export function resetListSortValue(list, sortKey) {
    if (!Array.isArray(list) || !sortKey) return list;
    list.forEach(function (item, index) {
        item[sortKey] = index + 1;
    });
    return list;
}
