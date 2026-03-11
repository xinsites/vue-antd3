<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="false">
      <a-spin :spinning="pageLoading">
        <a-form ref="formRef" :model="form" :rules="rules"
                :label-col="{ flex: '90px' }" :wrapper-col="{ flex: '1' }"
                class="xin-form-input-w100">
          <a-row :gutter="12" v-span="{ col3: 1000, col2: 600, col1: 0, notCss: 'w-100' }">
            <a-col :span="8">
              <a-form-item label="名称" name="name">
                <a-input v-model:value="form.name" allow-clear placeholder="请输入名称" :disabled="isQuery"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="分类" name="type">
                <x-select v-model:value="form.type" dictKey="STATIC_DEMO_TYPE" placeholder="请选择分类" :disabled="isQuery"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="输入框类型" name="inputType">
                <x-select v-model:value="form.inputType" dictKey="STATIC_INPUT_TYPE" placeholder="请选择输入框类型" :disabled="isQuery"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="数量" name="quantity">
                <a-input-number v-model:value="form.quantity" :precision="0" placeholder="请输入数量" :step="2" :disabled="isQuery"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="单价" name="unitPrice">
                <a-input-number v-model:value="form.unitPrice" :precision="2" placeholder="请输入单价" :disabled="isQuery"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="金额" name="amount">
                <a-input-number v-model:value="form.amount" :precision="2" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="使用人员" name="applyUser">
                <x-select v-model:value="form.applyUser" dictKey="STATIC_APPLY_USER" placeholder="请选择使用人员" :disabled="isQuery"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="使用部门" name="applyDept">
                <x-select-tree v-model:value="form.applyDept" dictKey="STATIC_TEST_TREE" placeholder="请选择使用部门" :disabled="isQuery"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="日期" name="date">
                <x-date-picker v-model:value="form.date" :disabled="isQuery"/>
              </a-form-item>
            </a-col>
            <a-col :span="24" class="w-100">
              <a-form-item label="付款方式" name="payType">
                <x-checkbox-group v-model:value="form.payType" dictKey="STATIC_TEST_LIST"/>
              </a-form-item>
            </a-col>
            <a-col :span="24" class="w-100">
              <a-form-item label="备注" name="remark">
                <a-textarea v-model:value="form.remark" :auto-size="{ minRows: 6 }" placeholder="请输入备注" :disabled="isQuery"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div class="form-submit-warp">
          <a-button type="dashed" @click="handleClose()">关闭</a-button>
          <a-button :disabled="isQuery || pageLoading" @click="handleReset">重置</a-button>
          <a-button type="primary" :disabled="isQuery || pageLoading" :loading="submitLoading" @click="handleSubmit()">保存</a-button>
        </div>
      </a-spin>
    </a-card>
  </div>
</template>

<script lang="ts">
import {dateFormat, formUtil, isEmpty} from "xin-antd3-ui";
import {httpRequest} from "@/utils/request";
import {message} from "ant-design-vue/es";
import {onMounted, unref} from "vue";
import {closeCurTabAndOpenFromTab, setPageTabTitle} from "@/utils/tabs-util";
import {getTabTitleSuffix} from "@/utils/comm-util";

export default defineComponent({
  setup(props, {emit, slots}) {
    const router = useRouter();
    const formRef = ref(null);
    const actionType = ref<string>();
    const pageLoading = ref<boolean>(false);
    const submitLoading = ref<boolean>(false);
    const isQuery = ref<boolean>(false);
    const initData = {
      idleaf: 0,
      name: "新建名称",
      type: "1",
      unitPrice: undefined,
      quantity: undefined,
      amount: undefined as number,
      applyUser: "zhuguan",
      applyDept: 21,
      inputType: "textfield",
      payType: '',
      date: "",
      applyUserText: "主管",
      remark: "",
    }
    const {form, loadFields, resetFields} = formUtil({...initData});  // 表单数据

    // 表单验证规则
    const rules = reactive({
      name: [{required: true, type: 'string', message: '请输入名称', trigger: 'blur'}],
      type: [{required: true, type: 'string', message: '请选择分类', trigger: 'blur'}],
      inputType: [{required: true, type: 'string', message: '请选择输入框类型', trigger: 'blur'}],
      quantity: [{required: true, type: 'number', message: '请输入数量', trigger: 'blur'}],
      unitPrice: [{required: true, type: 'number', message: '请输入单价', trigger: 'blur'}],
    });

    watch(
        [() => form.quantity, () => form.unitPrice],
        (args) => {
          if (!isEmpty(form.quantity) && !isEmpty(form.unitPrice)) {
            form.amount = Number(form.quantity) * Number(form.unitPrice);
          }
        },
    );

    onMounted(() => {
      const {query} = unref(router.currentRoute);
      if (typeof query?.type == 'string') actionType.value = query?.type;
      isQuery.value = actionType.value == 'query';
      setPageTabTitle('选项卡编辑' + getTabTitleSuffix(actionType.value));

      if (query.id > 0) {
        queryDetail(query.id);
      } else {
        handleLoadForm(initData);
      }
    });

    const queryDetail = (id) => {
      pageLoading.value = true;
      httpRequest('/single/tab/detail', 'POST', {idleaf: id}).then((data) => {
        handleLoadForm(data);
      }).catch((e: Error) => {
        pageLoading.value = false;
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
        const add = '/single/tab/add';
        const update = '/single/tab/update';
        httpRequest(form.idleaf > 0 ? update : add, 'POST', form).then((data) => {
          message.info('信息保存成功！');
          handleClose(true);
        }).catch((e: Error) => {
          submitLoading.value = false;
          message.error(e.message);
        });
      });
    };

    const handleReset = () => {
      resetFields();
      pageLoading.value = false;
      submitLoading.value = false;
      formRef.value?.clearValidate();
    };

    const handleClose = (refreshFromPath?: boolean) => {
      closeCurTabAndOpenFromTab(refreshFromPath)
    };

    return {pageLoading, submitLoading, isQuery, formRef, form, rules, handleSubmit, handleReset, handleClose};
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
