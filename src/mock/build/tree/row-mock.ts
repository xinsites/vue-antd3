import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, rowId} from "xin-antd3-ui";
import {getWhereTreeList} from "@/mock/mock-util";

/**
 * 树列表实例-行编辑--查询列表--懒加载
 */
Mock.mock(`${VITE_BASE_URL}/tree/row/list`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let list = undefined;
    if (params.lazyLoad == true) {
        list = deepClone(listData).filter((item) => item.pid == (params.parentId ?? 0)); //(懒)加载
        list.forEach((item) => {
            const index = listData.findIndex((t) => t.pid == item.idleaf);
            item.isLeaf = index == -1;  //懒加载需要添加isLeaf标识
        });
    }

    let result = {
        code: 0,
        message: '操作成功',
        data: list ?? getWhereTreeList(listData, params),
    };
    return result;
});

/**
 * 树列表实例-行编辑--查询列表--全部加载
 */
Mock.mock(`${VITE_BASE_URL}/tree/row/all/list`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let list = undefined;
    if (params.where?.length > 0) {
        list = getWhereTreeList(listData, params);
    }

    return {
        code: 0,
        message: '操作成功',
        data: list ?? deepClone(listData),
    }
});

/**
 * 树列表实例-行编辑--新增
 */
Mock.mock(`${VITE_BASE_URL}/tree/row/add`, 'post', (options) => {
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
 * 树列表实例-行编辑--修改
 */
Mock.mock(`${VITE_BASE_URL}/tree/row/update`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    if (newData.pid == newData.idleaf) {
        return {
            code: 1,
            message: `修改失败，该记录父结点不能为自己！`,
            data: null,
        };
    }
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
 * 树列表实例-行编辑--删除
 */
Mock.mock(`${VITE_BASE_URL}/tree/row/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let errorMsg = "";
    if (Array.isArray(params)) {
        params.forEach((idleaf) => {
            if (!errorMsg) {
                const index = listData.findIndex((t) => t.idleaf == idleaf);
                if (index !== -1) {
                    const pidIndex = listData.findIndex((t) => t.pid == idleaf);
                    if (pidIndex === -1) {
                        listData.splice(index, 1);
                    } else {
                        errorMsg = `【${listData[index].name}】无法删除，该记录有子结点！`
                    }
                }
            }
        });
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

const listData = [{
    idleaf: 1,
    pid: 0,
    name: '岗位名称1',
    code: '岗位编号1',
    state: 1,
    describe: '岗位描述1',
    createTime: '2023-11-13 16:43:35',
}, {
    idleaf: 2,
    pid: 0,
    name: '岗位名称2',
    code: '岗位编号2',
    state: 1,
    describe: '岗位描述2',
    createTime: '2023-11-13 16:43:35',
}, {
    idleaf: 3,
    pid: 0,
    name: '岗位名称3',
    code: '岗位编号3',
    state: 1,
    describe: '岗位描述3',
    createTime: '2023-11-13 16:43:35',
}, {
    idleaf: 4,
    pid: 0,
    name: '岗位名称4',
    code: '岗位编号4',
    state: 1,
    describe: '岗位描述4',
    createTime: '2023-11-13 16:43:35',
}, {
    idleaf: 5,
    pid: 1,
    name: '岗位名称5',
    code: '岗位编号5',
    state: 1,
    describe: '岗位描述5',
    createTime: '2023-11-13 16:43:35',
}, {
    idleaf: 6,
    pid: 1,
    name: '岗位名称6',
    code: '岗位编号6',
    state: 1,
    describe: '岗位描述6',
    createTime: '2023-11-13 16:43:35',
}, {
    idleaf: 7,
    pid: 5,
    name: '岗位名称7',
    code: '岗位编号7',
    state: 1,
    describe: '岗位描述7',
    createTime: '2023-11-13 16:43:35',
}];
