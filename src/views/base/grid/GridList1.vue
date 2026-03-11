<template>
  <div :class="['xin-page-full']">
    <a-card title="表格宫格卡片自定义视图" :bordered="false">
      <x-pro-table
        ref="tableRef1"
        rowKey="id"
        :columns="columns1"
        :data-source="dataSource1"
        :page-config="{ pageSize: 8 }"
        :grid-config="{ loadType: 'fixedGrid' }"
        :tool-config="{ toolkit: [], toolmini:[] }"
      >
        <template #toolkit>
          <x-search-simple @query="handleQuery" :fast-config="{ fastField: 'username', dateField: 'createTime' }" />
        </template>
        <template #gridCard="{ record }">
          <a-card :bordered="true" hoverable>
            <template #cover>
              <img class="img-cover" :src="record.cover" alt="" />
            </template>
            <a-card-meta :title="record.title">
              <template #description>
                <div class="project-list-desc" :title="record.content">
                  {{ record.content }}
                </div>
              </template>
            </a-card-meta>
            <div class="f_c_b">
              <x-avatar-list :list="record.users" size="small" />
              <div class="xin-text-secondary">
                {{ record.time }}
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
  .project-list-desc {
    height: 44px;
    line-height: 22px;
    margin-bottom: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .img-cover {
    height: 260px;
    object-fit: cover;
  }
</style>
