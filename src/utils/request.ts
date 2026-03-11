/**
 * axios 实例
 */
import axios, {AxiosRequestConfig} from 'axios';
import type {AxiosResponse} from 'axios';
import router from '@/router';
import type {ApiResult} from '@/model/api-model';
import {getToken, logout, removeToken} from '@/utils/user-util';
import {Modal} from 'ant-design-vue';
import {LOGIN_API, LOGIN_PATH, LOGOUT_API, RELOGIN_CODES, TOKEN_HEADER_NAME, VITE_BASE_URL} from '@/config/common';

const service = axios.create({
    baseURL: VITE_BASE_URL,
});

// http method
export const METHOD = {
    GET: 'get',
    DELETE: 'delete',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    POSTFORM: 'postForm',
};

// http contentType
export const CONTENTTYPE = {
    JSON: 'application/json; charset=UTF-8',
    FORM: 'application/x-www-form-urlencoded',
};

/**
 * 添加请求头拦截器
 */
service.interceptors.request.use(
    (config) => {
        // 添加 token 到 header
        const token = getToken();
        if (token && config.headers) {
            config.headers[TOKEN_HEADER_NAME] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

//状态过期拦截次数
const expire = {count: 0};

/**
 * 当前浏览器地址path
 */
function getRoutePath() {
    // const currentPath = unref(router.currentRoute).path;  //路由守卫中方法调用，反映的是 Vue Router 解析前的路径
    const currentPath = location.hash ? location.hash.substring(1) : location.pathname;  //反映的是浏览器地址栏的实际 URL
    return currentPath || unref(router.currentRoute).path;
}

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
    (res: AxiosResponse<ApiResult<unknown>>) => {
        const code = res.data?.code;
        if (res.config.url == LOGIN_API || res.config.url == LOGOUT_API) {
            return res;
        }
        if (RELOGIN_CODES.includes(code)) {
            const currentPath = getRoutePath();
            if (expire.count == 0 && currentPath.indexOf(LOGIN_PATH) == -1) {
                expire.count = expire.count + 1; //防止多次弹窗
                Modal.destroyAll();
                Modal.info({
                    title: '系统提示',
                    content: res.data.message || '请退出重新登录!',
                    okText: '重新登录',
                    onOk: () => {
                        expire.count = 0;
                        logout(code == 1001 ? currentPath : '');
                    },
                });
            }
            return Promise.reject(new Error(''));
            // return Promise.reject(new Error(res.data.message));
        }
        return res;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default service;

/**
 * 统一请求处理
 * @param url     请求地址
 * @param method  请求方法
 * @param params  请求参数
 * @param successCall 请求成功回调，返回的是业务数据
 * @param failCall    请求失败回调，返回的是响应数据
 */
export async function httpRequest(url, method = 'post', params, successCall = null, failCall = null) {
    const axiosRequestConfig: any = {url: url, method: method};
    if (['get', 'delete'].includes(method.toLowerCase())) {
        axiosRequestConfig.params = params;
    } else {
        axiosRequestConfig.data = params;
    }
    return $request(axiosRequestConfig, successCall, failCall);
}

/**
 * 统一请求处理
 * @param url     请求地址
 * @param method  请求方法
 * @param params  请求参数
 * @param loading  请求状态
 * @param successCall 请求成功回调，返回的是业务数据
 * @param failCall    请求失败回调，返回的是响应数据
 */
export async function axiosRequest(url, method = 'post', params, loading, successCall = null, failCall = null) {
    const axiosRequestConfig: any = {url: url, method: method, loading: loading};
    if (['get', 'delete'].includes(method.toLowerCase())) {
        axiosRequestConfig.params = params;
    } else {
        axiosRequestConfig.data = params;
    }
    return $request(axiosRequestConfig, successCall, failCall);
}

/**
 * 统一请求处理
 * @param config  配置参数
 * @param successCall 请求成功回调，返回的是业务数据
 * @param failCall    请求失败回调，返回的是响应数据
 */
export async function $request(config: AxiosRequestConfig, successCall = null, failCall = null) {
    if (config['loading'] && isRef(config['loading'])) config['loading'].value = true;

    return new Promise((resolve, reject) => {
        service
            .request<ApiResult<Object>>(config)
            .then((res) => {
                if (config['loading'] && isRef(config['loading'])) config['loading'].value = false;

                const code = res.data?.code;
                if (RELOGIN_CODES.includes(code)) {
                    return setTimeout(resolve, 10); //中断promise链，响应拦截器已处理
                }

                //按回调方法处理请求结果
                if (typeof successCall === 'function') {
                    if (code === 0) {
                        successCall(res.data?.data);
                    } else if (typeof failCall === 'function') {
                        failCall(new Error(res.data?.message || '请求出错！')); //请求失败返回
                    }
                    setTimeout(resolve, 10); //中断promise链
                } else {
                    if (code === 0) {
                        resolve(res.data?.data);
                    } else {
                        reject(new Error(res.data?.message || '请求出错！')); //请求失败返回
                    }
                }
            })
            .catch((e: Error) => {
                if (config['loading'] && isRef(config['loading'])) config['loading'].value = false;

                if (expire.count > 0) return; //响应拦截器已处理
                if (typeof successCall === 'function' && typeof failCall === 'function') {
                    failCall(new Error(e?.message || '请求出错！')); //请求失败返回
                    setTimeout(resolve, 10); //中断promise链
                } else {
                    reject(new Error(e?.message || '请求出错！')); //请求失败返回
                }
            });
    });
}
