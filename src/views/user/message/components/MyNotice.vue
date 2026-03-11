<template>
  <div class="p-16-24">
    <x-pro-table
        ref="tableRef"
        rowKey="id"
        @loaded="loaded"
        :columns="columns"
        :load-config="{ url: '/user/my/notice', params: queryParam  }"
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
          <span v-if="text === 0" class="xin-text-warning">未查看</span>
          <span v-else class="xin-text-info">已查看</span>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-space :size="2">
            <a @click="(e) => handleShow(record, e)">查看</a>
            <a-divider type="vertical"/>
            <a-button type="link" danger class="x-table-row-link" @click="(e) => handleDelete(record, e)">删除</a-button>
          </a-space>
        </template>
      </template>
    </x-pro-table>
  </div>
</template>

<script lang="ts">
  import { deepClone, SearchParam, stopPropagation } from 'xin-antd3-ui';
import {noticeColumns} from "./config/config";
import {message} from "ant-design-vue";

export default defineComponent({
  emits: ['updateUnReadNum'],
  setup(props, {emit, slots, attrs}) {
    const tableRef = ref();
    const queryParam = ref({});
    const columns = ref(deepClone(noticeColumns));

    const loaded = (success, dataSource) => {
      if (success == true) {
        emit('updateUnReadNum', 'notice', dataSource.filter((it) => it.status == 0).length);
      }
    }

    const handleQuery = (search: SearchParam) => {
      queryParam.value = search || {};
      setTimeout(() => {
        tableRef?.value?.query(1);
      }, 100)
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
      emit('updateUnReadNum', 'notice', tableRef.value?.getDataSource().filter((it) => it.status == 0).length);
    };

    const handleShow = (record, e) => {
      stopPropagation(e); //阻止冒泡事件
      message.info('点击了查看');
    };

    const handleDelete = (record, e) => {
      stopPropagation(e); //阻止冒泡事件
      message.info('点击了删除');
    };

    return {tableRef, columns, queryParam, loaded, handleQuery, handleRead, handleShow, handleDelete};
  },
  methods: {},
});
</script>

<style lang="less" scoped>
</style>
