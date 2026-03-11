import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';

/**
 * 查询未读数量
 */
Mock.mock(`${VITE_BASE_URL}/user/unread/num`, 'post', (options) => {
    let result = {
        code: 0,
        message: '操作成功',
        data: {
            todo: 3,
            mail: 3,
            notice: 6,
        },
    };
    return result;
});

/**
 * 查询未读通知
 */
Mock.mock(`${VITE_BASE_URL}/user/unread/notice`, 'post', (options) => {
    const mailList = [];
    for (let i = 0; i < 3; i++) {
        mailList.push({
            id: i + 1,
            title: 'XinSite 给您发来一份新的邮件',
            time: '2024-03-13 14:23:34',
            status: i < 3 ? 0 : 1,
            avatar: 'http://xinsite.vip/uploadfiles/20230415/871d87ec321f40748f2f0fca6372388e.png',
        });
    }
    const noticeList = [];
    for (let i = 0; i < 5; i++) {
        noticeList.push({
            id: i + 1,
            title: 'XinSite Antd3 新版本发布',
            time: '2024-02-24 18:25:47',
            status: i < 6 ? 0 : 1,
        });
    }
    let result = {
        code: 0,
        message: '操作成功',
        data: {
            todo: flowList.slice(0, 5),
            mail: mailList,
            notice: noticeList,
        },
    };
    return result;
});

/**
 * 分页查询我的待办
 */
Mock.mock(`${VITE_BASE_URL}/user/my/todo`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let index = 0;
    let len = 5;
    if (params.type == 'done') {
        index = 3;
        len = 4;
    } else if (params.type == 'apply') {
        index = 2;
        len = 6;
    } else if (params.type == 'send') {
        index = 4;
        len = 3;
    }
    let result = {
        code: 0,
        message: '操作成功',
        data: {
            total: len,
            list: flowList.slice(index, index + len),
        },
    };
    return result;
});

/**
 * 分页查询我的邮件
 */
Mock.mock(`${VITE_BASE_URL}/user/my/mail`, 'post', (options) => {
    const list = [];
    for (let i = 0; i < 8; i++) {
        list.push({
            id: i + 1,
            title: 'XinSite 给您发来一份新的邮件',
            time: '2024-03-13 14:23:34',
            status: i < 3 ? 0 : 1,
        });
    }

    let result = {
        code: 0,
        message: '操作成功',
        data: {
            total: 8,
            list: list,
        },
    };
    return result;
});

/**
 * 分页查询我的通知
 */
Mock.mock(`${VITE_BASE_URL}/user/my/notice`, 'post', (options) => {
    const list = [];
    for (let i = 0; i < 9; i++) {
        list.push({
            id: i + 1,
            title: 'XinSite Antd3 新版本发布',
            time: '2024-02-24 18:25:47',
            status: i < 6 ? 0 : 1,
        });
    }

    let result = {
        code: 0,
        message: '操作成功',
        data: {
            total: 9,
            list: list,
        },
    };
    return result;
});

const flowList = [{
    "statusId": "32",
    "idleaf": "23",
    "itemId": "122",
    "taskNo": "jb20220001",
    "taskType": "加班",
    "title": "[系统管理员]_加班申请_串签",
    "taskStatus": "executing",
    "createTime": "2022-03-21 18:42:52",
    "deptText": "其他部门",
    "userText": "系统管理员",
    "taskStatusText": "审批中",
    "position": "部门负责人审核",
    "execUser": "徐西,苏英翠",
}, {
    "statusId": "31",
    "idleaf": "22",
    "taskNo": "jb20210001",
    "taskType": "加班",
    "title": "[系统管理员]_加班_分签条件_开始",
    "taskStatus": "executing",
    "exec_rate": "0",
    "createTime": "2021-08-05 11:34:47",
    "deptText": "其他部门",
    "userText": "系统管理员",
    "taskStatusText": "审批中",
    "position": "部门负责人审核",
    "execUser": "吴涛,liuyonghu",
}, {
    "statusId": "28",
    "idleaf": "5",
    "itemId": "130",
    "taskNo": "qj20200005",
    "taskType": "请假",
    "title": "[秦春]_请假_任务组匹配",
    "taskStatus": "finished",
    "exec_rate": "0",
    "createTime": "2020-04-01 00:38:33",
    "deptText": "生产部",
    "userText": "秦春",
    "taskStatusText": "审批中",
    "position": "项目经理审核",
    "execUser": "已完成",
}, {
    "statusId": "27",
    "idleaf": "4",
    "itemId": "130",
    "taskNo": "qj20200004",
    "taskType": "请假",
    "title": "[秦春]_请假_任务组匹配",
    "taskStatus": "finished",
    "exec_rate": "0",
    "createTime": "2020-04-01 00:37:40",
    "deptText": "生产部",
    "userText": "秦春",
    "taskStatusText": "审批中",
    "position": "部门负责人审核",
    "execUser": "已完成",
}, {
    "statusId": "26",
    "idleaf": "3",
    "itemId": "130",
    "taskNo": "qj20200003",
    "taskType": "请假",
    "title": "[吴涛]_请假_任务组匹配",
    "taskStatus": "finished",
    "exec_rate": "0",
    "createTime": "2020-04-01 00:33:15",
    "deptText": "行政部",
    "userText": "吴涛",
    "taskStatusText": "审批中",
    "position": "流程已结束",
    "execUser": "已完成",
}, {
    "statusId": "25",
    "idleaf": "2",
    "itemId": "130",
    "taskNo": "qj20200002",
    "taskType": "请假",
    "title": "[吴涛]_请假_任务组匹配",
    "taskStatus": "finished",
    "exec_rate": "0",
    "createTime": "2020-04-01 00:32:18",
    "deptText": "行政部",
    "userText": "吴涛",
    "taskStatusText": "审批中",
    "position": "项目经理审核",
    "execUser": "已完成",
}, {
    "statusId": "24",
    "idleaf": "1",
    "itemId": "130",
    "taskNo": "qj20200001",
    "taskType": "请假",
    "title": "[系统管理员]_请假_任务组匹配",
    "taskStatus": "finished",
    "exec_rate": "0",
    "createTime": "2020-04-01 00:30:34",
    "deptText": "其他部门",
    "userText": "系统管理员",
    "taskStatusText": "审批中",
    "position": "项目经理审核",
    "execUser": "已完成",
}, {
    "statusId": "23",
    "idleaf": "6",
    "itemId": "129",
    "taskNo": "cc20200001",
    "taskType": "出差",
    "title": "[系统管理员]_出差_分签开始+会签",
    "taskStatus": "finished",
    "exec_rate": "0",
    "createTime": "2020-04-01 00:26:18",
    "deptText": "其他部门",
    "userText": "系统管理员",
    "taskStatusText": "审批中",
    "position": "项目经理审核",
    "execUser": "已完成",
}];


