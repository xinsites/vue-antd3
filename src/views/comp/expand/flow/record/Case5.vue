<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="true" title="流程记录 -【流程完结】">
      <!--      {{flowTimeline}}-->
      <a-radio-group v-model:value="showType" name="radioGroup" style="margin-bottom: 24px;">
        <a-radio value="timeline">时间线列表</a-radio>
        <a-radio value="list">表格列表</a-radio>
      </a-radio-group>
      <x-flow-record ref="flowTimelineRef" :list="flowTimeline" :showNodeName="true" :dotPhotoShow="true" :showType="showType" />
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {ApprovalTaskType} from "xin-antd3-ui";

export default defineComponent({
  setup() {
    const flowTimelineRef = ref(null);
    const showType = ref('timeline');

    const FLOW_TIMELINE_1 = [{
      nodeId: 'start',
      status: 'done',
      actionType: 'start',
      actionUser: {
        id: '1',
        name: '张三',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar.png'
      },
      nodeName: '开始',
      finishTime: '2025-09-09 15:20:00',
    }, {
      nodeId: 'lc_ai27047626595',
      status: 'done',
      actionType: 'transfer',
      actionUser: {
        id: '1',
        name: '张三',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar.png'
      },
      assignee: [{
        id: '2',
        name: '李四',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar4.png'
      }],
      finishTime: '2025-09-09 16:20:00',
    }, {
      nodeId: 'lc_ai27047626592',
      actionType: 'approval',
      status: 'done',
      nodeName: '审批',
      actionUser: {
        id: '1',
        name: '李四',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar4.png'
      },
      finishTime: '2025-09-09 17:20:00',
    }, {
      nodeId: 'end',
      status: 'stop',
      actionType: 'end',
      nodeName: '结束',
      finishTime: '2025-09-12 15:20:00',
      actionDesc: '审批完成',
    }] as ApprovalTaskType[]

    const flowTimeline = ref([]);

    // setTimeout(() => {
    //   flowTimeline.value = FLOW_TIMELINE_1;
    // }, 1000);
    flowTimeline.value = FLOW_TIMELINE_1;
    const handleNodeClick = () => {

    };
    return {showType, flowTimelineRef, flowTimeline, handleNodeClick};
  },
  methods: {},
});
</script>

<style lang="less" scoped>


</style>
