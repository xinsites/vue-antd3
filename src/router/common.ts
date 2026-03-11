import PageLayout from '../layout/index.vue';
import {HIDE_PATH, REDIRECT_PATH, FULL_SCREEN_PATH, RedirectComponent, FullScreenComponent} from "xin-antd3-ui";

/**
 * 单页面基础公共路由
 */
const baseRoutes = [
    // {
    //     path: '/',
    //     redirect: '/login',
    // },
    {
        path: '/login',
        meta: {title: '登录', id: 2},
        component: () => import('@/views/login/Login.vue'),
    },
    {
        path: '/register',
        meta: {title: '用户注册'},
        component: () => import('@/views/Template.vue'),
    },
    {
        path: '/print/report',
        meta: {title: '打印报表'},
        component: () => import('@/views/Template.vue'),
    },
    {
        path: '/:path(.*)*', // 解决路由爆[Vue Router warn]: No match found for location with path
        meta: {title: '404页面'},
        component: () => import('@/views/base/exception/404.vue'),
    }
];

/**
 * 标签页隐藏公共路由----无权限控制
 */
const hiddenRoutes = [{
    path: HIDE_PATH,        //隐藏路由固定标识
    component: PageLayout,
    children: [
        {
            path: REDIRECT_PATH + '/:path(.*)', // 用于刷新的路由
            component: RedirectComponent,
        },
        {
            path: FULL_SCREEN_PATH + '/:path(.*)', // 用于标签页的全屏路由
            component: FullScreenComponent,
        },
        {
            path: '/audit', //审批页面，公共路由，无权限控制
            meta: {title: '审批详情页面'},
            component: () => import('@/views/Template.vue'),
        },
        {
            path: '/person/info',
            meta: {title: '个人信息'},
            component: () => import('@/views/user/PersonInfo.vue'),
        },
        {
            path: '/message/list',
            meta: {title: '消息列表'},
            component: () => import('@/views/user/message/List.vue'),
        },
    ],
}];

/**
 * 固定的侧边栏路由----无权限控制
 */
const fixedMenuRoutes = [{
    path: '/dynamics/fixed',  //非HIDE_PATH名字设置为侧边栏固定路由
    component: PageLayout,
    children: [{
        path: '/main',
        meta: {title: '主控平台', icon: 'HomeOutlined'},
        children: [
            {
                path: '/home',
                meta: {title: '首页'},
                component: () => import('@/views/main/home/index.vue'),
            },
            {
                path: '/workplace',
                meta: {title: '工作台', icon: 'DesktopOutlined'},
                component: () => import('@/views/main/workplace/index.vue'),
            },
            {
                path: '/monitor',
                meta: {title: '监控页', icon: 'FolderViewOutlined'},
                component: () => import('@/views/main/monitor/index.vue'),
            },
        ],
    }],
}];

//静态公共路由
export const commonRoutes = [
    ...baseRoutes,
    ...hiddenRoutes,
    ...fixedMenuRoutes,  //动态菜单时设置的固定侧边栏路由
]

//静态侧边栏路由 = fixedMenuRoutes(静态路由) + static/index.ts
//动态侧边栏路由 = fixedMenuRoutes(静态路由) + dynamics/index.ts(调用方法getAsyncRoutesByListMenus、getAsyncRoutesByTreeMenus)
