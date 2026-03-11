import {defineStore} from 'pinia';
import {isMobile, LayoutState, MenuTreeType, screenWidth, TabItem, uuid} from "xin-antd3-ui";
import {nextTick} from "vue";
import {changePageContentHeight} from "xin-antd3-ui/es/utils/theme-util";

/**
 * 框架布局参数配置
 */
export const useLayoutStore = defineStore({
    id: 'layout',
    state: (): LayoutState => ({
        menus: [],                  //侧边栏菜单数据
        tabs: [],                   //页签数据
        appName: 'XinSite Antd3',
        homePath: '/home',                  //首页地址，点击左上角logo跳转的地址
        fixedPaths: ['/home', '/workplace'], //固定标签路由(不能关闭的Tab标签)
        reClickMenuRefresh: true,      //重复点击菜单，是否刷新页面
        breadcrumbHide: false,         //侧边栏导航模式时，面包屑是否隐藏
        dblClickCloseTab: true,        //双击标签页关闭页签
        tabsCache: true,               //是否支持页签缓存，刷新页面页签保持不变
        tabsSortable: true,            //是否支持页签拖动排序
        i18nEnable: true,              //是否开启国际化功能
        scrollTopCache: true,          //是否缓存标签页面滚动条高度
        menuScrollType: 'overlay',     // 菜单栏滚动条显示配置: none(不显示), auto(自动), overlay(浮动)
        //version、secretKey手动设置，其他无需手动设置
        change: {
            layoutContentSize: null,    // 内容区域尺寸变化监听
            windowSize: null,           // 浏览器窗口大小发生变化监听
            screenWidth: null,          // 浏览器窗口宽度发生变化监听
            isMobile: false,            // 是否手机端
            secretKey: 'ah12bkJCLlx4',  // 签名验证密钥，手动设置一个随机字符串
            version: 'v1.4.0',          // 更新版本号后将自动清除用户相关配置信息(主题配置、用户相关缓存配置)
            documentTitle: '%tabName - %appName', //浏览器标题名称配置，为空时自定义，%tabName：标签名
        },
    }),
    getters: {},
    actions: {
        setMenus(menus: MenuTreeType[]) {
            this.menus = menus;
        },
        setTabs(value: TabItem[]) {
            this.tabs = value;
        },
        /**
         * 变更内容区域尺寸变化
         */
        changeLayoutContentSize() {
            nextTick(() => {
                this.change.layoutContentSize = uuid();
                changePageContentHeight();
            });
        },
        /**
         * 变更浏览器窗口大小发生变化
         */
        changeWindowSize() {
            this.change.windowSize = uuid();
            this.change.screenWidth = screenWidth();
            this.change.isMobile = this.change.screenWidth < 800 || isMobile();
            changePageContentHeight();
        },
    },
});
