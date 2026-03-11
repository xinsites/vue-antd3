<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '0px' }">
    <div>
      <a-descriptions title="" :column="2" bordered>
        <a-descriptions-item label="服务器名称">{{ model.computerName }}</a-descriptions-item>
        <a-descriptions-item label="操作系统">{{ model.osName }}</a-descriptions-item>
        <a-descriptions-item label="服务器IP">{{ model.computerIp }}</a-descriptions-item>
        <a-descriptions-item label="系统架构">{{ model.osArch }}</a-descriptions-item>
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
