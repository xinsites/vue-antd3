<template>
  <x-modal
      :title="title"
      :width="700"
      v-model:visible="visible"
      class="xin-modal-form-row-last-full">
    <a-spin :spinning="formLoading">
      <a-form ref="formRef" :model="form" :rules="rules"
              :label-col="{ flex: '90px' }" :wrapper-col="{ flex: '1' }"
              style="padding: 0px 20px" class="xin-form-input-w100">
        <a-row :gutter="12" v-span="{ col2: 420, col1: 0, notCss: 'w-100' }">
          <a-col :span="12">
            <a-form-item label="合同名称" name="name">
              <a-input v-model:value="form.name" allow-clear placeholder="请输入合同名称" :disabled="isQuery"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="编号" name="number">
              <a-input-number v-model:value="form.number" :controls="false" placeholder="请输入编号" :disabled="isQuery"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="标的金额" name="amount">
              <a-input-number v-model:value="form.amount" :step="10" placeholder="请输入标的金额" :disabled="isQuery"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="履行周期" name="period">
              <x-select v-model:value="form.period" dictKey="STATIC_DEMO_PERIOD" placeholder="请选择履行周期" :disabled="isQuery"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="机构名称" name="organName">
              <a-input v-model:value="form.organName" allow-clear placeholder="请输入机构名称" :disabled="isQuery"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="牵头部门" name="headDept">
              <x-select-tree v-model:value="form.headDept" dictKey="DEMO_DEPT" placeholder="请选择牵头部门" :disabled="isQuery"/>
            </a-form-item>
          </a-col>
          <a-col :span="24" class="w-100">
            <a-form-item label=" " :colon="false" style="margin-bottom: 5px;">
              <a-checkbox v-model:checked="form.isLegal" :disabled="isQuery">是否经法务咨询</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :span="24" class="w-100">
            <a-form-item label="咨询意见" name="consultView">
              <a-textarea v-model:value="form.consultView" allow-clear placeholder="请输入咨询意见" :disabled="isQuery"/>
            </a-form-item>
          </a-col>
          <a-col :span="24" class="w-100">
            <a-form-item label="负责人意见" name="directorView">
              <a-textarea v-model:value="form.directorView" allow-clear placeholder="请输入负责人意见" :disabled="isQuery"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="24">
            <a-form-item label="内容摘要" name="summary">
              <a-textarea v-model:value="form.summary" :rows="4" placeholder="请输入内容摘要" :disabled="isQuery"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
      <div class="footer-box">
        <div class="footer-left"></div>
        <div class="footer-right">
          <a-button type="dashed" @click="handleClose">关闭</a-button>
          <a-button :disabled="isQuery || formLoading" @click="handleReset">重置</a-button>
          <a-button type="primary" :disabled="isQuery || formLoading" :loading="submitLoading" @click="handleSubmit">保存</a-button>
        </div>
      </div>
    </template>
  </x-modal>
</template>

<script lang="ts">
import {formUtil, ruleCheck} from "xin-antd3-ui";
import {httpRequest} from "@/utils/request";
import {message} from "ant-design-vue/es";

export default defineComponent({
  emits: ['ok'],
  setup(props, {emit, slots}) {
    const title = ref<string>();
    const visible = ref<boolean>(false);
    const formRef = ref(null);
    const actionType = ref<string>();
    const formLoading = ref<boolean>(false);
    const submitLoading = ref<boolean>(false);
    const isQuery = ref<boolean>(false);

    const initData = {
      idleaf: 0,
      name: "合同名称",
      number: 123,
      amount: 100.00,
      period: "1",
      isLegal: false,
      organName: "机构名称",
      headDept: 111,
      consultView: "",
      directorView: "",
      summary: "",
    }

    const {form, loadFields, resetFields} = formUtil({...initData});

    // 表单验证规则
    const rules = reactive({
      name: [{required: true, type: 'string', message: '请输入合同名称', trigger: 'blur'}],
      number: [{required: true, type: 'number', message: '请输入编号', trigger: 'blur'}],
      amount: [{required: true, type: 'number', message: '请输入标的金额', trigger: 'blur'}, {validator: ruleCheck.minVal, minVal: 20, trigger: 'blur'}],
      period: [{required: true, type: 'string', message: '请选择履行周期', trigger: 'blur'}],
    });

    const openDialog = (modalTitle: string, type: string, record?) => {
      visible.value = true;
      actionType.value = type;
      title.value = modalTitle;
      isQuery.value = actionType.value == 'query';

      if (record) {
        queryDetail(record.idleaf);
        // handleLoadForm({...record});
      } else {
        handleLoadForm(initData);
      }
    };

    const queryDetail = (id) => {
      formLoading.value = true;
      httpRequest('/single/modal/detail', 'POST', {idleaf: id}).then((data) => {
        if (typeof data.isLegal == 'number') data.isLegal = data.isLegal == 1;
        handleLoadForm(data);
      }).catch((e: Error) => {
        formLoading.value = false;
        message.error(e.message || '获取信息出错！');
      });
    };

    const handleLoadForm = (data) => {
      handleReset();
      loadFields(data, true);
    }

    const handleSubmit = () => {
      if (isQuery.value === true) return;

      formRef.value.validate().then(() => {
        submitLoading.value = true;
        const add = '/single/modal/add';
        const update = '/single/modal/update';
        httpRequest(form.idleaf > 0 ? update : add, 'POST', form).then((data) => {
          emit('ok');
          message.info('信息保存成功！');
          handleClose();
        }).catch((e: Error) => {
          submitLoading.value = false;
          message.error(e.message);
        });
      });
    };

    const handleReset = () => {
      resetFields();
      formLoading.value = false;
      submitLoading.value = false;
      formRef.value?.clearValidate();
    };

    const handleClose = () => {
      visible.value = false;
      submitLoading.value = false;
    };

    return {title, visible, formLoading, submitLoading, isQuery, formRef, form, rules, handleSubmit, handleReset, handleClose, openDialog};
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
