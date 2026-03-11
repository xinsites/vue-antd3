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
          :select-config="{ type: 'checkbox' }"
          :tool-config="{ onAdd: handleAdd, onDelete: handleDelete,  isPromptDel:false }"
          :edit-config="{ trigger: 'dblClick', onceRow: true, saveCancelColumn: 'operation', onSave: handleSave, rules: rules }"
          :scroll="{ x: 'max-content' }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <div class="table-operation">
              <a-button type="link" @click="(e) => handleEdit(record, e)">修改</a-button>
              <a-divider type="vertical"/>
              <a-button type="link" danger @click="(e) => handleDelete([record], e)">删除</a-button>
            </div>
          </template>
        </template>
      </x-pro-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import {message, Modal} from 'ant-design-vue/es';
import {dateFormat, deepClone, PageParam, SearchFields, SearchParam, stopPropagation, ruleCheck} from "xin-antd3-ui";
import {fieldText, getQueryParam, modalConfirmClose} from "@/utils/comm-util";
import {httpRequest} from "@/utils/request";

export default defineComponent({
  data() {
    return {
      queryData: [
        {name: '标题', field: 'title'},
        {name: '主题词', field: 'word'},
        {name: '分类', field: 'classify', xtype: 'SelectBox', inputProps: {dictKey: 'STATIC_DEMO_FORM_TYPE'}},
        {name: '形式', field: 'media', xtype: 'SelectBox', inputProps: {dictKey: 'STATIC_DEMO_FORM_MEDIA'}},
        {name: '宣传日期', field: 'advertDate', xtype: 'DateField', inputProps: {range: true, valueFormat: 'YYYY-MM-DD'}},
        {name: '是否有存档', field: 'isFile', xtype: 'SelectBox', inputProps: {dictKey: 'STATIC_YESNO'}},
        {name: '创建时间', field: 'createTime', xtype: 'DateField', inputProps: {range: true, valueFormat: 'YYYY-MM-DD HH:mm:ss'}},
      ] as SearchFields[],
      columns: [{
        title: '序号', width: 60, align: 'center', fixed: 'left',
        customRender: ({pageIndex, index}) => (pageIndex ?? 1) + index,
      }, {
        title: '标题', dataIndex: 'title', width: 200,
        editRequired: true, editor: {maxlength: 50, placeholder: '请输入标题'},
      }, {
        title: '主题词', dataIndex: 'word', width: 200,
        editRequired: true, editor: {maxlength: 50, placeholder: '请输入主题词'},
      }, {
        title: '分类', dataIndex: 'classify', width: 180, editRequired: true,
        editor: {xtype: 'SelectBox', dictKey: 'STATIC_DEMO_FORM_TYPE', placeholder: '请选择分类'},
        customRender: ({record}) => fieldText(record, 'classify', 'STATIC_DEMO_FORM_TYPE'),
      }, {
        title: '媒体形式', dataIndex: 'media', width: '18%', editRequired: true,
        editor: {xtype: 'SelectBox', mode: 'multiple', dictKey: 'STATIC_DEMO_FORM_MEDIA', placeholder: '请选择媒体形式'},
        customRender: ({record}) => fieldText(record, 'media', 'STATIC_DEMO_FORM_MEDIA'),
      }, {
        title: '宣传日期', dataIndex: 'advertDate', width: 120, editRequired: true,
        editor: {xtype: 'DateField', type: 'date'},
      }, {
        title: '是否有存档', dataIndex: 'isFile', width: 160, align: 'center',
        editRequired: true, editor: {xtype: 'SelectBox', dictKey: 'STATIC_YESNO', placeholder: '是否有存档'},
        customRender: ({record}) => fieldText(record, 'isFile', 'STATIC_YESNO'),
      }, {
        title: '创建时间', dataIndex: 'createTime', width: 180,
      }, {
        title: '操作', dataIndex: 'operation', width: 120,
        align: 'center', fixed: 'right', settingDisabled: true,
      }],
      rules: {
        title: [
          {required: true, message: '请输入标题'}, //editRequired: true,配置后可以省去
        ],
        word: [{validator: ruleCheck.isChinese, message: '请输入中文！'}],
      },
    };
  },
  setup(props, {emit, slots}) {
    const tableRef = ref(null);
    const searchParam = ref({});

    const handleSearch = (search: SearchParam) => {
      searchParam.value = search || {};
      tableRef.value?.query(1);
    };

    const dataSource = (pageParam: PageParam) => {
      const queryParam = getQueryParam(pageParam, searchParam.value);
      return httpRequest('/single/row/page', 'post', queryParam);
    };

    const handleAdd = (e) => {
      const newRow = tableRef.value?.getLastRecord({});
      newRow.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
      tableRef.value?.addEditRecord(newRow);
    };

    const handleEdit = (record, e) => {
      stopPropagation(e); //阻止冒泡事件
      tableRef.value?.openEditRecord(record);
    };

    const handleDelete = (selectedRows, e) => {
      stopPropagation(e);
      onDeletes(selectedRows?.map((item) => item.idleaf));
    };

    const onDeletes = (rowKeys) => {
      Modal.destroyAll();
      Modal.confirm({
        title: '提示',
        content: '确认要删除记录信息吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            httpRequest('/single/row/delete', 'POST', rowKeys).then((data) => {
              tableRef.value?.refresh();
              modalConfirmClose('删除成功！', resolve, reject);
            }).catch((e: Error) => {
              modalConfirmClose(e, resolve, reject);
            });
          }).catch(() => {
          });
        },
      });
    }

    //自定义处理保存编辑记录
    const handleSave = (args) => {
      args.showLoading(args.record);
      const newData = deepClone(args.record);
      const add = '/single/row/add';
      const update = '/single/row/update';
      console.log('handleSave=======', newData)
      httpRequest(newData.idleaf > 0 ? update : add, 'POST', newData).then((data) => {
        message.info('记录保存成功！');
        args.record.idleaf = data.idleaf;
        tableRef.value?.closeEditRecord(args.record);
      }).catch((e: Error) => {
        message.error(e.message);
      });
    };

    return {tableRef, dataSource, handleSearch, handleAdd, handleEdit, handleDelete, handleSave};
  },
  methods: {},
});
</script>

<style lang="less" scoped></style>
