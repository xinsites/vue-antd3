<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '0px' }">
    <div>
      <a-descriptions title="" :column="2" bordered>
        <a-descriptions-item label="Java名称">{{ model.name }}</a-descriptions-item>
        <a-descriptions-item label="Java版本">{{ model.version }}</a-descriptions-item>
        <a-descriptions-item label="启动时间">{{ model.startTime }}</a-descriptions-item>
        <a-descriptions-item label="运行时长">{{ model.runTime }}</a-descriptions-item>
        <a-descriptions-item label="安装路径" :span="2">{{ model.home }}</a-descriptions-item>
        <a-descriptions-item label="项目路径" :span="2">{{ model.userDir }}</a-descriptions-item>
      </a-descriptions>
    </div>
  </a-card>
</template>

<script lang="ts">
  export default defineComponent({
    components: {},
    props: {
      title: String,
      model: {
        type: Object,
        default: () => ({}),
      },
    },
    setup() {
      return {};
    },
    methods: {},
  });
</script>

<style lang="less" scoped>
  ::v-deep(.ant-descriptions-bordered .ant-descriptions-item-label) {
    width: 240px;
  }

  ::v-deep(.ant-descriptions-bordered .ant-descriptions-view) {
    border-left-width: 0px;
    border-right-width: 0px;
  }
</style>
