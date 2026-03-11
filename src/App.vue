<template>
  <x-config-provider
      :license="LICENSE_CODE"
      :locale="antLocale"
      :dictStore="dictStore"
      :xinLocale="xinLocale">
    <router-view/>
    <LockScreen/>
  </x-config-provider>
</template>
<script lang="ts">
import {useLayoutStore} from "@/store/modules/layout-store";
import {useLocale} from "@/i18n/use-locale";
import {useDictStore} from "@/store/modules/dict-store";
import {LICENSE_CODE} from "@/config/common";
import LockScreen from '@/layout/components/LockScreen.vue';

export default defineComponent({
  name: 'App',
  components: {LockScreen},
  setup() {
    const dictStore = useDictStore();
    const layoutStore = useLayoutStore();

    //防止手动修改sessionStorage、localStorage值
    window.addEventListener('storage', function (e) {
      if (sessionStorage.getItem(e.key)) sessionStorage.setItem(e.key, e.oldValue);
      if (localStorage.getItem(e.key)) localStorage.setItem(e.key, e.oldValue);
    });

    window.addEventListener('resize', () => {
      layoutStore.changeWindowSize();
    });
    layoutStore.changeWindowSize();

    // 国际化配置
    const {antLocale, xinLocale} = useLocale();

    return {dictStore, antLocale, xinLocale, LICENSE_CODE};
  },
});
</script>
<style lang="less" scoped>
</style>
