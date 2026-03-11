<template>
  <div class="page-component">
    <a-page-header :ghost="false" title="多块内容水平方向满屏" :style="{ display: header ? '' : 'none' }">
      <div class="xin-page-sub-header xin-text-secondary">水平方向内容块高度 <b>&lt;</b> 内容屏幕高度，水平内容块满屏显示，超过屏幕高度出现滚动条，将浏览器高度变小去看他的变化。</div>
    </a-page-header>
    <div :class="[full ? 'xin-page-full' : 'xin-page', 'horizontal-layout']">
      <a-card title="内容块一(定宽)" :style="{ width: `${cardWidth}px`, overflow: 'auto' }">
        <template #extra><a>more</a></template>
        <a-form-item label="显示PageHeader">
          <a-switch v-model:checked="header"/>
        </a-form-item>
        <a-form-item label="内容块满屏">
          <a-switch v-model:checked="full"/>
        </a-form-item>
        <a-form-item label="宽度">
          <a-input-number
              style="width: 100px"
              :min="200"
              :max="500"
              :step="10"
              v-model:value="cardWidth"
              :formatter="
            (value) => {
              return `${value}px`;
            }
          "
          />
        </a-form-item>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
      <a-card title="内容块二(定宽)" :style="{ width: '200px', marginLeft: '10px', overflow: 'auto' }">
        <template #extra><a>more</a></template>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
      <a-card title="内容块三(flex=1)" :style="{ marginLeft: '10px', overflow: 'auto' }">
        <template #extra><a>more</a></template>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const header = ref(true);
    const full = ref(true);
    const cardWidth = ref(300);
    return {full, header, cardWidth};
  },
  mounted() {
  },
  methods: {
    initialEvent() {
    },
  },
});
</script>

<style lang="less" scoped></style>
