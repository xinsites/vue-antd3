<template>
  <div :class="['xin-page-full']">
    <a-row :gutter="[16, 16]" ref="wrapRef">
      <a-col v-for="(item, index) in dataSource" :key="index" v-bind="{ lg: item.lg, md: item.md, sm: item.sm, xs: item.xs }">
        <component :model="model[item.key]" :is="item.name" :title="item.title" :style="{ height: item.height + 'px' }" />
      </a-col>
    </a-row>
    <div></div>
  </div>
</template>

<script lang="ts">
  import ItemCard1 from './components/ItemCard1.vue';
  import ItemCard2 from './components/ItemCard2.vue';
  import ItemCard3 from './components/ItemCard3.vue';
  import ItemCard4 from './components/ItemCard4.vue';
  import ItemCard5 from './components/ItemCard5.vue';
  import { ref } from 'vue';
  import {random} from "xin-antd3-ui";

  export default defineComponent({
    name: 'Home',
    components: { ItemCard1, ItemCard2, ItemCard3, ItemCard4, ItemCard5 },
    setup(props, context) {
      const { proxy } = getCurrentInstance() as any;
      const model = ref<any>({});
      let timer; // 定时器

      const onLoadData = () => {
        model.value = {
          cpu: [
            {
              name: '核心数',
              val: 2,
            },
            {
              name: '用户使用率',
              val: (random(600, 6000) / 100.0).toFixed(2),
            },
            {
              name: '系统使用率',
              val: (random(100, 1000) / 100.0).toFixed(2),
            },
            {
              name: '当前空闲率',
              val: (random(8000, 10000) / 100.0).toFixed(2),
            },
          ],
          storages: [
            {
              name: '总内存',
              mem: 3.86,
              jvm: 211.0,
            },
            {
              name: '已用内存',
              mem: 2.95,
              jvm: 204.34,
            },
            {
              name: '剩余内存',
              mem: 0.91,
              jvm: 6.66,
            },
            {
              name: '使用率',
              mem: 76.35,
              jvm: 92.29,
            },
          ],
          disks: [
            {
              dirName: 'C:\\',
              sysTypeName: 'NTFS',
              typeName: '本地固定磁盘 (C:)',
              total: 60.0,
              free: 33.4,
              used: 26.6,
              usage: 44.39,
            },
          ],
          sys: {
            computerName: 'iZ612mphe33a47uZ',
            osName: 'Windows Server 2012',
            computerIp: '102.46.210.148',
            osArch: 'amd64',
          },
          jvm: {
            name: 'Java HotSpot(TM) 64-Bit Server VM',
            version: '1.8.0_25',
            startTime: '2020-04-12 09:10:26',
            runTime: '1042天2小时26分钟',
            home: '*******************************',
            userDir: '*******************************',
          },
        };
      };
      onLoadData();
      onMounted(() => {
        clearInterval(timer);
        timer = setInterval(() => onLoadData(), 5000);
      });

      onUnmounted(() => clearInterval(timer));

      return { model };
    },
    data() {
      return {
        dataSource: [
          {
            key: 'cpu',
            name: 'ItemCard1',
            title: 'CPU',
            lg: 12,
            md: 24,
            sm: 24,
            xs: 24,
          },
          {
            key: 'storages',
            name: 'ItemCard2',
            title: '内存',
            lg: 12,
            md: 24,
            sm: 24,
            xs: 24,
          },
          {
            key: 'disks',
            name: 'ItemCard3',
            title: '磁盘状态',
            lg: 24,
            md: 24,
            sm: 24,
            xs: 24,
          },
          {
            key: 'sys',
            name: 'ItemCard4',
            title: '服务器信息',
            lg: 24,
            md: 24,
            sm: 24,
            xs: 24,
          },
          {
            key: 'jvm',
            name: 'ItemCard5',
            title: 'Java虚拟机信息',
            lg: 24,
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
