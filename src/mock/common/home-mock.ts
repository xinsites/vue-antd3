import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';

/**
 * 首页最新动态信息API
 */
Mock.mock(`${VITE_BASE_URL}/home/news`, 'post', (options) => {
    let result = {
        code: 0,
        message: 'success',
        data: [
            {id: 1, time: '2月07日 16:43', userName: '管理员', action: '指派', title: '项目任务'},
            {id: 2, time: '2月07日 14:34', userName: '蔡月霖', action: '退出', title: '系统'},
            {id: 3, time: '2月07日 13:36', userName: '黄初春', action: '创建', title: '请假申请'},
            {id: 4, time: '2月07日 11:56', userName: '任丽音', action: '退出', title: '系统'},
            {id: 5, time: '2月07日 10:32', userName: '秦春', action: '登录', title: '系统'},
            {id: 6, time: '2月07日 09:43', userName: '管理员', action: '指派', title: '项目一的BUG修复任务'},
            {id: 7, time: '2月07日 09:15', userName: '任丽音', action: '编辑', title: '任务'},
            {id: 8, time: '2月07日 09:08', userName: '唐雄光', action: '创建', title: '用户'},
            {id: 9, time: '2月07日 09:05', userName: '吴涛', action: '登录', title: '系统'},
            {id: 10, time: '2月07日 08:56', userName: '苏如瑶', action: '登录', title: '系统'},
        ],
    };
    return result;
});

/**
 * 首页待办任务信息API
 */
Mock.mock(`${VITE_BASE_URL}/home/tasks`, 'post', (options) => {
    let result = {
        code: 0,
        message: 'success',
        data: [
            {id: 1, title: '【采购申请】任务1', createTime: '2023-02-09 13:30:28'},
            {id: 2, title: '【项目立项申请】任务2', createTime: '2023-02-09 09:32:17'},
            {id: 3, title: '【加班申请】任务3', createTime: '2023-02-08 15:45:35'},
            {id: 4, title: '【加班申请】任务4', createTime: '2023-02-07 14:24:32'},
            {id: 5, title: '【请假申请】任务5', createTime: '2023-02-07 10:11:56'},
            {id: 6, title: '【合同归档】任务6', createTime: '2023-02-05 11:36:12'},
        ],
    };
    return result;
});

/**
 * 首页项目进度信息API
 */
Mock.mock(`${VITE_BASE_URL}/home/projects`, 'post', (options) => {
    let result = {
        code: 0,
        message: 'success',
        data: [
            {id: 1, title: '【商城】项目20230112', startDate: '2023-01-12', endDate: '2023-02-09', status: 0, progress: 0},
            {id: 2, title: '【绿标】项目20230123', startDate: '2023-01-23', endDate: '2023-02-09', status: 1, progress: 30},
            {id: 3, title: '【绿标】项目20230108', startDate: '2023-01-08', endDate: '2023-03-14', status: 2, progress: 80},
            {id: 4, title: '【绿标】项目20230212', startDate: '2023-02-12', endDate: '2023-04-17', status: 1, progress: 63},
            {id: 5, title: '【商城】项目20230116', startDate: '2023-01-16', endDate: '2023-06-24', status: 1, progress: 56},
            {id: 6, title: '【商城】项目20230224', startDate: '2023-02-24', endDate: '2023-05-26', status: 3, progress: 100},
        ],
    };
    return result;
});

/**
 * 获取子流程流程记录
 */
Mock.mock(`${VITE_BASE_URL}/flow/approval/tasks`, 'post', ({body}) => {
    const params = JSON.parse(body);

    const records1 = [{
        nodeId: 'start',
        status: 'done',
        actionType: 'start',
        actionUser: {
            id: '1',
            name: '张三',
            photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar.png'
        },
        nodeName: '开始',
        finishTime: '2025-09-09 15:20:00',
    }, {
        nodeId: 'lc_ai27047626592',
        actionType: 'subflow',
        status: 'done',
        nodeName: '领导审批子流程',
        finishTime: '2025-09-09 16:20:00',
    }, {
        nodeId: 'lc_ai27047626598',
        status: 'doing',
        actionType: 'delay',
        actionDesc: '1小时后进入下一节点',
        nodeName: '延迟处理',
        finishTime: '2025-09-09 18:27:00',
    }, {
        nodeId: 'lc_ai27047626533',
        status: 'todo',
        actionType: 'trigger',
        nodeName: '触发器',
    }];

    const records2 = [{
        nodeId: 'start',
        status: 'done',
        actionType: 'start',
        actionUser: {
            id: '1',
            name: '张三',
            photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar.png'
        },
        nodeName: '开始',
        finishTime: '2025-09-09 15:20:00',
    }, {
        nodeId: 'lc_ai27047626598',
        status: 'doing',
        actionType: 'approval',
        actionDesc: '需所有人审批同意',
        nodeName: '审批',
        assignee: [{
            id: '1',
            name: '张三',
            photo: ''
        }, {
            id: '2',
            name: '李四',
            photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar.png'
        }]
    }];

    const navs = [{
        nodeId: '',
        flowName: '请假申请',
    }, {
        nodeId: 'zlc_ai27047626593',
        flowName: '领导审批子流程',
    }];

    let result = {
        code: 0,
        data: {
            navs: params.nodeId ? navs : [],
            tasks: params.nodeId ? records2 : records1,
        },
    };

    return result;
});

/**
 * 获取子流程详情
 */
Mock.mock(`${VITE_BASE_URL}/flow/subflow/detail`, 'post', ({body}) => {
    const params = JSON.parse(body);

    const subflow1 = '{"id":"start","type":"start","name":"开始","desc":"所有人","nodeIcon":"UserOutlined","childNode":{"id":"nc_gv97471740169","type":"subflow","name":"子流程","placeholder":"请选择子流程","nodeIcon":"BlockOutlined","childNode":{"id":"end","type":"end","name":"结束","placeholder":"流程结束"},"desc":"子流程【assas】","props":{"subFlowKey":"assas","subFlowName":"assas"}}}';

    const subflow2 = '{"id":"start","type":"start","name":"开始","desc":"所有人","nodeIcon":"UserOutlined","childNode":{"id":"lc_s565468661551","type":"approval","name":"审批人","placeholder":"请选择审批人","nodeIcon":"UserOutlined","childNode":{"id":"end","type":"end","name":"结束","placeholder":"流程结束"}}}';

    const navs = [{
        nodeId: '',
        flowName: '请假申请',
    }, {
        nodeId: 'zlc_ai27047626593',
        flowName: '子流程一',
    }];

    let result = {
        code: 0,
        data: {
            navs: !params.nodeId ? [] : navs,
            flowJson: !params.nodeId ? subflow1 : subflow2,
        },
    };
    return result;
});
