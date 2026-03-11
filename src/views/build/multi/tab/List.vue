<template>
  <div :class="['xin-page-full']">
    <a-card :bodyStyle="{ paddingBottom: '16px' }">
      <x-search-simple :linkType="true" buttonSite="onceRow" :collapsedRows="1" :searchData="queryData" @query="handleSearch" @reset="handleSearch"/>
    </a-card>
    <a-card style="margin-top: 12px" :body-style="{ height: '100%', padding: '16px 16px 10px 16px' }">
      <x-pro-table
          ref="tableRef"
          rowKey="idleaf"
          :columns="columns"
          :data-source="dataSource"
          :select-config="{ type: 'checkbox', trigger: 'dblClick' }"
          :tool-config="{ onAdd: handleAdd, onDelete: handleDelete }"
          :scroll="{ x: 'max-content' }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <div class="table-operation">
              <a class="xin-text-warning" @click="(e) => handleShow(record, e)">查看</a>
              <a-divider type="vertical"/>
              <a-button type="link" @click="(e) => handleEdit(record, e)">修改</a-button>
            </div>
          </template>
        </template>
      </x-pro-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import {PageParam, SearchFields, SearchParam, signPushTabPage, stopPropagation} from "xin-antd3-ui";
import {useDictStore} from "@/store/modules/dict-store";
import {getQueryParam, modalConfirmClose} from "@/utils/comm-util";
import {httpRequest} from "@/utils/request";
import {useRouter} from "vue-router";
import {isLocalRefresh} from "@/utils/tabs-util";

export default defineComponent({
  data() {
    const dictStore = useDictStore();
    return {
      queryData: [
        {name: '出差目的', field: 'purpose'},
        {name: '同行人', field: 'peers'},
        {name: '起始日期', field: 'startDate', xtype: 'DateField', inputProps: {range: true, valueFormat: 'YYYY-MM-DD'}},
        {name: '结束日期', field: 'endDate', xtype: 'DateField', inputProps: {range: true, valueFormat: 'YYYY-MM-DD'}},
        {name: '出差地点', field: 'address'},
        {name: '出差天数', field: 'days', xtype: 'NumberField', inputProps: {range: true}},
        {name: '交通工具', field: 'traffic', xtype: 'SelectBox', inputProps: {dictKey: 'STATIC_TRAFFIC'}},
        {name: '创建时间', field: 'createTime', xtype: 'DateField', inputProps: {range: true, valueFormat: 'YYYY-MM-DD HH:mm:ss'}},
      ] as SearchFields[],
      columns: [{
        title: '序号', width: 60, align: 'center', fixed: 'left',
        customRender: ({pageIndex, index}) => (pageIndex ?? 1) + index,
      }, {
        title: '出差目的', dataIndex: 'purpose',
      }, {
        title: '同行人', dataIndex: 'peers',
      }, {
        title: '起始日期', dataIndex: 'startDate',
      }, {
        title: '结束日期', dataIndex: 'endDate',
      }, {
        title: '出差天数', dataIndex: 'days',
      }, {
        title: '交通工具', dataIndex: 'traffic',
        customRender: ({value}) => dictStore.getText('STATIC_TRAFFIC', value),
      }, {
        title: '创建时间', dataIndex: 'createTime', width: 180,
      }, {
        title: '操作', dataIndex: 'operation', width: 120,
        align: 'center', fixed: 'right', settingDisabled: true,
      }],
    };
  },
  setup(props, {emit, slots}) {
    const router = useRouter();
    const tableRef = ref(null);
    const searchParam = ref({});

    const handleSearch = (search: SearchParam) => {
      searchParam.value = search || {};
      tableRef.value?.query(1);
    };

    onActivated(() => {
      if (isLocalRefresh()) {
        tableRef.value?.refresh();  //局部刷新，条件不变重新加载当前页
      }
    });

    const dataSource = (pageParam: PageParam) => {
      const queryParam = getQueryParam(pageParam, searchParam.value);
      return httpRequest('/multi/tab/page', 'post', queryParam);
    };

    const handleShow = (record, e) => {
      stopPropagation(e);
      signPushTabPage(router, {path: '/build/multi/tab/form', query: {type: 'query', id: record.idleaf}});
    };

    const handleAdd = (e) => {
      signPushTabPage(router, {path: '/build/multi/tab/form', query: {type: 'add'}});
    };

    const handleEdit = (record, e) => {
      stopPropagation(e);
      signPushTabPage(router, {path: '/build/multi/tab/form', query: {type: 'edit', id: record.idleaf}});
    };

    const handleDelete = (selectedRows, resolve, reject) => {
      const rowKeys = selectedRows?.map((item) => item.idleaf);
      httpRequest('/multi/tab/delete', 'POST', rowKeys).then((data) => {
        tableRef.value?.refresh();
        modalConfirmClose('删除成功！', resolve, reject);
      }).catch((e: Error) => {
        modalConfirmClose(e, resolve, reject);
      });
    };

    return {tableRef, dataSource, handleSearch, handleShow, handleAdd, handleEdit, handleDelete};
  },

  methods: {},
});
</script>

<style lang="less" scoped></style>
