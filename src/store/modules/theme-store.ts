import {defineStore} from 'pinia';
import {APP_THEMES, HEAD_THEMES, LOCALE_LIST, SIDE_THEMES, ThemeState} from "xin-antd3-ui";
import {
    removeSetting, getCacheSetting, setCacheSetting, menuStyleCahnge,
    changePagePadding, headerThemeCahnge, changeAppStyle, darkModeCahnge, initTheme,
} from "xin-antd3-ui/es/utils/theme-util";

import {useLayoutStore} from "./layout-store";

// state默认值
const DEFAULT_STATE = Object.freeze({
    interLang: LOCALE_LIST[0].lang, //国际化语言
    collapse: false, // 是否折叠侧边栏，默认展开
    sideNavCollapse: false, // 双排菜单靠边小折叠栏
    bodyFullscreen: false, // 内容区域是否全屏
    layoutStyle: 'side', // 布局风格: side(默认), top(顶部菜单), mix(左侧混合菜单)
    appStyle: APP_THEMES[0], // 系统主题颜色
    headStyle: HEAD_THEMES[0].bg, // 头部主题颜色
    sideMenuStyle: SIDE_THEMES[0].bg, // 侧边栏菜单颜色
    sideMenuDouble: false, // 是否开启侧栏双排菜单
    mixCollapse: false, // 侧栏双排菜单是否折叠侧边栏，默认展开
    darkMode: false, // 是否是暗黑模式
    colorfulIcon: false, //侧栏是否多彩图标
    canMenuDrag: true, //菜单宽度拖拽
    sideUniqueOpen: true, // 侧栏排他展开
    showMenuSearch: true, // 开启菜单搜索
    showTabs: true, // 是否开启多页签
    showFooter: false, // 是否开启页脚
    menuWidth: 240, // 侧栏菜单宽度
    tabStyle: 'smooth', // 标签页风格: smooth(圆滑), underline(下划线), dot(圆点), card(卡片)
    menuTrigger: 'top', // 菜单折叠按钮(用户配置弃用)
    refreshTrigger: 'tab', // 刷新按钮: none(不显示), top(顶部), tab(当前页签)
    openNProgress: true, // 顶部进度条
    enableTransition: false, // 是否开启动画
    animationType: 'fade', // 动画类型
    weakMode: false, // 是否是色弱模式
    backUpBtn: false, // 内容区域太长，回到顶部按钮
    pagePadding: 16, // 内容区域加内边距
    fixedCollapse: true, // 手机版(小屏幕)时，固定菜单栏目是否折叠
    tableSize: 'middle', // 表格统一尺寸配置: default(大号), middle(中等), small(紧凑)
    lockTime: 0,        // 自动锁屏时间(秒)，0值只能手动锁屏
    isLock: false,      // 是否锁屏
});

/**
 * 主题状态管理
 */
export const useThemeStore = defineStore({
    id: 'theme',
    state: (): ThemeState => {
        const state = {...DEFAULT_STATE} as ThemeState;
        const cache = getCacheSetting(); // 读取本地缓存
        Object.keys(state).forEach((key) => {
            if (typeof cache[key] !== 'undefined') {
                state[key] = cache[key];
            }
        });

        initTheme(state.pagePadding, state.appStyle, state.darkMode, state.sideMenuStyle, state.headStyle);
        return state;
    },
    getters: {},
    actions: {
        /**
         * 批量设置主题配置
         */
        setThemeSetting(themeSetting, isCache = true) {
            const state = {...this} as ThemeState;
            Object.keys(themeSetting).forEach((key) => {
                const value = themeSetting[key];
                this[key] = value;
                state[key] = value;
                if (isCache) {
                    setCacheSetting(key, value);
                }
                if (key === 'darkMode') {
                    darkModeCahnge(value);
                    menuStyleCahnge(value, SIDE_THEMES.find((d) => d.bg === state.sideMenuStyle));
                    headerThemeCahnge(value, HEAD_THEMES.find((d) => d.bg === state.headStyle) ?? HEAD_THEMES[0]);
                } else if (key === 'sideMenuStyle') {
                    menuStyleCahnge(state.darkMode, SIDE_THEMES.find((d) => d.bg === value));
                } else if (key === 'headStyle') {
                    headerThemeCahnge(state.darkMode, HEAD_THEMES.find((d) => d.bg === value) ?? HEAD_THEMES[0]);
                } else if (key === 'pagePadding') {
                    changePagePadding(state.pagePadding);
                } else if (key === 'appStyle') {
                    changeAppStyle(state.appStyle);
                } else if (key === 'tableSize') {
                    // themeSetTableCache('table', 'tableSize', value);
                }
                if (['showTabs', 'showFooter', 'bodyFullscreen', 'pagePadding'].indexOf(key) != -1) {
                    useLayoutStore().changeLayoutContentSize(); //这些主题配置会导致内容区域尺寸变化
                }
            });
        },
        // 重置配置
        resetSetting() {
            removeSetting();
            const state = {...DEFAULT_STATE};
            Object.keys(state).forEach((key) => {
                this[key] = state[key];
            });
            changePagePadding(state.pagePadding);
            changeAppStyle(state.appStyle);
            menuStyleCahnge(state.darkMode, SIDE_THEMES.find((d) => d.bg === state.sideMenuStyle));
            headerThemeCahnge(state.darkMode, HEAD_THEMES.find((d) => d.bg === state.headStyle) ?? HEAD_THEMES[0]);
        },
        /**
         * 更新是否锁屏
         */
        setLockScreen(value: boolean) {
            this.isLock = value;
            setCacheSetting('isLock', value);
        },
    },
});
