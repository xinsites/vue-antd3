import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, isDef, parseQueryString, rowId} from "xin-antd3-ui";
import {getWhereTreeList} from "@/mock/mock-util";
import {menuList} from "@/mock/common/dict-mock";

/**
 * 菜单管理--查询列表--全部加载
 */
Mock.mock(`${VITE_BASE_URL}/system/menu/list`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let list = menuList.filter((item) => item.menuType != 'button');
    if (params.where?.length > 0) {
        list = getWhereTreeList(list, params, 'menuId');
    }
    list.forEach((item) => {
        if (isDef(item.icon)) {
            const index = menuList.findIndex((t) => t.pid == item.menuId);
            item.icon = index != -1 ? 'FolderOutlined' : 'FileOutlined'
        }

        item.buttons = menuList.filter((it) => it.pid == item.menuId && it.menuType == 'button').map((it) => {
            return {
                menuId: it.menuId,
                menuName: it.menuName,
            }
        });
        item.buttonsText = item.buttons.map((it) => it.menuName).join(',');
    });

    return {
        code: 0,
        message: '操作成功',
        data: list,
    }
});

/**
 * 菜单管理--查询功能列表
 */
Mock.mock(`${VITE_BASE_URL}/system/menu/buttons`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let list = menuList.filter((item) => item.menuType == 'button' && item.pid == params.id);

    return {
        code: 0,
        message: '操作成功s',
        data: list,
    }
});

/**
 * 菜单管理--新增
 */
Mock.mock(`${VITE_BASE_URL}/system/menu/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.menuId = rowId(8, 1);
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if (isDef(newData.pid)) newData.pid = 0;

    menuList.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 菜单管理--修改
 */
Mock.mock(`${VITE_BASE_URL}/system/menu/edit`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    if (isDef(newData.pid)) newData.pid = 0;

    if (newData.pid == newData.menuId) {
        return {
            code: 1,
            message: `修改失败，该记录父结点不能为自己！`,
            data: null,
        };
    }

    const row = menuList.find((t) => t.menuId == newData.menuId);
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
 * 菜单管理--删除
 */
Mock.mock(`${VITE_BASE_URL}/system/menu/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let errorMsg = "";
    if (Array.isArray(params)) {
        params.forEach((menuId) => {
            if (!errorMsg) {
                const index = menuList.findIndex((t) => t.menuId == menuId);
                if (index !== -1) {
                    const pidIndex = menuList.findIndex((t) => t.pid == menuId);
                    if (pidIndex === -1) {
                        menuList.splice(index, 1);
                    } else {
                        errorMsg = `【${menuList[index].menuName}】无法删除，该记录有子结点！`
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
 * 菜单管理--详情
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/menu/detail` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = menuList.find((t) => t.menuId == params.menuId);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

/**
 * 菜单管理--排序
 */
Mock.mock(`${VITE_BASE_URL}/system/menu/sort`, 'post', (options) => {
    const params = JSON.parse(options.body);

    if (Array.isArray(params)) {
        params.forEach((item) => {
            const index = menuList.findIndex((t) => t.menuId == item.id);
            if (index != -1) {
                const newData = deepClone(menuList[index]);
                menuList.splice(index, 1);
                if (!isDef(item.pid)) newData.pid = item.pid;
                menuList.push(newData);
            }
        });
    }

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});
