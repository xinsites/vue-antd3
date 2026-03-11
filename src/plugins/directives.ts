import {App} from 'vue';

import {resize} from './directives/resize';
import {span} from './directives/span';
import {fit} from './directives/fit';
import {disabled} from './directives/disabled';
import {col} from './directives/col';
import authority from './authority';

/**
 * 注册全局自定义指令
 * @param app
 */
export function setupDirectives(app: App) {
    app.directive('disabled', disabled); // 元素禁用指令
    app.directive('fit', fit); // 宽高填充布局
    app.directive('resize', resize); // 元素尺寸变化
    app.directive('span', span); // 元素尺寸变化，a-col :span栅格占位格数计算
    app.directive('col', col); // a-col:按最小宽度响应式布局，x-simple-search、x-complex-search、x-pro-table组件使用到
    app.use(authority); //权限控制指令：权限控制指令v-role、v-any-role、v-auth、v-any-auth
}
