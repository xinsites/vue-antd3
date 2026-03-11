<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '6px 10px' }">
    <div>
      <a-table :pagination="false" :columns="columns" :dataSource="model" size="middle">
        <template #bodyCell="{ column, record, value }">
          <template v-if="column.dataIndex === 'mem'"> {{ value + (record.name == '使用率' ? '%' : 'G') }}</template>
          <template v-else-if="column.dataIndex === 'jvm'"> {{ value + (record.name == '使用率' ? '%' : 'M') }}</template>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script lang="ts">
  export default defineComponent({
    components: {},
    props: {
      title: String,
      model: {
        type: Array,
        default: () => [],
      },
    },
    setup() {
      const { proxy } = getCurrentInstance() as any;
      return {};
    },
    data() {
      return {
        columns: [
          {
            title: '属性',
            align: 'center',
            dataIndex: 'name',
          },
          {
            title: '内存',
            align: 'center',
            dataIndex: 'mem',
          },
          {
            title: 'JVM',
            align: 'center',
            dataIndex: 'jvm',
          },
        ],
      };
    },
    methods: {},
  });
</script>

<style lang="less" scoped>
  ::v-deep(.ant-descriptions-bordered .ant-descriptions-item-label) {
    padding: 16px 12px;
  }

  ::v-deep(.ant-descriptions-item-content) {
    white-space: nowrap;
  }
</style>
