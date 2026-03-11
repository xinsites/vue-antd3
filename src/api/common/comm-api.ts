import request from '@/utils/request';
import type {ApiResult, PageResult} from '@/model/api-model';
import {SortParam} from "xin-antd3-ui";

/**
 * 获取分页信息
 */
export async function getPageAPI(url, params) {
    const res = await request.post<PageResult<Object>>(url, params);
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 获取列表信息
 */
export async function getListAPI(url, params) {
    const res = await request.post<ApiResult<Object>>(url, params);
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 删除列表记录
 */
export async function deleteListAPI(url: string, ids: string[] | number[]) {
    const res = await request.post<ApiResult<boolean>>(url, ids);
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 排序列表记录
 */
export async function sortListAPI(url: string, data: SortParam[]) {
    const res = await request.post<ApiResult<boolean>>(url, data);
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 保存编辑记录信息(主键 > 0：修改操作；主键 < 0：新增操作)
 * @return 返回后端保存后的表记录信息(新增时，记录Id)
 */
export async function saveRecordAPI(url: string, formData: object) {
    const res = await request.post<ApiResult<object>>(url, formData);
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 列表信息导出
 */
export async function exportAPI(url, params) {
    const res = await request.post<ApiResult<Object>>(url, params);
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 列表信息导入
 */
export async function importAPI(url, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await request.post<ApiResult<Object>>(url, formData);
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}
