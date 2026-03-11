<template>
  <div class="page-component">
    <a-card :body-style="{ padding: '5px 16px' }">
      <div class="f_s_b">
        <a-radio-group v-model:value="value" button-style="solid">
          <a-radio-button value="0">全部</a-radio-button>
          <a-radio-button value="1">审批通过</a-radio-button>
          <a-radio-button value="2">暂存</a-radio-button>
          <a-radio-button value="3">条件查询</a-radio-button>
        </a-radio-group>

        <a-button type="primary">
          <template #icon>
            <x-icon icon="plus-outlined"/>
          </template>
          <b>v-fit</b>指令运用
        </a-button>
      </div>
    </a-card>
    <div :class="['xin-page-full']">
      <a-card :bordered="false" :body-style="{ height: '100%', padding: '16px' }" ref="conentRef">
        <div style="height: 100%; display: flex">
          <x-split-panel
              space="16px"
              :resizable="false"
              :vertical="true"
              :collapse="value != 3"
              :allowCollapse="true"
              :animation="false"
              :sizeAuto="true"
              :sider-style="{
            border: 'dashed 1px var(--border-color-base)',
          }"
              :content-style="{
            border: 'dashed 1px var(--border-color-base)',
          }"
          >
            <div :style="{ padding: '16px', background: '#f1f1f1', height: `${cardHeight}px` }">
              <a-form-item label="高度">
                <a-input-number style="width: 100px" :min="20" :max="300" :step="10" v-model:value="cardHeight"/>
              </a-form-item>
            </div>
            <template #content>
              <!--            <div style="height: 100%; background: #eeeeee">内容二</div>-->
              <a-table
                  v-fit="{ resizeCss: 'xin-split-panel-wrap', scrollCss: 'ant-table-body', subHeight: 55 + 64, minHeight: 55 }"
                  :columns="TABLE_COLUMNS"
                  :scroll="{ x: 1500, y: '' }"
                  :data-source="DATA_SOURCE"
                  :pagination="pagination"
                  @change="onShowSizeChange"
              >
                <template #bodyCell="{ column, text }">
                  <template v-if="column.dataIndex === 'name'">
                    <a>{{ text }}</a>
                  </template>
                </template>
              </a-table>
            </template>
          </x-split-panel>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import {TABLE_COLUMNS, DATA_SOURCE} from '@/views/comp/data/table';

export default defineComponent({
  setup() {
    const header = ref(true);
    const full = ref(true); //内容块满屏
    const scroll = ref(true);
    const cardHeight = ref(100);
    for (let i = 0; i < 12; i++) {
      const rowInfo = {...DATA_SOURCE[0]};
      rowInfo.key = i + '2';
      DATA_SOURCE.push(rowInfo);
    }

    const onShowSizeChange = (current, pageSize) => {
      // pagination.current = current.current ? current.current : 1;
      // pagination.pageSize = current.pageSize;
    };

    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: DATA_SOURCE.length,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showTotal: (total) => `共有 ${total} 条数据`,
    });

    const value = ref('3');
    return {
      header,
      full,
      scroll,
      value,
      TABLE_COLUMNS,
      DATA_SOURCE,
      pagination,
      cardHeight,
      onShowSizeChange,
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
