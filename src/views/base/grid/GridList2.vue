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
            <div class="f_c_s" style="margin-bottom: 16px">
              <a-avatar size="large" :src="record.avatar" />
              <h6 class="m-l-10 xin-elip">{{ record.title }}</h6>
            </div>
            <div class="xin-elip xin-text-secondary">最后更新时间: {{ record.time }}</div>
            <div class="xin-elip xin-text-secondary" style="margin-top: 6px"> {{ record.content }} </div>
            <template #actions>
              <a-tooltip title="分享">
                <x-icon icon="share-alt-outlined" />
              </a-tooltip>
              <a-tooltip title="编辑">
                <x-icon icon="edit-outlined" />
              </a-tooltip>
              <a-tooltip title="下载">
                <x-icon icon="download-outlined" />
              </a-tooltip>
              <a-dropdown placement="bottom">
                <x-icon icon="ellipsis-outlined" />
                <template #overlay>
                  <a-menu>
                    <a-menu-item>1st menu item</a-menu-item>
                    <a-menu-item>2nd menu item</a-menu-item>
                    <a-menu-item>3rd menu item</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
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

<style lang="less" scoped></style>
