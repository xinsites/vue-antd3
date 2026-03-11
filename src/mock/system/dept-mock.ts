import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, isDef, parseQueryString, rowId, transformDictData, transformTreeList} from "xin-antd3-ui";
import {getWhereTreeList} from "@/mock/mock-util";
import {deptList} from "@/mock/common/dict-mock";

/**
 * 部门管理--查询列表--全部加载
 */
Mock.mock(`${VITE_BASE_URL}/system/dept/list`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let list = undefined;
    if (params.where?.length > 0) {
        list = getWhereTreeList(deptList, params, 'deptId');
    }

    return {
        code: 0,
        message: '操作成功',
        data: list ?? deepClone(deptList),
    }
});

/**
 * 部门管理--查询树列表--全部加载
 */
Mock.mock(`${VITE_BASE_URL}/system/dept/tree`, 'post', (options) => {
    const params = JSON.parse(options.body);
    return {
        code: 0,
        message: '操作成功',
        data: transformTreeList(deepClone(deptList), 0, 'deptId', 'pid'),
    }
});

/**
 * 部门管理--新增
 */
Mock.mock(`${VITE_BASE_URL}/system/dept/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.deptId = rowId(8, 1);
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if (isDef(newData.pid)) newData.pid = 0;

    deptList.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 部门管理--修改
 */
Mock.mock(`${VITE_BASE_URL}/system/dept/edit`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    if (isDef(newData.pid)) newData.pid = 0;

    if (newData.pid == newData.deptId) {
        return {
            code: 1,
            message: `修改失败，该记录父结点不能为自己！`,
            data: null,
        };
    }

    const row = deptList.find((t) => t.deptId == newData.deptId);
    if (row) {
        Object.assign(row, newData);
    }

    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 部门管理--修改
 */
Mock.mock(`${VITE_BASE_URL}/system/dept/update/member`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const row = deptList.find((t) => t.deptId == params.deptId);
    if (row) {
        if (params.manType == 1) {
            row.leader = params.userIds;
            row.leaderText = params.userTexts;
        } else if (params.memberType == 2) {
            row.director = params.userIds;
            row.directorText = params.userTexts;
        }
    }

    return {
        code: 0,
        message: '操作成功',
        data: row,
    };
});

/**
 * 部门管理--删除
 */
Mock.mock(`${VITE_BASE_URL}/system/dept/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let errorMsg = "";
    if (Array.isArray(params)) {
        params.forEach((deptId) => {
            if (!errorMsg) {
                const index = deptList.findIndex((t) => t.deptId == deptId);
                if (index !== -1) {
                    const pidIndex = deptList.findIndex((t) => t.pid == deptId);
                    if (pidIndex === -1) {
                        deptList.splice(index, 1);
                    } else {
                        errorMsg = `【${deptList[index].deptName}】无法删除，该记录有子结点！`
                    }
                }
            }
        });
    }

    if (errorMsg) {
        return {
            code: 1,
            message: errorMsg,
            data: null,
        };
    }

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

/**
 * 部门管理--详情
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/dept/detail` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = deptList.find((t) => t.deptId == params.deptId);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

/**
 * 部门管理--排序
 */
Mock.mock(`${VITE_BASE_URL}/system/dept/sort`, 'post', (options) => {
    const params = JSON.parse(options.body);

    if (Array.isArray(params)) {
        params.forEach((item) => {
            const index = deptList.findIndex((t) => t.deptId == item.id);
            if (index != -1) {
                const newData = deepClone(deptList[index]);
                deptList.splice(index, 1);
                newData.pid = item.pid;
                deptList.push(newData);
            }
        });
    }

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});
