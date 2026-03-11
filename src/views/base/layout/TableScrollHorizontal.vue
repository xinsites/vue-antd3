<template>
  <div class="page-component">
    <a-page-header :ghost="false" title="自定义指令v-resize实现" :style="{ display: header ? '' : 'none' }">
      <div class="xin-page-sub-header xin-text-secondary">所有内容块高度和 <b>&lt;</b> 内容屏幕高度，最后内容块填充满屏，当选择表格加滚动条，内容屏不会出现滚动条，除非达到表格最小高度(最小高度100px)
      </div>
    </a-page-header>
    <div :class="[full ? 'xin-page-full' : 'xin-page', 'horizontal-layout']">
      <a-card title="内容块一(定宽)" class="left-card" v-if="true" :bodyStyle="{ height: cardMaxHeight, maxHeight: cardMaxHeight, overflow: 'auto' }"
              :style="{ width: '300px', marginRight: '10px' }">
        <template #extra><a>more</a></template>
        {{ cardMaxHeight }}
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
        <p>card contentdd</p>
        <p>card content</p>
      </a-card>
      <a-card ref="conentRef" style="overflow: hidden" v-resize.left-card="onResize">
        <div class="table-page-search" style="padding-bottom: 10px">
          <a-form layout="inline" :labelCol="{ style: 'min-width: 110px;max-width: 140px;' }">
            <a-row :gutter="4">
              <a-col :xl="6" :lg="24">
                <a-form-item label="显示PageHeader">
                  <a-switch v-model:checked="header"/>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="24">
                <a-form-item label="内容块满屏">
                  <a-switch v-model:checked="full"/>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="24">
                <a-form-item label="表格、内容块加滚动条">
                  <a-switch v-model:checked="scroll2" :disabled="!full"/>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="24">
                <a-form-item class="search-btn-right" :wrapper-col="{ span: 24 }">
                  <a-space>
                    <a-button type="primary">查询</a-button>
                    <a-button>重置</a-button>
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <a-table :columns="TABLE_COLUMNS" :scroll="{ x: 1000, y: tableScrollY }" :data-source="DATA_SOURCE">
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">
              <a>{{ text }}</a>
            </template>
          </template>
        </a-table>
        <!--      <div style="background: #cccccc; height: 400px">-->

        <!--      </div>-->
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import {TABLE_COLUMNS, DATA_SOURCE} from '@/views/comp/data/table';

export default defineComponent({
  setup() {
    const header = ref(true);
    const full = ref(true);
    const scroll2 = ref(true);
    const cardMaxHeight = ref<string>('unset');

    const tableScrollY = ref<number | string>(0);
    const conentRef = ref();
    const resizeHandler = (resizeVal) => {
      if (conentRef.value && resizeVal && resizeVal.width > 0 && resizeVal.height > 0) {
        const tableHeight = resizeVal.height - resizeVal.searchHeight - resizeVal.theadHeight - resizeVal.pageHeight - 50; //50是上下内边距+2
        // conentRef.value.$el.style.width = resizeVal.width + 'px';
        if (scroll2.value && full.value) {
          tableScrollY.value = tableHeight < 100 ? 100 : tableHeight;
          if (tableHeight < 100) {
            cardMaxHeight.value = resizeVal.height - 60 + (100 - tableHeight) + 'px'; //100 - tableHeight表格最小高度多出的高度
          } else {
            cardMaxHeight.value = resizeVal.height - 60 + 'px'; //60是card表头高度
          }
        } else {
          tableScrollY.value = 'max-content';
          cardMaxHeight.value = 'unset';
        }
      }
    };
    watch([scroll2, header, full], (visible) => {
      conentRef.value.$el.resizeHandler(); //加v-resize指令，才会有resizeHandler方法
    });

    const onResize = (resizeVal) => {
      resizeHandler(resizeVal);
    };
    return {
      header,
      full,
      scroll2,
      TABLE_COLUMNS,
      DATA_SOURCE,
      tableScrollY,
      conentRef,
      onResize,
      cardMaxHeight,
    };
  },
  mounted() {
  },
  methods: {
    initialEvent() {
    },
  },
});
</script>

<style lang="less" scoped>
.screen-conent {
  flex: 1;
  overflow: hidden;
}
</style>
