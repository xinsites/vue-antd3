<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '0px 0px' }">
    <template #extra>
      <MoreIcon @refresh="onRefresh" @edit="emit('edit')" @hide="emit('hide')" @reset="emit('reset')" />
    </template>
    <div ref="chartRef" :style="{ width: '100%', height: '342px' }" class="xin-scrollbar-hover"></div>
  </a-card>
</template>

<script lang="ts">
  import MoreIcon from './MoreIcon.vue';
  import { message } from 'ant-design-vue/es';
  import * as echarts from 'echarts';
  import {random} from "xin-antd3-ui";

  export default defineComponent({
    components: { MoreIcon },
    props: {
      title: String,
    },
    setup(props2, { emit }) {
      const { proxy } = getCurrentInstance() as any;
      const loading = ref<boolean>(true);
      const chartRef = ref(null);
      let myChart = null;
      const onRefresh = () => {
        message.info('点击了刷新');
        const data = [];
        for (let i = 0; i < 6; i++) data.push(random(0, 60));
        drawChart(data);
      };

      onMounted(() => {
        //需要获取到element,所以是onMounted的Hook
        myChart = echarts.init(chartRef.value);
        drawChart([5, 24, 36, 18, 10, 23]); // 绘制图表
        window.onresize = function () {
          myChart.resize(); //自适应大小
        };
      });

      const drawChart = (data) => {
        if (!myChart) return;
        myChart.setOption({
          title: { text: '上半年销售统计', left: 'center', top: 300 },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}',
          },
          xAxis: {
            name: 'x',
            data: ['12-1', '12-2', '12-3', '12-4', '12-5', '12-6'],
          },
          yAxis: { name: 'y' },
          grid: {
            left: '6%',
            right: '6%',
            bottom: '18%',
            containLabel: true,
          },
          series: [
            {
              name: '用户量',
              type: 'line',
              data: data,
            },
          ],
        });
      };

      return { emit, onRefresh, chartRef };
    },
    methods: {},
  });
</script>

<style lang="less" scoped></style>
