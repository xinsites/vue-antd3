<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '6px 10px' }">
    <template #extra>
      <span class="btn-more item-over"><a @click="handleMore">更多</a></span>
      <MoreIcon @refresh="onRefresh" @edit="emit('edit')" @hide="emit('hide')" @reset="emit('reset')" />
    </template>
    <a-table :pagination="false" :loading="loading" :columns="columns" :dataSource="dataSource" size="middle">
      <template #bodyCell="{ column, record, value }">
        <template v-if="column.dataIndex === 'title'">
          <a @click="handleShow(record)">{{ value }}</a>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
  import MoreIcon from './MoreIcon.vue';
  import { message } from 'ant-design-vue/es';
  import { ref } from 'vue';
  import { homeTasksAPI } from '@/api/common/home-api';

  export default defineComponent({
    components: { MoreIcon },
    props: {
      title: String,
    },
    setup(props2, { emit }) {
      const { proxy } = getCurrentInstance() as any;
      const loading = ref<boolean>(true);
      const dataSource = ref<any>([]);

      const onRefresh = () => {
        onLoadData();
      };

      const handleShow = () => {
        message.info('点击了查看');
      };

      const handleMore = () => {
        message.info('点击了更多');
      };

      const onLoadData = () => {
        loading.value = true;
        homeTasksAPI()
          .then((data) => {
            loading.value = false;
            dataSource.value = data;
          })
          .catch((e: Error) => {
            message.error(e.message);
          });
      };
      onLoadData();
      return { emit, dataSource, loading, handleMore, onRefresh, handleShow, onLoadData };
    },
    data() {
      return {
        columns: [
          {
            width: 60,
            dataIndex: 'id',
            title: '序号',
            align: 'center',
          },
          {
            title: '任务名称',
            ellipsis: true,
            dataIndex: 'title',
          },
          {
            title: '创建时间',
            width: 180,
            align: 'center',
            dataIndex: 'createTime',
          },
        ],
      };
    },
    methods: {},
  });
</script>

<style lang="less" scoped></style>
