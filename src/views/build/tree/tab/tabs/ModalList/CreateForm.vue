<template>
  <x-modal
      :title="title"
      :width="700"
      v-model:visible="visible"
      class="xin-modal-form-row-last-full">
    <a-form ref="formRef" :model="form" :rules="rules"
            :label-col="{ flex: '90px' }" :wrapper-col="{ flex: '1' }"
            style="padding: 0px 20px" class="xin-form-input-w100">
      <a-row :gutter="12" v-span="{ col2: 420, col1: 0, notCss: 'w-100' }">
        <a-col :span="24" class="w-100">
          <a-form-item label="父级名称" name="pid">
            <x-select-tree
                v-model:value="form.pid"
                :treeData="treeList"
                :disableValues="form.id"
                :fieldNames="{ value: 'id', label: 'pointName' }"
                :minNodesExpandAll="2"
                placeholder="请选择父级名称"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="办理点名称" name="pointName">
            <a-input v-model:value="form.pointName" allow-clear placeholder="请输入办理点名称" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="所属部门" name="applyDept">
            <x-select-tree v-model:value="form.applyDept" dictKey="STATIC_TEST_TREE" placeholder="请选择所属部门" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="所属区县" name="county">
            <a-input v-model:value="form.county" allow-clear placeholder="请输入所属区县" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="地址" name="address">
            <a-input v-model:value="form.address" allow-clear placeholder="请输入地址" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="24" class="w-100">
          <a-form-item label="联系方式" name="contact">
            <a-textarea v-model:value="form.contact" placeholder="请输入联系方式" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="12">
        <a-col :span="24">
          <a-form-item label="服务时间" name="serviceTime">
            <a-textarea v-model:value="form.serviceTime" :rows="3" placeholder="请输入内容摘要" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <div class="footer-box">
        <div class="footer-left"></div>
        <div class="footer-right">
          <a-button type="dashed" @click="handleClose">关闭</a-button>
          <a-button :disabled="isQuery" @click="handleReset">重置</a-button>
          <a-button type="primary" :disabled="isQuery" @click="handleSubmit">保存</a-button>
        </div>
      </div>
    </template>
  </x-modal>
</template>

<script lang="ts">
import {formUtil, rowId} from "xin-antd3-ui";

export default defineComponent({
  emits: ['ok'],
  props: {
    treeList: Array,
  },
  setup(props, {emit, slots}) {
    const title = ref<string>();
    const visible = ref<boolean>(false);
    const formRef = ref(null);
    const actionType = ref<string>();
    const isQuery = ref<boolean>(false);
    const initData = {
      id: 0,
      pid: undefined as number,
      idleaf: 0,
      pointName: "新建办理点",
      applyDept: 1,
      county: "浦东新区",
      address: "浦东新区新野路888号",
      contact: "",
      serviceTime: "",
    }
    const {form, loadFields, resetFields} = formUtil({...initData}); // 表单数据

    // 表单验证规则
    const rules = reactive({
      pointName: [{required: true, type: 'string', message: '请输入办理点名称', trigger: 'blur'}],
      applyDept: [{required: true, type: 'number', message: '请选择所属部门', trigger: 'blur'}],
      county: [{required: true, type: 'string', message: '请输入所属区县', trigger: 'blur'}],
      address: [{required: true, type: 'string', message: '请输入地址', trigger: 'blur'}],
    });

    const openDialog = (modalTitle: string, type: string, record?) => {
      visible.value = true;
      title.value = modalTitle;
      actionType.value = type;
      isQuery.value = actionType.value == 'query';

      handleReset();


      if (type == 'add') {
        initData.pid = record?.id;
        loadFields(initData, true);
      } else if (record) {
        const editRecord = {...record};
        if (editRecord.pid == 0) editRecord.pid = undefined;
        loadFields(editRecord, true);
      }
    };

    const handleSubmit = () => {
      if (isQuery.value === true) return;
      formRef.value.validate().then(() => {
        if (actionType.value == 'add') {
          form.id = rowId();
        }
        emit('ok', actionType.value, form);
        handleClose();
      });
    };

    const handleReset = () => {
      resetFields();
      formRef.value?.clearValidate();
    };

    const handleClose = () => {
      visible.value = false;
    };

    return {visible, isQuery, title, formRef, form, rules, openDialog, handleSubmit, handleReset, handleClose};
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
