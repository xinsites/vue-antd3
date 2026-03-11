<template>
  <div class="page-component">
    <a-page-header :ghost="false" title="多块内容垂直方向满屏" :style="{ display: header ? '' : 'none' }">
      <div class="xin-page-sub-header xin-text-secondary">所有内容块高度和 <b>&lt;</b> 内容屏幕高度，最后内容块填充满屏，所有内容块高度和超过屏幕高度出现滚动条，将浏览器高度变小去看他的变化。
      </div>
    </a-page-header>
    <div :class="[full ? 'xin-page-full' : 'xin-page', 'vertical-layout']">
      <a-card title="内容块一(定高)">
        <template #extra><a>more</a></template>
        <a-form layout="inline" :labelCol="{ style: 'min-width: 110px;max-width: 140px;' }">
          <a-form-item label="显示PageHeader">
            <a-switch v-model:checked="header"/>
          </a-form-item>
          <a-form-item label="内容块满屏">
            <a-switch v-model:checked="full"/>
          </a-form-item>
        </a-form>
      </a-card>
      <a-card title="内容块二(定高)" :style="{ marginTop: '10px', height: `${cardHeight}px` }">
        <template #extra><a>more</a></template>
        <a-form-item label="高度">
          <a-input-number
              style="width: 100px"
              :min="120"
              :max="800"
              :step="10"
              v-model:value="cardHeight"
              :formatter="
            (value) => {
              return `${value}px`;
            }
          "
          />
        </a-form-item>
        <p>card content</p>
      </a-card>
      <a-card title="内容块三(flex=1)" :style="{ marginTop: '10px' }">
        <template #extra><a>more</a></template>
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
    const cardHeight = ref(200);
    return {full, header, cardHeight};
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
