<template>
  <div :class="['xin-page-full']">
    <a-card title="框架布局示例" :bordered="true" :body-style="{ padding: '10px',  height:'100%' }">
      <div class="option-group" >
        <div class="option-item" v-for="(item, index) in routes" :key="index" @click="handleClick(item.path)">
          <div class="icon-warp">
            <x-icon icon="rocket-outlined" :size="24" class="option-icon"/>
          </div>
          <div class="option-text">
            <div class="option-title">{{ item.title }}</div>
            <div class="option-content">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </a-card>

  </div>
</template>

<script lang="ts">

import {ref} from "vue";

export default defineComponent({
  setup() {
    const router = useRouter();

    const routes = ref([{
      path: '/layout/help',
      title: '框架布局说明',
      content: '框架布局说明',
    }, {
      path: '/keepalive',
      title: '缓存页面',
      content: '缓存页面',
    }, {
      path: '/no/cache',
      title: '非缓存页面',
      content: '非缓存页面',
    }, {
      path: '/part/refresh',
      title: '局部刷新',
      content: '局部刷新',
    }, {
      path: '/sign',
      title: '签名验证',
      content: '签名验证',
    }, {
      path: '/auth',
      title: '权限控制',
      content: '权限控制',
    }]);

    const handleClick = (path) => {
      router.push(path);
    }
    return {routes, handleClick};
  },
  methods: {},
});
</script>
