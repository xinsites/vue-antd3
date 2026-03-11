<template>
  <div class="page-component">
    <a-page-header :ghost="false" title="自定义指令v-resize实现" :style="{ display: header ? '' : 'none' }">
      <div class="xin-page-sub-header xin-text-secondary">
        所有内容块高度和 <b>&lt;</b> 内容屏幕高度，最后内容块填充满屏，当选择表格加滚动条，内容屏不会出现滚动条，除非达到表格最小高度(最小高度100px)
      </div>
    </a-page-header>
    <div :class="[full ? 'xin-page-full' : 'xin-page', 'vertical-layout']">
      <a-card :bodyStyle="{ padding: '12px' }">
        <div class="table-page-search">
          <a-form layout="inline" :labelCol="{ style: 'min-width: 110px;max-width: 140px;' }">
            <a-row :gutter="48">
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
                <a-form-item label="表格加滚动条">
                  <a-switch v-model:checked="scroll" :disabled="!full"/>
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
      </a-card>
      <a-card style="margin-top: 12px" :body-style="{ height: '100%', padding: '16px 16px 10px 16px' }" ref="conentRef" v-resize="onResize">
        <!--      <div style="height: 100%; background: #eeeeee">内容二</div>-->
        <a-table v-show="true" :columns="TABLE_COLUMNS" :scroll="{ x: 1500, y: tableScrollY }" :data-source="DATA_SOURCE">
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">
              <a>{{ text }}</a>
            </template>
          </template>
        </a-table>
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
    const scroll = ref(true);

    const tableScrollY = ref<number | string>(0);
    const conentRef = ref();
    const resizeHandler = (resizeVal) => {
      if (conentRef.value && resizeVal && resizeVal.height > 0) {
        const tableHeight = resizeVal.height - resizeVal.theadHeight - resizeVal.pageHeight - 50 + 22; //50是上下内边距+2
        if (scroll.value && full.value) {
          tableScrollY.value = tableHeight < 100 ? 100 : tableHeight;
        } else {
          tableScrollY.value = 'max-content';
        }
      }
    };
    watch([scroll, header, full], (visible) => {
      conentRef.value.$el.resizeHandler(); //加v-resize指令，才会有resizeHandler方法
    });

    const onResize = (resizeVal) => {
      resizeHandler(resizeVal);
    };
    return {
      header,
      full,
      scroll,
      DATA_SOURCE,
      TABLE_COLUMNS,
      tableScrollY,
      conentRef,
      onResize,
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
