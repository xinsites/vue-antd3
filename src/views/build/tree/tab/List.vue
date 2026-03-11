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
          :pagination="false"
          @loaded="handleLoaded"
          :tree-config="{ lazyLoad: true, pidKey: 'pid', rootPidValue: 0 }"
          :tool-config="{ onAdd: handleAdd, onDelete: handleDelete }"
          :select-config="{ type: 'checkbox', trigger: 'dblClick', onDisabled: delDisabled }"
          :scroll="{ x: 'max-content' }">
        <template #toolbarR>
          <div style="margin-left: 5px; font-size: 14px;">树选项卡编辑<b>懒加载</b>生成实例，大数据量请使用<b>懒加载</b></div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <div class="table-operation">
              <a class="xin-text-warning" @click="(e) => handleShow(e, record)">查看</a>
              <a-divider type="vertical"/>
              <a-button type="link" @click="(e) => handleAdd(e, record)">新增</a-button>
              <a-divider type="vertical"/>
              <a-button type="link" @click="(e) => handleEdit(e, record)">修改</a-button>
            </div>
          </template>
        </template>
      </x-pro-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import {getTreeAllIds, isEmptyObj, PageParam, SearchFields, SearchParam, signPushTabPage, stopPropagation} from "xin-antd3-ui";
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
        {name: '部门名称', field: 'name'},
        {name: '部门编号', field: 'code'},
        {name: '部门性质', field: 'type', xtype: 'SelectBox', inputProps: {dictKey: 'STATIC_DEPT_TYPE'}},
        {name: '电话号码', field: 'phone'},
        {name: '传真号', field: 'fax'},
        {name: '创建时间', field: 'createTime', xtype: 'DateField', inputProps: {range: true, valueFormat: 'YYYY-MM-DD HH:mm:ss'}},
      ] as SearchFields[],
      columns: [{
        title: '部门名称', dataIndex: 'name', width: 260,
      }, {
        title: '部门编号', dataIndex: 'code',
      }, {
        title: '部门性质', dataIndex: 'type', width: 140,
        customRender: ({value}) => dictStore.getText('STATIC_DEPT_TYPE', value),
      }, {
        title: '电话号码', dataIndex: 'phone',
      }, {
        title: '传真号', dataIndex: 'fax',
      }, {
        title: '创建时间', dataIndex: 'createTime', width: 180,
      }, {
        title: '操作', dataIndex: 'operation', width: 180,
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
      tableRef.value?.query();
    };

    onActivated(() => {
      if (isLocalRefresh()) {
        const rowPid = window['rowpid'] || 0;
        if (rowPid == 0) {
          tableRef.value?.refresh();
        } else {
          tableRef.value?.refreshNode(rowPid);
        }
        delete window['rowpid'];
      }
    });

    const dataSource = (pageParam: PageParam) => {
      const queryParam = getQueryParam(pageParam, searchParam.value);
      return httpRequest('/tree/tab/list', 'post', queryParam);
    };

    const handleLoaded = (success, tree) => {
      if (success && !isEmptyObj(searchParam.value?.where)) {
        tableRef.value?.setExpandedRowKeys(getTreeAllIds(tree, 'idleaf'));  //带查询条件加载树列表，展开所有结点
      }
    }

    const delDisabled = (record) => {
      return record?.children?.length > 0 || record.isLeaf === false;
    };

    const handleShow = (e, record) => {
      stopPropagation(e);
      signPushTabPage(router, {path: '/build/tree/tab/form', query: {type: 'query', id: record.idleaf}});
    };

    const handleAdd = (e, parentRow) => {
      stopPropagation(e); //阻止冒泡事件
      signPushTabPage(router, {path: '/build/tree/tab/form', query: {type: 'add', pid: parentRow?.idleaf ?? 0}});
    };

    const handleEdit = (e, record) => {
      stopPropagation(e);
      signPushTabPage(router, {path: '/build/tree/tab/form', query: {type: 'edit', id: record.idleaf}});
    };

    const handleDelete = (selectedRows, resolve, reject) => {
      const rowKeys = selectedRows?.map((item) => item.idleaf);
      httpRequest('/tree/tab/delete', 'POST', rowKeys).then((data) => {
        tableRef.value?.deleteRowByKeys(rowKeys);
        modalConfirmClose('删除成功！', resolve, reject);
      }).catch((e: Error) => {
        modalConfirmClose(e, resolve, reject);
      });
    };

    return {tableRef, dataSource, handleSearch, handleLoaded, handleShow, handleAdd, handleEdit, handleDelete, delDisabled};
  },

  methods: {},
});
</script>

<style lang="less" scoped></style>
