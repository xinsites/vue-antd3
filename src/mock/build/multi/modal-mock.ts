import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, isDef, QueryParam, rowId} from "xin-antd3-ui";
import {getPageData} from "@/mock/mock-util";

/**
 * 多表实例-窗口编辑--查询列表
 */
Mock.mock(`${VITE_BASE_URL}/multi/modal/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(listData, params),
    };
});

/**
 * 多表实例-窗口编辑--新增
 */
Mock.mock(`${VITE_BASE_URL}/multi/modal/add`, 'post', (options) => {
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
 * 多表实例-窗口编辑--修改
 */
Mock.mock(`${VITE_BASE_URL}/multi/modal/update`, 'post', (options) => {
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
 * 多表实例-窗口编辑--删除
 */
Mock.mock(`${VITE_BASE_URL}/multi/modal/delete`, 'post', (options) => {
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
 * 多表实例-窗口编辑--详情
 */
Mock.mock(`${VITE_BASE_URL}/multi/modal/detail`, 'post', (options) => {
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
    subName: "分项名称1",
    itemName: "新增事项",
    submitMan: "唐雄光",
    itemSerial: "2020051141",
    itemType: "1",
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
        name: "xxxxxxxxxxx",
        address: "浦东新区新野路888号",
        startDate: "2020-09-10",
        endDate: "2020-12-14",
    }],
    attachList: [{
        attachId: 1,
        idleaf: 5,
        attachName: "文件1.png",
        attachPath: "http://xinsite.vip/uploadfiles/20230415/b77e01b7a4934870af57cee2afeed1be.jpg",
        attachSize: 70482,
        attachType: "jpg",
        attachState: 1,
        createTime: "2020-09-10 09:55:40",
    }],
}, {
    idleaf: 4,
    subName: "分项名称da",
    itemName: "332222",
    submitMan: "唐雄光",
    itemSerial: "2020051141",
    itemType: "1",
    createTime: "2020-03-30 00:30:58",
    baseForm: {
        subName: "分项名称da",
    },
    modalList: [],
    rowList: [],
    attachList: [],
}, {
    idleaf: 3,
    subName: "dddeeeee",
    itemName: "aaaaaaaa",
    submitMan: "33333",
    itemSerial: "2020051141",
    itemType: "2",
    createTime: "2020-03-30 00:30:13",
    baseForm: {
        subName: "dddeeeee",
    },
    modalList: [],
    rowList: [],
    attachList: [],
}, {
    idleaf: 2,
    subName: "分e222saa",
    itemName: "cccccbbee",
    submitMan: "aa光32",
    itemSerial: "2020051141",
    itemType: "1",
    createTime: "2020-03-30 00:28:53",
    baseForm: {
        subName: "分e222saa",
    },
    modalList: [],
    rowList: [],
    attachList: [],
}];

