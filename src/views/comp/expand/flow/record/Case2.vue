<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="true" title="流程记录 -【子流程、延迟等待、触发器】">
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
      nodeId: 'lc_ai27047626592',
      actionType: 'subflow',
      status: 'doing',
      nodeName: '子流程',
      actionDesc: '领导审批子流程',
      finishTime: '2025-09-09 16:20:00',
    }, {
      nodeId: 'lc_ai27047626598',
      status: 'doing',
      actionType: 'delay',
      finishTime: '2025-09-09 16:20:00',
      actionDesc: '等待 6 个法定工作日后(2026-01-05 15:36)，进入下一节点',
      nodeName: '延迟处理',
    }, {
      nodeId: 'lc_ai27047626533',
      status: 'done',
      actionType: 'trigger',
      nodeName: '触发器',
      actionDesc: '调用目标方法',
    }] as ApprovalTaskType[]

    const flowTimeline = ref(FLOW_TIMELINE_1);

    return {showType, flowTimelineRef, flowTimeline};
  },
  methods: {},
});
</script>

<style lang="less" scoped>


</style>
