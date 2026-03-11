import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {deepClone, parseQueryString, QueryParam} from "xin-antd3-ui";
import {getPageData} from "@/mock/mock-util";

/**
 * 系统日志--分页查询
 */
Mock.mock(`${VITE_BASE_URL}/system/log/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(logList, params),
    };
});

/**
 * 系统日志--删除
 */
Mock.mock(`${VITE_BASE_URL}/system/log/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    logList.splice(0, logList.length);

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

/**
 * 系统日志--详情
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/log/detail` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = logList.find((t) => t.logId == params.logId);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

export const logList = [
    {
        logId: 1,
        logIp: '192.168.1.104',
        actionUrl: '/login',
        logResult: '成功',
        logType: 1,
        actionType: '登录',
        logMessage: '用户名[adminss]',
        execTime: 2,
        userId: 0,
        loginName: 'anonymous',
        createTime: '2020-10-20 23:29:03',
    },
    {
        logId: 2,
        logIp: '183.195.3.187',
        actionUrl: '/logout',
        logResult: '成功',
        logType: 1,
        actionType: '退出',
        logMessage: '用户名[admin]',
        execTime: 0,
        userId: 2,
        loginName: 'admin',
        createTime: '2020-10-20 23:29:03',
    },
    {
        logId: 3,
        logIp: '183.195.3.187',
        actionUrl: '/build/single_cellediting/grid',
        logResult: '成功',
        logType: 2,
        actionType: '查询',
        logMessage: '单表_单元格编辑，查询列表',
        execTime: 26,
        userId: 2,
        loginName: 'admin',
        createTime: '2020-10-20 23:29:03',
    },
    {
        logId: 4,
        logIp: '183.195.3.187',
        actionUrl: '/build/single_cellediting/mod',
        logResult: '成功',
        logType: 3,
        actionType: '编辑',
        logMessage: '单表_单元格编辑，单元格编辑',
        execTime: 33,
        userId: 2,
        loginName: 'admin',
        createTime: '2020-10-20 23:29:03',
    },
    {
        logId: 5,
        logIp: '183.195.3.187',
        actionUrl: '/build/tree_cellediting/sort',
        logResult: '成功',
        logType: 3,
        actionType: '排序',
        logMessage: '树列表_单元格编辑[排序]',
        execTime: 16,
        userId: 2,
        loginName: 'admin',
        createTime: '2020-10-20 23:29:03',
    },
    {
        logId: 6,
        logIp: '183.195.3.187',
        actionUrl: '/big/data/grid',
        logResult: '成功',
        logType: 2,
        actionType: '查询',
        logMessage: '大数据缓存分页',
        execTime: 1312,
        userId: 2,
        loginName: 'admin',
        createTime: '2020-10-20 23:29:03',
    },
    {
        logId: 7,
        logIp: '183.195.3.187',
        actionUrl: '/anon/cachefile',
        logResult: '失败',
        logType: 4,
        actionType: '异常',
        logMessage: 'org.springframework.web.HttpRequestMethodNotSupportedException: Request method \'GET\' not supported',
        execTime: 0,
        userId: 2,
        loginName: 'admin',
        createTime: '2020-10-20 23:29:03',
    },
    {
        logId: 8,
        logIp: '183.195.3.187',
        actionUrl: '/build/business/grid',
        logResult: '失败',
        logType: 4,
        actionType: '异常',
        logMessage: 'org.apache.shiro.authz.UnauthorizedException: Subject does not have permission [build:business:grid]',
        execTime: 0,
        userId: 2,
        loginName: 'admin',
        createTime: '2020-10-20 23:29:03',
    },
];
