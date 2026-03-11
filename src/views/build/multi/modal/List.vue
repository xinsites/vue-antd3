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
    <CreateForm ref="createFormRef" @ok="handleOk"/>
  </div>
</template>

<script lang="ts">
import {PageParam, SearchFields, SearchParam, stopPropagation} from "xin-antd3-ui";
import {useDictStore} from "@/store/modules/dict-store";
import {getQueryParam, modalConfirmClose} from "@/utils/comm-util";
import {httpRequest} from "@/utils/request";

export default defineComponent({
  components: {
    CreateForm: defineAsyncComponent(() => import('./CreateForm.vue')),
  },
  data() {
    const dictStore = useDictStore();
    return {
      queryData: [
        {name: '事项名称', field: 'itemName'},
        {name: '分项名称', field: 'subName'},
        {name: '报送人', field: 'submitMan'},
        {name: '事项编号', field: 'itemSerial'},
        {name: '事项分类', field: 'itemType', xtype: 'SelectBox', inputProps: {dictKey: 'STATIC_ITEM_TYPE'}},
        {name: '创建时间', field: 'createTime', xtype: 'DateField', inputProps: {range: true, valueFormat: 'YYYY-MM-DD HH:mm:ss'}},
      ] as SearchFields[],
      columns: [{
        title: '序号', width: 60, align: 'center', fixed: 'left',
        customRender: ({pageIndex, index}) => (pageIndex ?? 1) + index,
      }, {
        title: '事项名称', dataIndex: 'itemName',
      }, {
        title: '分项名称', dataIndex: 'subName',
      }, {
        title: '报送人', dataIndex: 'submitMan',
      }, {
        title: '事项编号', dataIndex: 'itemSerial',
      }, {
        title: '事项分类', dataIndex: 'itemType', width: 200,
        customRender: ({value}) => dictStore.getText('STATIC_ITEM_TYPE', value),
      }, {
        title: '创建时间', dataIndex: 'createTime', width: 180,
      }, {
        title: '操作', dataIndex: 'operation', width: 120,
        align: 'center', fixed: 'right', settingDisabled: true,
      }],
    };
  },
  setup(props, {emit, slots}) {
    const tableRef = ref(null);
    const createFormRef = ref(null);
    const searchParam = ref({});

    const handleSearch = (search: SearchParam) => {
      searchParam.value = search || {};
      tableRef.value?.query(1);
    };

    const dataSource = (pageParam: PageParam) => {
      const queryParam = getQueryParam(pageParam, searchParam.value);
      return httpRequest('/multi/modal/page', 'post', queryParam);
    };

    const handleShow = (record, e) => {
      stopPropagation(e);
      createFormRef.value?.openDialog('多表窗口-查看', 'query', record);
    };

    const handleAdd = (e) => {
      createFormRef.value?.openDialog('多表窗口-新增', 'add');
    };

    const handleEdit = (record, e) => {
      stopPropagation(e);
      createFormRef.value?.openDialog('多表窗口-修改', 'edit', record);
    };

    const handleDelete = (selectedRows, resolve, reject) => {
      const rowKeys = selectedRows?.map((item) => item.idleaf);
      httpRequest('/multi/modal/delete', 'POST', rowKeys).then((data) => {
        tableRef.value?.refresh();
        modalConfirmClose('删除成功！', resolve, reject);
      }).catch((e: Error) => {
        modalConfirmClose(e, resolve, reject);
      });
    };

    const handleOk = () => {
      tableRef.value?.refresh();
    };

    return {tableRef, dataSource, handleSearch, handleShow, handleAdd, handleEdit, handleDelete, createFormRef, handleOk};
  },

  methods: {},
});
</script>

<style lang="less" scoped></style>
