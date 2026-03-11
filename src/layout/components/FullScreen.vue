<template>
  <div class="item-trigger" @click="toggle">
    <a-tooltip :mouseEnterDelay="0.5">
      <template #title>{{ i18n('全屏') }}</template>
      <x-icon icon="FullscreenOutlined" v-if="!isFullscreen"/>
      <x-icon icon="FullscreenExitOutlined" v-else/>
    </a-tooltip>
  </div>
</template>
<script lang="ts">
import {useFullscreen} from '@vueuse/core';

export default defineComponent({
  name: 'FullScreen',
  setup() {
    const {toggle, isFullscreen} = useFullscreen();
    return {toggle, isFullscreen};
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
