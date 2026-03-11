import Mock from 'mockjs';
import {getPageData, getWhereList, getWhereTreeList} from "@/mock/mock-util";
import {deepClone, getParentIdsByTreeList, isDef, QueryParam, transformDictData, transformTreeList} from "xin-antd3-ui";
import {VITE_BASE_URL} from '@/config/common';

let areaTreeList = []

/**
 * 获取数据字典信息
 */
Mock.mock(`${VITE_BASE_URL}/dict/list`, 'post', (options) => {
    const params = JSON.parse(options.body);
    return getDictResult(params, 'list');
});

Mock.mock(`${VITE_BASE_URL}/dict/tree`, 'post', (options) => {
    const params = JSON.parse(options.body);
    return getDictResult(params, 'tree');
});

Mock.mock(`${VITE_BASE_URL}/dict/page`, 'post', (options) => {
    const params = JSON.parse(options.body);
    return getDictResult(params, 'page');
});

Mock.mock(`${VITE_BASE_URL}/dict/page/user`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(userList, params),
    };
});

/**
 * cron获取最近运行次数API
 */
Mock.mock(`${VITE_BASE_URL}/cron/runtimes`, 'post', (options) => {
    let result = {
        code: 0,
        message: 'success',
        data: [
            '2023-01-01 17:30:00',
            '2023-01-01 17:35:00',
            '2023-01-01 17:40:00',
            '2023-01-01 17:45:00',
            '2023-01-01 17:50:00',
            '2023-01-01 17:55:00',
            '2023-01-01 18:00:00',
            '2023-01-01 18:05:00',
            '2023-01-01 18:10:00',
            '2023-01-01 18:15:00',
            '2023-01-01 18:20:00',
            '2023-01-01 18:25:00',
            '2023-01-01 18:30:00',
            '2023-01-01 18:35:00',
            '2023-01-01 18:40:00',
            '2023-01-01 18:45:00',
            '2023-01-01 18:50:00',
            '2023-01-01 18:55:00',
        ],
    };
    return result;
});

/**
 * 流程角色人员
 */
Mock.mock(`${VITE_BASE_URL}/flow/role/user`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let result = {
        code: 0,
        message: 'success',
        // data: [],
    };
    let list = deepClone(userList);
    if (params.ids) {
        const ids = params.ids.toString().split(',');
        list = list.filter((item) => ids.includes(item.roleId));
    }
    result.data = list.map((item) => {
        return {
            userId: item.userId,
            userName: item.userName,
        }
    });
    return result;
});

/**
 * 子流程标识列表
 */
Mock.mock(`${VITE_BASE_URL}flow/subflow/keys`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let result = {
        code: 0,
        message: 'success',
        data: [{
            flowKey: 'flow1',
            flowName: '子流程一'
        }, {
            flowKey: 'flow2',
            flowName: '子流程二'
        }, {
            flowKey: 'flow3',
            flowName: '子流程三'
        }],
    };

    return result;
});

function getDictResult(params, type) {
    let result = {
        code: 0,
        message: 'success',
    };
    if (params.dictKey == 'SYS_AREA') {
        readerAreaJson();
        const lazyLoad = params.lazyLoad ?? false;
        if (params.where?.length > 0) {
            result['data'] = getWhereTreeList(areaList, params, 'areaId', 'pid');
            result['data'] = getAreaTreeList(result['data'], false, '0');
        } else if (params.parentIds) {
            if (typeof params.parentIds == 'string') params.parentIds = params.parentIds.split(',');
            //级联选择懒加载，第一次请求(第一级默认加载，其他级按parentIds加载)
            if (params.parentIds[0] == '0') params.parentIds.splice(0, 1);
            const parentIds = getParentIds(params.parentIds)
            result['data'] = areaList.filter((item) => item.pid == '0' || parentIds.includes(item.pid) === true);
            result['data'] = getAreaTreeList(result['data'], lazyLoad, '0');
        } else if (!isDef(params.parentId)) {
            const list = areaList.filter((item) => item.pid == params.parentId);
            result['data'] = getAreaTreeList(list, lazyLoad);   //级联选择、下拉树选择逐级加载
            if (params.text && result['data']) {
                result['data'] = result['data'].filter((item) => item.label.indexOf(params.text) >= 0);
            }
            if (params.values && result['data']) {
                const values = params.values.split(',');
                result['data'] = result['data'].filter((item) => values.includes(item.value));
            }
        } else if (!isDef(params.ids)) {
            //下拉树选择懒加载，第一次请求(第一级默认加载，其他级按Ids加载)
            const ids = areaList.filter((item) => item.pid == '0').map((item) => item.areaId);
            if (params.ids) {
                const pids = params.ids.split(',');
                const parentIds = getParentIdsByTreeList(areaList, params.ids.split(','), true, 'areaId', 'pid');
                ids.push.apply(ids, parentIds);
            }
            result['data'] = areaList.filter((item) => ids.includes(item.areaId) === true);
            result['data'] = getAreaTreeList(result['data'], lazyLoad, '0');
        } else if (params.level) {
            result['data'] = areaList.filter((item) => item.level === params.level);
            result['data'] = getAreaTreeList(result['data'], lazyLoad);
        } else {
            if (areaTreeList.length == 0) {
                areaTreeList = getAreaTreeList(areaList, false, '0');
            } else {
                result['data'] = areaTreeList;
            }
        }
    } else if (params.dictKey == 'DEMO_DEPT') {
        const jsons = import.meta.globEager('@/assets/json/dept-data.json');
        Object.keys(jsons).forEach((key) => {
            result['data'] = jsons[key]['default'];
        });
    } else if (params.dictKey == 'DICT_SEX') {
        const jsons = import.meta.globEager('@/assets/json/sex-data.json');
        Object.keys(jsons).forEach((key) => {
            result['data'] = jsons[key]['default'];
        });
    } else if (params.dictKey == 'SYS_USER') {
        const list = userList.map((item) => {
            return {
                value: item.userId,
                label: item.userName,
                label2: item.loginName,
                disabled: item.userState != 1,
            }
        });
        if (type == 'list') {
            result['data'] = getWhereList(list, params);
            return result;
        }
        const data = getPageData(list, params);
        result['data'] = {
            total: data.total,
            list: data.list,
        };
    } else if (params.dictKey == 'SYS_ROLE') {
        let list = getWhereList(roleList, params);
        result['data'] = list.map((item) => {
            return {
                value: item.roleId,
                label: item.roleName,
                disabled: item.roleState != 1,
            }
        });
    } else if (params.dictKey == 'SYS_FLOW_ROLE') {
        result['data'] = [{value: 1, label: '部门领导'},
            {value: 2, label: '部门负责人'},
            {value: 3, label: '财务负责人'},
            {value: 4, label: '人事负责人'},
            {value: 5, label: '办公室负责人'}];
    } else if (params.dictKey == 'SYS_DEPT') {
        let list = null;
        if (type == 'list') {
            result['data'] = deptList.map((item) => {
                return {
                    value: item.deptId,
                    label: item.deptName,
                }
            });
            return result;
        }
        if (params.where?.length > 0) {
            list = getWhereTreeList(deptList, params, 'deptId');
        } else {
            list = deepClone(deptList);
        }
        list = transformTreeList(list, 0, 'deptId', 'pid');
        result['data'] = transformDictData(list, {value: 'deptId', label: 'deptName'});
    } else if (params.dictKey == 'SYS_MENU') {
        if (type == 'list') {
            result['data'] = menuList.map((item) => {
                return {
                    value: item.menuId,
                    label: item.menuName,
                }
            });
            return result;
        }

        let list = menuList.filter((item) => item.menuType != 'button');
        if (params.where?.length > 0) {
            list = getWhereTreeList(list, params, 'menuId');
        } else {
            list = deepClone(list);
        }
        list = transformTreeList(list, 0, 'menuId', 'pid');
        result['data'] = transformDictData(list, {value: 'menuId', label: 'menuName'});
    } else if (params.dictKey?.indexOf('ENUM_') == 0) {
        const item = enumList.find((t) => t.dictKey == params.dictKey);
        result['data'] = item?.selectList ?? [];
    } else {
        result['data'] = [];
    }
    return result;
}

function getAreaTreeList(list, lazyLoad, pid?) {
    list = list.map((item) => {
        return {
            value: item.areaId,
            label: item.areaName,
            pid: item.pid,
        }
    });

    if (lazyLoad) {
        list.forEach((item) => {
            const index = areaList.findIndex((t) => t.pid == item.value);
            item.isLeaf = index == -1;
        });
    }

    if (!pid) return list;
    return transformTreeList(list, pid, 'value', 'pid');
}

function getParentIds(parentIds) {
    const array1 = [];
    parentIds.forEach((parentId) => {
        const array2 = parentId.split(',');
        array1.push.apply(array1, array2);
    });
    return array1;
}

export const userList = [
    {
        userId: 2,
        userName: '系统管理员',
        loginName: 'admin',
        headPhoto: '',
        userSex: 'male',
        roleId: '2',
        orgId: '1',
        userRole: '1',
        userDept: '11',
        deptId: '11',
        userState: 1,
        issys: 1,
        remark: '',
        birthday: '',
        serialcode: 150,
        phone: '12345678909',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        userId: 3,
        userName: '朱德华',
        loginName: 'zhudehua',
        userSex: 'male',
        orgId: '1',
        roleId: '2',
        userRole: '2,3',
        userDept: '1',
        deptId: '1',
        userState: 1,
        issys: 0,
        remark: '',
        birthday: '',
        serialcode: 130,
        phone: '12345678918',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        userId: 4,
        userName: '江胜',
        loginName: 'jiangsheng',
        userSex: 'male',
        orgId: '1',
        roleId: '3',
        userRole: '3',
        userDept: '10',
        deptId: '10',
        userState: 1,
        issys: 0,
        remark: '',
        birthday: '',
        serialcode: 120,
        phone: '12345678944',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        userId: 6,
        userName: '徐西',
        loginName: 'xuxi',
        userSex: 'female',
        orgId: '1',
        roleId: '3',
        userRole: '3',
        userDept: '10',
        deptId: '10',
        userState: 1,
        issys: 0,
        serialcode: 98,
        phone: '12345678927',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        userId: 7,
        userName: '苏英翠',
        loginName: 'suyingcui',
        userSex: 'female',
        orgId: '1',
        roleId: '3',
        userRole: '3',
        userDept: '8',
        deptId: '8',
        userState: 1,
        issys: 0,
        serialcode: 97,
        phone: '12345678916',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        userId: 9,
        userName: '任丽音',
        loginName: 'renliyin',
        userSex: 'female',
        orgId: '1',
        roleId: '4',
        userRole: '3',
        userDept: '8',
        deptId: '8',
        userState: 1,
        issys: 0,
        serialcode: 94,
        phone: '12345678947',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        userId: 14,
        userName: '方华',
        loginName: 'fanghua',
        userSex: 'male',
        orgId: '1',
        roleId: '4',
        userRole: '3',
        userDept: '8',
        deptId: '8',
        userState: 1,
        issys: 0,
        serialcode: 89,
        phone: '12345677543',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        userId: 17,
        userName: '苏如瑶',
        loginName: 'suruyao',
        userSex: 'female',
        orgId: '1',
        roleId: '4',
        userRole: '3',
        userDept: '11',
        deptId: '11',
        userState: 1,
        issys: 0,
        remark: '',
        serialcode: 86,
        phone: '12326678909',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        userId: 8,
        userName: '丁德',
        loginName: 'dingde',
        userSex: 'male',
        orgId: '1',
        roleId: '5',
        userRole: '3',
        userDept: '11',
        deptId: '11',
        userState: 0,
        issys: 0,
        serialcode: 85,
        phone: '12345268909',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
];

export const roleList = [
    {
        roleId: 1,
        roleName: '超级管理员',
        remark: '',
        rolePerVal: 'v-admin',
        superAdminer: true,
        roleState: 1,
        issys: 1,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        roleId: 2,
        roleName: '系统管理员',
        remark: '',
        rolePerVal: 'admin',
        superAdminer: false,
        roleState: 1,
        issys: 0,
        createTime: '2019-10-21 16:44:41',
        updateTime: '2020-06-30 06:02:02',
        auths: [{"menuId": 14}, {"menuId": 15, "dataPerType": "department"}, {"menuId": 16}, {
            "menuId": 19,
            "dataPerType": "customUser",
            "dataPerIds": "6,17",
        }, {"menuId": 20}, {"menuId": 22}],
    },
    {
        roleId: 3,
        roleName: '普通用户',
        remark: '',
        rolePerVal: 'common',
        superAdminer: false,
        roleState: 1,
        issys: 0,
        createTime: '2018-10-27 23:48:53',
        updateTime: '2021-07-24 01:14:49',
        auths: [{"menuId": 14}, {"menuId": 15, "dataPerType": "customDept", "dataPerIds": "8,11"}, {"menuId": 16}, {"menuId": 17}, {"menuId": 18}, {
            "menuId": 19,
            "dataPerType": "customUser",
            "dataPerIds": "3,6",
        }, {"menuId": 20}, {"menuId": 21}, {"menuId": 22}],
    },
];

export const deptList = [
    {
        deptId: 1,
        pid: 0,
        deptName: '管理部',
        fullName: '',
        deptCode: '1000.01',
        deptType: '1',
        remark: '',
        leader: '3',
        leaderText: '朱德华',
        director: '3',
        directorText: '朱德华',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    },
    {
        deptId: 10,
        pid: 1,
        deptName: '人事部',
        fullName: '',
        deptCode: '1000.01.02',
        deptType: '1',
        remark: '',
        leader: '',
        leaderText: '',
        director: '18',
        directorText: '丁德',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    },
    {
        deptId: 9,
        pid: 1,
        deptName: '财务部',
        fullName: '',
        deptCode: '1000.01.03',
        deptType: '1',
        remark: '',
        leader: '',
        leaderText: '',
        director: '17',
        directorText: '苏如瑶',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    },
    {
        deptId: 4,
        pid: 0,
        deptName: '业务部',
        fullName: '',
        deptCode: '1000.05',
        deptType: '1',
        remark: '',
        leader: '4',
        leaderText: '江胜',
        director: '14',
        directorText: '方华',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    },
    {
        deptId: 15,
        pid: 4,
        deptName: '销售部',
        fullName: '',
        deptCode: '1000.05.01',
        deptType: '1',
        remark: '',
        leader: '',
        leaderText: '',
        director: '',
        directorText: '',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    },
    {
        deptId: 8,
        pid: 4,
        deptName: '市场部',
        fullName: '',
        deptCode: '1000.05.02',
        deptType: '1',
        remark: '',
        leader: '',
        leaderText: '',
        director: '',
        directorText: '',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    },
    {
        deptId: 3,
        pid: 15,
        deptName: '品质部',
        fullName: '',
        deptCode: '1000.02',
        deptType: '1',
        remark: '',
        leader: '4',
        leaderText: '江胜',
        director: '',
        directorText: '',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    },
    {
        deptId: 12,
        pid: 15,
        deptName: '采购部',
        fullName: '',
        deptCode: '1000.10',
        deptType: '1',
        remark: '',
        leader: '',
        leaderText: '',
        director: '',
        directorText: '',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    },
    {
        deptId: 11,
        pid: 0,
        deptName: '其他部门',
        fullName: '',
        deptCode: '1000.09',
        deptType: '1',
        remark: '',
        leader: '2',
        leaderText: '系统管理员',
        director: '',
        directorText: '',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    },
];

export const enumList = [
    {
        enumId: 1,
        pid: 0,
        enumName: '流程状态',
        dictKey: 'ENUM_FLOW_STATE',
        expanded: '',
        createTime: '2020-10-20 23:29:03',
        selectList: [{
            label: '草拟',
            value: 'modifing',
            remark: '',
        }, {
            label: '审批中',
            value: 'executing',
            remark: '',
        }, {
            label: '审结',
            value: 'finished',
            remark: '',
        }],
    }, {
        enumId: 2,
        pid: 0,
        enumName: '审批状态',
        dictKey: 'ENUM_AUDIT_STATE',
        expanded: '',
        createTime: '2020-10-20 23:29:03',
        selectList: [{
            label: '过期',
            value: 'expire',
            remark: '',
        }, {
            label: '不同意',
            value: 'disagree',
            remark: '',
        }, {
            label: '已完成',
            value: 'completed',
            remark: '',
        }],
    }, {
        enumId: 3,
        pid: 0,
        enumName: '菜单类型',
        dictKey: 'ENUM_MENU_TYPE',
        expanded: '',
        createTime: '2020-10-20 23:29:03',
        selectList: [{
            label: '目录',
            value: 'dir',
            remark: '栏目父菜单',
        }, {
            label: '栏目',
            value: 'list',
            remark: '菜单栏目',
        }, {
            label: '功能栏目',
            value: 'menu',
            remark: '菜单栏目',
        }, {
            label: '按钮',
            value: 'button',
            remark: '菜单栏目下各按钮，需要权限控制',
        }],
    }, {
        enumId: 4,
        pid: 0,
        enumName: '菜单打开方式',
        dictKey: 'ENUM_OPEN_TYPE',
        expanded: '',
        createTime: '2020-10-20 23:29:03',
        selectList: [{
            label: '选项卡',
            value: 'tab',
            remark: '菜单栏目、按钮：新增，修改',
        }, {
            label: '窗口',
            value: 'modal',
            remark: '按钮：新增，修改',
        }, {
            label: '外链接',
            value: 'link',
            remark: '菜单栏目',
        }, {
            label: 'none',
            value: 'none',
            remark: '无定义，如：无打开页面的按钮',
        }],
    }, {
        enumId: 5,
        pid: 0,
        enumName: '数据权限类型',
        dictKey: 'ENUM_DATA_AUTH',
        expanded: '',
        createTime: '2020-10-20 23:29:03',
        selectList: [{
            label: '仅限本人',
            value: 'myself',
            remark: '',
        }, {
            label: '本人及下属',
            value: 'subordinate',
            remark: '',
        }, {
            label: '所在部门',
            value: 'department',
            remark: '',
        }, {
            label: '所在公司',
            value: 'company',
            remark: '',
        }, {
            label: '自定义部门',
            value: 'customDept',
            remark: '',
        }, {
            label: '自定义用户',
            value: 'customUser',
            remark: '',
        }],
    }, {
        enumId: 6,
        pid: 0,
        enumName: '日志类型',
        dictKey: 'ENUM_LOG_TYPE',
        expanded: '',
        createTime: '2020-10-20 23:29:03',
        selectList: [{
            label: '登录日志',
            value: 1,
            remark: '',
        }, {
            label: '查询日志',
            value: 2,
            remark: '',
        }, {
            label: '操作日志',
            value: 3,
            remark: '',
        }, {
            label: '异常日志',
            value: 4,
            remark: '',
        }],
    }];

export const menuList = [
    {
        menuId: 5,
        pid: 0,
        menuName: '系统管理',
        menuType: 'dir',
        openType: 'none',
        icon: 'SettingOutlined',
        perVal: '',
        path: '/system',
        component: '',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 6,
        pid: 5,
        menuName: '用户管理',
        menuType: 'menu',
        openType: 'tab',
        icon: 'TeamOutlined',
        perVal: '',
        path: '/system/user',
        component: '/system/user/List.vue',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 7,
        pid: 6,
        menuName: '新增',
        menuType: 'button',
        openType: 'modal',
        icon: '',
        perVal: '',
        path: '',
        component: '/system/user/CreateForm.vue',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 8,
        pid: 6,
        menuName: '修改',
        menuType: 'button',
        openType: 'modal',
        icon: '',
        perVal: '',
        path: '',
        component: '/system/user/CreateForm.vue',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 9,
        pid: 6,
        menuName: '删除',
        menuType: 'button',
        openType: 'none',
        icon: '',
        perVal: '',
        path: '',
        component: '',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 10,
        pid: 5,
        menuName: '角色管理',
        menuType: 'menu',
        openType: 'tab',
        icon: 'VerifiedOutlined',
        perVal: '',
        path: '/system/role',
        component: '/system/role/List.vue',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 11,
        pid: 10,
        menuName: '新增',
        menuType: 'button',
        openType: 'modal',
        icon: '',
        perVal: '',
        path: '',
        component: '/system/user/CreateForm.vue',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 12,
        pid: 10,
        menuName: '修改',
        menuType: 'button',
        openType: 'modal',
        icon: '',
        perVal: '',
        path: '',
        component: '/system/user/CreateForm.vue',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 13,
        pid: 10,
        menuName: '删除',
        menuType: 'button',
        openType: 'none',
        icon: '',
        perVal: '',
        path: '',
        component: '',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 14,
        pid: 0,
        menuName: '代码生成实例',
        menuType: 'dir',
        openType: 'none',
        icon: 'CodeOutlined',
        perVal: '',
        path: '/build',
        component: '',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 15,
        pid: 14,
        menuName: '行编辑',
        menuType: 'menu',
        openType: 'tab',
        icon: undefined,
        perVal: '',
        path: '/build/single/row',
        component: '/build/single/row/List.vue',
        meta: '',
        hide: 0,
        dataPer: 1,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 16,
        pid: 15,
        menuName: '新增',
        menuType: 'button',
        openType: 'none',
        icon: '',
        perVal: '',
        path: '',
        component: '',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 17,
        pid: 15,
        menuName: '修改',
        menuType: 'button',
        openType: 'none',
        icon: '',
        perVal: '',
        path: '',
        component: '',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 18,
        pid: 15,
        menuName: '删除',
        menuType: 'button',
        openType: 'none',
        icon: '',
        perVal: '',
        path: '',
        component: '',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 19,
        pid: 14,
        menuName: '窗口编辑',
        menuType: 'menu',
        openType: 'tab',
        icon: undefined,
        perVal: '',
        path: '/build/single/modal',
        component: '/build/single/modal/List.vue',
        meta: '',
        hide: 0,
        dataPer: 1,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 20,
        pid: 19,
        menuName: '新增',
        menuType: 'button',
        openType: 'modal',
        icon: '',
        perVal: '',
        path: '',
        component: '/build/single/modal/CreateForm.vue',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 21,
        pid: 19,
        menuName: '修改',
        menuType: 'button',
        openType: 'modal',
        icon: '',
        perVal: '',
        path: '',
        component: '/build/single/modal/CreateForm.vue',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 22,
        pid: 19,
        menuName: '删除',
        menuType: 'button',
        openType: 'none',
        icon: '',
        perVal: '',
        path: '',
        component: '',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 23,
        pid: 14,
        menuName: '选项卡编辑',
        menuType: 'menu',
        openType: 'tab',
        icon: undefined,
        perVal: '',
        path: '/build/single/tab',
        component: '/build/single/tab/List.vue',
        meta: '',
        hide: 0,
        dataPer: 1,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 24,
        pid: 23,
        menuName: '新增',
        menuType: 'button',
        openType: 'tab',
        icon: '',
        perVal: '',
        path: 'build/single/tab/edit',
        component: '/build/single/tab/CreateForm.vue',
        meta: '',
        hide: 1,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 25,
        pid: 23,
        menuName: '修改',
        menuType: 'button',
        openType: 'tab',
        icon: '',
        perVal: '',
        path: 'build/single/tab/edit',
        component: '/build/single/tab/CreateForm.vue',
        meta: '',
        hide: 1,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 26,
        pid: 23,
        menuName: '删除',
        menuType: 'button',
        openType: 'none',
        icon: '',
        perVal: '',
        path: '',
        component: '',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 27,
        pid: 0,
        menuName: '内链接',
        menuType: 'menu',
        openType: 'tab',
        icon: undefined,
        perVal: '',
        path: '/iframe/keepalive',
        component: 'http://xinsite.vip/',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    }, {
        menuId: 28,
        pid: 0,
        menuName: '外链接',
        menuType: 'menu',
        openType: 'link',
        icon: undefined,
        perVal: '',
        path: 'http://xinsite.vip/',
        component: '',
        meta: '',
        hide: 0,
        dataPer: 0,
        createTime: '2020-10-20 23:29:03',
        updateTime: '2020-06-30 06:02:02',
    },
];

export let areaList = []

export function readerAreaJson() {
    if (areaList.length > 0) return;
    const jsons = import.meta.globEager('@/assets/json/area-data.json');
    Object.keys(jsons).forEach((key) => {
        setAreaList(jsons[key]['default'], '0', 1);
    });
}

function setAreaList(treeData, parentId, layer) {
    if (!Array.isArray(treeData)) return;

    if (layer == 1) areaList = []
    treeData.forEach((item) => {
        areaList.push({
            areaId: item.value,
            areaCode: item.value,
            areaName: item.label,
            pid: parentId,
            layer: layer,
        });
        setAreaList(item.children, item.value, layer + 1);
    });
}
