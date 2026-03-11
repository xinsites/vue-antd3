import request from '@/utils/request';
import type { ApiResult } from '@/model/api-model';

/**
 * 获取数据字典信息
 */
export async function getDictInfoAPI(params) {
  const res = await request.post<ApiResult<Object>>('dict/list', params);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取系统数据字典信息
 */
export async function getSysDictAPI(url, params) {
  const res = await request.post<ApiResult<Object>>(url, params);
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
