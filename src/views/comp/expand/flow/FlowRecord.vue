<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="true" :body-style="{ padding: '0px', height:'100%' }">
      <div class="option-group">
        <div class="option-item" @click="handleClick('/flow/timeline/case1')">
          <div class="icon-warp">
            <x-icon icon="rollback-outlined" :size="24" class="option-icon"></x-icon>
          </div>
          <div class="option-text">
            <div class="option-title">示例1</div>
            <div class="option-content">审批、抄送、办理</div>
          </div>
        </div>
        <div class="option-item" @click="handleClick('/flow/timeline/case2')">
          <div class="icon-warp">
            <x-icon icon="rollback-outlined" :size="24" class="option-icon"></x-icon>
          </div>
          <div class="option-text">
            <div class="option-title">示例2</div>
            <div class="option-content">子流程、延迟等待、触发器</div>
          </div>
        </div>
        <div class="option-item" @click="handleClick('/flow/timeline/case3')">
          <div class="icon-warp">
            <x-icon icon="rollback-outlined" :size="24" class="option-icon"></x-icon>
          </div>
          <div class="option-text">
            <div class="option-title">示例3</div>
            <div class="option-content">转交、回退、评论、通知</div>
          </div>
        </div>
        <div class="option-item" @click="handleClick('/flow/timeline/case4')">
          <div class="icon-warp">
            <x-icon icon="rollback-outlined" :size="24" class="option-icon"></x-icon>
          </div>
          <div class="option-text">
            <div class="option-title">示例4</div>
            <div class="option-content">加签、减签</div>
          </div>
        </div>
        <div class="option-item" @click="handleClick('/flow/timeline/case5')">
          <div class="icon-warp">
            <x-icon icon="rollback-outlined" :size="24" class="option-icon"></x-icon>
          </div>
          <div class="option-text">
            <div class="option-title">示例5</div>
            <div class="option-content">流程完结</div>
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
