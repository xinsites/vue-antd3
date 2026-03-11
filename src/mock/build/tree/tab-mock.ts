import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, getParentIdsByTreeList, isDef, rowId, transformTreeList} from "xin-antd3-ui";
import {getWhereTreeList} from "@/mock/mock-util";

/**
 * 树列表实例-选项卡编辑--查询列表--懒加载
 */
Mock.mock(`${VITE_BASE_URL}/tree/tab/list`, 'post', (options) => {
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
 * 树列表实例-选项卡编辑--查询列表--全部加载
 */
Mock.mock(`${VITE_BASE_URL}/tree/tab/all/list`, 'post', (options) => {
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
Mock.mock(`${VITE_BASE_URL}/tree/tab/select/list`, 'post', (options) => {
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
 * 树列表实例-选项卡编辑--新增
 */
Mock.mock(`${VITE_BASE_URL}/tree/tab/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.idleaf = getId(newData.idleaf);
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if (isDef(newData.pid)) newData.pid = 0;

    newData.modalList = loadTreeList(newData.modalList, newData.idleaf, 0);
    newData.rowList = loadTreeList(newData.rowList, newData.idleaf, 0);

    listData.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 树列表实例-选项卡编辑--修改
 */
Mock.mock(`${VITE_BASE_URL}/tree/tab/update`, 'post', (options) => {
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

    newData.modalList = loadTreeList(newData.modalList, newData.idleaf, 0);
    newData.rowList = loadTreeList(newData.rowList, newData.idleaf, 0);

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
 * 树列表实例-选项卡编辑--删除
 */
Mock.mock(`${VITE_BASE_URL}/tree/tab/delete`, 'post', (options) => {
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
 * 树列表实例-选项卡编辑--详情
 */
Mock.mock(`${VITE_BASE_URL}/tree/tab/detail`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const item = listData.find((t) => t.idleaf == params.idleaf);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

function getId(id) {
    if (isDef(id) || id == 0) return rowId(8, 1);
    else if (id < 0) return id * -1
    return id;
}

function loadTreeList(list, idleaf, pid, treeList?) {
    if (!Array.isArray(list)) return [];

    if (!treeList) treeList = []
    list.forEach((item) => {
        const children = item.children;
        delete item.children;
        item.id = getId(item.id);
        item.pid = pid;
        item.idleaf = idleaf;
        treeList.push({...item});
        loadTreeList(children, idleaf, item.id, treeList);
    });

    return treeList;
}

const listData = [{
    idleaf: 1,
    pid: 0,
    name: '管理部1',
    code: '1000.01',
    type: '1',
    serialcode: 1,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+1-555-123-4567',
    createTime: '2020-10-20 23:29:03',
    modalList: [{
        id: 1,
        pid: 0,
        idleaf: 1,
        pointName: "办理点名称1",
        applyDept: 22,
        county: "所属区县",
        address: "浦东新区新野路888号",
        contact: "021-6433225（时间：星期一至星期五  上午9:00～11:30  下午13:30～17:00，国家法定节假日除外）",
        serviceTime: "星期一至星期五  上午9:00～11:30  下午13:30～17:00（国家法定节假日除外）",
    }, {
        id: 2,
        pid: 1,
        idleaf: 1,
        pointName: "办理点",
        applyDept: 22,
        county: "所属区县",
        address: "浦东新区新野路888号",
        contact: "021-6433225（时间：星期一至星期五  上午9:00～11:30  下午13:30～17:00，国家法定节假日除外）",
        serviceTime: "星期一至星期五  上午9:00～11:30  下午13:30～17:00（国家法定节假日除外）",
    }],
    rowList: [{
        id: 1,
        pid: 0,
        idleaf: 1,
        city: "上海32",
        hotel: "酒店名称32",
        startDate: "2020-09-10",
        endDate: "2020-12-14",
    },{
        id: 2,
        pid: 1,
        idleaf: 1,
        city: "上海3233",
        hotel: "酒店名称32",
        startDate: "2020-09-10",
        endDate: "2020-12-14",
    }],
}, {
    idleaf: 10,
    pid: 1,
    name: '人事部2',
    code: '1000.01.02',
    type: '1',
    serialcode: 1,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+44-20-1234-5678',
    createTime: '2020-10-20 23:29:03',
    modalList: [],
    rowList: [{
        "pid": 0,
        "city": "上海32",
        "hotel": "酒店名称32",
        "startDate": "2020-09-10",
        "endDate": "2020-12-14",
        "createTime": "2024-04-16 19:16:54",
        "id": 3657926,
        "idleaf": 66746755,
    }, {
        "city": "上海32bb",
        "hotel": "酒店名称32",
        "startDate": "2020-09-10",
        "endDate": "2020-12-14",
        "createTime": "2024-04-16 19:16:59",
        "id": 32713694,
        "idleaf": 66746755,
        "pid": 3657926,
    }],
}, {
    idleaf: 9,
    pid: 1,
    name: '财务部3',
    code: '1000.01.03',
    type: '1',
    serialcode: 2,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
    modalList: [],
    rowList: [],
}, {
    idleaf: 11,
    pid: 0,
    name: '其他部门9',
    code: '1000.09',
    type: '1',
    serialcode: 7,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
    modalList: [],
    rowList: [],
}, {
    idleaf: 4,
    pid: 0,
    name: '业务部4',
    code: '1000.05',
    type: '1',
    serialcode: 5,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+81-3-9876-5432',
    createTime: '2020-10-20 23:29:03',
    modalList: [],
    rowList: [],
}, {
    idleaf: 15,
    pid: 4,
    name: '销售部5',
    code: '1000.05.01',
    type: '1',
    serialcode: 2,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
    modalList: [],
    rowList: [],
}, {
    idleaf: 8,
    pid: 4,
    name: '市场部6',
    code: '1000.05.02',
    type: '1',
    serialcode: 3,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
    modalList: [],
    rowList: [],
}, {
    idleaf: 3,
    pid: 15,
    name: '品质部7',
    code: '1000.02',
    type: '1',
    serialcode: 4,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
    modalList: [],
    rowList: [],
}, {
    idleaf: 12,
    pid: 15,
    name: '采购部8',
    code: '1000.10',
    type: '1',
    serialcode: 5,
    remark: '备注',
    shortName: '部门简称',
    phone: '13926317510',
    fax: '+86-10-8765-4321',
    createTime: '2020-10-20 23:29:03',
    modalList: [],
    rowList: [],
}];


