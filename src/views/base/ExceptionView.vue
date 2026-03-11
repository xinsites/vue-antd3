<template>
  <div :class="['xin-page-full']">
    <a-card title="异常页示例" :bordered="true" :body-style="{ padding: '10px',  height:'100%' }">
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
      path: '/exception/403',
      title: '403',
      content: '403',
    }, {
      path: '/exception/404',
      title: '404',
      content: '404',
    }, {
      path: '/exception/500',
      title: '500',
      content: '500',
    }, {
      path: '/exception/not/data',
      title: '无数据',
      content: '无数据',
    }, {
      path: '/exception/error',
      title: '网络错误',
      content: '网络错误',
    }]);

    const handleClick = (path) => {
      router.push(path);
    }
    return {routes, handleClick};
  },
  methods: {},
});
</script>
