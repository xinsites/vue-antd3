<template>
  <!-- 头部右侧区域 -->
  <div class="header-action">
    <MenuSearch v-show="showMenuSearch"/>
    <div class="item-trigger" @click="lockScreen" v-if="!isMobile">
      <a-tooltip :mouseEnterDelay="0.5">
        <template #title>{{ i18n('锁屏') }}</template>
        <x-icon icon="LockOutlined"/>
      </a-tooltip>
    </div>
    <HeaderNotice/>
    <FullScreen v-if="!isMobile"/>
    <HeaderAvatar/>
    <ThemeSetting/>
  </div>
</template>
<script lang="ts">
import ThemeSetting from './components/ThemeSetting.vue';
import {useThemeStore} from "@/store/modules/theme-store";

export default defineComponent({
  name: 'HeaderTools',
  props: {
    showMenuSearch: Boolean,
    isMobile: Boolean,
  },
  components: {
    ThemeSetting,
    HeaderNotice: defineAsyncComponent(() => import('./components/HeaderNotice.vue')),
    FullScreen: defineAsyncComponent(() => import('./components/FullScreen.vue')),
    HeaderAvatar: defineAsyncComponent(() => import('./components/HeaderAvatar.vue')),
    MenuSearch: defineAsyncComponent(() => import('./components/MenuSearch.vue')),
  },
  setup() {
    return {};
  },
  methods: {
    lockScreen() {
      useThemeStore().setLockScreen(true);
    },
  },

});
</script>
<style lang="less" scoped>

</style>
