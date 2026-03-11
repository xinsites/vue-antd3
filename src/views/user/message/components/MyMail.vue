<template>
  <div class="p-16-24">
    <x-pro-table
        ref="tableRef"
        rowKey="id"
        :columns="columns"
        @loaded="loaded"
        :data-source="dataSource"
        :select-config="{ type: 'checkbox', trigger: 'dblClick'  }"
        :scroll="{ x: 'max-content' }">
      <template #toolbar>
        <a-space>
          <x-search-simple @query="handleQuery" :fast-config="{ fastField: 'title', dateField: 'time', button:'发送时间' }"/>
          <a-button @click="handleRead">标记已读</a-button>
        </a-space>
      </template>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'status'">
          <span v-if="text === 0" class="xin-text-warning"> 未读 </span>
          <span v-else class="xin-text-info"> 已读</span>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-space :size="2">
            <a @click="(e) => handleReply(record, e)">回复</a>
            <a-divider type="vertical"/>
            <a-button type="link" danger class="x-table-row-link" @click="(e) => handleDelete(record, e)">删除</a-button>
          </a-space>
        </template>
      </template>
    </x-pro-table>
  </div>
</template>

<script lang="ts">
  import { deepClone, PageParam, SearchParam, stopPropagation } from 'xin-antd3-ui';
import {mailColumns} from "./config/config";
import {getMyMailPageAPI} from "@/api/common/login-api";
import {message} from "ant-design-vue";
  import { getQueryParam } from '@/utils/comm-util';

export default defineComponent({
  emits: ['updateUnReadNum'],
  setup(props, {emit, slots, attrs}) {
    const tableRef = ref();
    const searchParam = ref({});
    const columns = ref(deepClone(mailColumns));

    const dataSource = (pageParam: PageParam) => {
      const queryParam = getQueryParam(pageParam, searchParam.value);
      return getMyMailPageAPI(queryParam);
    };

    const loaded = (success, dataSource) => {
      if (success == true) {
        emit('updateUnReadNum', 'mail', dataSource.filter((it) => it.status == 0).length);
      }
    }

    const handleQuery = (search: SearchParam) => {
      searchParam.value = search || {};
      tableRef?.value?.query(1);
    };

    /* 标记已读 */
    const handleRead = () => {
      const selectedRows = tableRef.value?.getSelectedRows();
      if (!selectedRows.length) {
        message.error('请选择要标记的记录！');
        return;
      }
      selectedRows.forEach((d) => {
        d.status = 1;
      });
      emit('updateUnReadNum', 'mail', tableRef.value?.getDataSource().filter((it) => it.status == 0).length);
    };

    const handleReply = (record, e) => {
      stopPropagation(e); //阻止冒泡事件
      message.info('点击了回复');
    };

    const handleDelete = (record, e) => {
      stopPropagation(e); //阻止冒泡事件
      message.info('点击了删除');
    };
    return {tableRef, columns, loaded, dataSource, handleQuery, handleRead, handleReply, handleDelete};
  },
  methods: {},
});
</script>

<style lang="less" scoped>
</style>
