<template>
  <div :class="['xin-page-full', 'horizontal-layout']">
    <a-card :bordered="true">
      <div class="title" style="margin-top: 0px">全局化配置<b>x-config-provider</b>封装自<b>a-config-provider</b>，<b>a-config-provider</b>的所有属性可用，扩展属性如下：
      </div>
      <Help>
        <table class="xin-table xin-table-border xin-table-medium tree-table">
          <colgroup>
            <col width="200"/>
            <col width="160"/>
            <col/>
            <col width="140"/>
          </colgroup>
          <thead>
          <tr>
            <th>属性名</th>
            <th>类型</th>
            <th>说明</th>
            <th style="text-align: center">默认值</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>license</th>
            <th>String</th>
            <th>授权码配置</th>
            <th style="text-align: center"></th>
          </tr>
          <tr>
            <th>locale</th>
            <th>object</th>
            <th>ant design vue 语言包配置</th>
            <th style="text-align: center"></th>
          </tr>
          <tr>
            <th>xinLocale</th>
            <th>XinLocale</th>
            <th>XinSite Antd3自定义组件语言包配置</th>
            <th style="text-align: center"></th>
          </tr>
          <tr>
            <th>dictStore</th>
            <th>DictState</th>
            <th>数据字典store，用于输入框扩展组件(各种下拉框数据以及动态数据字典的数据请求)</th>
            <th style="text-align: center"></th>
          </tr>
          </tbody>
        </table>
      </Help>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  components: {
    Help: defineAsyncComponent(() => import('../../components/Help.vue')),
  },
  setup() {

    return {};
  },
  methods: {},
});
</script>

<style lang="less" scoped>
.title {
  font-weight: normal;
  font-size: 15px;
  margin: 15px 0px 5px 0px;

  b {
    margin: auto 4px;
  }
}
</style>
