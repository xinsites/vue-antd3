<template>
  <div :class="['xin-page-full', 'horizontal-layout']">
    <a-card :bordered="false" title="v-auth、v-role权限控制演示">
      <a-alert style="margin-bottom: 20px" show-icon type="warning">
        <template #message>
          1、 v-auth：是否有全部功能权限，没有组件将隐藏 <br/>
          2、 v-role：是否有全部角色权限，没有组件将隐藏 <br/>
          3、 v-any-auth：是否有任意功能权限，没有组件将隐藏 <br/>
          4、 v-any-role：是否有任意角色权限，没有组件将隐藏 <br/>
          5、权限指令只控制组件隐藏，这里的隐藏是删除了组件，如果是disabled，你还需要在点击方法中去判断限制<br/>
          6、如果你要根据权限控制组件是否可用，请用$auth、$anyAuth方法与antd组件自带的disabled属性，更多说明请查看auth.md
        </template>
        <template #icon>
          <x-icon icon="SoundOutlined"/>
        </template>
      </a-alert>
      <div style="margin-top: 20px;">
        <a-button type="primary" v-role="'test'">v-role</a-button>
        <span style="margin-left: 10px;">v-role权限演示，没有权限将隐藏</span>
      </div>
      <div style="margin-top: 20px;">
        <a-button type="primary" v-auth="'test'">v-auth</a-button>
        <span style="margin-left: 10px;">v-auth权限演示，没有权限将隐藏</span>
      </div>
      <div style="margin-top: 20px;">
        <a-button type="primary" :disabled="!$auth('test')">$auth('test')</a-button>
        <span style="margin-left: 10px;">$auth权限演示，没有权限将禁用</span>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import {useRouter} from "vue-router";
import {formUtil} from "xin-antd3-ui";
import {localRefreshPath} from "@/utils/tabs-util";

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
      title: '首次加载',
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

    const handlePartRefresh = () => {
      localRefreshPath('/part/refresh');
    };

    onMounted(() => {
      console.log('onMounted=========', currentRoute.value.path);
    });

    onUnmounted(() => {
      console.log('onUnmounted=========', currentRoute.value.path);
    });

    onActivated(() => {
      console.log('onActivated=========', currentRoute.value.path);
    });

    onDeactivated(() => {
      console.log('onDeactivated=========', currentRoute.value.path);
    });

    return {form, curPath, handleClick, handlePartRefresh};
  },
  methods: {},
});
</script>

<style lang="less" scoped></style>
