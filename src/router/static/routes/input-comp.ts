// 输入框组件--静态路由配置
export const inputComp = [{
    path: '/input',
    meta: {title: '输入框组件', icon: 'ContainerOutlined'},
    children: [
        {
            path: '/input/select',
            meta: {title: '下拉列表选择'},
            component: () => import('@/views/comp/input/Select.vue'),
        },
        {
            path: '/input/select/user',
            meta: {title: '用户选择输入框'},
            component: () => import('@/views/comp/input/SelectUser.vue'),
        },
    ],
}];


