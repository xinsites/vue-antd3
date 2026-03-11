// 基础示例--静态路由配置
import {BlankComponent, createIframeComponent} from "xin-antd3-ui";

export const baseCase = [{
    path: '/base',
    meta: {title: '基础示例', icon: 'ContainerOutlined'},
    children: [
        {
            path: '/exception',
            meta: {title: '异常页', hide: false, icon: 'WarningOutlined'},
            component: () => import('@/views/base/ExceptionView.vue'),
            children: [
                {
                    path: '/exception/403',
                    meta: {title: '403', hide: true, icon: 'ExclamationCircleOutlined'},
                    component: () => import('@/views/base/exception/403.vue'),
                },
                {
                    path: '/exception/404',
                    meta: {title: '404', hide: true, icon: 'CloseCircleOutlined'},
                    component: () => import('@/views/base/exception/404.vue'),
                },
                {
                    path: '/exception/500',
                    meta: {title: '500', hide: true, icon: 'QuestionCircleOutlined'},
                    component: () => import('@/views/base/exception/500.vue'),
                },
                {
                    path: '/exception/not/data',
                    meta: {title: '无数据', hide: true},
                    component: () => import('@/views/base/exception/NoData.vue'),
                },
                {
                    path: '/exception/error',
                    meta: {title: '网络错误', hide: true},
                    component: () => import('@/views/base/exception/error.vue'),
                },
            ],
        },
        {
            path: '/grid',
            meta: {title: '宫格列表', icon: 'AppstoreOutlined'},
            component: () => import('@/views/base/GridView.vue'),
            children: [
                {
                    path: '/grid/list1',
                    meta: {title: '宫格应用一', hide: true},
                    component: () => import('@/views/base/grid/GridList1.vue'),
                },
                {
                    path: '/grid/list2',
                    meta: {title: '宫格应用二', hide: true},
                    component: () => import('@/views/base/grid/GridList2.vue'),
                },
                {
                    path: '/grid/list3',
                    meta: {title: '宫格应用三', hide: true},
                    component: () => import('@/views/base/grid/GridList3.vue'),
                },
            ],
        },
        {
            path: '/base/layout',
            meta: {title: '页面布局', icon: 'LayoutOutlined'},
            component: () => import('@/views/base/PageLayout.vue'),
            children: [
                {
                    path: '/layout/full/screen',
                    meta: {title: '单块内容满屏', hide: true},
                    component: () => import('@/views/base/layout/FullScreen.vue'),
                },
                {
                    path: '/layout/vertical/full',
                    meta: {title: '垂直方向满屏', hide: true},
                    component: () => import('@/views/base/layout/FullVertical.vue'),
                },
                {
                    path: '/layout/horizontal/full',
                    meta: {title: '水平方向满屏', hide: true},
                    component: () => import('@/views/base/layout/FullHorizontal.vue'),
                },
                {
                    path: '/layout/table/scroll/vertical',
                    meta: {title: '表格滚动条上下布局', hide: true},
                    component: () => import('@/views/base/layout/TableScrollVertical.vue'),
                },
                {
                    path: '/layout/table/scroll/horizontal',
                    meta: {title: '表格滚动条左右布局', hide: true},
                    component: () => import('@/views/base/layout/TableScrollHorizontal.vue'),
                },
                {
                    path: '/layout/split/vertical',
                    meta: {title: '分割面板上下填充布局', hide: true},
                    component: () => import('@/views/base/layout/SplitVertical.vue'),
                },
                {
                    path: '/layout/split/horizontal',
                    meta: {title: '分割面板左右填充布局', hide: true},
                    component: () => import('@/views/base/layout/SplitHorizontal.vue'),
                },
            ],
        },
        {
            path: '/layout',
            meta: {title: '框架布局', icon: 'AppstoreOutlined'},
            component: () => import('@/views/comp/LayoutView.vue'),
            children: [
                {
                    path: '/layout/help',
                    meta: {title: '框架布局说明', hide: true},
                    component: () => import('@/views/comp/layout/LayoutHelp.vue'),
                },
                {
                    path: '/keepalive',
                    meta: {title: '缓存页面', hide: true},
                    component: () => import('@/views/comp/layout/Cache.vue'),
                },
                {
                    path: '/no/cache',
                    meta: {title: '非缓存页面', hide: true, keepAlive: false},
                    component: () => import('@/views/comp/layout/Cache.vue'),
                },
                {
                    path: '/part/refresh',
                    meta: {title: '局部刷新', hide: true},
                    component: () => import('@/views/comp/layout/PartRefresh.vue'),
                },
                {
                    path: '/sign',
                    meta: {title: '签名验证', hide: true},
                    component: () => import('@/views/comp/layout/Sign.vue'),
                },
                {
                    path: '/sign/edit',
                    meta: {title: '签名修改页面', hide: true, sign: true},
                    component: () => import('@/views/comp/layout/SignEdit.vue'),
                },
                {
                    path: '/auth',
                    meta: {title: '权限控制', hide: true},
                    component: () => import('@/views/comp/layout/Auth.vue'),
                },
            ],
        },
        {
            path: '/iframe/keepalive',
            meta: {title: '内嵌页面(有缓存)'},
            component: createIframeComponent('http://xinsite.vip/'),
        },
        {
            path: '/iframe/no/cache',
            meta: {title: '内嵌页面(无缓存)', keepAlive: false},
            component: createIframeComponent('http://xinsite.vip/'),
        },
        {
            path: 'http://xinsite.vip/',
            meta: {title: '外链接页面'},
            component: BlankComponent,
        },
    ],
}];


