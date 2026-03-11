// 扩展组件--静态路由配置
export const expandComp = [{
    path: '/expand',
    meta: {title: '扩展组件'},
    children: [
        {
            path: '/work/flow/simple',
            meta: {title: '简式工作流组件'},
            component: () => import('@/views/comp/expand/flow/WorkFlowSimple.vue'),
            children: [
                {
                    path: '/work/flow/simple/case1',
                    meta: {title: '编辑模式1', hide: true},
                    component: () => import('@/views/comp/expand/flow/work/Case1.vue'),
                }, {
                    path: '/work/flow/simple/case2',
                    meta: {title: '编辑模式2', hide: true},
                    component: () => import('@/views/comp/expand/flow/work/Case2.vue'),
                }, {
                    path: '/work/flow/simple/case3',
                    meta: {title: '发起人自选', hide: true},
                    component: () => import('@/views/comp/expand/flow/work/Case3.vue'),
                }, {
                    path: '/work/flow/simple/case4',
                    meta: {title: '子流程设置', hide: true},
                    component: () => import('@/views/comp/expand/flow/work/Case4.vue'),
                }, {
                    path: '/subform/show',
                    meta: {title: '子流程查看', hide: true, sign: true},
                    component: () => import('@/views/comp/expand/flow/work/Case2.vue'),
                }],
        },
        {
            path: '/flow/record',
            meta: {title: '流程记录组件'},
            component: () => import('@/views/comp/expand/flow/FlowRecord.vue'),
            children: [
                {
                    path: '/flow/timeline/case1',
                    meta: {title: '示例1', hide: true},
                    component: () => import('@/views/comp/expand/flow/record/Case1.vue'),
                }, {
                    path: '/flow/timeline/case2',
                    meta: {title: '示例2', hide: true},
                    component: () => import('@/views/comp/expand/flow/record/Case2.vue'),
                }, {
                    path: '/flow/timeline/case3',
                    meta: {title: '示例3', hide: true},
                    component: () => import('@/views/comp/expand/flow/record/Case3.vue'),
                }, {
                    path: '/flow/timeline/case4',
                    meta: {title: '示例4', hide: true},
                    component: () => import('@/views/comp/expand/flow/record/Case4.vue'),
                }, {
                    path: '/flow/timeline/case5',
                    meta: {title: '示例5', hide: true},
                    component: () => import('@/views/comp/expand/flow/record/Case5.vue'),
                },
            ],
        },
        {
            path: '/holiday',
            meta: {title: '日历数据组件'},
            component: () => import('@/views/comp/expand/Holiday.vue'),
        },
    ],
}];


