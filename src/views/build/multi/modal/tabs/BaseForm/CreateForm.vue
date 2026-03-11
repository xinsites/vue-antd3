<template>
  <a-card :bordered="false" :body-style="{ padding: '16px 16px 0px' }">
    <a-form ref="formRef" :model="form" :rules="rules"
            :label-col="{ flex: '100px' }" :wrapper-col="{ flex: '1' }"
            style="padding: 0px 20px">
      <a-row :gutter="12" v-span="{ col2: 420, col1: 0, notCss: 'w-100' }">
        <a-col :span="12">
          <a-form-item label="分项名称" name="subName">
            <a-input v-model:value="form.subName" allow-clear placeholder="请输入分项名称" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="办理对象" name="handleObject">
            <a-input v-model:value="form.handleObject" allow-clear placeholder="请输入办理对象" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="投诉电话" name="complaintCall">
            <a-input v-model:value="form.complaintCall" allow-clear placeholder="请输入投诉电话" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="咨询电话" name="consultCall">
            <a-input v-model:value="form.consultCall" allow-clear placeholder="请输入咨询电话" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="所属行业类别" name="sectorType">
            <x-select v-model:value="form.sectorType" dictKey="STATIC_SECTOR_TYPE" placeholder="请选择所属行业类别" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="是否收费" name="isFee">
            <x-radio-group v-model:value="form.isFee" dictKey="STATIC_YESNO" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="24" class="w-100">
          <a-form-item label="办理标签" name="handleLabel">
            <x-select v-model:value="form.handleLabel" mode="multiple" dictKey="STATIC_HANDLE_LABEL" placeholder="请选择办理标签" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="24" class="w-100">
          <a-form-item label="适用范围" name="applyScope">
            <a-textarea v-model:value="form.applyScope" :auto-size="{ minRows: 4 }" placeholder="请输入适用范围" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import {formUtil} from "xin-antd3-ui";

export default defineComponent({
  props: {
    model: Object,
    actionType: String,
    isQuery: Boolean,
  },
  setup(props, {emit, slots}) {
    const formRef = ref(null);
    const initData = {
      idleaf: 0,
      subName: "分项名称",
      handleObject: "办理对象",
      complaintCall: undefined as string,
      consultCall: undefined as string,
      sectorType: "1",
      isFee: 1,
      handleLabel: undefined as string,
      applyScope: undefined as string,
    }
    const {form, loadFields, resetFields} = formUtil({...initData});

    // 表单验证规则
    const rules = reactive({
      subName: [{required: true, type: 'string', message: '请输入分项名称', trigger: 'blur'}],
      handleObject: [{required: true, type: 'string', message: '请输入办理对象', trigger: 'blur'}],
      complaintCall: [{required: true, type: 'string', message: '请输入投诉电话', trigger: 'blur'}],
      consultCall: [{required: true, type: 'string', message: '请输入咨询电话', trigger: 'blur'}],
    });

    onMounted(() => {
      watch(() => props.model,
          (data) => {
            handleResetForm();
            loadFields(props.actionType == 'add' ? initData : data, true);
          }, {
            immediate: true,
          },
      );
    });

    const handleResetForm = () => {
      resetFields();
      formRef.value?.clearValidate();
    };

    const getValidateData = async (formData) => {
      try {
        await formRef.value.validate();
        return form;
      } catch (error) {
        return null;
      }
    };

    return {formRef, form, rules, handleResetForm, getValidateData};
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
