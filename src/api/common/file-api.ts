import request from '@/utils/request';
import type {ApiResult} from '@/model/api-model';
import {downloadFile, httpShowFile, isExcelWordFile, printFile} from "xin-antd3-ui";
import {message} from "ant-design-vue/es";
import {previewFile} from "@/utils/comm-util";

/**
 * 文件上传通用接口
 * @return 返回上传文件的虚拟路径
 */
export async function uploadFileAPI(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await request.post<ApiResult<String>>('/upload', formData);
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 上传base64文件
 * @return 返回上传文件的虚拟路径
 */
export async function uploadBase64FileAPI(base64: string, fileName?: string) {
    const formData = new FormData();
    formData.append('base64', base64);
    formData.append('fileName', fileName ?? '');
    const res = await request.post<ApiResult<String>>('/upload/base64', formData);
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 下载文件
 */
export async function downLoadFileAPI(visualPath, fileName?) {
    const res = await request.get<ApiResult<String>>(`/file/blob/${visualPath}`, {responseType: 'blob'});
    if (res.data.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result == 'string') {
                const json = JSON.parse(reader.result);
                message.error(json?.message || '文件下载失败！');
            }
        };
        reader.readAsText(res.data);
    } else {
        if (res.headers['content-disposition']) {
            const name = res.headers['content-disposition'].split('filename=').pop(); //后端文件名
            downloadFile(res.data, decodeURI(fileName || name), 'application/octet-stream');
        } else if (typeof res.data == 'string') {
            const json = JSON.parse(res.data);
            message.error(json?.message || '文件下载失败！');
        }
    }
}

/**
 * 文件查看
 */
export async function showFileAPI(visualPath) {
    if (isExcelWordFile(visualPath)) {
        return previewFile(visualPath); //excel、word选择用微软的在线预览功能
    }
    const res = await request.get<ApiResult<String>>(`/file/blob/${visualPath}`, {responseType: 'blob'});
    if (res.data.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result == 'string') {
                const json = JSON.parse(reader.result);
                message.error(json?.message || '文件查看失败！');
            }
        };
        reader.readAsText(res.data);
    } else {
        if (res.headers['mime-type']) {
            httpShowFile(res.data, res.headers['mime-type']);
        } else if (typeof res.data == 'string') {
            const json = JSON.parse(res.data);
            message.error(json?.message || '文件查看失败！');
        }
    }
}

/**
 * 文件打印
 */
export async function printFileAPI(visualPath) {
    const res = await request.get<ApiResult<String>>(`/file/blob/${visualPath}`, {responseType: 'blob'});
    if (res.data.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result == 'string') {
                const json = JSON.parse(reader.result);
                message.error(json?.message || '文件打印失败！');
            }
        };
        reader.readAsText(res.data);
    } else {
        if (res.headers['mime-type']) {
            printFile(res.data, res.headers['mime-type']);
        } else if (typeof res.data == 'string') {
            const json = JSON.parse(res.data);
            message.error(json?.message || '文件打印失败！');
        }
    }
}
