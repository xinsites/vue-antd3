<template>
  <div class="page-component">
    <a-page-header :ghost="false" title="单块内容满屏" :style="{ display: header ? '' : 'none' }">
      <div class="xin-page-sub-header xin-text-secondary">内容块高度 <b>&lt;</b> 内容屏幕高度，内容块满屏显示，超过屏幕高度出现滚动条，将浏览器高度变小去看他的变化。</div>
    </a-page-header>
    <div :class="[full ? 'xin-page-full' : 'xin-page']">
      <a-card title="内容块" ref="conentRef" v-resize="onResize" :bodyStyle="{ height: cardMaxHeight, maxHeight: cardMaxHeight, overflow: 'auto' }">
        <template #extra><a>more</a></template>
        <a-form-item label="显示PageHeader">
          <a-switch v-model:checked="header"/>
        </a-form-item>
        <a-form-item label="内容块满屏">
          <a-switch v-model:checked="full"/>
        </a-form-item>
        <a-form-item label="内容块加滚动条">
          <a-switch v-model:checked="scroll" :disabled="!full"/>
        </a-form-item>
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
    const scroll = ref(false);
    const conentRef = ref();

    //内容块不加滚动条，代码块可以去掉，start
    const cardMaxHeight = ref<string>('unset');
    const resizeHandler = (resizeVal) => {
      if (conentRef.value && resizeVal && resizeVal.height > 0) {
        if (scroll.value && full.value) {
          cardMaxHeight.value = resizeVal.height - 60 + 'px'; //60是card表头高度
        } else {
          cardMaxHeight.value = 'unset';
        }
      }
    };

    const onResize = (resizeVal) => {
      resizeHandler(resizeVal);
    };

    watch(scroll, (visible) => {
      conentRef.value.$el.resizeHandler(); //加v-resize指令，才会有resizeHandler方法
    });
    watch(full, (visible) => {
      conentRef.value.$el.resizeHandler();
    });
    //内容块不加滚动条，代码块可以去掉，end

    return {full, header, scroll, conentRef, onResize, cardMaxHeight};
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
