import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, getParentIdsByTreeList, isDef, parseQueryString, rowId, transformTreeList} from "xin-antd3-ui";
import {getErrorReturn, getPageData, isExistVal} from "@/mock/mock-util";
import {areaList, readerAreaJson} from "@/mock/common/dict-mock";

/**
 * 行政区域--树列表--懒加载
 */
Mock.mock(`${VITE_BASE_URL}/system/area/tree`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let result = {
        code: 0,
        message: 'success',
    };
    readerAreaJson();
    if (params.ids) {
        const ids = areaList.filter((item) => item.pid == '0').map((item) => item.areaId);
        const strArray = params.ids.toString().split(',');
        const parentIds = getParentIdsByTreeList(areaList, strArray, true, 'areaId', 'pid');
        const allIds = [...parentIds, ...ids];
        result['data'] = areaList.filter((item) => allIds.includes(item.areaId) === true);
        result['data'] = transformTreeList(result['data'], '0', 'areaId', 'pid');
    } else {
        result['data'] = areaList.filter((item) => item.pid == (params.parentId ?? '0'));
    }

    result['data'].forEach((item) => {
        const index = areaList.findIndex((t) => t.pid == item.areaId);
        item.isLeaf = index == -1;  //懒加载需要添加isLeaf标识
    });
    return result;
});

/**
 * 行政区域--分页列表查询
 */
Mock.mock(`${VITE_BASE_URL}/system/area/page`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let result = {
        code: 0,
        message: 'success',
    };
    readerAreaJson();

    // const list = areaList.filter((item) => item.pid == (params.parentId ?? '0'));
    result['data'] = getPageData(areaList, params);

    return result;
});

/**
 * 行政区域--新增
 */
Mock.mock(`${VITE_BASE_URL}/system/area/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.areaId = rowId(8, 1);
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if (isDef(newData.pid)) newData.pid = '0';
    if (isExistVal(areaList, 'areaId', 'areaCode', newData)) {
        return getErrorReturn(`新增失败，区域编号【${newData.areaCode}】已经存在！`);
    }
    newData.areaId = newData.areaCode;
    areaList.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 行政区域--修改
 */
Mock.mock(`${VITE_BASE_URL}/system/area/edit`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    if (isDef(newData.pid)) newData.pid = '0';
    if (isExistVal(areaList, 'areaId', 'areaCode', newData)) {
        return getErrorReturn(`修改失败，区域编号【${newData.areaCode}】已经存在！`);
    }

    if (newData.pid == newData.areaId) {
        return {
            code: 1,
            message: `修改失败，该记录父结点不能为自己！`,
            data: null,
        };
    }

    const row = areaList.find((t) => t.areaId == newData.areaId);
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
 * 行政区域--删除
 */
Mock.mock(`${VITE_BASE_URL}/system/area/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    let errorMsg = "";
    const index = areaList.findIndex((t) => t.areaId == params.areaId);
    if (index !== -1) {
        const pidIndex = areaList.findIndex((t) => t.pid == params.areaId);
        if (pidIndex === -1) {
            areaList.splice(index, 1);
        } else {
            errorMsg = `【${areaList[index].name}】无法删除，该记录有子结点！`
        }
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
 * 行政区域--详情
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/area/detail` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = areaList.find((t) => t.areaId == params.areaId);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

/**
 * 行政区域--排序
 */
Mock.mock(`${VITE_BASE_URL}/system/area/sort`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const indexs = [];
    if (Array.isArray(params)) {
        params.forEach((item) => {
            const index = areaList.findIndex((t) => t.areaId == item.id);
            if (index != -1) {
                indexs.push((index));
            }
        });
    }

    const sorts = deepClone(indexs).sort(sortChange);
    if (indexs.length == sorts.length) {
        let index1 = -1;
        let index2 = -1;

        for (let i = 0; i < indexs.length; i++) {
            if (indexs[i] != sorts[i]) {
                if (index1 == -1) index1 = indexs[i];
                else if (index2 == -1) index2 = indexs[i];
            }
        }
        [areaList[index1], areaList[index2]] = [areaList[index2], areaList[index1]];
    }

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

function sortChange(a, b) {
    return a - b;
}
