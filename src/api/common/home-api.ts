import request from '@/utils/request';
import type {ApiResult} from '@/model/api-model';

/**
 * 首页最新动态信息
 */
export async function homeNewsAPI() {
    const res = await request.post<ApiResult<unknown>>('/home/news', {});
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 首页待办任务信息
 */
export async function homeTasksAPI() {
    const res = await request.post<ApiResult<unknown>>('/home/tasks', {});
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 首页项目进度信息
 */
export async function homeProjectsAPI() {
    const res = await request.post<ApiResult<Object>>('/home/projects', {});
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}


