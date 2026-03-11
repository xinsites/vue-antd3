import PageLayout from '../../layout/index.vue';
import {BlankComponent, ROOT_PATH, ROOT_ROUTE_NAME} from "xin-antd3-ui";
import {baseCase} from "./routes/base-case";
import {expandComp} from "./routes/expand-comp";
import {inputComp} from "./routes/input-comp";
import {buildCase} from "./routes/build-case";

/**
 * 侧边栏静态路由
 */
const siderRoutes = {
    path: ROOT_PATH,
    name: ROOT_ROUTE_NAME, //避免重新登录时重复注册动态路由
    component: PageLayout,
    children: [
        ...baseCase,
        ...expandComp,
        ...inputComp,
        ...buildCase,
        {
            path: 'http://xinsite.vip/',
            component: BlankComponent,
            meta: {title: '获取授权', icon: 'LinkOutlined'},
        },
    ],
}

export {
    siderRoutes as default,
};

