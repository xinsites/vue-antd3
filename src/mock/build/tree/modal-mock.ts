import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, getParentIdsByTreeList, isDef, rowId, transformTreeList} from "xin-antd3-ui";
import {getWhereTreeList} from "@/mock/mock-util";

/**
 * 树列表实例-窗口编辑--查询列表--懒加载
 */
Mock.mock(`${VITE_BASE_URL}/tree/modal/list`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let list = undefined;
    if (params.lazyLoad == true) {
        list = deepClone(listData).filter((item) => item.pid == (params.parentId ?? 0)); //(懒)加载
        list.forEach((item) => {
            const index = listData.findIndex((t) => t.pid == item.idleaf);
            item.isLeaf = index == -1;  //懒加载需要添加isLeaf标识
        });
    }

    return {
        code: 0,
        message: '操作成功',
        data: list ?? getWhereTreeList(listData, params),
    };
});

/**
 * 树列表实例-窗口编辑--查询列表--全部加载
 */
Mock.mock(`${VITE_BASE_URL}/tree/modal/all/list`, 'post', (options) => {
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
 * 树列表实例-下拉树选择-懒加载查询
 */
Mock.mock(`${VITE_BASE_URL}/tree/modal/select/list`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let list = deepClone(listData);
    if (params.ids) {
        const ids = list.filter((item) => item.pid == 0).map((item) => item.idleaf);
        const strArray = params.ids.toString().split(',').map(Number);
        const parentIds = getParentIdsByTreeList(list, strArray, true, 'idleaf', 'pid');
        const allIds = [...parentIds, ...ids];
        list = list.filter((item) => allIds.includes(item.idleaf) === true);
        list = transformTreeList(list, '0', 'idleaf', 'pid');
    } else {
        list = list.filter((item) => item.pid == (params.parentId ?? 0)); //(懒)加载
    }
    list.forEach((item) => {
        const index = listData.findIndex((t) => t.pid == item.idleaf);
        item.isLeaf = index == -1;
    });
    let result = {
        code: 0,
        message: '操作成功',
        data: list,
    };
    return result;
});

/**
 * 树列表实例-窗口编辑--新增
 */
Mock.mock(`${VITE_BASE_URL}/tree/modal/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.idleaf = rowId(8, 1);
    if (isDef(newData.pid)) newData.pid = 0;
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    listData.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 树列表实例-窗口编辑--修改
 */
Mock.mock(`${VITE_BASE_URL}/tree/modal/update`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    if (isDef(newData.pid)) newData.pid = 0;

    if (newData.pid == newData.idleaf) {
        return {
            code: 1,
            message: `修改失败，该记录父结点不能为自己！`,
            data: null,
        };
    }

    const row = listData.find((t) => t.idleaf == newData.idleaf);
    if (row) {
        Object.assign(row, newData);
    }

    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 树列表实例-窗口编辑--删除
 */
Mock.mock(`${VITE_BASE_URL}/tree/modal/delete`, 'post', (options) => {
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

/**
 * 树列表实例-窗口编辑--详情
 */
Mock.mock(`${VITE_BASE_URL}/tree/modal/detail`, 'post', (options) => {
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
    pid: 0,
    name: '管理部',
    code: '1000.01',
    type: '1',
    serialcode: 1,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+1-555-123-4567',
    createTime: '2020-10-20 23:29:03',
}, {
    idleaf: 10,
    pid: 1,
    name: '人事部',
    code: '1000.01.02',
    type: '1',
    serialcode: 1,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+44-20-1234-5678',
    createTime: '2020-10-20 23:29:03',
}, {
    idleaf: 9,
    pid: 1,
    name: '财务部',
    code: '1000.01.03',
    type: '1',
    serialcode: 2,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
}, {
    idleaf: 4,
    pid: 0,
    name: '业务部',
    code: '1000.05',
    type: '1',
    serialcode: 5,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+81-3-9876-5432',
    createTime: '2020-10-20 23:29:03',
}, {
    idleaf: 15,
    pid: 4,
    name: '销售部',
    code: '1000.05.01',
    type: '1',
    serialcode: 2,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
}, {
    idleaf: 8,
    pid: 4,
    name: '市场部',
    code: '1000.05.02',
    type: '1',
    serialcode: 3,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
}, {
    idleaf: 3,
    pid: 15,
    name: '品质部',
    code: '1000.02',
    type: '1',
    serialcode: 4,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
}, {
    idleaf: 12,
    pid: 15,
    name: '采购部',
    code: '1000.10',
    type: '1',
    serialcode: 5,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
}, {
    idleaf: 11,
    pid: 0,
    name: '其他部门',
    code: '1000.09',
    type: '1',
    serialcode: 7,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
}];


