import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, QueryParam, rowId} from "xin-antd3-ui";
import {getPageData} from "@/mock/mock-util";

/**
 * 单表实例-窗口编辑--查询列表
 */
Mock.mock(`${VITE_BASE_URL}/single/modal/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(listData, params),
    };
});

/**
 * 单表实例-窗口编辑--新增
 */
Mock.mock(`${VITE_BASE_URL}/single/modal/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.idleaf = rowId(8, 1);
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    listData.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 单表实例-窗口编辑--修改
 */
Mock.mock(`${VITE_BASE_URL}/single/modal/update`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    const index = listData.findIndex((t) => t.idleaf == newData.idleaf);
    if (index != -1) {
        listData.splice(index, 1, newData);
    }

    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 单表实例-窗口编辑--删除
 */
Mock.mock(`${VITE_BASE_URL}/single/modal/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    if (Array.isArray(params)) {
        params.forEach((idleaf) => {
            const index = listData.findIndex((t) => t.idleaf == idleaf);
            if (index != -1) {
                listData.splice(index, 1);
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
 * 单表实例-窗口编辑--详情
 */
Mock.mock(`${VITE_BASE_URL}/single/modal/detail`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const item = listData.find((t) => t.idleaf == params.idleaf);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

const listData = [{
    idleaf: 1,
    name: "合同名称",
    number: 0,
    amount: 100.00,
    period: "1",
    isLegal: 0,
    organName: "咨询机构名称1",
    headDept: 111,
    consultView: "咨询意见1",
    directorView: "负责人意见1",
    summary: "内容摘要1",
    createTime: "2022-07-20 14:27:49",
    createUid: "2",
    createUidText: "系统管理员",
}, {
    idleaf: 2,
    name: "43434",
    number: 54,
    amount: 100.00,
    period: "2",
    isLegal: 1,
    organName: "咨询机构名称2",
    headDept: 112,
    consultView: "咨询意见2",
    directorView: "负责人意见2",
    summary: "内容摘要2",
    createTime: "2020-03-29 23:43:01",
    createUid: "2",
    createUidText: "系统管理员",
}, {
    idleaf: 3,
    name: "新项目11sdd",
    number: 3222,
    amount: 100.00,
    period: "2",
    isLegal: 1,
    organName: "咨询机构名称3",
    headDept: 211,
    consultView: "咨询意见3",
    directorView: "负责人意见3",
    summary: "内容摘要3",
    createTime: "2020-03-29 23:42:27",
    createUid: "2",
    createUidText: "系统管理员",
}, {
    idleaf: 4,
    name: "新项目32233",
    number: 23323,
    amount: 100.00,
    period: "4",
    isLegal: 0,
    organName: "咨询机构名称4",
    headDept: 212,
    consultView: "咨询意见4",
    directorView: "负责人意见4",
    summary: "内容摘要4",
    createTime: "2020-03-29 23:42:13",
    createUid: "2",
    createUidText: "系统管理员",
}];


