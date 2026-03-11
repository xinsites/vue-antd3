<template>
  <div class="xin-page-full">
    <div class="exception-page">
      <template v-if="type === 'netError' || type === 'noData'">
        <div class="img">
          <x-icon :icon="config[type].svg" :size="380"/>
        </div>
        <div class="content">
          <h1>{{ config[type].title }}</h1>
          <div class="desc">{{ config[type].desc }}</div>
          <div class="action">
            <a-button type="primary" @click="reloadPage">刷新页面</a-button>
          </div>
        </div>
      </template>
      <template v-else>
        <a-result :status="config[type].svg" :title="config[type].title" :sub-title="config[type].desc">
          <template #extra>
            <a-button type="primary" @click="backHome">返回首页</a-button>
            <a-button @click="backLastPage" style="margin-left: 10px;">返回上一页</a-button>
          </template>
        </a-result>
      </template>
    </div>
  </div>
</template>

<script>
import {reloadCurrentTab, pushHomePage} from "@/utils/tabs-util";

const config = {
  403: {
    svg: '403',
    title: '403',
    desc: '抱歉，你没有此页面的访问权限',
  },
  404: {
    svg: '404',
    title: '404',
    desc: '抱歉，此页面未找到',
  },
  500: {
    svg: '500',
    title: '500',
    desc: '抱歉，服务器发生了错误',
  },
  netError: {
    svg: 'net-error.svg',
    title: '网络错误',
    desc: '抱歉，您的网络连接已断开，请检查您的网络！',
  },
  noData: {
    svg: 'no-data.svg',
    title: '无数据',
    desc: '当前页无数据！',
  },
};
export default {
  name: 'ExceptionPage',
  props: ['type', 'homeRoute'],
  data() {
    return {
      config: config,
    };
  },
  methods: {
    //返回首页
    backHome() {
      pushHomePage(this.homeRoute);
      this.$emit('backHome', this.type);
    },
    //返回上一页面
    backLastPage() {
      window.history.go(-1);
    },
    //刷新当前页
    reloadPage() {
      reloadCurrentTab();
    },
  },
};
</script>

<style lang="less" scoped>
.exception-page {
  height: 100%;
  min-height: 600px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--body-background);

  .img {
    padding-right: 100px;
    //color: var(--header-text-hover-color);
    zoom: 1;

    img {
      max-width: 430px;
    }
  }

  .content {
    h1 {
      color: #434e59;
      font-size: 36px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }

    .desc {
      color: fade(#000, 45%);
      font-size: 16px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
