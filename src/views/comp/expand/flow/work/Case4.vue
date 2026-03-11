<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="true" :body-style="{ padding: '0px', height:'100%' }">
      <x-work-flow ref="workFlowRef" v-model:value="flowJson" :formFields="formFields" :mode="mode" @nodeClick="handleNodeClick" :isSubflow="true" >
        <template #leftBottomRegion>
          <a-radio-group v-model:value="mode" name="radioGroup">
            <a-radio value="edit">编辑模式</a-radio>
            <a-radio value="preview">预览模式</a-radio>
            <a-radio value="light">高亮模式</a-radio>
          </a-radio-group>
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
    const flowJson = ref('{"id":"start","type":"start","name":"开始","desc":"所有人","nodeIcon":"UserOutlined","childNode":{"id":"nc_gv97471740169","type":"subflow","name":"子流程","placeholder":"请选择子流程","nodeIcon":"BlockOutlined","childNode":{"id":"end","type":"end","name":"结束","placeholder":"流程结束"},"desc":"子流程【assas】","props":{"subFlowKey":"assas","subFlowName":"assas"}}}');
    const mode = ref('edit');

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
      }]
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
      }]
    }]);

    const handleNodeClick = (node, branchType?: String, index?: Number, count?: Number) => {
      // console.log('handleNodeClick==1111=====', node);
    };

    return {workFlowRef, flowJson, formFields, mode, handleNodeClick};
  },
  methods: {},
});
</script>

<style lang="less" scoped>


</style>
