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
        <template v-else-if="column.dataIndex === 'status'">
          <span v-if="record.status === 0" class="xin-text-info xin-text-delete"> 未开始 </span>
          <span v-else-if="record.status === 1" class="xin-text-primary"> 进行中 </span>
          <span v-else-if="record.status === 2" class="xin-text-danger"> 已延期 </span>
          <span v-else-if="record.status === 3" class="xin-text-success"> 已结束 </span>
        </template>
        <template v-else-if="column.dataIndex === 'progress'">
          <a-progress :percent="record.progress" size="small" />
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
  import MoreIcon from './MoreIcon.vue';
  import { message } from 'ant-design-vue/es';
  import { ref } from 'vue';
  import { homeProjectsAPI } from '@/api/common/home-api';

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
        homeProjectsAPI()
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
            title: '项目名称',
            ellipsis: true,
            dataIndex: 'title',
          },
          {
            title: '开始时间',
            align: 'center',
            ellipsis: true,
            dataIndex: 'startDate',
          },
          {
            title: '结束时间',
            align: 'center',
            ellipsis: true,
            dataIndex: 'endDate',
          },
          {
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            width: 100,
          },
          {
            title: '进度',
            dataIndex: 'progress',
            align: 'center',
            width: 190,
          },
        ],
      };
    },
    methods: {},
  });
</script>

<style lang="less" scoped></style>
