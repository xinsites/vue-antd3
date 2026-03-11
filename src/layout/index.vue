<template>
  <x-layout-admin :layout="layoutStore" :theme="themeStore" @fullScreenChange="tabsFullScreen">
    <!-- logo图标 -->
    <template #appLogo>
      <img src="/src/assets/logo.png" alt="logo"/>
    </template>

    <!--    <template #appName>-->
    <!--      标题自定义slot-->
    <!--    </template>-->

    <!--        <template #headerLogo="{ logoWidth, collapse }">-->
    <!--          logo图标 + 标题名称 {{logoWidth}}{{collapse}}-->
    <!--        </template>-->

    <!--        <template #headerLeft>-->
    <!--          头部左侧区域，面包屑前面，导航模式类型=side有效-->
    <!--        </template>-->

    <!-- 自定义tab页标签 -->
    <!--    <template #tabName="{ tab, activeKey, theme  }">-->
    <!--      {{ tab.meta.title }}-->
    <!--    </template>-->

    <!-- 自定义菜单栏 -->
    <!--    <template #menuName="{ menu  }">-->
    <!--      {{ menu.meta.title }}-->
    <!--    </template>-->

    <!-- 标签页右键菜单 -->
    <template #rightMenu="{ tab, isMobile, locale  }">
      <a-menu :selectable="false">
        <a-menu-item key="1" @click="pageTabRefreshPath(router, tab.fullPath)">
          <x-icon icon="ReloadOutlined"/>
          <span class="right-menu">{{ locale.tabs.reload }}</span>
        </a-menu-item>
        <a-menu-item key="2" @click="pageTabCloseOther(layoutStore, router, tab)">
          <x-icon icon="ColumnWidthOutlined"/>
          <span class="right-menu">{{ locale.tabs.closeOtherPage }}</span>
        </a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="3" :disabled="!tab.closable" @click="pageTabClosePath(layoutStore, router, tab.path);">
          <x-icon icon="CloseOutlined"/>
          <span class="right-menu">{{ locale.tabs.closeCurPage }}</span>
        </a-menu-item>
        <a-menu-item key="4" @click="pageTabCloseAll(layoutStore, router)">
          <x-icon icon="CloseCircleOutlined"/>
          <span class="right-menu">{{ locale.tabs.closeAllPage }}</span>
        </a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="5" @click="pageTabCloseLeft(layoutStore, router, tab)">
          <x-icon icon="VerticalRightOutlined"/>
          <span class="right-menu">{{ locale.tabs.closeLeftPage }}</span>
        </a-menu-item>
        <a-menu-item key="6" @click="pageTabCloseRight(layoutStore, router, tab)">
          <x-icon icon="VerticalLeftOutlined"/>
          <span class="right-menu">{{ locale.tabs.closeRightPage }}</span>
        </a-menu-item>
        <a-menu-divider v-if="isMobile"/>
        <a-menu-item key="7" v-if="isMobile" @click="pageTabFullScreen(themeStore)">
          <x-icon :icon="themeStore.bodyFullscreen ? 'CompressOutlined' : 'ExpandOutlined'"/>
          <span class="right-menu">
            {{ themeStore.bodyFullscreen ? locale.tabs.exitFullScreen : locale.tabs.pageFullScreen }}
          </span>
        </a-menu-item>
        <a-menu-divider v-if="!isMobile"/>
        <a-menu-item key="7" v-if="!isMobile" @click="pageTabNewOpen(router, tab)">
          <x-icon icon="SendOutlined" :style="{'transform': 'rotate(-30deg)'}"/>
          <span class="right-menu">
            {{ locale.tabs.newOpenWindow }}
          </span>
        </a-menu-item>
      </a-menu>
    </template>

    <!-- 底部区域 -->
    <template #footer="{ year, isMobile  }">
      <div class="footer xin-text">
        <div>版本：v1.4.0</div>
        <div>Copyright © 2020 - {{ year }} All Rights Reserved. <a href="http://xinsite.vip/" target="_blank">xinsite.vip</a></div>
        <div></div>
      </div>
    </template>

    <!-- 菜单混合布局-顶部自定义 -->
    <!--    <template #topMixMenu="{ args }">-->
    <!--      <div v-for="menu in args.mixTopMenus" :key="menu.path" :class="[args.activeKey==menu.path?'active':'']" @click="args.handleClick(menu)">{{ menu.name }}</div>-->
    <!--    </template>-->

    <!-- 头部右侧区域 -->
    <template #headerRight>
      <HeaderTools :show-menu-search="themeStore.showMenuSearch" :is-mobile="layoutStore.change.isMobile" />
    </template>

    <!-- 内容区域 -->
    <template #default="{ transitionName, keepAliveInclude }">
      <RouterLayout :transition-name="transitionName" :include="keepAliveInclude"/>
    </template>
  </x-layout-admin>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import {Menu as AMenu, MenuDivider as AMenuDivider, MenuItem as AMenuItem} from 'ant-design-vue/es'
import {useLayoutStore} from "../store/modules/layout-store";
import {useThemeStore} from '../store/modules/theme-store';
import {ROOT_COMPONENT_NAME} from "xin-antd3-ui";
import {
  pageTabNewOpen,
  pageTabRefreshPath,
  pageTabClosePath,
  pageTabCloseAll,
  pageTabCloseOther,
  pageTabCloseLeft,
  pageTabCloseRight,
  pageTabFullScreen,
} from "xin-antd3-ui";
import {useRouter} from "vue-router";
import RouterLayout from './RouterLayout.vue';

export default defineComponent({
  name: ROOT_COMPONENT_NAME,
  components: {
    AMenu, AMenuDivider, AMenuItem,
    RouterLayout,
    HeaderTools: defineAsyncComponent(() => import('./HeaderTools.vue')),
  },
  setup() {
    const router = useRouter();
    const layoutStore = useLayoutStore();
    const themeStore = useThemeStore();

    onMounted(() => {
      layoutStore.changeWindowSize();
    });

    //标签页全屏事件
    const tabsFullScreen = () => {
      layoutStore.changeLayoutContentSize()
    };

    return {
      router,
      themeStore,
      layoutStore,
      tabsFullScreen,
      pageTabNewOpen,
      pageTabRefreshPath,
      pageTabClosePath,
      pageTabCloseAll,
      pageTabCloseOther,
      pageTabCloseLeft,
      pageTabCloseRight,
      pageTabFullScreen,
    };
  },
  computed: {},
  methods: {},
});
</script>
<style lang="less" scoped>

</style>
