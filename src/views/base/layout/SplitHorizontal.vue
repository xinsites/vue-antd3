<template>
  <div class="page-component">
    <a-page-header :ghost="false" title="自定义指令v-fit实现" :style="{ display: header ? '' : 'none' }">
      <div class="xin-page-sub-header horizontal-layout" :style="{ height: `${cardHeight3}px` }">
        <div>使用自定义组件SplitPanel+自定义<b>v-fit</b>指令运用</div>
        <div style="margin-left: 50px">
          <a-form-item label="高度">
            <a-input-number style="width: 100px" :min="20" :max="100" :step="10" v-model:value="cardHeight3"/>
          </a-form-item>
        </div>
      </div>
    </a-page-header>
    <div :class="['xin-page-full']">
      <a-card :bordered="false" :body-style="{ height: '100%', padding: '16px' }">
        <div style="height: 100%; display: flex">
          <x-split-panel
              space="16px"
              :resizable="true"
              :vertical="false"
              :allowCollapse="true"
              :reverse="false"
              :sider-style="{
            border: 'dashed 1px #d9d9d9',
          }"
              :content-style="{
            border: 'dashed 1px #d9d9d9',
          }"
              :animation="true"
              :sizeAuto="false"
              :style="{ display: '' }"
          >
            <div class="vertical-layout" v-fit="{ scrollCss: 'left-scroll', resizeCss: 'horizontal-layout', subHeight: 50, minHeight: 0 }">
              <div style="height: 50px; background: #d2d2d2">aaaaaaa</div>
              <div class="left-scroll" style="width: 100%">
                <div :style="{ padding: '16px', background: '#f1f1f1', width: `100%`, height: `${cardHeight}px` }">
                  <a-form-item label="高度">
                    <a-input-number style="width: 100px" :min="20" :max="1800" :step="10" v-model:value="cardHeight"/>
                  </a-form-item>
                </div>
              </div>
            </div>

            <template #content>
              <!--            <div class="content-layout" v-fit="{}" style="height: 100%; background: #f1f1f1">内容二</div>-->
              <div class="vertical-layout" style="height: 100%; width: 100%">
                <div class="table-page-search" :style="{ padding: '16px', background: '#f1f1f1', width: `100%`, height: `${cardHeight2}px` }">
                  <a-form layout="inline" :labelCol="{ style: 'min-width: 110px;max-width: 140px;' }">
                    <a-row :gutter="48">
                      <a-col :xl="7" :lg="24">
                        <a-form-item label="显示PageHeader">
                          <a-switch v-model:checked="header"/>
                        </a-form-item>
                      </a-col>
                      <a-col :xl="7" :lg="24">
                        <a-form-item label="高度">
                          <a-input-number style="width: 100px" :min="20" :max="300" :step="10" v-model:value="cardHeight2"/>
                        </a-form-item>
                      </a-col>
                      <a-col :xl="10" :lg="24">
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
                <div style="overflow: hidden; flex: 1; width: 100%">
                  <a-table
                      :columns="TABLE_COLUMNS"
                      v-fit="{ scrollCss: 'ant-table-body', resizeCss: 'table-page-search', subHeight: 55 + 64, minHeight: 110 }"
                      :scroll="{ x: 1000, y: '' }"
                      :data-source="DATA_SOURCE"
                  >
                    <template #bodyCell="{ column, text }">
                      <template v-if="column.dataIndex === 'name'">
                        <a>{{ text }}</a>
                      </template>
                    </template>
                  </a-table>
                </div>
              </div>
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
    const cardHeight = ref(300);
    const cardHeight2 = ref(90);
    const cardHeight3 = ref(40);
    for (let i = 0; i < 12; i++) {
      const rowInfo = {...DATA_SOURCE[0]};
      rowInfo.key = i + '2';
      DATA_SOURCE.push(rowInfo);
    }

    return {
      header,
      TABLE_COLUMNS,
      DATA_SOURCE,
      cardHeight,
      cardHeight2,
      cardHeight3,
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
