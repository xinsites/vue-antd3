import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, isDef, QueryParam, rowId} from "xin-antd3-ui";
import {getPageData} from "@/mock/mock-util";

/**
 * 多表实例-选项卡编辑--查询列表
 */
Mock.mock(`${VITE_BASE_URL}/multi/tab/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(listData, params),
    };
});

/**
 * 多表实例-选项卡编辑--新增
 */
Mock.mock(`${VITE_BASE_URL}/multi/tab/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.idleaf = getId(newData.idleaf);
    if (newData.baseForm) newData.baseForm.idleaf = newData.idleaf;
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    updateId(newData);

    listData.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 多表实例-选项卡编辑--修改
 */
Mock.mock(`${VITE_BASE_URL}/multi/tab/update`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);

    updateId(newData);

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
 * 多表实例-选项卡编辑--删除
 */
Mock.mock(`${VITE_BASE_URL}/multi/tab/delete`, 'post', (options) => {
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
 * 多表实例-选项卡编辑--详情
 */
Mock.mock(`${VITE_BASE_URL}/multi/tab/detail`, 'post', (options) => {
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

function updateId(newData) {
    if (Array.isArray(newData.modalList)) {
        newData.modalList.forEach((item) => {
            item.id = getId(item.id);
            item.idleaf = newData.idleaf;
        });
    }

    if (Array.isArray(newData.rowList)) {
        newData.rowList.forEach((item) => {
            item.id = getId(item.id);
            item.idleaf = newData.idleaf;
        });
    }

    if (Array.isArray(newData.attachList)) {
        newData.attachList.forEach((item) => {
            item.idleaf = newData.idleaf;
            item.attachId = getId(item.attachId);
        });
    }
}

const listData = [{
    idleaf: 5,
    purpose: "出差目的",
    peers: "同行人",
    startDate: "2020-03-30",
    endDate: "2020-04-10",
    address: "出差地点",
    days: 5,
    traffic: "1,2",
    isPay: 1,
    expectCost: 1000,
    image: "[{\"name\":\"文件1.jpg\",\"url\":\"http://xinsite.vip/uploadfiles/20230415/b77e01b7a4934870af57cee2afeed1be.jpg\"}]",
    remark: "简介",
    createTime: "2020-09-10 09:55:40",
    baseForm: {
        idleaf: 5,
        subName: "分项名称1",
        complaintCall: "021-63453211",
        consultCall: "021-63453211",
        handleObject: "办理对象",
        sectorType: "1",
        isFee: 1,
        handleLabel: "2,3",
        applyScope: "适用范围",
    },
    modalList: [{
        id: 1,
        idleaf: 5,
        pointName: "xxxxxxxxxxx",
        applyDept: 22,
        county: "所属区县",
        address: "浦东新区新野路888号",
        contact: "021-6433225（时间：星期一至星期五  上午9:00～11:30  下午13:30～17:00，国家法定节假日除外）",
        serviceTime: "星期一至星期五  上午9:00～11:30  下午13:30～17:00（国家法定节假日除外）",
    }],
    rowList: [{
        id: 1,
        idleaf: 5,
        city: "上海32",
        hotel: "酒店名称32",
        startDate: "2020-09-10",
        endDate: "2020-12-14",
    }],
    attachList: [{
        attachId: 1,
        idleaf: 5,
        attachName: "文件1.jpg",
        attachPath: "http://xinsite.vip/uploadfiles/20230415/b77e01b7a4934870af57cee2afeed1be.jpg",
        attachSize: 70482,
        attachType: "jpg",
        attachState: 1,
        createTime: "2020-09-10 09:55:40",
    }],
    attachGrid: [{
        attachId: 2,
        idleaf: 5,
        attachName: "文件2.jpg",
        attachPath: "http://xinsite.vip/uploadfiles/20230415/45cd897124d84398af8d1d3fa73b956b.jpg",
        attachSize: 56241,
        attachType: "jpg",
        attachState: 1,
        createTime: "2020-09-12 13:55:40",
    }],
}, {
    idleaf: 4,
    purpose: "出差目的22",
    peers: "同行人22",
    startDate: "2020-03-30",
    endDate: "2020-08-25",
    address: "出差地点22",
    days: 5,
    traffic: "3,4",
    isPay: 1,
    expectCost: 1000,
    image: "",
    remark: "简介",
    createTime: "2020-09-10 09:55:40",
    baseForm: undefined,
    modalList: [],
    rowList: [],
    attachList: [],
}, {
    idleaf: 3,
    purpose: "出差目的33",
    peers: "同行人33",
    startDate: "2020-03-30",
    endDate: "2020-08-25",
    address: "出差地点33",
    days: 5,
    traffic: "1,4",
    isPay: 1,
    expectCost: 1000,
    image: "",
    remark: "简介",
    createTime: "2020-09-10 09:55:40",
    baseForm: undefined,
    modalList: [],
    rowList: [],
    attachList: [],
}, {
    idleaf: 2,
    purpose: "出差目的44",
    peers: "同行人44",
    startDate: "2020-03-30",
    endDate: "2020-08-25",
    address: "出差地点44",
    days: 5,
    traffic: "2,3",
    isPay: 1,
    expectCost: 1000,
    image: "",
    remark: "简介",
    createTime: "2020-09-10 09:55:40",
    baseForm: undefined,
    modalList: [],
    rowList: [],
    attachList: [],
}];

