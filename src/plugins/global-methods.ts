import {App} from 'vue';
import {i18n, locale} from '@/utils/i18n-util';
import {loginDeptId, loginUserId} from "@/utils/user-util";
import {hasAnyAuth, hasAuth} from "@/plugins/authority";

/**
 * 注册全局方法
 * @param app
 */
export function setupGlobalMethods(app: App) {
    app.config.globalProperties.i18n = i18n;        //国际化全局挂载
    app.config.globalProperties.locale = locale;    //国际化全局挂载
    app.config.globalProperties.loginUserId = loginUserId;  //登录用户Id，方便界面获取
    app.config.globalProperties.loginDeptId = loginDeptId;  //登录用户部门Id，方便界面获取
    app.config.globalProperties.$auth = hasAuth;  //是否有全部权限
    app.config.globalProperties.$anyAuth = hasAnyAuth;  //是否有任意功能权限
}
