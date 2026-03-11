<template>
  <x-modal
      :title="title"
      :width="900"
      :height="540"
      :body-style="{ padding: '0px' }"
      v-model:visible="visible">
    <a-spin :spinning="formLoading" style="min-height: 540px">
      <a-tabs v-model:activeKey="activeKey">
        <template #leftExtra>
          <div style="width: 20px;"></div>
        </template>
        <a-tab-pane key="mainForm" tab="基本信息" :force-render="forceRender">
          <MainForm ref="mainFormRef" :model="form" :actionType="actionType" :isQuery="isQuery"/>
        </a-tab-pane>
        <a-tab-pane key="baseForm" tab="一对一信息" :force-render="forceRender">
          <BaseForm ref="baseFormRef" :model="form?.baseForm" :actionType="actionType" :isQuery="isQuery"/>
        </a-tab-pane>
        <a-tab-pane key="modalList" tab="一对多窗口编辑" :force-render="forceRender">
          <ModalList ref="modalListRef" :list="form?.modalList" :actionType="actionType" :isQuery="isQuery"/>
        </a-tab-pane>
        <a-tab-pane key="rowList" tab="一对多行编辑" :force-render="forceRender">
          <RowList ref="rowListRef" :list="form?.rowList" :actionType="actionType" :isQuery="isQuery"/>
        </a-tab-pane>
        <a-tab-pane key="attachList" tab="附件列表" :force-render="forceRender">
          <AttachList ref="attachListRef" :list="form?.attachList" :vertical="true" :disabled="isQuery"/>
        </a-tab-pane>
      </a-tabs>
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
import {httpRequest} from "@/utils/request";
import {message} from "ant-design-vue/es";
import {deepClone} from "xin-antd3-ui";

export default defineComponent({
  emits: ['ok'],
  components: {
    MainForm: defineAsyncComponent(() => import('./tabs/mainForm/CreateForm.vue')),
    BaseForm: defineAsyncComponent(() => import('./tabs/BaseForm/CreateForm.vue')),
    ModalList: defineAsyncComponent(() => import('./tabs/ModalList/List.vue')),
    RowList: defineAsyncComponent(() => import('./tabs/RowList/List.vue')),
    AttachList: defineAsyncComponent(() => import('@/components/AttachList/List.vue')),
  },
  setup(props, {emit, slots}) {
    const title = ref<string>();
    const visible = ref<boolean>(false);
    const forceRender = ref<boolean>(false);
    const actionType = ref<string>();
    const formLoading = ref<boolean>(false);
    const submitLoading = ref<boolean>(false);
    const isQuery = ref<boolean>(false);
    const activeKey = ref<string>('mainForm');
    const activeKeys = ['mainForm', 'baseForm', 'modalList', 'rowList', 'attachList', 'attachGrid'];

    const form = ref();
    const mainFormRef = ref();
    const baseFormRef = ref();
    const modalListRef = ref();
    const rowListRef = ref();
    const attachListRef = ref();

    const openDialog = (modalTitle: string, type: string, record?) => {
      visible.value = true;
      actionType.value = type;
      title.value = modalTitle;
      isQuery.value = actionType.value == 'query';
      activeKey.value = 'mainForm';

      if (record) {
        queryDetail(record.idleaf);
      } else {
        handleLoadForm();
      }
    };

    const queryDetail = (id) => {
      formLoading.value = true;
      httpRequest('/multi/modal/detail', 'POST', {idleaf: id}).then((data) => {
        handleLoadForm(data);
      }).catch((e: Error) => {
        formLoading.value = false;
        message.error(e.message || '获取信息出错！');
      });
    };

    const handleLoadForm = (data?) => {
      formLoading.value = false;
      submitLoading.value = false;
      form.value = data || {};
    }

    const handleSubmit = async () => {
      if (isQuery.value === true) return;

      forceRender.value = true;
      const formData = deepClone(form.value);
      try {
        await validateJoinData(mainFormRef.value, formData, 'mainForm');
        await validateJoinData(baseFormRef.value, formData, 'baseForm');
        await validateJoinData(modalListRef.value, formData, 'modalList');
        await validateJoinData(rowListRef.value, formData, 'rowList');
        await validateJoinData(attachListRef.value, formData, 'attachList');
        // await validateJoinData(attachGridRef.value, formData, 'attachGrid');
      } catch (e: Error) {
        if (activeKeys.includes(e.message)) activeKey.value = e.message;
        return;
      }

      const addUrl = '/multi/modal/add';
      const updateUrl = '/multi/modal/update';
      submitLoading.value = true;
      httpRequest(formData.idleaf > 0 ? updateUrl : addUrl, 'POST', formData).then((data) => {
        emit('ok');
        message.info('信息保存成功！');
        handleClose();
      }).catch((e: Error) => {
        submitLoading.value = false;
        message.error(e.message);
      });
    };

    /**
     * 验证加入数据
     */
    const validateJoinData = async (compRef, formData, dataKey) => {
      if (!compRef) return;
      const validateData = await compRef.getValidateData(formData);
      if (!validateData) throw new Error(dataKey);

      if (dataKey == 'mainForm') {
        Object.assign(formData, validateData);
      } else {
        formData[dataKey] = validateData;
      }
    }

    const handleReset = () => {
      formLoading.value = false;
      submitLoading.value = false;
      mainFormRef.value?.handleResetForm();
      baseFormRef.value?.handleResetForm();
    };

    const handleClose = () => {
      visible.value = false;
      submitLoading.value = false;
    };

    return {
      title,
      visible,
      form,
      isQuery,
      actionType,
      activeKey,
      forceRender,
      formLoading,
      submitLoading,
      openDialog,
      handleSubmit,
      handleReset,
      handleClose,
      mainFormRef,
      baseFormRef,
      modalListRef,
      rowListRef,
      attachListRef,
    };
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
