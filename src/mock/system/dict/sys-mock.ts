import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {deepClone} from "xin-antd3-ui";

/**
 * 系统数据源--树形列表--全部加载
 */
Mock.mock(`${VITE_BASE_URL}/system/dict/sys/list`, 'post', (options) => {
    const params = JSON.parse(options.body);
    return {
        code: 0,
        message: 'success',
        data: deepClone(listData),
    };
});

/**
 * 系统数据源--排序
 */
Mock.mock(`${VITE_BASE_URL}/system/dict/sys/sort`, 'post', (options) => {
    const params = JSON.parse(options.body);

    if (Array.isArray(params)) {
        params.forEach((item) => {
            const index = listData.findIndex((t) => t.sysId == item.id);
            if (index != -1) {
                const newData = deepClone(listData[index]);
                listData.splice(index, 1);
                newData.pid = item.pid;
                listData.push(newData);
            }
        });
    }

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

const listData = [{
    sysId: 1,
    pid: 0,
    dictName: '用户管理',
    dictKey: 'SYS_USER',
    loadType: 'page',
    tableName: 'sys_user',
    rowKey: 'user_id',
    pidKey: '',
    rootPidVal: '',
    queryField: 'userName',
    expanded: '',
    createTime: '2020-10-20 23:29:03',
}, {
    sysId: 2,
    pid: 0,
    dictName: '角色管理',
    dictKey: 'SYS_ROLE',
    loadType: 'all',
    tableName: 'sys_role',
    rowKey: 'role_id',
    pidKey: '',
    rootPidVal: '',
    queryField: 'roleName',
    expanded: '',
    createTime: '2020-10-20 23:29:03',
}, {
    sysId: 3,
    pid: 0,
    dictName: '部门管理',
    dictKey: 'SYS_DEPT',
    loadType: 'treeLoad',
    tableName: 'sys_dept',
    rowKey: 'dept_id',
    pidKey: 'pid',
    rootPidVal: '0',
    queryField: 'deptName',
    expanded: '',
    createTime: '2020-10-20 23:29:03',
}, {
    sysId: 4,
    pid: 0,
    dictName: '行政区域',
    dictKey: 'SYS_AREA',
    loadType: 'lazyLoad',
    tableName: 'sys_area',
    rowKey: 'area_id',
    pidKey: 'pid',
    rootPidVal: '0',
    queryField: 'areaName',
    expanded: '',
    createTime: '2020-10-20 23:29:03',
}, {
    sysId: 5,
    pid: 0,
    dictName: '菜单管理',
    dictKey: 'SYS_MENU',
    loadType: 'treeLoad',
    tableName: 'sys_menu',
    rowKey: 'menu_id',
    pidKey: 'pid',
    rootPidVal: '0',
    queryField: 'menuName',
    expanded: '',
    createTime: '2020-10-20 23:29:03',
}];


