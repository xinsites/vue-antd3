<template>
  <div :class="['xin-page-full']">
    <HeaderCard style="margin-bottom: 16px"/>
    <div>
      <a-row :gutter="[16, 16]" ref="wrapRef">
        <a-col v-for="(item, index) in dataSource" :key="index" v-bind="{ lg: item.lg, md: item.md, sm: item.sm, xs: item.xs }">
          <component :is="item.name" :title="item.title" :style="{ height: item.height + 'px' }"/>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import HeaderCard from './components/HeaderCard.vue';
import ItemCard1 from './components/ItemCard1.vue';
import ItemCard2 from './components/ItemCard2.vue';
import ItemCard4 from './components/ItemCard4.vue';
import ItemCard5 from './components/ItemCard5.vue';
import ItemCard6 from './components/ItemCard6.vue';

export default defineComponent({
  name: 'Home',
  components: {HeaderCard, ItemCard1, ItemCard2, ItemCard4, ItemCard5, ItemCard6},
  setup(props, context) {
    const {proxy} = getCurrentInstance() as any;

    return {};
  },
  data() {
    return {
      dataSource: [
        {
          name: 'ItemCard1',
          title: 'XinSite Antd3 版本',
          lg: 8,
          md: 24,
          sm: 24,
          xs: 24,
          height: 400,
        },
        {
          name: 'ItemCard2',
          title: 'XinSite开发技术选型',
          lg: 16,
          md: 24,
          sm: 24,
          xs: 24,
          height: 400,
        },
        {
          name: 'ItemCard4',
          title: '更新日志',
          lg: 8,
          md: 24,
          sm: 24,
          xs: 24,
        },
        {
          name: 'ItemCard6',
          title: 'Java后端依赖',
          lg: 8,
          md: 24,
          sm: 24,
          xs: 24,
        },
        {
          name: 'ItemCard5',
          title: '前端依赖',
          lg: 8,
          md: 24,
          sm: 24,
          xs: 24,
        },
      ],
    };
  },
  methods: {},
});
</script>

<style lang="less" scoped></style>
