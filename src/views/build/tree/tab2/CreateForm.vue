<template>
  <div :class="['xin-page-full']" v-if="isMounted">
    <a-card :bordered="false" class="create-form-card">
      <a-spin :spinning="pageLoading">
        <MainForm ref="mainFormRef" :actionType="actionType" :model="form" :isQuery="isQuery"/>
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="modalList" tab="树窗口编辑" :force-render="forceRender">
            <ModalList ref="modalListRef" :list="form?.modalList" :isQuery="isQuery"/>
          </a-tab-pane>
          <a-tab-pane key="rowList" tab="树行编辑" :force-render="forceRender">
            <RowList ref="rowListRef" :list="form?.rowList" :isQuery="isQuery"/>
          </a-tab-pane>
        </a-tabs>
        <div class="form-submit-warp">
          <a-button type="dashed" @click="handleClose()">关闭</a-button>
          <a-button :disabled="isQuery" @click="handleReset">重置</a-button>
          <a-button type="primary" :disabled="isQuery" :loading="submitLoading" @click="handleSubmit()">保存</a-button>
        </div>
      </a-spin>
    </a-card>
  </div>
</template>

<script lang="ts">
import {httpRequest} from "@/utils/request";
import {message} from "ant-design-vue/es";
import {onMounted, unref} from "vue";
import {closeCurTabAndOpenFromTab, setPageTabTitle} from "@/utils/tabs-util";
import {getTabTitleSuffix} from "@/utils/comm-util";
import {deepClone} from "xin-antd3-ui";

export default defineComponent({
  components: {
    MainForm: defineAsyncComponent(() => import('./tabs/mainForm/CreateForm.vue')),
    ModalList: defineAsyncComponent(() => import('./tabs/ModalList/List.vue')),
    RowList: defineAsyncComponent(() => import('./tabs/RowList/List.vue')),
  },
  setup(props, {emit, slots}) {
    const router = useRouter();
    const isMounted = ref<boolean>(false);
    const forceRender = ref<boolean>(false);
    const actionType = ref<string>();
    const isQuery = ref<boolean>(false);
    const pageLoading = ref<boolean>(false);
    const submitLoading = ref<boolean>(false);
    const activeKey = ref<string>('modalList');
    const activeKeys = ['modalList', 'rowList'];

    const form = ref();
    const mainFormRef = ref();
    const modalListRef = ref();
    const rowListRef = ref();

    onMounted(() => {
      isMounted.value = true;
      const {query} = unref(router.currentRoute);
      if (typeof query?.type == 'string') actionType.value = query?.type;
      isQuery.value = actionType.value == 'query';
      activeKey.value = 'modalList';
      setPageTabTitle('树选项卡全' + getTabTitleSuffix(actionType.value));

      if (query.id > 0) {
        queryDetail(query.id);
      } else {
        handleLoadForm();
      }
    });

    const queryDetail = (id) => {
      pageLoading.value = true;
      httpRequest('/tree/tab/detail', 'POST', {idleaf: id}).then((data) => {
        handleLoadForm(data);
      }).catch((e: Error) => {
        pageLoading.value = false;
        message.error(e.message || '获取信息出错！');
      });
    };

    const handleLoadForm = (data?) => {
      pageLoading.value = false;
      submitLoading.value = false;
      form.value = data || {};
    }

    const handleSubmit = async () => {
      if (isQuery.value === true) return;
      forceRender.value = true;
      const formData = deepClone(form.value);
      try {
        await validateJoinData(mainFormRef.value, formData, 'mainForm');
        await validateJoinData(modalListRef.value, formData, 'modalList');
        await validateJoinData(rowListRef.value, formData, 'rowList');
      } catch (e: Error) {
        if (activeKeys.includes(e.message)) activeKey.value = e.message;
        return;
      }
      const addUrl = '/tree/tab/add';
      const updateUrl = '/tree/tab/update';
      submitLoading.value = true;
      httpRequest(formData.idleaf > 0 ? updateUrl : addUrl, 'POST', formData).then((data) => {
        message.info('信息保存成功！');
        handleClose(true);
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
      pageLoading.value = false;
      submitLoading.value = false;
      mainFormRef.value?.handleResetForm();
    };

    const handleClose = (refreshFromPath?: boolean) => {
      closeCurTabAndOpenFromTab(refreshFromPath)
    };

    return {
      isMounted,
      pageLoading,
      submitLoading,
      form,
      isQuery,
      actionType,
      activeKey,
      forceRender,
      handleSubmit,
      handleReset,
      handleClose,
      mainFormRef,
      modalListRef,
      rowListRef,
    };
  },
  methods: {},
});
</script>
<style lang="less" scoped></style>
