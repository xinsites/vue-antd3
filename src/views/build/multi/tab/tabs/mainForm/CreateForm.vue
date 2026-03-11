<template>
  <a-card :bordered="false" :body-style="{ padding: '16px 16px 0px' }">
    <a-form ref="formRef" :model="form" :rules="rules"
            :label-col="{ flex: '100px' }" :wrapper-col="{ flex: '1' }"
            class="xin-form-input-w100">
      <a-row :gutter="12" v-span="{ col3: 1000, col2: 600, col1: 0, notCss: 'w-100' }">
        <a-col :span="8">
          <a-form-item label="出差目的" name="purpose">
            <a-input v-model:value="form.purpose" allow-clear placeholder="请输入出差目的" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="同行人" name="peers">
            <a-input v-model:value="form.peers" allow-clear placeholder="请输入同行人" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="出差地点" name="address">
            <a-input v-model:value="form.address" allow-clear placeholder="请输入出差地点" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="起始日期" name="startDate">
            <x-date-picker v-model:value="form.startDate" :maxDate="form.endDate" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="结束日期" name="endDate">
            <x-date-picker v-model:value="form.endDate" :minDate="form.startDate" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="出差天数" name="days">
            <a-input-number v-model:value="form.days" :precision="0" placeholder="请输入出差天数" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="交通工具" name="traffic">
            <x-checkbox-group v-model:value="form.traffic" dictKey="STATIC_TRAFFIC"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="是否由公司支付" name="isPay">
            <x-radio-group v-model:value="form.isPay" dictKey="STATIC_YESNO"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="预计费用" name="expectCost">
            <a-input-number v-model:value="form.expectCost" prefix="￥" :precision="2" placeholder="请输入出差天数" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="24" class="w-100">
          <a-form-item label="影像资料" name="image">
            <x-upload v-model:value="form.image" host="http://xinsite.vip/" :dragSort="true" listType="picture-card" :editFileName="true" :maxCount="5" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="24" class="w-100">
          <a-form-item label="出差简介" name="remark">
            <a-textarea v-model:value="form.remark" :auto-size="{ minRows: 4 }" placeholder="请输入出差简介" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import {dateFormat, formUtil} from "xin-antd3-ui";
import {message} from "ant-design-vue";
import {tabPageScrollTop} from "@/utils/tabs-util";

export default defineComponent({
  props: {
    isQuery: Boolean,
    actionType: String,
    model: Object,
  },
  setup(props, {emit, slots}) {
    const formRef = ref(null);
    const initData = {
      idleaf: 0,
      purpose: "出差目的",
      peers: "同行人",
      startDate: new Date(),
      endDate: "",
      address: "出差地点",
      days: 5,
      traffic: "",
      isPay: 1,
      expectCost: 1000,
      image: "",
      remark: "",
    }
    const {form, loadFields, resetFields} = formUtil({...initData});

    // 表单验证规则
    const rules = reactive({
      purpose: [{required: true, type: 'string', message: '请输入出差目的', trigger: 'blur'}],
      peers: [{required: true, type: 'string', message: '请输入同行人', trigger: 'blur'}],
      startDate: [{required: true, type: 'string', message: '请输入起始日期', trigger: 'blur'}],
      days: [{required: true, type: 'number', message: '请输入出差天数', trigger: 'blur'}],
      traffic: [{required: true, type: 'string', message: '请选择交通工具', trigger: 'blur'}],
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

    const getValidateData = async () => {
      try {
        await formRef.value.validate();
        return form;
      } catch (error) {
        tabPageScrollTop(0);
        message.error('数据校验不通过！');
        return null;
      }
    };

    return {formRef, form, rules, handleResetForm, getValidateData};
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
