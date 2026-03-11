<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '20px' }">
    <div>
      <a-descriptions title="生产环境依赖" :column="{ xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }" bordered>
        <a-descriptions-item label="ant-design-vue">^3.2.20</a-descriptions-item>
        <a-descriptions-item label="@vueuse/core">^8.9.4</a-descriptions-item>
        <a-descriptions-item label="vue">^3.3.9</a-descriptions-item>
        <a-descriptions-item label="@vueuse/shared">^8.9.4</a-descriptions-item>
        <a-descriptions-item label="pinia">^2.1.7</a-descriptions-item>
        <a-descriptions-item label="vue-router">4.1.4</a-descriptions-item>
        <a-descriptions-item label="axios">^1.6.0</a-descriptions-item>
        <a-descriptions-item label="vuedraggable">^4.1.0</a-descriptions-item>
        <a-descriptions-item label="vue-i18n">^9.2.2</a-descriptions-item>
        <a-descriptions-item label="tinymce">^5.10.7</a-descriptions-item>
        <a-descriptions-item label="mockjs">^1.1.0</a-descriptions-item>
        <a-descriptions-item label="echarts">^5.4.3</a-descriptions-item>
        <a-descriptions-item label="moment">^2.29.4</a-descriptions-item>
        <a-descriptions-item label="pinyin-pro">^3.20.2</a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="开发环境依赖" :column="{ xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }" bordered style="margin-top: 40px">
        <a-descriptions-item label="@types/node">^18.6.1</a-descriptions-item>
        <a-descriptions-item label="@vitejs/plugin-legacy">^4.0.2</a-descriptions-item>
        <a-descriptions-item label="@vitejs/plugin-vue">^4.2.3</a-descriptions-item>
        <a-descriptions-item label="eslint">8.17.0</a-descriptions-item>
        <a-descriptions-item label="less">^4.1.3</a-descriptions-item>
        <a-descriptions-item label="prettier">^3.1.0</a-descriptions-item>
        <a-descriptions-item label="terser">^5.14.2</a-descriptions-item>
        <a-descriptions-item label="typescript">^5.0.2</a-descriptions-item>
        <a-descriptions-item label="unplugin-auto-import">^0.17.1</a-descriptions-item>
        <a-descriptions-item label="vite">4.5.0</a-descriptions-item>
        <a-descriptions-item label="vue-eslint-parser">9.0.2</a-descriptions-item>
        <a-descriptions-item label="vue-tsc">^1.8.5</a-descriptions-item>
      </a-descriptions>
    </div>
  </a-card>
</template>

<script lang="ts">
export default defineComponent({
  components: {},
  props: {
    title: String,
  },
  setup() {
    return {};
  },
  methods: {},
});
</script>

<style lang="less" scoped>
::v-deep(.ant-descriptions-bordered .ant-descriptions-item-label) {
  padding: 16px 12px;
}

::v-deep(.ant-descriptions-item-content) {
  white-space: nowrap;
}
</style>
