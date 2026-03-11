<template>
  <a-card :bordered="false" :body-style="{ padding: '16px 16px 0px' }">
    <a-form ref="formRef" :model="form" :rules="rules"
            :label-col="{ flex: '100px' }" :wrapper-col="{ flex: '1' }"
            class="xin-form-input-w100">
      <a-row :gutter="12" v-span="{ col2: 800, col1: 0, notCss: 'w-100' }">
        <a-col :span="12">
          <a-form-item label="父级部门" name="pid">
            <!--            添加pidKey属性后，x-select-tree会根据接口列表数据转换成树结构列表-->
            <x-select-tree
                v-model:value="form.pid"
                :disableValues="form.idleaf"
                url="/tree/tab/all/list"
                pidKey="pid"
                :fieldNames="{ value: 'idleaf', label: 'name' }"
                :minNodesExpandAll="2"
                placeholder="请选择部门"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="部门名称" name="name">
            <a-input v-model:value="form.name" :maxlength="50" allow-clear placeholder="请输入部门名称" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="部门编号" name="code">
            <a-input v-model:value="form.code" :maxlength="50" allow-clear placeholder="请输入部门编号" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="部门简称" name="shortName">
            <a-input v-model:value="form.shortName" :maxlength="50" allow-clear placeholder="请输入部门简称" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="部门性质" name="type">
            <x-select v-model:value="form.type" dictKey="STATIC_DEPT_TYPE" placeholder="请选择部门性质" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="电话号码" name="phone">
            <a-input v-model:value="form.phone" :maxlength="15" allow-clear placeholder="请输入电话号码" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="传真号" name="fax">
            <a-input v-model:value="form.fax" :maxlength="20" allow-clear placeholder="请输入传真号" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
        <a-col :span="24" class="w-100">
          <a-form-item label="备注" name="summary">
            <a-textarea v-model:value="form.summary" :auto-size="{ minRows: 4 }" placeholder="请输入备注" :disabled="isQuery"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import {dateFormat, formUtil, ruleCheck} from "xin-antd3-ui";
import {message} from "ant-design-vue";
import {tabPageScrollTop} from "@/utils/tabs-util";
import {unref} from "vue";

export default defineComponent({
  props: {
    isQuery: Boolean,
    actionType: String,
    model: Object,
  },
  setup(props, {emit, slots}) {
    const router = useRouter();
    const formRef = ref(null);
    const initData = {
      idleaf: 0,
      pid: undefined as number,
      name: '新建部门',
      shortName: '',
      code: '',
      type: '1',
      remark: '',
      phone: '',
      fax: '',
    }
    const {form, loadFields, resetFields} = formUtil({...initData});

    // 表单验证规则
    const rules = reactive({
      name: [{required: true, type: 'string', message: '请输入部门名称', trigger: 'blur'}],
      code: [{required: true, type: 'string', message: '请输入部门编号', trigger: 'blur'}],
      type: [{required: true, type: 'string', message: '请选择部门性质', trigger: 'blur'}],
      phone: [{validator: ruleCheck.isPhone, message: '请输入手机号！', trigger: 'blur'}],
    });

    onMounted(() => {
      watch(() => props.model,
          (data) => {
            handleResetForm();
            if (props.actionType == 'add') {
              const {query} = unref(router.currentRoute);
              initData.pid = query.pid ? Number(query.pid) : undefined;
            }
            if (data && data.pid == 0) data.pid = undefined;
            if (initData.pid == 0) initData.pid = undefined;
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
