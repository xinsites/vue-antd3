<template>
  <div :class="['xin-page-full', 'horizontal-layout']">
    <a-card :bordered="false" title="签名验证">

      <a-form
          ref="formRef"
          :model="form"
          class="xin-form"
          style="max-width: 800px; margin: 20px auto"
          :label-col="{ md: { span: 6 }, sm: { span: 24 } }"
          :wrapper-col="{ md: { span: 18 }, sm: { span: 24 } }"
          size="large"
      >
        <a-form-item label="标题" name="title" hasFeedback :validate-status="form.title ? undefined : 'error'" title="">
          <a-input allow-clear placeholder="请输入标题" v-model:value="form.title"/>
        </a-form-item>
        <a-form-item label="起止日期" name="datetime" :rules="[{ required: true, message: '请输入起止日期!', trigger: 'blur' }]">
          <a-range-picker value-format="YYYY-MM-DD" v-model:value="form.datetime"/>
        </a-form-item>
        <a-form-item label="目标描述" name="goal" :rules="[{ required: true, message: '请输入目标描述!', trigger: 'blur' }]">
          <a-textarea :rows="4" v-model:value="form.goal" placeholder="请输入目标描述"/>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts">
import {formUtil} from "xin-antd3-ui";
import {useRouter} from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const {currentRoute} = useRouter();
    const curPath = ref(currentRoute.value.path);
    const {proxy} = getCurrentInstance();

    interface FormType {
      title?: string;
      datetime?: [string, string];
      goal?: string;
      standard?: string;
      address?: string;
      invites?: [];
      weight?: number;
      publicType?: number;
    }

    // 表单数据
    const {form, resetFields} = formUtil<FormType>({
      title: '首次加载sssssssss',
      datetime: undefined,
      goal: '',
      standard: '',
      address: undefined,
      invites: [],
      weight: 0,
      publicType: 1,
    });

    // onMounted(() => {
    //   form.title = "首次加载onMounted";
    // });

    const handlePartRefresh = () => {
      router.push('/part/refresh');
    };

    return {form, curPath, handlePartRefresh};
  },
  methods: {},
});
</script>

<style lang="less" scoped></style>
