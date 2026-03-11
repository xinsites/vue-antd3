import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, QueryParam, rowId} from "xin-antd3-ui";
import {getPageData} from "@/mock/mock-util";

/**
 * 单表实例-行编辑--查询列表
 */
Mock.mock(`${VITE_BASE_URL}/single/row/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(listData, params),
    };
});

/**
 * 单表实例-行编辑--新增
 */
Mock.mock(`${VITE_BASE_URL}/single/row/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.idleaf = rowId(8, 1);
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    delete newData.editable;
    listData.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 单表实例-行编辑--修改
 */
Mock.mock(`${VITE_BASE_URL}/single/row/update`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    delete newData.editable;
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
 * 单表实例-行编辑--删除
 */
Mock.mock(`${VITE_BASE_URL}/single/row/delete`, 'post', (options) => {
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

const listData = [{
    idleaf: 10,
    title: '宣传资料1',
    word: '主题词1',
    classify: '4',
    media: '2,3',
    advertDate: '2023-11-13',
    isFile: 0,
    createTime: '2023-11-13 16:43:35',
}, {
    idleaf: 9,
    title: '宣传资料2',
    word: '主题词2',
    classify: '2',
    media: '1,3',
    advertDate: '2023-10-12',
    isFile: 1,
    createTime: '2023-10-12 10:30:54',
}, {
    idleaf: 8,
    title: '宣传资料3',
    word: '主题词3',
    classify: '4',
    media: '2,3',
    advertDate: '2023-07-12',
    isFile: 0,
    createTime: '2023-07-12 00:04:27',
}, {
    idleaf: 6,
    title: '宣传资料4',
    word: '主题词4',
    classify: '4',
    media: '2,3',
    advertDate: '2023-07-12',
    isFile: 1,
    createTime: '2023-07-12 00:03:30',
}, {
    idleaf: 5,
    title: '宣传资料5',
    word: '主题词5',
    classify: '4',
    media: '1,3',
    advertDate: '2022-07-20',
    isFile: 0,
    createTime: '2022-07-20 14:27:39',
}];
