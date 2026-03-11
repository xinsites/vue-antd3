<template>
  <slot v-if="true"></slot>
  <div class="help" v-else>开发环境显示</div>
</template>


<script lang="ts">
import {IS_DEV} from "@/config/common";

export default {
  setup(props, {emit, slots}) {
    return {
      IS_DEV,
    };
  },
};
</script>

<style lang="less" scoped>
.help {
  margin-top: 20px;
  font-size: 16px;
  font-weight: normal;
  color: red;
}
</style>
