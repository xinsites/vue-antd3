<template>
  <a-card :bordered="false" :body-style="{ padding: '16px 16px 0px' }">
    <a-form ref="formRef" :model="form" :rules="rules"
            :label-col="{ flex: '100px' }" :wrapper-col="{ flex: '1' }"
            style="padding: 0px 20px">
      <a-row :gutter="12" style="max-width: 400px;">
        <a-col :span="24">
          <a-form-item label="事项名称" name="itemName">
            <a-input v-model:value="form.itemName" allow-clear placeholder="请输入事项名称" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="报送人" name="submitMan">
            <a-input v-model:value="form.submitMan" allow-clear placeholder="请输入报送人" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="事项编号" name="itemSerial">
            <a-input v-model:value="form.itemSerial" allow-clear placeholder="请输入事项编号" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="事项分类" name="itemType">
            <x-radio-group v-model:value="form.itemType" dictKey="STATIC_ITEM_TYPE" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import {dateFormat, formUtil} from "xin-antd3-ui";

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
      itemName: "事项名称",
      submitMan: "报送人",
      itemSerial: "",
      itemType: "1",
    }
    const {form, loadFields, resetFields} = formUtil({...initData});

    // 表单验证规则
    const rules = reactive({
      itemName: [{required: true, type: 'string', message: '请输入事项名称', trigger: 'blur'}],
      submitMan: [{required: true, type: 'string', message: '请输入报送人', trigger: 'blur'}],
      itemSerial: [{required: true, type: 'string', message: '请输入事项编号', trigger: 'blur'}],
      itemType: [{required: true, type: 'string', message: '请选择事项分类', trigger: 'blur'}],
    });

    onMounted(() => {
      watch(() => props.model,
          (data) => {
            handleResetForm();
            loadFields(props.actionType == 'add' ? initData : data, true);
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
        return null;
      }
    };

    return {formRef, form, rules, handleResetForm, getValidateData};
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
