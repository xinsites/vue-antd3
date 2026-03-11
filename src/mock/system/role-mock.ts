import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, parseQueryString, QueryParam, rowId} from "xin-antd3-ui";
import {getErrorReturn, getPageData, getWhereList, isExistVal} from "@/mock/mock-util";
import {roleList, userList} from "@/mock/common/dict-mock";

/**
 * 分页查询角色列表
 */
Mock.mock(`${VITE_BASE_URL}/system/role/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(roleList, params),
    };
});

/**
 * 查询角色列表
 */
Mock.mock(`${VITE_BASE_URL}/system/role/list`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getWhereList(roleList, params),
    };
});

/**
 * 角色管理--新增
 */
Mock.mock(`${VITE_BASE_URL}/system/role/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.roleId = rowId(8, 1);
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if (isExistVal(roleList, 'roleId', 'rolePerVal', newData)) {
        return getErrorReturn(`新增失败，权限标识【${newData.rolePerVal}】已经存在！`);
    }
    roleList.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 角色管理--修改
 */
Mock.mock(`${VITE_BASE_URL}/system/role/edit`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    if (isExistVal(roleList, 'roleId', 'rolePerVal', newData)) {
        return getErrorReturn(`修改失败，权限标识【${newData.rolePerVal}】已经存在！`);
    }

    newData.updateTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    const index = roleList.findIndex((t) => t.roleId == newData.roleId);
    if (index != -1) {
        roleList.splice(index, 1, newData);
    }

    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 角色删除
 */
Mock.mock(`${VITE_BASE_URL}/system/role/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let errorMsg = '';
    if (Array.isArray(params)) {
        params.forEach((roleId) => {
            if (!errorMsg) {
                userList.forEach((item) => {
                    if (!errorMsg) {
                        const roleIds = item.userRole.split(',');
                        if (roleIds.includes(roleId + '')) {
                            errorMsg = `用户【${item.userName}】存在该角色，不可以删除！`;
                        }
                    }
                });
            }
        });


        if (!errorMsg) {
            params.forEach((roleId) => {
                const index = roleList.findIndex((t) => t.roleId == roleId);
                if (index != -1) {
                    roleList.splice(index, 1);
                }
            });
        }
    }
    if (errorMsg) return getErrorReturn(errorMsg);

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

/**
 * 角色管理--详情
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/role/detail` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = roleList.find((t) => t.roleId == params.roleId);
    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

/**
 * 角色管理--角色权限
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/role/auths` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = roleList.find((t) => t.roleId == params.roleId);

    if (item && Array.isArray(item.auths)) {
        item.auths.forEach((it) => {
            if (it.dataPerType == 'customUser' && it.dataPerIds) {
                const dataPerIds = it.dataPerIds.split(',');
                const userNames = [];
                dataPerIds.forEach((userId) => {
                    const user = userList.find((t) => t.userId == userId);
                    if (user) userNames.push(user.userName);
                });
                it.dataPerIdsText = userNames.join(',');
            }
        });
    }
    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

/**
 * 角色管理--权限保存
 */
Mock.mock(`${VITE_BASE_URL}/system/role/save/auths`, 'post', (options) => {
    const params = JSON.parse(options.body);

    const newData = roleList.find((t) => t.roleId == params.roleId);
    if (!newData) {
        return getErrorReturn(`权限保存失败，记录不存在！`);
    }

    Object.assign(newData, params);
    newData.updateTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');

    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

