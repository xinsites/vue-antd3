import {defineStore} from 'pinia';
import {DeptType, ROOT_PATH, ROOT_ROUTE_NAME, UserInfoType} from "xin-antd3-ui";
import siderRoutes from "../../router/static";
import {getAsyncRoutesByListMenus} from "../../router/dynamics";
import {useLayoutStore} from "./layout-store";
import router from '../../router';
import {RouteRecordRaw} from "vue-router";
import {getRouteMenus, hiddenRoutesToRoot} from "xin-antd3-ui/es/utils/menu-util";
import {getCurDeptId, setCurDeptId, setLoginUserDeptDict} from "@/utils/user-util";
import {getLoginUserAPI} from "@/api/common/login-api";
import {fileUrl} from "@/utils/comm-util";

export interface UserState {
    info: UserInfoType | null;  // 当前登录用户的信息
    deptId: string | number | null;    // 当前登录用户启用的部门，多个部门默认第一个部门
    menus: any[] | null;        // 动态加载路由时，当前登录用户的菜单列表(后端返回)
    auths: string[];            // 用户菜单、按钮权限标识列表
    roleAuths: string[];        // 用户角色权限标识列表
    superAdminer: boolean;      //是否超级管理员(=true时，auths、roleAuths可以为空)
    routeLoaded: boolean;       //路由已加载标识
    asyncRoutes: boolean;       //异步动态加载路由，true:动态路由，false:静态路由
}

/**
 * 登录用户store
 */
export const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        info: null,             // 当前登录用户的信息
        deptId: null,           // 当前登录用户启用的部门，多个部门默认第一个部门
        menus: null,            // 动态加载路由时，当前登录用户的菜单列表(后端返回)
        auths: [],              // 用户组件权限标识列表
        roleAuths: [],          // 用户角色权限标识列表
        superAdminer: false,    //是否超级管理员(=true时，auths、roleAuths可以为空)
        routeLoaded: false,     //路由已加载标识
        asyncRoutes: false,     //异步动态加载路由，true:动态路由，false:静态路由
    }),
    actions: {
        /**
         * 请求用户信息，加载路由
         */
        async loadRoute() {
            try {
                if (router.hasRoute(ROOT_ROUTE_NAME)) {
                    router.removeRoute(ROOT_ROUTE_NAME);  //避免重新登录时重复注册动态路由
                }

                const result = await getLoginUserAPI();
                if (!result) return {};

                if (this.asyncRoutes) {
                    router.addRoute(getAsyncRoutesByListMenus(result.menus) as RouteRecordRaw);     //后端菜单是列表
                    // router.addRoute(getAsyncRoutesByTreeMenus(result.treeMenus) as RouteRecordRaw); //后端菜单是树形列表
                } else {
                    hiddenRoutesToRoot(siderRoutes);
                    router.addRoute(siderRoutes as RouteRecordRaw);
                }

                this.setUserInfo(result);

                const allRoutes = router.getRoutes() as RouteRecordRaw[];  //所有路由

                const layoutStore = useLayoutStore();
                const {menus, tabs} = getRouteMenus(allRoutes, layoutStore.homePath, layoutStore.fixedPaths);

                this.setRouteLoaded(true);
                return {menus, tabs};
            } catch (e) {
                console.error('请求失败=============', e);
            }
            return {};
        },
        /**
         * 登录成功后返回了用户菜单、权限信息，调用此方法加载路由
         * 不要在登录时返回用户信息，如果用户权限变更，只有重新登录才能看到更新后的相关菜单栏目
         */
        getSiderMenus() {
            if (router.hasRoute(ROOT_ROUTE_NAME)) {
                router.removeRoute(ROOT_ROUTE_NAME);  //避免重新登录时重复注册动态路由
            }

            const route = (this.asyncRoutes ? getAsyncRoutesByListMenus(this.menus) : siderRoutes) as RouteRecordRaw; //this.menus是列表
            // const route = (this.asyncRoutes ? getAsyncRoutesByTreeMenus(this.menus) : siderRoutes) as RouteRecordRaw; //this.menus是树形列表

            router.addRoute(route);
            const allRoutes = router.getRoutes() as RouteRecordRaw[];  //所有路由

            const layoutStore = useLayoutStore();
            const {menus, tabs} = getRouteMenus(allRoutes, layoutStore.homePath, layoutStore.fixedPaths);
            this.setRouteLoaded(true);
            return {menus, tabs};
        },
        /**
         * 设置用户信息，登录时返回了用户信息、或者getUserInfo中调用
         * @param user 后端返回的用户数据
         */
        setUserInfo(user: any) {
            if (user) {
                this.info = {
                    userId: user.userId,
                    loginName: user.loginName,
                    userName: user.userName,
                    headPhoto: fileUrl(user.headPhoto),
                    userSex: user.userSex,
                    email: user.email,
                    phone: user.phone,
                    employeeId: user.employeeId,
                    remark: user.remark,
                    depts: user.depts as DeptType[] || [],
                };

                this.menus = user.menus || [];  //后端菜单列表
                this.auths = user.auths || [];  //按钮操作权限列表
                this.roleAuths = user.roleAuths || [];
                setLoginUserDeptDict(user.depts);
                if (user.depts?.length > 0) {
                    const deptId = getCurDeptId() || 0;
                    const dept = user.depts?.find((item) => item.deptId == deptId);
                    if (!dept) this.setDeptId(user.depts[0].deptId);
                    else this.setDeptId(deptId);
                } else {
                    this.setDeptId(0);
                }
                this.superAdminer = user.superAdminer === true;  //是否超级管理员
            }
        },
        /**
         * 更新用户信息
         */
        updateUserInfo(value) {
            this.info = Object.assign(this.info, value);
        },
        /**
         * 获取用户信息
         */
        getUserInfo() {
            return (this.info || {}) as UserInfoType;
        },
        /**
         * 设置当前用户部门
         */
        setDeptId(deptId) {
            this.deptId = deptId;
            setCurDeptId(deptId);
        },
        /**
         * 设置路由已加载标识
         */
        setRouteLoaded(routeLoaded) {
            this.routeLoaded = routeLoaded;
        },
    },
});
