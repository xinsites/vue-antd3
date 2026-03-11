<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="true" title="流程记录 -【转交、回退、评论】">
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
      actionType: 'add_tag',
      actionUser: {
        id: '1',
        name: '张三',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar5.png'
      },
      assignee: [{
        id: '2',
        name: '李四',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar.png'
      }],
      comment: 'ddddddddd',
      files: [{
        "name": "文件1.jpg", "path": "http://xinsite.vip/uploadfiles/20230415/b77e01b7a4934870af57cee2afeed1be.jpg"
      }],
      finishTime: '2025-09-09 16:20:00',
    }, {
      nodeId: 'lc_ai27047626595',
      status: 'done',
      actionType: 'del_tag',
      actionUser: {
        id: '1',
        name: '张三',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar5.png'
      },
      assignee: [{
        id: '2',
        name: '李四',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar.png'
      }],
      finishTime: '2025-09-09 18:27:00',
    }, {
      nodeId: 'lc_ai27047626595',
      status: 'done',
      actionType: 'add_tag_before',
      actionUser: {
        id: '1',
        name: '张三',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar5.png'
      },
      assignee: [{
        id: '2',
        name: '李四',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar.png'
      }],
      finishTime: '2025-09-10 14:27:00',
    }, {
      nodeId: 'lc_ai27047626595',
      status: 'done',
      actionType: 'add_tag_after',
      actionUser: {
        id: '1',
        name: '张三',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar5.png'
      },
      assignee: [{
        id: '2',
        name: '李四',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar.png'
      }],
      finishTime: '2025-09-12 11:35:00',
    }, {
      nodeId: 'lc_ai27047626595',
      status: 'done',
      actionType: 'revoke',
      actionUser: {
        id: '1',
        name: '张三',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar5.png'
      },
      comment: '3333wqq',
      files: [{
        "name": "文件1.jpg", "path": "http://xinsite.vip/uploadfiles/20230415/b77e01b7a4934870af57cee2afeed1be.jpg"
      }, {
        "name": "文件2.jpg", "path": "uploadfiles/20230415/45cd897124d84398af8d1d3fa73b956b.jpg"
      }, {
        "name": "文件3.jpg", "path": "uploadfiles/20230415/871d87ec321f40748f2f0fca6372388e.png"
      }],
      finishTime: '2025-09-12 14:44:00',
    }, {
      nodeId: 'lc_ai27047626598',
      status: 'doing',
      actionType: 'approval',
      nodeName: '审批',
      assignee: [{
        id: '2',
        name: '李四',
        photo: 'http://antd3.lite.xinsite.vip/api/uploadfiles/api/user/avatar4.png'
      }]
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
