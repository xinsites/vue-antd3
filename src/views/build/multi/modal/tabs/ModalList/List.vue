<template>
  <div style="height:100%">
    <x-pro-table
        ref="tableRef"
        rowKey="id"
        :columns="columns"
        v-model:data-source="dataSource"
        :pagination="false"
        :select-config="{ type: 'checkbox', trigger: 'dblClick' }"
        :tool-config="{ onAdd: handleAdd, addDisabled: isQuery, onDelete: handleDelete, delDisabled: isQuery, isPromptDel:false, toolkit: [], toolmini:[] }"
        :scroll="{ x: 'max-content' }">
      <template #toolbarL>
        <a-divider type="vertical"/>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="table-operation">
            <a v-if="isQuery" @click="(e) => handleShow(record, e)">查看</a>
            <a v-else @click="(e) => handleEdit(record, e)">修改</a>
            <a-divider type="vertical"/>
            <a-button type="link" danger @click="(e) => handleDelete([record], e)" :disabled="isQuery">删除</a-button>
          </div>
        </template>
      </template>
    </x-pro-table>
    <div class="xin-form-validate-error">{{ errorMsg }}</div>
    <CreateForm ref="createFormRef" @ok="handleOk"/>
  </div>
</template>

<script lang="ts">
import {deepClone, stopPropagation} from "xin-antd3-ui";
import {useDictStore} from "@/store/modules/dict-store";
import {onMounted} from "vue";

export default defineComponent({
  props: {
    list: Array,
    isQuery: Boolean,
  },
  components: {
    CreateForm: defineAsyncComponent(() => import('./CreateForm.vue')),
  },
  data() {
    const dictStore = useDictStore();
    return {
      columns: [{
        title: '序号', width: 60, align: 'center', fixed: 'left',
        customRender: ({pageIndex, index}) => (pageIndex ?? 1) + index,
      }, {
        title: '办理点名称', dataIndex: 'pointName',
      }, {
        title: '所属部门', dataIndex: 'applyDept',
        customRender: ({value}) => dictStore.getText('STATIC_TEST_TREE', value),
      }, {
        title: '地址', dataIndex: 'address',
      }, {
        title: '操作', width: 120, align: 'center',
        fixed: 'right', dataIndex: 'operation',
      }],
    };
  },
  setup(props, {emit, slots}) {
    const tableRef = ref(null);
    const createFormRef = ref(null);
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

    const handleShow = (record, e) => {
      stopPropagation(e);
      createFormRef.value?.openDialog('一对多窗口编辑-查看', 'query', record);
    };

    const handleAdd = (e) => {
      createFormRef.value?.openDialog('一对多窗口编辑-新增', 'add');
    };

    const handleEdit = (record, e) => {
      stopPropagation(e);
      createFormRef.value?.openDialog('一对多窗口编辑-修改', 'edit', record);
    };

    const handleDelete = (selectedRows, e) => {
      stopPropagation(e);
      tableRef.value?.deleteRow(selectedRows);
    };

    const handleOk = (actionType, data) => {
      if (actionType == 'add') {
        dataSource.value.push({...data});
      } else {
        const index = dataSource.value.findIndex((t) => t.id == data.id);
        if (index != -1) {
          dataSource.value.splice(index, 1, {...data});
        }
      }
    };

    const getValidateData = async (formData) => {
      if (dataSource.value.length == 0) {
        errorMsg.value = '一对多窗口编辑至少输入一行！';
        return null;
      }
      errorMsg.value = '';
      return dataSource.value;
    };

    return {tableRef, dataSource, handleShow, handleAdd, handleEdit, handleDelete, createFormRef, handleOk, getValidateData, errorMsg};
  },

  methods: {},
});
</script>

<style lang="less" scoped></style>
