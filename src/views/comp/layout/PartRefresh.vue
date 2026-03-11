<template>
  <div :class="['xin-page-full', 'horizontal-layout']">
    <a-card :bordered="false" title="手动跳转时局部刷新，tab页面切换时不刷新">
      <a-alert style="margin-bottom: 20px" show-icon type="warning">
        <template #message>
          1、 局部刷新只对缓存页面有效，该页面在标签页上已经打开了。 <br/>
          2、 实现局部刷新只能通过调用特定方法打开指定页面，在打开页面的onActivated中实现<br/>
          <div style="padding: 6px 0px 6px 26px; line-height: 26px">
            a、 打开指定路由并需要局部刷新：localRefreshPath(openPath: String) <br/>
            b、 打开指定路由并需要局部刷新，关闭指定页签路由：localRefreshPathAndClosePage(openPath: String, closePath = '') <br/>
          </div>
          3、 使用场景：修改、查看页面中，点击关闭按钮，关闭当前页面并打开查询列表页面，局部刷新查询列表<br/>

        </template>
        <template #icon>
          <x-icon icon="SoundOutlined"/>
        </template>
      </a-alert>
      <div>
        <a-button type="primary" @click="handleClick('/keepalive')">跳转(/keepalive)</a-button>
        <span style="margin-left: 10px;">如果标签页已存在，并且标签页路由地址=/keepalive，缓存有效</span>
        <br/>
        <br/>
        <a-button type="primary" @click="handleClick('/keepalive?t=1')">跳转(/keepalive?t=1)</a-button>
        <span style="margin-left: 10px;">如果标签页已存在，并且标签页路由地址=/keepalive?t=1，缓存有效</span>
        <br/>
        <br/>
        <a-button type="primary" @click="handleUpdateTitle">修改Tab页签标题</a-button>
        <br/>
        <br/>
      </div>

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
import {dateFormat, formUtil} from "xin-antd3-ui";
import {useRouter} from "vue-router";
import {isLocalRefresh, setPageTabTitle} from "@/utils/tabs-util";

export default defineComponent({
  name: 'PartRefresh',
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
      title: '局部刷新',
      datetime: undefined,
      goal: '',
      standard: '',
      address: undefined,
      invites: [],
      weight: 0,
      publicType: 1,
    });

    const handleClick = (path) => {
      router.push(path);
    };

    onMounted(() => {
      form.title = "onMounted，" + dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss SSS');
    });

    onActivated(() => {
      if (isLocalRefresh()) {
        form.title = "标题实现局部刷新，onActivated，" + dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss SSS');
      }
    });

    const handleUpdateTitle = () => {
      setPageTabTitle('局部刷新+1');
    };

    return {form, curPath, handleClick, handleUpdateTitle};
  },

  methods: {},
});
</script>

<style lang="less" scoped></style>
