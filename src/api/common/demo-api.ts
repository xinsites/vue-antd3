import request from '@/utils/request';
import type {ApiResult, PageResult} from '@/model/api-model';
import {User} from '@/model/system/user-model';
import {QueryParam} from "xin-antd3-ui";

/**
 * 用户分页查询
 */
export async function getUserPageAPI(params?: QueryParam) {
    const res = await request.post<PageResult<User>>('/demo/user/page', params);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 用户列表查询
 */
export async function getUserListAPI(params?: QueryParam) {
    const res = await request.post<ApiResult<User[]>>('/demo/user/list', params);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 查询部门树列表
 */
export async function getDeptListAPI(params?: QueryParam) {
    const res = await request.post<ApiResult<any[]>>('/demo/dept/list', params);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}


