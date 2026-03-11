<template>
  <x-modal
      :title="title"
      :width="500"
      v-model:visible="visible"
      :body-style="{ paddingBottom: '0px' }"
      class="xin-modal-form-last-full">
    <a-spin :spinning="formLoading">
      <a-form ref="formRef" :model="form" :rules="rules"
              :label-col="{ flex: '90px' }" :wrapper-col="{ flex: '1' }"
              style="padding: 0px 12px" class="xin-form-input-w100">
        <a-form-item label="父级部门" name="pid">
          <x-select-tree
              v-model:value="form.pid"
              :lazyLoad="true"
              url="/tree/modal/select/list"
              :fieldNames="{ value: 'idleaf', label: 'name' }"
              :disableValues="form.idleaf"
              :params="{ reload: form.reloadSelectTree }"
              :minNodesExpandAll="2"
              placeholder="请选择部门"/>
        </a-form-item>
        <a-form-item label="部门名称" name="name">
          <a-input v-model:value="form.name" :maxlength="50" allow-clear placeholder="请输入部门名称" :disabled="isQuery"/>
        </a-form-item>
        <a-form-item label="部门编号" name="code">
          <a-input v-model:value="form.code" :maxlength="50" allow-clear placeholder="请输入部门编号" :disabled="isQuery"/>
        </a-form-item>
        <a-form-item label="部门简称" name="shortName">
          <a-input v-model:value="form.shortName" :maxlength="50" allow-clear placeholder="请输入部门简称" :disabled="isQuery"/>
        </a-form-item>
        <a-form-item label="部门性质" name="type">
          <x-select v-model:value="form.type" dictKey="STATIC_DEPT_TYPE" placeholder="请选择部门性质" :disabled="isQuery"/>
        </a-form-item>
        <a-form-item label="电话号码" name="phone">
          <a-input v-model:value="form.phone" :maxlength="15" allow-clear placeholder="请输入电话号码" :disabled="isQuery"/>
        </a-form-item>
        <a-form-item label="传真号" name="fax">
          <a-input v-model:value="form.fax" :maxlength="20" allow-clear placeholder="请输入传真号" :disabled="isQuery"/>
        </a-form-item>
        <a-form-item label="备注" name="summary">
          <a-textarea v-model:value="form.summary" :rows="4" placeholder="请输入备注" :disabled="isQuery"/>
        </a-form-item>
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
import {ruleCheck, formUtil, rowId} from "xin-antd3-ui";
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
      pid: undefined as number,
      name: '新建部门',
      shortName: '',
      code: '',
      type: '1',
      remark: '',
      phone: '',
      fax: '',
      reloadSelectTree: 0,
    };
    const {form, loadFields, resetFields} = formUtil({...initData});  // 表单数据

    // 表单验证规则
    const rules = reactive({
      name: [{required: true, type: 'string', message: '请输入部门名称', trigger: 'blur'}],
      code: [{required: true, type: 'string', message: '请输入部门编号', trigger: 'blur'}],
      type: [{required: true, type: 'string', message: '请选择部门性质', trigger: 'blur'}],
      phone: [{validator: ruleCheck.isPhone, message: '请输入手机号！', trigger: 'blur'}],
    });

    const openDialog = (modalTitle: string, type: string, record?) => {
      visible.value = true;
      actionType.value = type;
      title.value = modalTitle;
      isQuery.value = actionType.value == 'query';

      if (type == 'add') {
        initData.pid = record?.idleaf;
        handleLoadForm(initData);
      } else if (record) {
        queryDetail(record.idleaf);
      }
    };

    const queryDetail = (id) => {
      formLoading.value = true;
      httpRequest('/tree/modal/detail', 'POST', {idleaf: id}).then((data) => {
        if (data.pid == 0) data.pid = undefined;
        handleLoadForm(data);
      }).catch((e: Error) => {
        formLoading.value = false;
        message.error(e.message || '获取信息出错！');
      });
    };

    const handleLoadForm = (data) => {
      handleReset();
      loadFields(data, true);
      form.reloadSelectTree = rowId(4, 1);  //生成随机值，重新加载下拉列表
    }

    const handleSubmit = () => {
      if (isQuery.value === true) return;

      formRef.value.validate().then(() => {
        submitLoading.value = true;
        const add = '/tree/modal/add';
        const update = '/tree/modal/update';
        const data = {...form};
        if (!data.pid) data.pid = 0;
        httpRequest(form.idleaf > 0 ? update : add, 'POST', data).then((data) => {
          emit('ok', data);
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
