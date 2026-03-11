import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, QueryParam, rowId} from "xin-antd3-ui";
import {getPageData} from "@/mock/mock-util";

/**
 * 单表实例-选项卡编辑--查询列表
 */
Mock.mock(`${VITE_BASE_URL}/single/tab/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(listData, params),
    };
});

/**
 * 单表实例-选项卡编辑--新增
 */
Mock.mock(`${VITE_BASE_URL}/single/tab/add`, 'post', (options) => {
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
 * 单表实例-选项卡编辑--修改
 */
Mock.mock(`${VITE_BASE_URL}/single/tab/update`, 'post', (options) => {
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
 * 单表实例-选项卡编辑--删除
 */
Mock.mock(`${VITE_BASE_URL}/single/tab/delete`, 'post', (options) => {
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
 * 单表实例-选项卡编辑--详情
 */
Mock.mock(`${VITE_BASE_URL}/single/tab/detail`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const item = listData.find((t) => t.idleaf == params.idleaf);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

const listData = [{
    idleaf: 5,
    name: "打印机",
    type: "2",
    unitPrice: 23.00,
    quantity: 4,
    amount: 92.00,
    applyUser: "zhuguan",
    applyDept: 21,
    inputType: "textfield",
    payType: '3',
    date: "2020-03-29",
    createTime: "2020-10-10 14:28:43",
    applyUserText: "主管",
    remark: "总结了一些可以进的凹3镜像链接，基本上是在微博里看别的姐妹分享的我都用浏览器试了一遍",
}, {
    idleaf: 4,
    name: "打印机111q",
    type: "1",
    unitPrice: 40.00,
    quantity: 3,
    amount: 120.00,
    applyUser: "zhuguan",
    applyDept: 22,
    inputType: "numberfield",
    payType: '1',
    date: "2021-05-24",
    createTime: "2020-03-29 23:49:16",
    applyUserText: "主管",
    remark: "如果你之前已经访问过该网站并保存了书签",
}, {
    idleaf: 3,
    name: "打印机wsxxx",
    type: "2",
    unitPrice: 45.00,
    quantity: 2,
    amount: 90.00,
    applyUser: "jingli",
    applyDept: 1,
    inputType: "datefield",
    payType: '0,1',
    date: "2022-10-15",
    createTime: "2020-03-29 23:48:43",
    applyUserText: "经理",
    remark: "本网页介绍了这些项目的目的、特点和相关链接",
}, {
    idleaf: 2,
    name: "1111",
    type: "1",
    unitPrice: 36.00,
    quantity: 4,
    amount: 144.00,
    applyUser: "banshiyuan",
    applyDept: 3,
    inputType: "multicombobox",
    payType: '1,2',
    date: "2021-05-24",
    createTime: "2020-03-29 23:47:01",
    applyUserText: "办事员",
    remark: "一个知乎用户问了ao3网址是否可以使用，是否是镜像站点",
}];


