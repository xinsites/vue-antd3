<template>
  <ExceptionPage homeRoute="" type="403" />
</template>

<script lang="ts">
  import ExceptionPage from './components/ExceptionPage.vue';

  export default defineComponent({
    components: { ExceptionPage },
    data() {
      return {};
    },
  });
</script>

<style scoped lang="less">
  .exce {
    height: 100%;
    //min-height: calc(100vh - 20px);
  }
</style>
