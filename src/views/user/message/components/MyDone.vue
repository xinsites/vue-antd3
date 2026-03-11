<template>
  <div class="p-16-24">
    <x-pro-table
      ref="tableRef"
      rowKey="statusId"
      :columns="columns"
      :data-source="dataSource"
      :scroll="{ x: 'max-content' }">
      <template #toolbar>
        <x-search-simple @query="handleQuery" :fast-config="{ fastField: 'title', dateField: 'createTime', button:'申请日期' }" />
      </template>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'taskStatusText'">
          <span v-if="text === '审批中'" class="xin-text-primary"> 审批中 </span>
          <span v-else class="xin-text-success"> {{ text }} </span>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <div class="table-operation">
            <a @click="handleShow(record)">查看</a>
          </div>
        </template>
      </template>
    </x-pro-table>
  </div>
</template>

<script lang="ts">
  import { deepClone, PageParam, SearchParam } from 'xin-antd3-ui';
  import { flowColumns } from './config/config';
  import { getMyDonePageAPI } from '@/api/common/login-api';
  import { message } from 'ant-design-vue';
  import { getQueryParam } from '@/utils/comm-util';

  export default defineComponent({
    setup(props, { emit, slots, attrs }) {
      const tableRef = ref();
      const searchParam = ref({});
      const columns = ref(deepClone(flowColumns));

      const dataSource = (pageParam: PageParam) => {
        const queryParam = getQueryParam(pageParam, searchParam.value);
        return getMyDonePageAPI(queryParam);
      };

      const handleQuery = (search: SearchParam) => {
        searchParam.value = search || {};
        tableRef?.value?.query(1);
      };

      const handleShow = (record) => {
        message.info('点击了查看');
      };

      return { tableRef, columns, dataSource, handleQuery, handleShow };
    },
    methods: {},
  });
</script>

<style lang="less" scoped>
</style>
