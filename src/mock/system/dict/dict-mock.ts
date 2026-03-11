import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, isDef, parseQueryString, rowId} from "xin-antd3-ui";
import {getErrorReturn, getWhereList, isExistVal} from "@/mock/mock-util";

/**
 * 动态字典--树形列表--全部加载
 */
Mock.mock(`${VITE_BASE_URL}/system/dict/list`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let result = {
        code: 0,
        message: 'success',
        // data: listData.filter((item) => item.typeDictId == (params.typeDictId ?? 0)),
        data: getWhereList(listData, params),
    };
    return result;
});

/**
 * 动态字典--新增
 */
Mock.mock(`${VITE_BASE_URL}/system/dict/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.dictId = rowId(8, 1);
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if (isDef(newData.pid)) newData.pid = 0;

    const list = listData.filter((item) => item.typeDictId == newData.typeDictId);
    if (isExistVal(list, 'dictId', 'value', newData)) {
        if (newData.typeDictId == 0) {
            return getErrorReturn(`新增失败，字典标识【${newData.value}】已经存在！`);
        } else {
            return getErrorReturn(`新增失败，字典值【${newData.value}】已经存在！`);
        }
    }

    listData.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 动态字典--修改
 */
Mock.mock(`${VITE_BASE_URL}/system/dict/edit`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    if (isDef(newData.pid)) newData.pid = 0;

    if (newData.pid == newData.dictId) {
        return {
            code: 1,
            message: `修改失败，该记录父结点不能为自己！`,
            data: null,
        };
    }

    if (newData.typeDictId == 0) {
        if (isDef(newData.valType)) newData.valType = 'string';
        if (isDef(newData.remark)) newData.remark = 'list';
    }
    const list = listData.filter((item) => item.typeDictId == newData.typeDictId);
    if (isExistVal(list, 'dictId', 'value', newData)) {
        if (newData.typeDictId == 0) {
            return getErrorReturn(`修改失败，字典标识【${newData.value}】已经存在！`);
        } else {
            return getErrorReturn(`修改失败，字典值【${newData.value}】已经存在！`);
        }
    }

    const row = listData.find((t) => t.dictId == newData.dictId);
    if (row) {
        if (newData.typeDictId == 0 && row.valType == 'string' && newData.valType != 'string') {
            //字符型转换成数字型验证
            const codeList = listData.filter((item) => item.typeDictId == newData.dictId);
            let errorMsg = '';
            codeList.forEach((item) => {
                if (!errorMsg && isNaN(Number(item.value))) {
                    errorMsg = `修改失败，该类型存在编码值【${item.value}】不是数值型！`;
                }
            });

            if (errorMsg) {
                return {
                    code: 1,
                    message: errorMsg,
                    data: null,
                };
            }
        }
        Object.assign(row, newData);
    }

    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 动态字典--删除
 */
Mock.mock(`${VITE_BASE_URL}/system/dict/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let errorMsg = "";
    const index = listData.findIndex((t) => t.dictId == params.dictId);
    if (index !== -1) {
        const pidIndex = listData.findIndex((t) => t.pid == params.dictId);
        if (pidIndex === -1) {
            listData.splice(index, 1);
        } else {
            errorMsg = `【${listData[index].label}】无法删除，该记录有子结点！`
        }
    }

    if (errorMsg) {
        return {
            code: 1,
            message: errorMsg,
            data: null,
        };
    }

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

/**
 * 动态字典--详情
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/dict/detail` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = listData.find((t) => t.dictId == params.dictId);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

/**
 * 动态字典--排序
 */
Mock.mock(`${VITE_BASE_URL}/system/dict/sort`, 'post', (options) => {
    const params = JSON.parse(options.body);

    if (Array.isArray(params)) {
        params.forEach((item) => {
            const index = listData.findIndex((t) => t.dictId == item.id);
            if (index != -1) {
                const newData = deepClone(listData[index]);
                listData.splice(index, 1);
                newData.pid = item.pid;
                listData.push(newData);
            }
        });
    }

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

const listData = [
    {
        dictId: 1,
        pid: 0,
        typeDictId: 0,
        label: '系统编码',
        value: '',
        valType: '',
        remark: '',
        issys: 1,
        expanded: 'true',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 2,
        pid: 0,
        typeDictId: 0,
        label: '应用编码',
        value: '',
        valType: '',
        remark: '',
        issys: 1,
        expanded: 'true',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 3,
        pid: 1,
        typeDictId: 0,
        label: '字段标识',
        value: 'DICT_FIELD_FLAG',
        valType: 'string',
        remark: 'list',
        issys: 1,
        expanded: '',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 4,
        pid: 2,
        typeDictId: 0,
        label: '请假类型',
        value: 'DICT_LEAVE_TYPE',
        valType: 'string',
        remark: 'list',
        issys: 0,
        expanded: '',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 5,
        pid: 2,
        typeDictId: 0,
        label: '工作单位',
        value: 'DICT_WORK_UNIT',
        valType: 'int',
        remark: 'tree',
        issys: 0,
        expanded: '',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 6,
        pid: 0,
        typeDictId: 3,
        label: '主键',
        value: 'primary_key',
        valType: '',
        remark: '',
        issys: 1,
        expanded: '',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 7,
        pid: 0,
        typeDictId: 3,
        label: '外键',
        value: 'foreign_key',
        valType: '',
        remark: '',
        issys: 1,
        expanded: '',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 8,
        pid: 0,
        typeDictId: 3,
        label: '父结点',
        value: 'parent_id',
        valType: '',
        remark: '',
        issys: 1,
        expanded: '',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 9,
        pid: 0,
        typeDictId: 4,
        label: '年休假',
        value: 'nxj',
        valType: '',
        remark: '',
        issys: 1,
        expanded: '',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 10,
        pid: 0,
        typeDictId: 4,
        label: '调休',
        value: 'diaoxiu',
        valType: '',
        remark: '',
        issys: 1,
        expanded: '',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 11,
        pid: 0,
        typeDictId: 5,
        label: '上海总部',
        value: 11,
        valType: '',
        remark: '',
        issys: 0,
        expanded: 'true',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 12,
        pid: 0,
        typeDictId: 5,
        label: '杭州分部',
        value: 12,
        valType: '',
        remark: '',
        issys: 0,
        expanded: '',
        createTime: '2020-10-20 23:29:03',
    }, {
        dictId: 13,
        pid: 11,
        typeDictId: 5,
        label: '销售部',
        value: 13,
        valType: '',
        remark: '',
        issys: 0,
        expanded: '',
        createTime: '2020-10-20 23:29:03',
    }];


