<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="true" :body-style="{ padding: '0px', height:'100%' }">
      <div class="option-group">
        <div class="option-item" @click="handleClick('/work/flow/simple/case1')">
          <div class="icon-warp">
            <x-icon icon="rollback-outlined" :size="24" class="option-icon"></x-icon>
          </div>
          <div class="option-text">
            <div class="option-title">编辑模式1</div>
            <div class="option-content">流程配置，初始值为空</div>
          </div>
        </div>
        <div class="option-item" @click="handleClick('/work/flow/simple/case2')">
          <div class="icon-warp">
            <x-icon icon="enter-outlined" :size="24" class="option-icon"></x-icon>
          </div>
          <div class="option-text">
            <div class="option-title">编辑模式2</div>
            <div class="option-content">流程配置，初始值不为空</div>
          </div>
        </div>
        <div class="option-item" @click="handleClick('/work/flow/simple/case3')">
          <div class="icon-warp">
            <x-icon icon="enter-outlined" :size="24" class="option-icon"></x-icon>
          </div>
          <div class="option-text">
            <div class="option-title">发起人自选</div>
            <div class="option-content">预览模式，发起人自选</div>
          </div>
        </div>
        <div class="option-item" @click="handleClick('/work/flow/simple/case4')">
          <div class="icon-warp">
            <x-icon icon="enter-outlined" :size="24" class="option-icon"></x-icon>
          </div>
          <div class="option-text">
            <div class="option-title">子流程设置</div>
            <div class="option-content">子流程设置，一些配置限制</div>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const handleClick = (path) => {
      router.push(path);
    }
    return {handleClick};
  },
  methods: {},
});
</script>

<style lang="less" scoped>
</style>
