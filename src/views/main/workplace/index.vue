<template>
  <div :class="['xin-page-full']">
    <HeaderCard style="margin-bottom: 16px"/>
    <LinkCard ref="linkCardRef" style="margin-bottom: 16px"/>
    <a-row :gutter="[16, 16]" ref="wrapRef">
      <a-col v-for="(item, index) in cardList" :key="item.name" v-bind="{ lg: item.lg, md: item.md, sm: item.sm, xs: item.xs }">
        <component :is="item.name" :title="item.title" @edit="onEdit(index)" @hide="onHide(index)" @reset="onReset(index)" style="height: 400px"/>
      </a-col>
    </a-row>
    <div></div>
    <x-modal ref="dragModal" :width="520" title="可添加的视图" @ok="handleOk" :resizable="false" :body-style="{ padding: '20px 20px' }">
      <a-row :gutter="[16, 16]" ref="wrapRef">
        <a-col v-for="(item, index) in dataSource" :key="index" v-bind="{ md: 12, sm: 12, xs: 24 }">
          <a-card title="添加视图" :bordered="true" size="small" :body-style="{ height: '80px', lineHeight: '80px', padding: '0px', textAlign: 'center' }">
            <a-checkbox v-model:checked="item.checked">{{ item.title }}</a-checkbox>
          </a-card>
        </a-col>
      </a-row>
      <a-empty v-if="!dataSource.length" description="已添加所有视图"/>
    </x-modal>
    <!--    <div> 待办事项1、项目介绍2、快捷导航1、最新动态1、项目进度2、小组成员1、销售统计1</div>-->
  </div>
</template>

<script lang="ts">
import {message} from 'ant-design-vue/es';
import HeaderCard from './components/HeaderCard.vue';
import SortableJs from 'xin-antd3-ui/lib/utils/plugins/sortablejs';
import {getCacheData, setCacheData} from "xin-antd3-ui";

const CACHE_KEY = 'workplace-layout';

interface ViewItem {
  name: string;
  title: string;
  lg: number;
  md: number;
  sm: number;
  xs: number;
}

// 默认布局
const DEFAULT: ViewItem[] = [
  {
    name: 'LatestNews',
    title: '最新动态',
    lg: 8,
    md: 24,
    sm: 24,
    xs: 24,
  },
  {
    name: 'WaitHandle',
    title: '待办任务',
    lg: 8,
    md: 24,
    sm: 24,
    xs: 24,
  },
  {
    name: 'QuickNav',
    title: '快捷导航',
    lg: 8,
    md: 24,
    sm: 24,
    xs: 24,
  },
  {
    name: 'ProjectCard',
    title: '项目进度',
    lg: 16,
    md: 24,
    sm: 24,
    xs: 24,
  },
  {
    name: 'ChartCard',
    title: '销售统计',
    lg: 8,
    md: 24,
    sm: 24,
    xs: 24,
  },
];
export default defineComponent({
  name: 'Home',
  components: {
    HeaderCard,
    LinkCard: defineAsyncComponent(() => import('./components/LinkCard.vue')),
    WaitHandle: defineAsyncComponent(() => import('./components/WaitHandle.vue')),
    QuickNav: defineAsyncComponent(() => import('./components/QuickNav.vue')),
    LatestNews: defineAsyncComponent(() => import('./components/LatestNews.vue')),
    ProjectCard: defineAsyncComponent(() => import('./components/ProjectCard.vue')),
    ChartCard: defineAsyncComponent(() => import('./components/ChartCard.vue')),
  },
  setup(props, context) {
    const {proxy} = getCurrentInstance() as any;
    const cardList = ref<ViewItem[]>([]);
    const wrapRef = ref(null);
    const dragModal = ref();
    const dataSource = ref([]);

    const linkCardRef = ref(null);
    let sortableIns: SortableJs | null = null;
    onMounted(() => {
      cardList.value = [...(getCacheData(CACHE_KEY) ?? DEFAULT)];
      const isTouchDevice = 'ontouchstart' in document.documentElement;
      if (isTouchDevice) {
        return;
      }
      sortableIns = new SortableJs(wrapRef.value?.$el, {
        handle: '.ant-card-head',
        animation: 300,
        onUpdate: ({oldIndex, newIndex}) => {
          if (typeof oldIndex === 'number' && typeof newIndex === 'number') {
            const temp = [...cardList.value];
            [temp[oldIndex], temp[newIndex]] = [temp[newIndex], temp[oldIndex]];
            cardList.value = temp;
            setCacheData(CACHE_KEY, cardList.value);
          }
        },
        setData: () => {
        },
      });
    });

    onBeforeUnmount(() => {
      if (sortableIns) {
        sortableIns.destroy();
      }
    });

    return {wrapRef, cardList, linkCardRef, dragModal, dataSource};
  },
  methods: {
    onHide(index) {
      this.cardList = this.cardList.filter((_d, i) => i !== index);
      setCacheData(CACHE_KEY, this.cardList);
    },
    onEdit(index) {
      // message.info('点击了编辑');
      this.dataSource = DEFAULT.filter((d) => !this.cardList.some((t) => t.name === d.name)).map((item) => {
        return {checked: false, ...item};
      });
      this.dragModal.openDialog();
    },
    onReset(index) {
      this.cardList = [...DEFAULT];
      setCacheData(CACHE_KEY, this.cardList);
      this.linkCardRef?.reset();
      message.info('布局已重置');
    },
    handleOk() {
      this.dataSource.forEach((item) => {
        if (item.checked) this.cardList.push(item);
      });
      // this.cardList = [...this.cardList, ...this.dataSource.filter((t) => t.checked)];
      setCacheData(CACHE_KEY, this.cardList);
      this.dragModal.closeDialog();
    },
  },
});
</script>

<style lang="less" scoped>
.xin-page-full ::v-deep(.ant-card-head) {
  cursor: move;
  position: relative;
}

.xin-page-full ::v-deep(.ant-row > .ant-col.sortable-chosen > .ant-card) {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}

.layout-list-item {
  padding: 14px 40px;
  text-align: center;
  border-bottom: 1px solid hsla(0, 0%, 60%, 0.2);
}
</style>
