<template>
  <div :class="['xin-page-full', 'horizontal-layout']">
    <a-card title="列表拖动排序" :bordered="false"> aaaa</a-card>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'SiderMenu',
    setup() {
      const { proxy } = getCurrentInstance() as any;

      return {};
    },
    methods: {},
  });
</script>

<style lang="less" scoped></style>
