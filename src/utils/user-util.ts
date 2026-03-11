import {LOGOUT_API, TOKEN_CUR_DEPT_ID, TOKEN_STORE_NAME} from "@/config/common";
import router from '../router';
import {DeptType, Md5, transformDictData, UserInfoType} from "xin-antd3-ui";
import {useDictStore} from "@/store/modules/dict-store";
import {useUserStore} from "@/store/modules/user-store";
import {useThemeStore} from "@/store/modules/theme-store";
import {encryptText} from "@/utils/comm-util";
import {httpRequest} from "@/utils/request";

/**
 * 获取缓存token
 */
export function getToken(): string | null {
    const token = localStorage.getItem(TOKEN_STORE_NAME);
    if (!token) {
        return sessionStorage.getItem(TOKEN_STORE_NAME);
    }
    return token;
}

/**
 * 设置缓存token
 * @param token token
 * @param remember 是否永久存储
 */
export function setToken(token?: string, remember?: boolean) {
    removeToken();
    if (token) {
        useUserStore().setRouteLoaded(false);
        if (remember) {
            localStorage.setItem(TOKEN_STORE_NAME, token);
        } else {
            sessionStorage.setItem(TOKEN_STORE_NAME, token);
        }
    }
}

/**
 * 移除缓存token
 */
export function removeToken() {
    localStorage.removeItem(TOKEN_STORE_NAME);
    sessionStorage.removeItem(TOKEN_STORE_NAME);
}

/**
 * 退出登录
 * @param redirect 登录后跳转的地址
 */
export async function logout(redirect?: string) {
    if (LOGOUT_API) httpRequest(LOGOUT_API, 'GET', {});
    setTimeout(() => {
        removeToken();
        useThemeStore().setLockScreen(false);
        useUserStore().setRouteLoaded(false);
        router.push({
            path: '/login',
            query: redirect ? {redirect} : void 0,
        });
        // location.replace("/" + (redirect ? "?redirect=" + redirect : ""));  //避免重新登录时重复注册动态路由
    }, 50);
}

/**
 * 设置登录用户部门数据字典信息
 * @param redirect 登录后跳转的地址
 */
export function setLoginUserDeptDict(depts?: DeptType[]) {
    const dictStore = useDictStore();
    const deptDict = transformDictData(depts || [], {value: 'deptId', label: 'deptName'});
    dictStore.setDictInfo('LOGIN_DEPT', deptDict);
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
    const userStore = useUserStore();
    return userStore.info as UserInfoType;
}

/**
 * 获取登录用户Id
 */
export function loginUserId() {
    const userStore = useUserStore();
    const loginUser = userStore.info as UserInfoType;
    return loginUser?.userId;
}

/**
 * 获取登录用户部门Id
 */
export function loginDeptId() {
    const userStore = useUserStore();
    const loginUser = userStore.info as UserInfoType;
    return userStore.deptId;
}

/**
 * 获取登录用户当前部门Id
 */
export function getCurDeptId() {
    return localStorage.getItem(TOKEN_CUR_DEPT_ID);
}

/**
 * 设置登录用户当前部门Id
 */
export function setCurDeptId(deptId) {
    localStorage.setItem(TOKEN_CUR_DEPT_ID, deptId + '');
}

/**
 * 获取用户登录第一层加密密码
 */
export function getUserPassword(passWord, code?) {
    if (!passWord) return passWord;
    const md5Pwd = Md5(passWord)?.toUpperCase();
    passWord = Md5(md5Pwd)?.toLowerCase();
    return encryptText(passWord, code);
}
