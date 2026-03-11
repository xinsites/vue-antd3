<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '0px' }">
    <div>
      <a-table :pagination="false" :columns="columns" :dataSource="model">
        <template #bodyCell="{ column, value }">
          <template v-if="['total', 'free', 'used'].indexOf(column.dataIndex) >= 0"> {{ value }} GB</template>
          <template v-else-if="column.dataIndex === 'usage'"> {{ value }} %</template>
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
            title: '盘符路径',
            align: 'center',
            dataIndex: 'dirName',
          },
          {
            title: '文件系统',
            align: 'center',
            dataIndex: 'sysTypeName',
          },
          {
            title: '盘符类型',
            align: 'center',
            dataIndex: 'typeName',
          },
          {
            title: '总大小',
            align: 'center',
            dataIndex: 'total',
          },
          {
            title: '可用大小',
            align: 'center',
            dataIndex: 'free',
          },
          {
            title: '已用大小',
            align: 'center',
            dataIndex: 'used',
          },
          {
            title: '已用百分比',
            align: 'center',
            dataIndex: 'usage',
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
</style>
