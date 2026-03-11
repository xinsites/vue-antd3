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
          :select-config="{ type: 'checkbox', onDisabled: delDisabled  }"
          :tool-config="{ onAdd: handleAdd,  onDelete: (selectedRows) => handleDelete(undefined, selectedRows), isPromptDel:false }"
          :edit-config="{ trigger: 'dblClick', onceRow: true, saveCancelColumn: 'operation', onSave: handleSave, rules: rules }"
          :scroll="{ x: 'max-content' }">
        <template #toolbarR>
          <span style="margin-left: 5px; font-size: 14px;">树行编辑<b>懒加载</b>生成实例，大数据量请使用<b>懒加载</b></span>
        </template>
        <template #contextmenuPopup="{ args }">
          <a-menu :selectable="false" style="width:100px;">
            <a-menu-item :disabled="addDisabled(args.record)" @click="(e) => handleAdd(e, args.record, args)">
              <x-icon icon="PlusOutlined"/>
              <span class="x-table-contextmenu-item">新增</span>
            </a-menu-item>
            <a-menu-item :disabled="args.editable()" @click="(e) => handleEdit(e, args.record, args)">
              <x-icon icon="EditOutlined"/>
              <span class="x-table-contextmenu-item">修改</span>
            </a-menu-item>
            <a-menu-item :disabled="delDisabled(args.record)" @click="(e) => handleDelete(e, [args.record], args)">
              <x-icon icon="DeleteOutlined"/>
              <span class="x-table-contextmenu-item">删除</span>
            </a-menu-item>
          </a-menu>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <div class="table-operation">
              <a-button type="link" @click="(e) => handleAdd(e, record)" :disabled="addDisabled(record)">新增</a-button>
              <a-divider type="vertical"/>
              <a-button type="link" @click="(e) => handleEdit(e, record)">修改</a-button>
              <a-divider type="vertical"/>
              <a-button type="link" danger @click="(e) => handleDelete(e, [record])" :disabled="delDisabled(record)">删除</a-button>
            </div>
          </template>
        </template>
      </x-pro-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import {message, Modal} from 'ant-design-vue/es';
import {buildNewTreeNode, dateFormat, deepClone, getTreeAllIds, isEmptyObj, PageParam, SearchFields, SearchParam, stopPropagation} from "xin-antd3-ui";
import {fieldText, getQueryParam, modalConfirmClose} from "@/utils/comm-util";
import {httpRequest} from "@/utils/request";

export default defineComponent({
  data() {
    return {
      queryData: [
        {name: '岗位名称', field: 'name'},
        {name: '岗位编号', field: 'code'},
        {name: '启用状态', field: 'state', xtype: 'RadioGroup', inputProps: {dictKey: 'STATIC_STATE'}},
        {name: '岗位描述', field: 'describe'},
        {name: '创建时间', field: 'createTime', xtype: 'DateField', inputProps: {range: true, valueFormat: 'YYYY-MM-DD HH:mm:ss'}},
      ] as SearchFields[],
      columns: [{
        title: '岗位名称', dataIndex: 'name', width: 260,
        editRequired: true, editor: {maxlength: 50, placeholder: '请输入岗位名称'},
      }, {
        title: '岗位编号', dataIndex: 'code', width: 160,
        editRequired: true, editor: {maxlength: 30, placeholder: '请输入岗位编号'},
      }, {
        title: '启用状态', dataIndex: 'state', width: 160, editRequired: true,
        editor: {xtype: 'RadioGroup', dictKey: 'STATIC_STATE', placeholder: '请选择启用状态'},
        customRender: ({record}) => fieldText(record, 'state', 'STATIC_STATE'),
      }, {
        title: '岗位描述', dataIndex: 'describe',
        editRequired: true, editor: {maxlength: 100, placeholder: '请输入岗位描述'},
      }, {
        title: '创建时间', dataIndex: 'createTime', width: 180,
      }, {
        title: '操作', dataIndex: 'operation', width: 180,
        align: 'center', fixed: 'right', settingDisabled: true,
      }],
      rules: {
        name: [
          {required: true, message: '请输入岗位名称'},
        ],
      },
    };
  },
  setup(props, {emit, slots}) {
    const tableRef = ref(null);
    const searchParam = ref({});

    const handleSearch = (search: SearchParam) => {
      searchParam.value = search || {};
      tableRef.value?.query();
    };

    const dataSource = (pageParam: PageParam) => {
      const queryParam = getQueryParam(pageParam, searchParam.value);
      return httpRequest('/tree/row/list', 'post', queryParam);
    };

    const handleLoaded = (success, tree) => {
      if (success && !isEmptyObj(searchParam.value?.where)) {
        tableRef.value?.setExpandedRowKeys(getTreeAllIds(tree, 'idleaf'));  //带查询条件加载树列表，展开所有结点
      }
    }

    const addDisabled = (record) => {
      return record?.children?.length == 0 && record.isLeaf === false;
    };

    const delDisabled = (record) => {
      return record?.children?.length > 0 || record.isLeaf === false;
    };

    const handleAdd = (e, parentRow, args) => {
      stopPropagation(e); //阻止冒泡事件
      args?.hidePopup();
      let newRow = tableRef.value?.getLastRecord({pid: 0});
      if (parentRow) {
        newRow = buildNewTreeNode(parentRow.children, parentRow, 'idleaf', 'pid');
      }
      newRow.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
      tableRef.value?.addEditRecord(newRow, parentRow);
    };

    const handleEdit = (e, record, args) => {
      stopPropagation(e); //阻止冒泡事件
      args?.hidePopup();
      tableRef.value?.openEditRecord(record);
    };

    const handleDelete = (e, selectedRows, args) => {
      stopPropagation(e);
      args?.hidePopup();
      const rowKeys = selectedRows?.map((item) => item.idleaf);
      Modal.destroyAll();
      Modal.confirm({
        title: '提示',
        content: '确认要删除记录信息吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            httpRequest('/tree/row/delete', 'POST', rowKeys).then((data) => {
              tableRef.value?.deleteRowByKeys(rowKeys);
              modalConfirmClose('删除成功！', resolve, reject);
            }).catch((e: Error) => {
              modalConfirmClose(e, resolve, reject);
            });
          }).catch(() => {
          });
        },
      });
    };

    //自定义处理保存编辑记录
    const handleSave = (args) => {
      args.showLoading(args.record);
      const newData = deepClone(args.record);
      const add = '/tree/row/add';
      const update = '/tree/row/update';
      httpRequest(newData.idleaf > 0 ? update : add, 'POST', newData).then((data) => {
        message.info('记录保存成功！');
        args.record.idleaf = data.idleaf;  //更新后端返回的主键值
        tableRef.value?.closeEditRecord(args.record);
      }).catch((e: Error) => {
        message.error(e.message);
      });
    };

    return {tableRef, dataSource, handleSearch, handleLoaded, handleAdd, handleEdit, handleDelete, handleSave, addDisabled, delDisabled};
  },
  methods: {},
});
</script>

<style lang="less" scoped></style>
