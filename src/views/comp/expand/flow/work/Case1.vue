<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="true" :body-style="{ padding: '0px', height:'100%' }">
      <x-work-flow v-model:value="flowJson" :showSave="false"></x-work-flow>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  setup() {
    const workFlowRef = ref(null);
    const flowJson = ref('');

    const handleNodeClick = (node, branchType?: String, index?: Number, count?: Number) => {
      // console.log('handleNodeClick==1111=====', node);
    };

    return {workFlowRef, flowJson, handleNodeClick};
  },
  methods: {},
});
</script>

<style lang="less" scoped>


</style>
