import request from '@/utils/request';
import type {ApiResult} from '@/model/api-model';
import {PageResult} from "@/model/api-model";
import {LoginParam} from '@/model/system/user-model';
import {setToken} from "@/utils/user-util";


/**
 * 登录
 */
export async function loginAPI(data: LoginParam) {
    data.tenantId = 2; // 租户id
    const res = await request.post<ApiResult<string>>('/login/withPwd', data);
    if (res.data.code === 0) {
        setToken(res.data.data, data.remember);
        return res.data.message;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 登录退出
 */
export async function logoutAPI() {
    const res = await request.get<ApiResult<string>>('/user/logout', {});
    return Promise.reject(new Error(res.data.message));
}

/**
 * 登录验证码
 */
export async function loginCaptchaAPI() {
    const res = await request.post<ApiResult<string>>('/login/captcha');
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 获取当前登录的用户信息、菜单、权限、角色
 */
export async function getLoginUserAPI() {
    const res = await request.post<ApiResult<any>>('/user/info');
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 登录用户锁屏解锁
 */
export async function LoginUserUnlockAPI(params) {
    const res = await request.get<ApiResult<String>>('/user/unlock', {params});
    // const res = await request.post<ApiResult<String>>('/user/unlock', params, {headers: {'Content-Type': CONTENTTYPE.FORM}});
    if (res.data.code === 0) {
        return res.data.message ?? '解锁成功';
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 登录用户修改密码
 */
export async function updatePasswordAPI(params) {
    const res = await request.post<ApiResult<String>>('/user/update/password', params);
    if (res.data.code === 0) {
        return res.data.message ?? '修改成功';
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 登录用户修改用户信息
 */
export async function updateUserInfoAPI(params) {
    const res = await request.post<ApiResult<any>>('/user/update/info', params);
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 登录用户查询未读数量信息
 */
export async function getUnReadNumAPI() {
    const res = await request.post<ApiResult<any>>('/user/unread/num', {});
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 登录用户查询未读通知
 */
export async function getUnreadNoticeAPI() {
    const res = await request.post<ApiResult<any>>('/user/unread/notice', {});
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 分页查询我的待办
 */
export async function getMyTodoPageAPI(params) {
    params.type = 'todo';
    const res = await request.post<PageResult<any>>('/user/my/todo', params);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 分页查询我的已办
 */
export async function getMyDonePageAPI(params) {
    params.type = 'done';
    const res = await request.post<PageResult<any>>('/user/my/todo', params);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 分页查询我的申请
 */
export async function getMyApplyPageAPI(params) {
    params.type = 'apply';
    const res = await request.post<PageResult<any>>('/user/my/todo', params);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 分页查询我的抄送
 */
export async function getMySendPageAPI(params) {
    params.type = 'send';
    const res = await request.post<PageResult<any>>('/user/my/todo', params);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 分页查询我的邮件
 */
export async function getMyMailPageAPI(params) {
    const res = await request.post<PageResult<any>>('/user/my/mail', params);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 分页查询系统通知
 */
export async function getMyNoticePageAPI(params) {
    const res = await request.post<PageResult<any>>('/user/my/notice', params);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}
