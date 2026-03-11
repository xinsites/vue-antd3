<template>
  <div>
    <a-row :gutter="[16, 16]" ref="wrapRef">
      <a-col v-for="item in linkList" :key="item.title" v-bind="{ lg: 3, md: 6, sm: 12, xs: 12 }">
        <a-card :bordered="false" hoverable :body-style="{ padding: 0 }">
          <div :to="item.url" class="app-link-block" @click="linkOpenItem(item)">
            <x-icon :icon="item.icon" class="app-link-icon" :color="item.color" :size="22"/>
            <div class="app-link-title">{{ item.title }}</div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import SortableJs from 'xin-antd3-ui/lib/utils/plugins/sortablejs';
import {getCacheData, setCacheData} from 'xin-antd3-ui';
import {linkOpen} from "@/utils/comm-util";

const CACHE_KEY = 'home-links';
const DEFAULT = [
  {icon: 'ClockCircleOutlined', title: '待办', url: '/list/card/project', color: '#ff9c6e'},
  {icon: 'FileDoneOutlined', title: '已办', url: '/list/basic', color: '#b37feb'},
  {icon: 'UserAddOutlined', title: '加班', url: '/system/user', color: '#1fdaca'},
  {icon: 'UserDeleteOutlined', title: '请假', url: '/list/advanced', color: '#ffd666'},
  {icon: 'BoldOutlined', title: '百度(外链)', url: 'https://www.baidu.com/', color: '#2932E1'},
  {icon: 'PaperClipOutlined', title: 'XinSite(内嵌)', url: 'http://xinsite.vip/', iframe: true, color: '#2932E1'},
  {icon: 'BellOutlined', title: '通知', url: '/user/message', color: '#5cdbd3'},
  {icon: 'SettingOutlined', title: '主题配置', url: '/user/profile', color: '#ffc069'},
];

interface LinkItem {
  icon: string;
  title: string;
  url: string;
  color?: string;
}

export default defineComponent({
  components: {},
  setup() {
    const {proxy} = getCurrentInstance() as any;
    const linkList = ref<LinkItem[]>([...(getCacheData(CACHE_KEY) ?? DEFAULT)]);
    const wrapRef = ref(null);
    let sortableIns: SortableJs | null = null;

    onMounted(() => {
      const isTouchDevice = 'ontouchstart' in document.documentElement;
      if (isTouchDevice) {
        return;
      }
      sortableIns = new SortableJs(wrapRef.value?.$el, {
        animation: 300,
        // filter: '.ant-card-hoverable',
        onUpdate: ({oldIndex, newIndex}) => {
          if (typeof oldIndex === 'number' && typeof newIndex === 'number') {
            const temp = [...linkList.value];
            // [temp[oldIndex], temp[newIndex]] = [temp[newIndex], temp[oldIndex]];
            const newList = temp.filter((item, index) => index != oldIndex);
            newList.splice(newIndex, 0, temp[oldIndex]);
            // linkList.value = newList;
            // setCacheData(CACHE_KEY, linkList.value);
          }
        },
        setData: () => {
        },
      });
    });
    onBeforeUnmount(() => {
      sortableIns?.destroy();
    });
    return {wrapRef, linkList};
  },
  methods: {
    //重置布局
    reset() {
      this.linkList = [...DEFAULT];
      setCacheData(CACHE_KEY, this.linkList);
    },
    linkOpenItem(item) {
      if (item.iframe) {
        this.$router.push({path: '/iframe/keepalive', query: {title: item.title, url: item.url, selPath: '/workplace'}});
      } else {
        linkOpen(item.url);
      }
    },
  },
});
</script>

<style lang="less" scoped>
.app-link-block {
  cursor: pointer;
  padding: 12px;
  text-align: center;
  display: block;
  color: inherit;

  .app-link-icon {
    font-size: 30px;
    margin: 6px 0 10px 0;
  }

  .app-link-title {
    font-size: 15px;
    white-space: nowrap; //不换行
    overflow: hidden; //超出部分隐藏
    text-overflow: ellipsis; //文本溢出显示省略号
  }
}
</style>
