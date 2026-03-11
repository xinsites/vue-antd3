<template>
  <div style="height: 100%">
    <x-pro-table
      ref="tableRef"
      rowKey="attachId"
      :columns="columns"
      v-model:data-source="dataSource"
      :pagination="false"
      @dropEnd="dataDragEnd"
      :select-config="{ type: 'checkbox' }"
      :drag-config="{ disabled: disabled }"
      :edit-config="{ trigger: 'dblClick', disabled: disabled, saveCancelColumn: 'operation', onSave: handleSave, rules: rules }"
      :tool-config="{ onAdd: handleAdd, addDisabled: disabled, onDelete: handleDeletes, delDisabled: disabled, isPromptDel: false, toolkit: [], toolmini: [] }"
      :scroll="{ x: 'max-content' }"
    >
      <template #toolbarL>
        <a-divider v-if="vertical" type="vertical" />
        <!--        <x-button type="primary" icon="PlusOutlined" :disabled="disabled" @click="handleAdd">新建</x-button>-->
        <!--        <x-button type="danger" icon="DeleteOutlined" :disabled="disabled" @click="handleDeletes">删除</x-button>-->
      </template>
      <template #toolkitR>
        <span style="margin-right: 10px" class="xin-text-warning" v-if="!disabled && dataSource.length > 0">双击行修改文件名</span>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'state'">
          <x-checkbox v-model:value="record.state" checkedValue="1" unCheckedValue="0" />
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="table-operation">
            <a @click="(e) => handleDownLoad(record, e)">下载</a>
            <a-divider v-if="!disabled" type="vertical" />
            <a v-if="!disabled" class="xin-text-danger" @click="(e) => handleDelete(record, e)">删除</a>
          </div>
        </template>
      </template>
    </x-pro-table>
    <div class="xin-form-validate-error">{{ errorMsg }}</div>
    <AttachForm ref="attachFormRef" :accept="accept" :maxCount="maxCount - dataSource.length" :maxSize="maxSize" :host="host" @ok="handleOk" />
  </div>
</template>

<script lang="ts">
  import { deepClone, isHttpLink, rowId, stopPropagation } from 'xin-antd3-ui';
  import {fileUrl, fileSize, fileDownload} from '@/utils/comm-util';
  import { onMounted } from 'vue';
  import { VITE_FILE_HOST } from '@/config/common';

  export default defineComponent({
    components: {
      AttachForm: defineAsyncComponent(() => import('./AttachForm.vue')),
    },
    props: {
      list: Array,
      title: String,
      //工具栏左边是否加vertical
      vertical: Boolean,
      //接受上传的文件类型
      accept: {
        type: String,
        default: '.pdf,.txt,.zip,.rar,.7z,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.git,.svg,.ico,.bmp',
      },
      //限制上传数量
      maxCount: {
        type: Number,
        default: 10,
      },
      //扩展属性：单文件上传最大限制，默认5M
      maxSize: {
        type: Number,
        default: 5 * 1024 * 1024,
      },
      host: {
        type: String,
        default: VITE_FILE_HOST,
      },
      //是否禁用
      disabled: Boolean,
      //附件Id字段配置
      attachId: {
        type: String,
        default: 'attachId',
      },
      //附件名称字段配置
      attachName: {
        type: String,
        default: 'attachName',
      },
      //附件类型字段配置
      attachType: {
        type: String,
        default: 'attachType',
      },
      //附件虚拟地址字段配置
      attachPath: {
        type: String,
        default: 'attachPath',
      },
      //附件大小字段配置
      attachSize: {
        type: String,
        default: 'attachSize',
      },
      //附件排序号字段配置
      attachSerial: {
        type: String,
        default: 'sortIdx',
      },
      //启用状态
      attachState: {
        type: String,
        default: 'attachState',
      },
      //启用状态列是否显示
      columnState: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        columns: [
          {
            title: '序号',
            width: 70,
            dataIndex: 'serial',
            rowDrag: true,
            customRender: ({ pageIndex, index }) => (pageIndex ?? 1) + index,
          },
          {
            title: '启用状态',
            width: 80,
            align: 'center',
            dataIndex: 'state',
          },
          {
            title: '文件名称',
            dataIndex: 'name',
            editRequired: true,
            editor: { maxlength: 50, placeholder: '请输入文件名称' },
          },
          {
            title: '文件类型',
            width: 180,
            dataIndex: 'type',
          },
          {
            title: '文件大小',
            width: 120,
            dataIndex: 'size',
          },
          {
            title: '操作',
            width: 120,
            align: 'center',
            fixed: 'right',
            dataIndex: 'operation',
          },
        ],
        rules: {},
      };
    },
    setup(props, { emit, slots }) {
      const tableRef = ref(null);
      const attachFormRef = ref(null);
      const errorMsg = ref('');
      const dataSource = ref([]);
      const initSource = ref([]);

      onMounted(() => {
        tableRef.value?.columnVisible('state', props.columnState);
        watch(
          () => props.list,
          (list) => {
            errorMsg.value = '';
            dataSource.value = transformList(list || []);
            initSource.value = deepClone(list || []);
          },
          {
            immediate: true,
          },
        );
      });

      const handleLoadList = (list?) => {
        errorMsg.value = '';
        dataSource.value = transformList(list || []);
      };

      const transformList = (list) => {
        const dataSource = [];
        list.forEach((item, index) => {
          dataSource.push({
            attachId: item[props.attachId],
            name: item[props.attachName],
            path: item[props.attachPath],
            size: fileSize(item[props.attachSize]),
            type: fileType(item[props.attachPath]),
            state: item[props.attachState] ?? 1,
            serial: item[props.attachSerial] ?? index + 1,
          });
        });
        return dataSource;
      };

      const handleAdd = (e) => {
        attachFormRef.value?.openDialog(props.title || '新增附件');
      };

      const handleDeletes = (selectedRows) => {
        const rowKeys = selectedRows?.map((item) => item.attachId);
        tableRef.value?.deleteRowByKeys(rowKeys);
      };

      const handleDelete = (record, e) => {
        tableRef.value?.deleteRowByKeys([record.attachId]);
      };

      const handleDownLoad = (record, e) => {
        stopPropagation(e);
        const filePath = record.path; //文件虚拟地址
        fileDownload(filePath, record.name);
        // window.open(fileUrl(filePath));
      };

      const handleOk = (fileList) => {
        if (!Array.isArray(fileList)) return;
        fileList.forEach((item, index) => {
          dataSource.value.push({
            attachId: rowId(),
            name: item.name,
            path: item.path,
            size: fileSize(item.size),
            type: fileType(item.path),
            state: 1,
            serial: item[item.serial] ?? index + 1,
          });
        });
      };

      const fileType = (path: string) => {
        if (typeof path != 'string') return 'unknown';
        const attr = path.split('.');
        if (attr.length > 0) return attr[attr.length - 1];
        return 'unknown';
      };

      const handleSave = (args) => {
        tableRef.value?.closeEditRecord(args.record); //关闭编辑行
      };

      const dataDragEnd = (args) => {
        dataSource.value = [...args.newDataSource];
      };

      /**
       * 获取验证后的有效数据
       */
      const getValidateData = async () => {
        const errors = await tableRef.value?.validate(); //校验所有编辑行
        if (errors.length > 0) {
          errorMsg.value = '数据校验不通过！';
          return null;
        } else {
          tableRef.value?.closeAllEditRecord(); //关闭所有编辑行
        }
        errorMsg.value = '';
        return getDataSource();
      };

      //列表数据重置
      const handleResetList = () => {
        dataSource.value = deepClone(initSource.value);
      };

      const getDataSource = () => {
        const list = [];
        dataSource.value.forEach((item, index) => {
          list.push(getRecord(item, index));
        });
        return list;
      };

      const getRecord = (item, index) => {
        const record = {};
        record[props.attachId] = item.attachId;
        record[props.attachName] = item.name;
        record[props.attachPath] = item.path;
        record[props.attachSize] = item.size;
        record[props.attachType] = item.type;
        record[props.attachState] = item.state;
        record[props.attachSerial] = index + 1;
        return record;
      };

      return {
        tableRef,
        attachFormRef,
        dataSource,
        handleLoadList,
        dataDragEnd,
        handleAdd,
        handleDeletes,
        handleDelete,
        handleDownLoad,
        handleSave,
        handleOk,
        getValidateData,
        handleResetList,
        errorMsg,
      };
    },

    methods: {},
  });
</script>

<style lang="less" scoped></style>
