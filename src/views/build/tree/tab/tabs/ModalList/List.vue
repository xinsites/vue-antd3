<template>
  <div style="height:100%;">
    <x-pro-table
        ref="tableRef"
        rowKey="id"
        :columns="columns"
        :pagination="false"
        v-model:data-source="dataSource"
        :tree-config="{ pidKey: 'pid', rootPidValue: 0, defaultExpandAllRows: true }"
        :select-config="{ type: 'checkbox', trigger: 'dblClick', onDisabled: delDisabled }"
        :tool-config="{ onAdd: handleAdd, addDisabled: isQuery, onDelete: handleDelete, delDisabled: isQuery, isPromptDel:false, toolkit: [], toolmini:[] }"
        :scroll="{ x: 'max-content' }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="table-operation">
            <a class="xin-text-warning" @click="(e) => handleShow(record, e)">查看</a>
            <a-divider type="vertical"/>
            <a-button type="link" @click="(e) => handleAdd(e, record)" :disabled="isQuery">新增</a-button>
            <a-divider type="vertical"/>
            <a-button type="link" @click="(e) => handleEdit(e, record)" :disabled="isQuery">修改</a-button>
          </div>
        </template>
      </template>
    </x-pro-table>
    <div class="xin-form-validate-error">{{ errorMsg }}</div>
    <CreateForm ref="createFormRef" :treeList="dataSource" @ok="handleOk"/>
  </div>
</template>

<script lang="ts">
import {deepClone, getTreeNode, isEmpty, stopPropagation} from "xin-antd3-ui";
import {useDictStore} from "@/store/modules/dict-store";
import {message} from "ant-design-vue";
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
        title: '办理点名称', dataIndex: 'pointName',
      }, {
        title: '所属区县', dataIndex: 'county',
      }, {
        title: '所属部门', dataIndex: 'applyDept',
        customRender: ({value}) => dictStore.getText('STATIC_TEST_TREE', value),
      }, {
        title: '地址', dataIndex: 'address',
      }, {
        title: '操作', width: 160, align: 'center',
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

    const delDisabled = (record) => {
      return record?.children?.length > 0;
    };

    const handleShow = (record, e) => {
      stopPropagation(e);
      createFormRef.value?.openDialog('树窗口编辑-查看', 'query', record);
    };

    const handleAdd = (e, parentRow) => {
      stopPropagation(e);
      createFormRef.value?.openDialog('树窗口编辑-新增', 'add', parentRow);
    };

    const handleEdit = (e, record) => {
      stopPropagation(e);
      createFormRef.value?.openDialog('树窗口编辑-修改', 'edit', record);
    };

    const handleDelete = (selectedRows, e) => {
      stopPropagation(e);
      tableRef.value?.deleteRow(selectedRows);
    };

    const handleOk = (actionType, data) => {
      if (actionType == 'add') {
        if (isEmpty(data.pid)) {
          const newData = {...data};
          newData.pid = 0;
          tableRef.value?.addRecord(newData);
        } else {
          const parentRow = getTreeNode(dataSource.value, data.pid);
          tableRef.value?.addRecord({...data}, parentRow);
        }
      } else {
        const record = getTreeNode(dataSource.value, data.id);
        if (record) {
          Object.assign(record, data);
        }
      }
    };

    const getValidateData = async (formData) => {
      errorMsg.value = '';
      if (dataSource.value.length == 0) {
        errorMsg.value = '树窗口编辑至少输入一行！';
      }

      if (errorMsg.value) {
        message.error('【树窗口编辑】数据校验不通过！');
        return null;
      }

      return dataSource.value;
    };

    return {tableRef, dataSource, handleShow, handleAdd, handleEdit, handleDelete, delDisabled, createFormRef, handleOk, getValidateData, errorMsg};
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
