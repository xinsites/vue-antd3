import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, parseQueryString, QueryParam, rowId} from "xin-antd3-ui";
import {getPageData, getWhereList} from "@/mock/mock-util";
import {deptList, roleList, userList} from "@/mock/common/dict-mock";

/**
 * 用户管理--分页列表
 */
Mock.mock(`${VITE_BASE_URL}/system/user/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(userList, params),
    };
});

/**
 * 用户管理--全部列表
 */
Mock.mock(`${VITE_BASE_URL}/system/user/list`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getWhereList(userList, params),
    };
});

/**
 * 用户管理--新增
 */
Mock.mock(`${VITE_BASE_URL}/system/user/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.userId = rowId(8, 1);
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    userList.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 用户管理--修改
 */
Mock.mock(`${VITE_BASE_URL}/system/user/edit`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.updateTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    const index = userList.findIndex((t) => t.userId == newData.userId);
    if (index != -1) {
        userList.splice(index, 1, newData);
    }

    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 用户管理--删除
 */
Mock.mock(`${VITE_BASE_URL}/system/user/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    if (Array.isArray(params)) {
        params.forEach((userId) => {
            const index = userList.findIndex((t) => t.userId == userId);
            if (index != -1) {
                userList.splice(index, 1);
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
 * 用户管理--详情
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/user/detail` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = userList.find((t) => t.userId == params.userId);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

/**
 * 用户管理--用户密码重置
 */
Mock.mock(`${VITE_BASE_URL}/system/user/password/reset`, 'post', (options) => {
    const params = JSON.parse(options.body);
    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

/**
 * 用户管理--用户权限
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/user/auth` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = userList.find((t) => t.userId == params.userId);
    if (item && item.userRole) {
        let auths = [];
        const roleIds = item.userRole.split(',');

        roleIds.forEach((roleId) => {
            const role = roleList.find((t) => t.roleId == roleId);
            if (role.superAdminer) item.superAdminer = true;
            if (role && Array.isArray(role.auths)) {
                role.auths.forEach((it) => {
                    const auth = auths.find((t) => t.menuId == it.menuId && t.dataPerType == it.dataPerType);
                    if (!auth) {
                        auths.push({...it});
                    } else if (auth.dataPerType && it.dataPerType) {
                        if ((it.dataPerType == 'customDept' || it.dataPerType == 'customUser') && it.dataPerIds) {
                            const dataPerIds = (auth.dataPerIds ? auth.dataPerIds + ',' : '') + it.dataPerIds;
                            auth.dataPerIds = Array.from(new Set(dataPerIds.split(','))).join(',');
                        }
                    }
                });
            }
        });
        auths.forEach((auth) => {
            if (auth.dataPerType == 'customDept' && auth.dataPerIds) {
                const dataPerIds = Array.from(new Set(auth.dataPerIds.split(',')));
                const deptNames = [];
                dataPerIds.forEach((deptId) => {
                    const dept = deptList.find((t) => t.deptId == deptId);
                    if (dept) deptNames.push(dept.deptName);
                });
                auth.dataPerIds = dataPerIds.join(',');
                auth.dataPerIdsText = deptNames.join(',');
            } else if (auth.dataPerType == 'customUser' && auth.dataPerIds) {
                const dataPerIds = Array.from(new Set(auth.dataPerIds.split(',')));
                const userNames = [];
                dataPerIds.forEach((userId) => {
                    const user = userList.find((t) => t.userId == userId);
                    if (user) userNames.push(user.userName);
                });
                auth.dataPerIds = dataPerIds.join(',');
                auth.dataPerIdsText = userNames.join(',');
            }
        });
        item.auths = auths;
    }
    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});


