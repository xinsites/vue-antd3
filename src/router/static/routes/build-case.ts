// 代码生成示例--静态路由配置
export const buildCase = [{
    path: '/build',
    meta: {title: '代码生成实例', icon: 'CodeOutlined'},
    children: [
        {
            path: '/build/single',
            meta: {title: '单表实例'},
            children: [
                {
                    path: '/build/single/row',
                    meta: {title: '行编辑'},
                    component: () => import('@/views/build/single/row/List.vue'),
                },
                {
                    path: '/build/single/modal',
                    meta: {title: '单表窗口'},
                    component: () => import('@/views/build/single/modal/List.vue'),
                },
                {
                    path: '/build/single/tab',
                    meta: {title: '单表选项卡'},
                    component: () => import('@/views/build/single/tab/List.vue'),
                },
                {
                    path: '/build/single/tab/form',
                    meta: {title: '单表选项卡新增', hide: true, sign: true, selPath: '/build/single/tab'},
                    component: () => import('@/views/build/single/tab/CreateForm.vue'),
                },
            ],
        },
        {
            path: '/build/multi',
            meta: {title: '多表实例'},
            children: [
                {
                    path: '/build/multi/modal',
                    meta: {title: '多表窗口'},
                    component: () => import('@/views/build/multi/modal/List.vue'),
                },
                {
                    path: '/build/multi/tab',
                    meta: {title: '多表选项卡'},
                    component: () => import('@/views/build/multi/tab/List.vue'),
                },
                {
                    path: '/build/multi/tab/form',
                    meta: {title: '多表选项卡编辑', hide: true, sign: true, selPath: '/build/multi/tab'},
                    component: () => import('@/views/build/multi/tab/CreateForm.vue'),
                },
            ],
        },
        {
            path: '/build/tree',
            meta: {title: '树列表实例'},
            children: [
                {
                    path: '/build/tree/row',
                    meta: {title: '树行编辑'},
                    component: () => import('@/views/build/tree/row/List.vue'),
                },
                {
                    path: '/build/tree/all/row',
                    meta: {title: '树行编辑全'},
                    component: () => import('@/views/build/tree/row2/List.vue'),
                },
                {
                    path: '/build/tree/modal',
                    meta: {title: '树窗口'},
                    component: () => import('@/views/build/tree/modal/List.vue'),
                },
                {
                    path: '/build/tree/all/modal',
                    meta: {title: '树窗口全'},
                    component: () => import('@/views/build/tree/modal2/List.vue'),
                },
                {
                    path: '/build/tree/tab',
                    meta: {title: '树选项卡'},
                    component: () => import('@/views/build/tree/tab/List.vue'),
                },
                {
                    path: '/build/tree/tab/form',
                    meta: {title: '树选项卡页面', hide: true, sign: true, selPath: '/build/tree/tab'},
                    component: () => import('@/views/build/tree/tab/CreateForm.vue'),
                },
                {
                    path: '/build/tree/all/tab',
                    meta: {title: '树选项卡全'},
                    component: () => import('@/views/build/tree/tab2/List.vue'),
                },
                {
                    path: '/build/tree/tab/all/form',
                    meta: {title: '树选项卡全页面', hide: true, sign: true, selPath: '/build/tree/all/tab'},
                    component: () => import('@/views/build/tree/tab2/CreateForm.vue'),
                },
            ],
        },
    ],
}];


