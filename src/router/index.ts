import {createRouter, createWebHashHistory, createWebHistory, RouterOptions} from 'vue-router';
import {commonRoutes} from "./common";
import {useUserStore} from "../store/modules/user-store";
import {useLayoutStore} from "../store/modules/layout-store";
import {NProgress, ROOT_PATH} from 'xin-antd3-ui'
import {LOGIN_IGNORE, LOGIN_PATH} from "@/config/common";
import {getToken} from "@/utils/user-util";

NProgress.configure({
    speed: 200,
    minimum: 0.02,
    //trickleRate: 0.1,
    trickleSpeed: 200,
    showSpinner: false,
});

const router = createRouter({
    routes: commonRoutes,
    // history: createWebHistory(),  //history 模式
    history: createWebHashHistory(), //hash 模式
    scrollBehavior() {
        return {top: 0};
    },
    //禁止浏览器上一步下一步
    // scrollBehavior: () => {
    //   history.pushState(null, null, document.URL);
    // },
} as RouterOptions);

// 路由守卫
router.beforeEach(async (to, from) => {
    if (!getToken()) {
        if (!LOGIN_IGNORE.includes(to.path)) {
            return {
                path: '/login',
                query: to.path === ROOT_PATH ? {} : {redirect: to.path},
            };
        }
        return;
    }
    if (to.path == LOGIN_PATH) return;

    const userStore = useUserStore();
    if (!userStore.routeLoaded) NProgress.start();

    if (!userStore.routeLoaded) {
        const {menus, tabs} = await userStore.loadRoute(); //后端单独提供获取用户菜单、权限信息接口
        // const {menus, tabs} = userStore.getSiderMenus();   //登录成功后返回了用户菜单、权限信息
        if (menus) {
            const layoutStore = useLayoutStore();
            layoutStore.setMenus(menus);
            layoutStore.setTabs(tabs);
            return {...to, replace: true};
        }
    }
});

export default router;
