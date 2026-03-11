<template>
  <div style="height:100%">
    <x-pro-table
        ref="tableRef"
        rowKey="id"
        :columns="columns"
        v-model:data-source="dataSource"
        :pagination="false"
        :select-config="{ type: 'checkbox' }"
        :edit-config="{ trigger: 'dblClick', disabled: isQuery, onceRow: true, saveCancelColumn: 'operation', onSave: handleSave, rules: rules }"
        :tool-config="{ onAdd: handleAdd, addDisabled: isQuery, onDelete: handleDelete, delDisabled: isQuery, isPromptDel:false, toolkit: [], toolmini:[] }"
        :scroll="{ x: 'max-content'  }">
      <template #toolbarL>
        <a-divider type="vertical"/>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="table-operation">
            <a-button type="link" @click="(e) => handleEdit(record, e)" :disabled="isQuery">修改</a-button>
            <a-divider type="vertical"/>
            <a-button type="link" danger @click="(e) => handleDelete([record], e)" :disabled="isQuery">删除</a-button>
          </div>
        </template>
      </template>
    </x-pro-table>
    <div class="xin-form-validate-error">{{ errorMsg }}</div>
  </div>
</template>

<script lang="ts">
import {deepClone, stopPropagation, ruleCheck} from "xin-antd3-ui";
import {onMounted} from "vue";

export default defineComponent({
  props: {
    list: Array,
    isQuery: Boolean,
  },
  data() {
    return {
      columns: [{
        title: '序号', width: 60, align: 'center', fixed: 'left',
        customRender: ({pageIndex, index}) => (pageIndex ?? 1) + index,
      }, {
        title: '名称', dataIndex: 'name',
        editRequired: true, editor: {maxlength: 30, placeholder: '请输入名称'},
      }, {
        title: '地址', width: '25%', dataIndex: 'address',
        editRequired: true, editor: {maxlength: 30, placeholder: '请输入地址'},
      }, {
        title: '开始日期', width: 140, dataIndex: 'startDate',
        editRequired: true, editor: {xtype: 'DateField', maxDateKey: 'endDate', type: 'date'},
      }, {
        title: '结束日期', width: 140, dataIndex: 'endDate',
        editRequired: true, editor: {xtype: 'DateField', minDateKey: 'startDate', type: 'date'},
      }, {
        title: '操作', width: 100, align: 'center',
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

    const handleAdd = (e) => {
      const newRow = tableRef.value?.getLastRecord({name: '新建名称', address: '新建地址'});
      tableRef.value?.addEditRecord(newRow);
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
      if (dataSource.value.length == 0) {
        errorMsg.value = '一对多行编辑至少输入一行！';
        return null;
      }

      const errors = await tableRef.value?.validate(); //校验所有编辑行
      if (errors.length > 0) {
        errorMsg.value = '数据校验不通过！';
        return null;
      } else {
        tableRef.value?.closeAllEditRecord(); //关闭所有编辑行
      }
      errorMsg.value = '';
      return dataSource.value;
    };

    return {tableRef, dataSource, handleAdd, handleEdit, handleDelete, handleSave, getValidateData, errorMsg};
  },

  methods: {},
});
</script>

<style lang="less" scoped></style>
