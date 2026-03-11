<template>
  <div :class="['xin-page-full']" v-if="isMounted">
    <a-card :bordered="false" class="create-form-card">
      <a-spin :spinning="pageLoading">
        <MainForm ref="mainFormRef" :actionType="actionType" :model="form" :isQuery="isQuery"/>
        <a-tabs v-model:activeKey="activeKey">
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
            <AttachList ref="attachListRef" :list="form?.attachList" :disabled="isQuery"/>
          </a-tab-pane>
          <a-tab-pane key="attachGrid" tab="附件宫格" :force-render="forceRender" class="attach-grid-180">
            <a-radio-group v-model:value="listType" name="radioGroup" style="margin-bottom: 20px">
              <a-radio value="text">text</a-radio>
              <a-radio value="picture">picture</a-radio>
              <a-radio value="picture-card">picture-card</a-radio>
            </a-radio-group>
            <AttachGrid ref="attachGridRef" :list="form?.attachGrid" :listType="listType" :disabled="isQuery" :class="listType"/>
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
    BaseForm: defineAsyncComponent(() => import('./tabs/BaseForm/CreateForm.vue')),
    ModalList: defineAsyncComponent(() => import('./tabs/ModalList/List.vue')),
    RowList: defineAsyncComponent(() => import('./tabs/RowList/List.vue')),
    AttachList: defineAsyncComponent(() => import('@/components/AttachList/List.vue')),
    AttachGrid: defineAsyncComponent(() => import('@/components/AttachList/ListGrid.vue')),
  },
  setup(props, {emit, slots}) {
    const router = useRouter();
    const isMounted = ref<boolean>(false);
    const forceRender = ref<boolean>(false);
    const actionType = ref<string>();
    const isQuery = ref<boolean>(false);
    const pageLoading = ref<boolean>(false);
    const submitLoading = ref<boolean>(false);
    const activeKey = ref<string>('baseForm');
    const activeKeys = ['baseForm', 'modalList', 'rowList', 'attachList', 'attachGrid'];
    const listType = ref<string>('picture-card');

    const form = ref();
    const mainFormRef = ref();
    const baseFormRef = ref();
    const modalListRef = ref();
    const rowListRef = ref();
    const attachListRef = ref();
    const attachGridRef = ref();

    onMounted(() => {
      isMounted.value = true;
      const {query} = unref(router.currentRoute);
      if (typeof query?.type == 'string') actionType.value = query?.type;
      isQuery.value = actionType.value == 'query';
      activeKey.value = 'baseForm';
      setPageTabTitle('多表选项卡' + getTabTitleSuffix(actionType.value));

      if (query.id > 0) {
        queryDetail(query.id);
      } else {
        handleLoadForm();
      }
    });

    const queryDetail = (id) => {
      pageLoading.value = true;
      httpRequest('/multi/tab/detail', 'POST', {idleaf: id}).then((data) => {
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
        await validateJoinData(baseFormRef.value, formData, 'baseForm');
        await validateJoinData(modalListRef.value, formData, 'modalList');
        await validateJoinData(rowListRef.value, formData, 'rowList');
        await validateJoinData(attachListRef.value, formData, 'attachList');
        await validateJoinData(attachGridRef.value, formData, 'attachGrid');
      } catch (e: Error) {
        if (activeKeys.includes(e.message)) activeKey.value = e.message;
        return;
      }
      const addUrl = '/multi/tab/add';
      const updateUrl = '/multi/tab/update';
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
      baseFormRef.value?.handleResetForm();
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
      listType,
      actionType,
      activeKey,
      forceRender,
      handleSubmit,
      handleReset,
      handleClose,
      mainFormRef,
      baseFormRef,
      modalListRef,
      rowListRef,
      attachListRef,
      attachGridRef,
    };
  },
  methods: {},
});
</script>
<style lang="less" scoped>
.attach-grid-180 {
  .picture-card {
    width: 100%;
  }

  .text, .picture {
    max-width: 600px;
  }
}


</style>
