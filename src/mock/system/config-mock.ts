import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, parseQueryString, QueryParam, rowId} from "xin-antd3-ui";
import {getErrorReturn, getPageData, isExistVal} from "@/mock/mock-util";

/**
 * 系统参数配置--分页查询
 */
Mock.mock(`${VITE_BASE_URL}/system/config/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(configList, params),
    };
});

/**
 * 系统参数配置--新增
 */
Mock.mock(`${VITE_BASE_URL}/system/config/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.configId = rowId(8, 1);
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if (isExistVal(configList, 'configId', 'configKey', newData)) {
        return getErrorReturn(`新增失败，变量名称【${newData.configKey}】已经存在！`);
    }

    configList.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 系统参数配置--修改
 */
Mock.mock(`${VITE_BASE_URL}/system/config/mod`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);

    const job = configList.find((t) => t.configId == newData.configId);
    if (job) {
        job.configValue = newData.configValue;
        job.updateTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    }

    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 系统参数配置--修改
 */
Mock.mock(`${VITE_BASE_URL}/system/config/edit`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    if (isExistVal(configList, 'configId', 'configKey', newData)) {
        return getErrorReturn(`修改失败，变量名称【${newData.configKey}】已经存在！`);
    }
    const job = configList.find((t) => t.configId == newData.configId);
    if (job) {
        Object.assign(job, newData);
    }

    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 角色删除
 */
Mock.mock(`${VITE_BASE_URL}/system/config/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    if (Array.isArray(params)) {
        params.forEach((configId) => {
            const index = configList.findIndex((t) => t.configId == configId);
            if (index != -1) {
                configList.splice(index, 1);
            }
        });
    }

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

/**
 * 系统参数配置--详情
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/config/detail` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = configList.find((t) => t.configId == params.configId);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

export const configList = [
    {
        configId: 1,
        menuId: 18,
        fieldExplain: '登录错误次数(0不限制)',
        configKey: 'login_errors',
        configValue: '3',
        configEditor: "{ xtype: 'NumberField', min: 1, max: 100, precision: 0, step: 1, placeholder: '请输入登录错误次数'}",
        valueType: 'int',
        issys: 1,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        configId: 2,
        menuId: 18,
        fieldExplain: '登录错误锁定时间(最多60分钟)',
        configKey: 'login_locked',
        configValue: '20',
        configEditor: "{ xtype: 'NumberField', min: 1, max: 60, precision: 0, step: 1, placeholder: '请输入登录错误锁定时间'}",
        valueType: 'int',
        issys: 1,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        configId: 3,
        menuId: 18,
        fieldExplain: '新增用户默认密码',
        configKey: 'add_password',
        configValue: '111111',
        configEditor: "{xtype: 'TextField', allowClear: true, maxlength: 16, placeholder: '请输入新增用户默认密码'}",
        valueType: 'string',
        issys: 1,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        configId: 4,
        menuId: 18,
        fieldExplain: '用户重置密码',
        configKey: 'reset_password',
        configValue: '111111',
        configEditor: "{xtype: 'TextField', allowClear: true, maxlength: 16, placeholder: '请输入用户重置密码'}",
        valueType: 'string',
        issys: 1,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        configId: 5,
        menuId: 18,
        fieldExplain: '同一用户同时登录的平台数(0不限制)',
        configKey: 'max_session',
        configValue: '0',
        configEditor: "{ xtype: 'NumberField', min: 0, max: 3, precision: 0, step: 1, placeholder: '同一用户同时登录的平台数'}",
        valueType: 'int',
        issys: 1,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    }, {
        configId: 6,
        menuId: 18,
        fieldExplain: '下拉列表选择',
        configKey: 'x-select',
        configValue: '1',
        configEditor: "{xtype: 'SelectBox', dictKey: 'STATIC_TEST_LIST', placeholder: '请选择付款方式'}",
        valueType: 'int',
        issys: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    }, {
        configId: 7,
        menuId: 18,
        fieldExplain: '下拉树选择框',
        configKey: 'x-select-tree',
        configValue: '21',
        configEditor: "{xtype: 'SelectTree', dictKey: 'STATIC_TEST_TREE', placeholder: '请选择部门'}",
        valueType: 'int',
        issys: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    }, {
        configId: 8,
        menuId: 18,
        fieldExplain: '多行输入框',
        configKey: 'a-textarea',
        configValue: '测试',
        configEditor: "{xtype: 'TextArea', rows: 3, maxlength: 100, allowClear: true, placeholder: '请输入备注'}",
        valueType: 'string',
        issys: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
];
