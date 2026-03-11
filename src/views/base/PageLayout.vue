<template>
  <div :class="['xin-page-full']">
    <a-card title="页面布局示例" :bordered="true" :body-style="{ padding: '10px',  height:'100%' }">
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
      title: '单块内容满屏',
      content: '单块内容满屏',
      path: '/layout/full/screen',
    }, {
      title: '垂直方向满屏',
      content: '垂直方向满屏',
      path: '/layout/vertical/full',
    }, {
      title: '水平方向满屏',
      content: '水平方向满屏',
      path: '/layout/horizontal/full',
    }, {
      title: '表格滚动条上下布局',
      content: '表格滚动条上下布局',
      path: '/layout/table/scroll/vertical',
    }, {
      title: '表格滚动条左右布局',
      content: '表格滚动条左右布局',
      path: '/layout/table/scroll/horizontal',
    }, {
      title: '分割面板上下填充布局',
      content: '分割面板上下填充布局',
      path: '/layout/split/vertical',
    }, {
      title: '分割面板左右填充布局',
      content: '分割面板左右填充布局',
      path: '/layout/split/horizontal',
    }]);

    const handleClick = (path) => {
      router.push(path);
    }
    return {routes, handleClick};
  },
  methods: {},
});
</script>
