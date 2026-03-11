<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="true" :body-style="{ padding: '0px', height:'100%' }">
      <x-work-flow ref="workFlowRef" v-model:value="flowJson" v-model:extraInfo="selfUsers" :formFields="formFields" :mode="mode" :showSave="true" :managerMaxLevel="3"
                   :headMaxLevel="3" :superMaxLevel="2">
        <template #leftBottomRegion>
          <a-radio-group v-model:value="mode" name="radioGroup">
            <a-radio value="edit">编辑模式</a-radio>
            <a-radio value="preview">预览模式</a-radio>
            <a-radio value="light">高亮模式</a-radio>
          </a-radio-group>
        </template>
        <template #nodeProps="{ node, index }">
          <div class="item-warp" v-if="node?.type=='subflows2'">
            {{ index }}
            <div class="item-title">{{ node?.type }}</div>
            <div class="item-content">{{ node?.desc }}</div>
          </div>
        </template>
      </x-work-flow>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  setup() {
    const workFlowRef = ref(null);
    const flowJson = ref('{"id":"start","type":"start","name":"开始","desc":"所有人","nodeIcon":"UserOutlined","childNode":{"id":"lc_s565468661551","type":"approval","name":"审批人","placeholder":"请选择审批人","nodeIcon":"UserOutlined","childNode":{"id":"end","type":"end","name":"结束","placeholder":"流程结束"},"desc":"发起人自选","props":{"approvalType":"manual","assignees":[{"type":"self_select","ids":"one_user"}],"multiApprover":{"type":"parallel"},"emptyApprover":{"type":"auto_pass"},"startApprover":{"type":"self"},"timeoutApprover":{"enabled":false},"operateAuth":{"enabled":false},"notice":{"enabled":false}}}}');
    const mode = ref('preview');

    const formFields = ref([{
      tabKey: 'mainForm',
      tabName: '主表',
      fields: [{
        field: 'name',
        name: '姓名',
      }, {
        field: 'age',
        name: '年龄',
        xtype: 'NumberField',
      }],
    }, {
      tabKey: 'modalList',
      tabName: '一对多窗口编辑',
      fields: [{
        field: 'pointName',
        name: '办理点名称',
        fieldType: 'form',
      }, {
        field: 'applyDept',
        name: '所属部门',
      }],
    }]);

    const selfUsers = ref('[{"nodeId":"lc_s565468661551","extraInfo":"3","nodeDesc":"朱德华"}]');

    // setTimeout(() => {
    //   selfUsers.value = '[{"nodeId":"lc_s565468661551","extraInfo":"3,2","nodeDesc":"朱德华2"}]';
    // }, 100);

    return {workFlowRef, flowJson, formFields, mode, selfUsers};
  },
  methods: {},
});
</script>

<style lang="less" scoped>


</style>
