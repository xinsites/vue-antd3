<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '6px 10px' }">
    <div>
      <a-table :pagination="false" :columns="columns" :dataSource="model" size="middle">
        <template #bodyCell="{ column, value }">
          <template v-if="column.dataIndex === 'val' && value != '核心数'"> {{ value }} %</template>
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
            title: '值',
            align: 'center',
            dataIndex: 'val',
          },
        ],
      };
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

  .ant-table-striped ::v-deep(.table-striped) td {
    background-color: #fafafa;
  }
</style>
