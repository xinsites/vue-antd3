import PageLayout from '../../layout/index.vue';
import {ROOT_PATH, MENU_CONFIG, ROOT_ROUTE_NAME} from "xin-antd3-ui";
import {menuListToRoutes, menuTreeToRoutes} from "xin-antd3-ui/es/utils/menu-util";

//懒加载views下所有vue文件
const modules = import.meta.glob('@/views/**/**.vue');

/**
 * 根据后端菜单数据列表，获取侧边栏动态路由
 * @param menus 菜单数据列表
 */
export function getAsyncRoutesByListMenus(listMenus: any[]) {
    const menuConfig = {...MENU_CONFIG}
    menuConfig.metaSaveKeys = ['menuId'];     //将menuId保存到meta中
    menuConfig.keepAliveFalsePaths = ['/no/cache'];  //不需要缓存的路由，给这些动态路由添加keepAlive: false
    // listMenus.forEach((item) => {
    //     if (item['menuType'] == 'button' && item['openType'] == 'tab') item['sign'] = true; //这里根据后端逻辑判断，按钮打开的选项卡页面加签名
    // })
    const routes = menuListToRoutes(listMenus, getComponent, 0, menuConfig);
    return {
        path: ROOT_PATH,
        name: ROOT_ROUTE_NAME, //避免重新登录时重复注册动态路由
        component: PageLayout,
        children: routes,  //侧边栏动态路由
    };
}

/**
 * 根据后端菜单树形列表，获取侧边栏动态路由
 * @param menus 菜单树形列表
 */
export function getAsyncRoutesByTreeMenus(treeMenus: any[]) {
    const menuConfig = {...MENU_CONFIG}
    menuConfig.metaSaveKeys = ['menuId'];  //将menuId保存到meta中
    menuConfig.keepAliveFalsePaths = ['/no/cache'];  //不需要缓存的路由，给这些动态路由添加keepAlive: false
    const routes = menuTreeToRoutes(treeMenus, getComponent, menuConfig); //menuKey.pid无用，使用children字段
    return {
        path: ROOT_PATH,
        name: ROOT_ROUTE_NAME, //避免重新登录时重复注册动态路由
        component: PageLayout,
        children: routes,  //侧边栏动态路由
    };
}

/**
 * 解析路由组件
 * @param component 组件名称
 */
function getComponent(component?: string) {
    if (component) {
        if (component.indexOf("/") == 0) component = component.substring(1);
        if (!component.toLowerCase().endsWith('.vue')) component = component + '.vue';

        return modules[`/src/${component}`] || modules[`/src/views/${component}`];
    }
}


