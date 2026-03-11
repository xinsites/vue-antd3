<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '0px' }">
    <template #extra>
      <span class="btn-more item-over"><a @click="handleMore">更多</a></span>
      <MoreIcon @refresh="onRefresh" @edit="emit('edit')" @hide="emit('hide')" @reset="emit('reset')" />
    </template>
    <a-spin :spinning="loading" style="text-align: center">
      <div style="height: 342px; padding: 20px 20px 0px 130px" class="xin-scrollbar-hover">
        <ul class="ant-timeline">
          <li class="ant-timeline-item" v-for="item in dataSource" :key="item.id">
            <div class="ant-timeline-item-tail"></div>
            <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
            <div class="ant-timeline-time">
              <div class="timeline-tag">{{ item.time }}</div>
            </div>
            <div class="ant-timeline-item-content">
              {{ item.userName }} <span class="label-action">{{ item.action }}了</span>{{ item.title }}
            </div>
          </li>

          <!--        <li class="ant-timeline-item">-->
          <!--          <div class="ant-timeline-item-tail"></div>-->
          <!--          <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>-->
          <!--          <div class="ant-timeline-time">-->
          <!--            <div class="timeline-tag">2月07日 17:48</div>-->
          <!--          </div>-->
          <!--          <div class="ant-timeline-item-content">Solve initial network problems</div>-->
          <!--        </li>-->
          <!--        <li class="ant-timeline-item">-->
          <!--          <div class="ant-timeline-item-tail"></div>-->
          <!--          <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>-->
          <!--          <div class="ant-timeline-time">-->
          <!--            <div class="timeline-tag">2月07日 17:43</div>-->
          <!--          </div>-->
          <!--          <div class="ant-timeline-item-content">管理员 <span class="label-action">登录了</span>系统</div>-->
          <!--        </li>-->
        </ul>
      </div>
    </a-spin>
  </a-card>
</template>

<script lang="ts">
import MoreIcon from './MoreIcon.vue';
import {message} from 'ant-design-vue/es';
import {ref} from 'vue';
import {homeNewsAPI} from '@/api/common/home-api';

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

      const handleMore = () => {
        message.info('点击了更多');
      };

      const onLoadData = () => {
        loading.value = true;
        homeNewsAPI()
          .then((data) => {
            loading.value = false;
            dataSource.value = data;
          })
          .catch((e: Error) => {
            message.error(e.message);
          });
      };
      onLoadData();
      return { emit, loading, handleMore, onRefresh, dataSource, onLoadData };
    },
    methods: {},
  });
</script>

<style lang="less" scoped>
  .btn-more {
    margin-right: 2px;
  }

  .ant-timeline {
    .ant-timeline-item:last-child {
      .ant-timeline-item-tail {
        display: none;
      }
    }
  }

  .ant-timeline-time {
    position: absolute;
    top: -6px;
    left: -106px;
    text-align: center;

    .timeline-tag {
      color: #838a9d;
    }
  }

  .label-action {
    color: #838a9d;
    margin: auto 5px;
  }

  ::v-deep(.ant-timeline-item-content) {
    position: relative;
    top: -5px;
    margin: 0 0 0px 26px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
