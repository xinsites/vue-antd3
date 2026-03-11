<template>
  <div :class="['xin-page-full', 'horizontal-layout']">
    <a-card :bordered="false" title="签名验证">
      <a-alert style="margin-bottom: 20px" show-icon type="warning">
        <template #message>
          1、 必须跳转到带参数的页面。 <br/>
          2、 跳转的页面路由配置：meta.sign=true，<b>签名验证</b><br/>
          3、 配置成签名验证的页面，如果带参数，布局框架会自动添加签名字符串，防止用户篡改<b>url请求参数</b><br/>
          4、 使用场景：进入到修改、查看页面，配置了签名验证后，用户修改url请求参数，url请求参数将还原<br/>
        </template>
        <template #icon>
          <x-icon icon="SoundOutlined"/>
        </template>
      </a-alert>
      <div>
        <a-button type="primary" @click="handleClick('/sign/edit')">跳转(/sign/edit)</a-button>
        <span style="margin-left: 10px;">不会添加签名字符串，防止篡改有效</span>
        <br/>
        <br/>
        <a-button type="primary" @click="handleClick('/sign/edit?id=1')">跳转(/sign/edit?id=1)</a-button>
        <span style="margin-left: 10px;">会添加签名字符串，防止篡改有效</span>
        <br/>
        <br/>
        <a-button type="primary" @click="handleClick('/sign/edit?type=2&id=2')">跳转(/sign/edit?type=2&id=2)</a-button>
        <span style="margin-left: 10px;">会添加签名字符串，防止篡改有效</span>
        <br/>
        <br/>
      </div>


    </a-card>
  </div>
</template>

<script lang="ts">
import {useRouter} from "vue-router";
import {signPushTabPage} from "xin-antd3-ui";

export default defineComponent({
  setup() {
    const router = useRouter();
    const {currentRoute} = useRouter();

    const handleClick = (path) => {
      signPushTabPage(router, path);
      // signPushTabPage(router, {path: '/sign/edit', query: {type: 2, id: 2}});
    };

    return {handleClick};
  },
  methods: {},
});
</script>

<style lang="less" scoped></style>
