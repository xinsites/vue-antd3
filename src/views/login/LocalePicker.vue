<template>
  <div class="item-trigger">
    <a-dropdown :trigger="['click']">
      <a-badge :offset="[0, -2]" style="color: white">
        <template #count>
          <x-icon icon="icon-in"/>
        </template>
        {{ i18nIcon }}
      </a-badge>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item v-for="item in LOCALE_LIST" :key="item.lang">
            <a href="javascript:;">{{ item.icon }} {{ item.label }}</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script lang="ts">
import {useThemeStore} from '@/store/modules/theme-store';
import {LOCALE_LIST} from 'xin-antd3-ui';

export default defineComponent({
  name: 'LocalePicker',
  setup() {
    const themeStore = useThemeStore();
    const i18nIcon = computed(() => {
      const tab = LOCALE_LIST.find((d) => d.lang === themeStore.interLang);
      return tab ? tab.icon : 'CN';
    });
    return {LOCALE_LIST, themeStore, i18nIcon};
  },
  methods: {
    handleMenuClick({key}) {
      this.themeStore.setThemeSetting({interLang: key});
    },
  },
});
</script>
<style lang="less" scoped>
.ant-dropdown-link {
  font-size: 13px;

  .sup span {
    vertical-align: super;
    color: red;
  }
}
</style>
