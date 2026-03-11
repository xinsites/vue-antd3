//框架布局标签页相关方法
import {unref} from 'vue';
import router from '../router';
import {useLayoutStore} from "../store/modules/layout-store";
import {closeTabPage, isFullScreenTab, LOCAL_REFRESH, pageTabRefresh, pageTabRefreshPath, setDocumentTitle} from "xin-antd3-ui";

/**
 * 刷新当前路由
 */
export function reloadCurrentTab() {
    pageTabRefresh(router);
}

/**
 * 打开路由地址
 */
export function pushPageTab(path: string) {
    if (!path) return;
    const layoutStore = useLayoutStore();
    const tab = layoutStore.tabs.find((d) => d.path == path);
    router.push(tab ? tab.fullPath : path);
}

/**
 * 打开指定路由地址，没有指定打开首页路由地址
 * @param path 打开的路由，没有指定打开首页
 */
export function pushHomePage(path?: string) {
    router.push(path || getHomePath());
}

/**
 * 替换当前路由地址，没有替换首页路由地址
 * @param path 打开的路由，没有指定打开首页
 */
export function replaceHomePage(path?: string) {
    router.replace(path || getHomePath());
}

/**
 * 获取首页地址
 */
export function getHomePath() {
    const layoutStore = useLayoutStore();
    if (layoutStore.homePath) {
        return layoutStore.homePath;
    } else if (Array.isArray(layoutStore.fixedPaths) && layoutStore.fixedPaths.length > 0) {
        return layoutStore.fixedPaths[0];
    }
    return '/';
}


/**
 * 打开指定路由，并关闭指定页签路由
 * @param openPath 打开的路由
 * @param closePath 关闭的路由，如果为空，则关闭当前页签
 */
export function openPathAndClosePage(openPath: string, closePath = '') {
    if (!openPath) return;
    const {path, query} = unref(router.currentRoute);
    if (!closePath) {
        closePath = path;  //关闭当前页签
        if (openPath == closePath) return;
    }
    const layoutStore = useLayoutStore();
    const tab = layoutStore.tabs.find((d) => d.path == openPath);

    closeTabPage(layoutStore, closePath);
    router.push(tab ? tab.fullPath : openPath);
}

/**
 * 打开指定路由并需要刷新页面，顺便关闭指定页签路由
 * @param openPath 打开的路由
 * @param closePath 关闭的路由，如果为空，则关闭当前页签
 */
export function refreshPathAndClosePage(openPath: string, closePath = '') {
    if (!openPath) return;

    const {path, query} = unref(router.currentRoute);
    if (!closePath) closePath = path;  //关闭当前页签

    const layoutStore = useLayoutStore();
    const tab = layoutStore.tabs.find((d) => d.path == openPath);
    if (closePath != openPath) closeTabPage(layoutStore, closePath);
    pageTabRefreshPath(router, tab ? tab.fullPath : openPath);
}

/**
 * 打开指定路由并需要局部刷新，顺便关闭指定页签路由
 * @param openPath 打开的路由
 * @param closePath 关闭的路由，如果为空，则关闭当前页签
 */
export function localRefreshPathAndClosePage(openPath: string, closePath = '') {
    const {path, query} = unref(router.currentRoute);
    if (!closePath) closePath = path;

    if (closePath == openPath) {
        addLocalRefresh();
        router.replace({path: path, query: query});
    } else {
        const open = closeTabPage(useLayoutStore(), closePath);
        localRefreshPath(openPath || open);
    }
}

/**
 * 打开指定路由并需要局部刷新
 */
export function localRefreshPath(openPath: string) {
    if (!openPath) return;
    const layoutStore = useLayoutStore();
    const tab = layoutStore.tabs.find((d) => d.path == openPath || d.fullPath == openPath);

    if (tab) {
        if (tab.meta?.keepAlive == false) {
            router.push(tab.fullPath || tab.path); //非缓存页面，不存在局部刷新
        } else {
            addLocalRefresh(); //缓存页面，添加局部刷新标识
            router.push(tab.fullPath || tab.path);
        }
    } else {
        router.push(openPath); //标签页不存在，不存在局部刷新
    }
}

/**
 * 添加局部刷新标识，并延迟删除
 */
export function addLocalRefresh() {
    setTimeout(() => {
        delete window[LOCAL_REFRESH];
    }, 300);
    window[LOCAL_REFRESH] = true;   //局部刷新标识
}

/**
 * 是否需要局部刷新
 */
export function isLocalRefresh() {
    return window[LOCAL_REFRESH];
}

/**
 * 修改页签标题
 * @param title 标题
 * @param modPath 要修改的页签路由，未赋值表示当前页签
 */
export function setPageTabTitle(title: string, modPath?: string) {
    const {path} = unref(router.currentRoute);
    const layoutStore = useLayoutStore();
    const curPath = modPath ?? path;
    const tab = layoutStore.tabs.find((d) => d.path == curPath);
    if (tab) {
        tab.meta.title = title;
        const isFullScreen = isFullScreenTab(curPath);
        setDocumentTitle(layoutStore, title, isFullScreen);
    }
}

/**
 * 关闭当前页签页面，并打开该页签的页签
 * @param localRefresh 是否局部刷新打开的页签，true：是，false：全页刷新，不传不刷新
 */
export function closeCurTabAndOpenFromTab(localRefresh?: boolean) {
    const layoutStore = useLayoutStore();
    const {path, query} = unref(router.currentRoute);

    if (isFullScreenTab(path)) {
        window.close();
        return;
    }

    const fromFullPath = closeTabPage(layoutStore, path);
    if (fromFullPath) {
        if (localRefresh === true) {
            localRefreshPath(fromFullPath);
        } else if (localRefresh === false) {
            pageTabRefreshPath(router, fromFullPath);
        } else {
            router.push(fromFullPath);
        }
    }
}

/**
 * 标签页面滚动条高度调整
 */
export function tabPageScrollTop(scrollTop?: number) {
    const tabContentEL = document.getElementById('tabs-content') as HTMLElement;
    if (tabContentEL) tabContentEL.scrollTop = scrollTop || 0;
}
