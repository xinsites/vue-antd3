<template>
  <div :class="['xin-page-full']">
    <a-card title="宫格列表示例" :bordered="true" :body-style="{ padding: '10px',  height:'100%' }">
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
      path: '/grid/list1',
      title: '宫格应用一',
      content: '宫格应用一',
    }, {
      path: '/grid/list2',
      title: '宫格应用二',
      content: '宫格应用二',
    }, {
      path: '/grid/list3',
      title: '宫格应用三',
      content: '宫格应用三',
    }]);

    const handleClick = (path) => {
      router.push(path);
    }
    return {routes, handleClick};
  },
  methods: {},
});
</script>
