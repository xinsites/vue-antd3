import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';

/**
 * 用户登录请求API
 */
Mock.mock(`${VITE_BASE_URL}/login/withPwd`, 'post', ({body}) => {
    let result = {
        code: 0,
        message: '操作成功',
        data: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VybmFtZVwiOlwiYWRtaW5cIixcInRlbmFudElkXCI6Mn0iLCJleHAiOjE2NzE2Mzc1OTQsImlhdCI6MTY3MTU1MTE5NH0.kpmr_S4Gq6DCLQfCMp32XerG8pzZ_kkINkNA7ak1_Z8',
    };
    return result;
});

let captchaIndex = 0;

/**
 * 登录验证码
 */
Mock.mock(`${VITE_BASE_URL}/login/captcha`, 'post', ({body}) => {
    const list = [{
        text: '5dTs',
        base64: 'data:image/png;base64,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',
    }, {
        text: 'UGB3',
        base64: 'data:image/png;base64,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',
    }];
    let result = {
        code: 0,
        message: '操作成功',
        data: list[captchaIndex % list.length],
    };
    captchaIndex = captchaIndex + 1;
    return result;
});


/**
 * 获取当前登录的用户信息
 */
Mock.mock(`${VITE_BASE_URL}/user/info`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let result = {
        code: 0,
        message: '操作成功',
        data: {
            userId: 1,
            loginName: 'admin',
            userName: '管理员',
            headPhoto: 'http://xinsite.vip/uploadfiles/20230415/871d87ec321f40748f2f0fca6372388e.png',
            userSex: 'male',
            email: 'admin@qq.com',
            phone: '12345678901',
            employeeId: '156012',
            remark: '性格活泼开朗，诚实稳重，适应能力强',
            superAdminer: true,
            depts: [{
                deptId: 1,
                deptName: '信息技术部',
            }, {
                deptId: 2,
                deptName: '销售部',
            }],
            auths: [],
            roleAuths: [],
            menus: listMenus,
            treeMenus: treeMenus,
        },
    };
    return result;
});

const listMenus = [
    {
        "menuId": 1,
        "pid": 0,
        "menuName": "扩展组件",
        "path": "/expand",
        "icon": "LayoutOutlined",
        "hide": 0,
        "component": null,
    },
    {
        "menuId": 2,
        "pid": 1,
        "menuName": "图标显示1",
        "path": "/icon",
        "icon": null,
        "hide": 0,
        "component": "/views/Template.vue",
    },
    {
        "menuId": 21,
        "pid": 2,
        "menuName": "图标显示1222",
        "path": "/icon22",
        "icon": null,
        "hide": 1,
        "component": "/layout/Cache.vue",
    },
    {
        "menuId": 3,
        "pid": 1,
        "menuName": "图标显示2",
        "path": "/icon2",
        "icon": null,
        "hide": 0,
        "component": "views/Template.vue",
    },
    {
        "menuId": 4,
        "pid": 1,
        "menuName": "查询列表1",
        "path": "/list1",
        "icon": null,
        "hide": 0,
        "component": "views/Template.vue",
    },
    {
        "menuId": 5,
        "pid": 1,
        "menuName": "查询列表2",
        "path": "/list2",
        "icon": "",
        "hide": 0,
        "component": "views/Template.vue",
    },
    {
        "menuId": 7,
        "pid": 1,
        "menuName": "非缓存页面",
        "path": "/no/cache",
        "icon": null,
        "hide": 0,
        "component": "views/layout/Cache.vue",
    },
    {
        "menuId": 8,
        "pid": 1,
        "menuName": "内嵌页面",
        "path": "/iframe/keepalive",
        "icon": null,
        "hide": 0,
        "component": "http://xinsite.vip/",
    },
    {
        "menuId": 9,
        "pid": 1,
        "menuName": "外嵌页面",
        "path": "http://xinsite.vip/",
        "icon": null,
        "hide": 0,
        "component": "",
    },
];

const treeMenus = [
    {
        "menuId": 1,
        "pid": 0,
        "menuName": "扩展组件",
        "path": "/expand",
        "icon": "LayoutOutlined",
        "hide": 0,
        "component": null,
        "children": [
            {
                "menuId": 2,
                "pid": 1,
                "menuName": "图标显示1",
                "path": "/icon",
                "icon": null,
                "hide": 0,
                "component": "views/Template.vue",
                "children": [{
                    "menuId": 21,
                    "pid": 2,
                    "menuName": "图标显示1222",
                    "path": "/icon22",
                    "icon": null,
                    "hide": 1,
                    "component": "views/layout/Cache.vue",
                    "children": [],
                    "menuType": 0,
                }],
            },
            {
                "menuId": 3,
                "pid": 1,
                "menuName": "图标显示2",
                "path": "/icon2",
                "icon": null,
                "hide": 0,
                "component": "views/Template.vue",
                "children": null,
            },
            {
                "menuId": 4,
                "pid": 1,
                "menuName": "查询列表1",
                "path": "/list1",
                "icon": null,
                "hide": 0,
                "component": "views/Template.vue",
                "children": [{
                    "menuId": 6,
                    "pid": 4,
                    "menuName": "新增",
                    "path": "/list1/add",
                    "icon": "",
                    "hide": 1,
                    "component": "views/Template.vue",
                    "children": null,
                }],
            },
            {
                "menuId": 5,
                "pid": 1,
                "menuName": "查询列表2",
                "path": "/list2",
                "icon": "",
                "hide": 0,
                "component": "views/Template.vue",
                "children": null,
            },
        ],
    },
];

/**
 * 登录用户修改密码
 */
Mock.mock(`${VITE_BASE_URL}/user/update/password`, 'post', (options) => {
    let result = {
        code: 0,
        message: '操作成功',
    };
    return result;
});

/**
 * 登录用户修改信息
 */
Mock.mock(`${VITE_BASE_URL}/user/update/info`, 'post', (options) => {
    return {
        code: 0,
        message: '操作成功',
    };
});

/**
 * 锁屏解锁
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/user/unlock` + ".*"), 'get', (options) => {
    return {
        code: 0,
        message: '操作成功',
    };
});

/**
 * 登录退出
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/user/logout` + ".*"), 'get', (options) => {
    return {
        code: 0,
        message: '操作成功',
    };
});
