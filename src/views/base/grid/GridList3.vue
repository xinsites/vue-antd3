<template>
  <div :class="['xin-page-full']">
    <a-card title="表格宫格卡片自定义视图--加载全部数据并使用静态分页" :bordered="false">
      <x-pro-table
        ref="tableRef1"
        rowKey="id"
        :columns="columns1"
        :data-source="dataSource1"
        :page-config="{ pageSize: 2 }"
        :grid-config="{ loadType: 'fixedGrid', loadMore: true, maxCols: 1, gridGutter: 0 }"
        :load-config="{ isLoadAllData: true }"
        :tool-config="{ toolkit: [], toolmini:[] }"
      >
        <template #toolkit>
          <x-search-simple @query="handleQuery" :fast-config="{ fastField: 'username', dateField: 'createTime' }" />
        </template>
        <template #gridCard="{ record }">
          <a-card :bordered="true" :body-style="{ padding: '16px 24px' }">
            <div class="list-row-wrap f_s_b">
              <div class="flex-1">
                <h6 class="xin-elip">{{ record.title }}</h6>
                <div class="f_c_s m-t-8">
                  <a-tag v-for="(tag, i) in record.tags" :key="i">
                    {{ tag }}
                  </a-tag>
                </div>
                <div class="xin-text-heading m-t-12">
                  {{ record.content }}
                </div>
                <div class="f_c_s m-t-12">
                  <a-avatar :src="record.avatar" size="small" />
                  <div class="flex-1 p-l-12"> {{ record.user }} 发表于 {{ record.time }}</div>
                </div>
                <div class="list-action f_c_s m-t-16 xin-text-secondary">
                  <span>
                    <x-icon icon="like-outlined" />
                    <span><s></s>{{ record.likes }}</span>
                  </span>
                  <div class="action-split"></div>
                  <span>
                    <x-icon icon="star-outlined" />
                    <span><s></s>{{ record.favorites }}</span>
                  </span>
                  <div class="action-split"></div>
                  <span>
                    <x-icon icon="message-outlined" />
                    <span><s></s>{{ record.comments }}</span>
                  </span>
                </div>
              </div>
              <div class="list-image-wrap">
                <a-image width="100%" height="180px" style="object-fit: cover;" :src="record.cover" />
              </div>
            </div>
          </a-card>
        </template>
      </x-pro-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { columns, dataSource } from './TableConfig';
  import {deepClone} from "xin-antd3-ui";

  const tableRef1 = ref(null);
  const columns1 = ref(deepClone(columns));
  const dataSource1 = ref(deepClone(dataSource));

  const handleQuery = (queryParam) => {
    console.log('handleQuery=============', queryParam);
  };
</script>

<style lang="less" scoped>
  .list-row-wrap {
    .list-image-wrap {
      width: 280px;
      border-radius: 6px;
      overflow: hidden;
      margin-left: 40px;
    }

    .list-action {
      > span {
        padding: 0 16px;
      }

      s {
        padding: 0 0.125em;
        font-style: normal;
      }

      span:first-child {
        padding-left: 0px;
      }

      .action-split {
        background-color: #f0f0f0;
        height: 14px;
        width: 1px;
      }
    }
  }

  @media screen and (max-width: 880px) {
    .list-image-wrap {
      width: 200px;
    }
  }

  @media screen and (max-width: 576px) {
    .list-row-wrap {
      flex-wrap: wrap-reverse;
    }

    .list-image-wrap {
      width: 100% !important;
      margin: 0px 0px 16px;
      margin-left: 0px !important;
    }
  }

  ::v-deep(.ant-card-bordered) {
    border: 0px solid #f0f0f0;
    border-bottom: 1px solid var(--border-color);
  }
</style>
