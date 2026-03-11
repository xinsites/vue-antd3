<template>
  <div style="height:100%">
    <x-pro-table
        ref="tableRef"
        rowKey="id"
        :columns="columns"
        :pagination="false"
        v-model:data-source="dataSource"
        :select-config="{ type: 'checkbox', onDisabled: delDisabled }"
        :tree-config="{ pidKey: 'pid', rootPidValue: 0, defaultExpandAllRows: true }"
        :edit-config="{ trigger: 'dblClick', disabled: isQuery, onceRow: true, saveCancelColumn: 'operation', onSave: handleSave, rules: rules }"
        :tool-config="{ onAdd: handleAdd, addDisabled: isQuery, onDelete: handleDelete, delDisabled: isQuery, isPromptDel:false, toolkit: [], toolmini:[] }"
        :scroll="{ x: 'max-content'  }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="table-operation">
            <a-button type="link" @click="(e) => handleAdd(e, record)" :disabled="addDisabled(record)">新增</a-button>
            <a-divider type="vertical"/>
            <a-button type="link" @click="(e) => handleEdit(record, e)" :disabled="isQuery">修改</a-button>
            <a-divider type="vertical"/>
            <a-button type="link" danger @click="(e) => handleDelete([record], e)" :disabled="delDisabled(record)">删除</a-button>
          </div>
        </template>
      </template>
    </x-pro-table>
    <div class="xin-form-validate-error">{{ errorMsg }}</div>
  </div>
</template>

<script lang="ts">
import {buildNewTreeNode, dateFormat, deepClone, stopPropagation} from "xin-antd3-ui";
import {ruleCheck} from "xin-antd3-ui";
import {message} from "ant-design-vue";
import {onMounted} from "vue";

export default defineComponent({
  props: {
    list: Array,
    isQuery: Boolean,
  },
  data() {
    return {
      columns: [{
        title: '入住城市', dataIndex: 'city',
        editRequired: true, editor: {maxlength: 30, placeholder: '请输入入住城市'},
      }, {
        title: '酒店名称', dataIndex: 'hotel',
        editRequired: true, editor: {maxlength: 30, placeholder: '请输入酒店名称'},
      }, {
        title: '开始日期', width: '20%', dataIndex: 'startDate',
        editRequired: true, editor: {xtype: 'DateField', maxDateKey: 'endDate', type: 'date'},
      }, {
        title: '结束日期', width: '20%', dataIndex: 'endDate',
        editRequired: true, editor: {xtype: 'DateField', minDateKey: 'startDate', type: 'date'},
      }, {
        title: '操作', width: 160, align: 'center',
        fixed: 'right', dataIndex: 'operation',
      }],
      rules: {
        name: [{validator: ruleCheck.isChinese, message: '请输入中文！'}],
      },
    };
  },
  setup(props, {emit, slots}) {
    const tableRef = ref(null);
    const errorMsg = ref('');
    const dataSource = ref([]);

    onMounted(() => {
      watch(() => props.list,
          (list) => {
            errorMsg.value = '';
            dataSource.value = deepClone(list || []);
          }, {
            immediate: true,
          },
      );
    });

    const addDisabled = (record) => {
      return record?.children?.length == 0 || props.isQuery;
    };

    const delDisabled = (record) => {
      return record?.children?.length > 0 || props.isQuery;
    };

    const handleAdd = (e, parentRow) => {
      stopPropagation(e); //阻止冒泡事件
      let newRow = tableRef.value?.getLastRecord({pid: 0, city: "上海32", hotel: "酒店名称32", startDate: "2020-09-10", endDate: "2020-12-14"});
      if (parentRow) {
        newRow = buildNewTreeNode(parentRow.children, parentRow, 'idleaf', 'pid');
      }
      tableRef.value?.addEditRecord(newRow, parentRow);
    };

    const handleEdit = (record, e) => {
      stopPropagation(e);
      tableRef.value?.openEditRecord(record);
    };

    const handleDelete = (selectedRows, e) => {
      stopPropagation(e);
      tableRef.value?.deleteRow(selectedRows);
    };

    const handleSave = (args) => {
      tableRef.value?.closeEditRecord(args.record); //关闭编辑行
    }

    const getValidateData = async (formData) => {
      errorMsg.value = '';
      if (dataSource.value.length == 0) {
        errorMsg.value = '一对多行编辑至少输入一行！';
      }

      const errors = await tableRef.value?.validate(); //校验所有编辑行
      if (errors.length > 0) {
        errorMsg.value = '数据校验不通过！';
      } else {
        tableRef.value?.closeAllEditRecord(); //关闭所有编辑行
      }

      if (errorMsg.value) {
        message.error('【一对多行编辑】数据校验不通过！');
        return null;
      }
      return dataSource.value;
    };

    return {tableRef, dataSource, handleAdd, handleEdit, handleDelete, handleSave, addDisabled, delDisabled, getValidateData, errorMsg};
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
