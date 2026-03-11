<template>
  <a-card :bordered="false" :body-style="{ padding: '20px' }">
    <div :class="['xin-cell', 'workplace-user-card']">
      <div class="xin-cell-content xin-cell">
        <a-avatar :size="68" :src="loginUser.headPhoto" />
        <div class="xin-cell-content">
          <h4 class="xin-elip"> 早安, {{ loginUser.userName }}, 开始您一天的工作吧! </h4>
          <div class="xin-elip xin-text-secondary">
            <x-icon icon="CloudOutlined" />
            <em>今日晴转多云，23℃ - 16℃，出门记得带手机哦~</em>
          </div>
        </div>
      </div>
      <div class="workplace-count-group">
        <div class="workplace-count-item">
          <div class="workplace-count-header">
            <span class="ant-tag ant-tag-green xin-tag xin-tag-circle">
              <x-icon icon="AppstoreFilled" />
            </span>
            <span class="workplace-count-name">项目数</span>
          </div>
          <h2>8</h2>
        </div>
        <div class="workplace-count-item">
          <div class="workplace-count-header">
            <span class="ant-tag ant-tag-blue xin-tag xin-tag-circle">
              <x-icon icon="CheckSquareOutlined" />
            </span>
            <span class="workplace-count-name">待办项</span>
          </div>
          <h2>24</h2>
        </div>
        <div class="workplace-count-item">
          <div class="workplace-count-header">
            <span class="ant-tag ant-tag-orange xin-tag xin-tag-circle">
              <x-icon icon="BellFilled" />
            </span>
            <span class="workplace-count-name">消息</span>
          </div>
          <h2>1,231</h2>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { useUserStore } from '@/store/modules/user-store';

  export default defineComponent({
    components: {},
    setup() {
      const userStore = useUserStore();
      const loginUser = computed(() => userStore.info ?? {}); // 当前登录用户信息
      return { loginUser };
    },
    methods: {},
  });
</script>

<style lang="less" scoped>
  //.xin-page-full .ant-card {
  //  margin-bottom: 16px;
  //}

  .xin-cell {
    display: flex;
    align-items: center;
  }

  .workplace-user-card {
    .xin-cell-content {
      flex: 1;
      overflow: hidden;
      padding-left: 12px;
      box-sizing: border-box;
    }

    h4 {
      margin-bottom: 6px;
    }
  }

  .workplace-count-group {
    white-space: nowrap;
    text-align: right;
    flex-shrink: 0;
  }

  .workplace-count-item {
    display: inline-block;
    margin: 0 4px 0 24px;

    h2 {
      text-align: right;
    }
  }

  .workplace-count-name {
    margin-left: 8px;
  }

  @media screen and (max-width: 992px) {
    .workplace-user-responsive .workplace-count-item {
      margin: 0 2px 0 12px;
    }
  }

  @media screen and (max-width: 768px) {
    .workplace-user-responsive.workplace-user-card {
      display: block;

      .workplace-count-group {
        margin-top: 8px;
      }
    }
  }
</style>
