<template>
  <div>
    <a-card title="自定义扩展组件" :bordered="false" :body-style="{ padding: '20px' }">
      <table class="xin-table xin-table-border xin-table-medium tree-table">
        <colgroup>
          <col width="200"/>
          <col width="160"/>
        </colgroup>
        <thead>
        <tr>
          <th>名称</th>
          <th>说明</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>x-avatar-list</th>
          <th>头像列表组件</th>
        </tr>
        <tr>
          <th>x-bar-code</th>
          <th>条形码组件</th>
        </tr>
        <tr>
          <th>x-calendar</th>
          <th class="v140">日历月数据组件</th>
        </tr>
        <tr>
          <th>x-cascader</th>
          <th>级联选择组件</th>
        </tr>
        <tr>
          <th>x-checkbox</th>
          <th>复选框组</th>
        </tr>
        <tr>
          <th>x-checkbox-group</th>
          <th>多选框组</th>
        </tr>
        <tr>
          <th>x-color-picker</th>
          <th>颜色选择组件</th>
        </tr>
        <tr>
          <th>x-config-provider</th>
          <th>全局化配置组件</th>
        </tr>
        <tr>
          <th>x-cropper</th>
          <th>图片裁剪组件</th>
        </tr>
        <tr>
          <th>x-cropper-modal</th>
          <th>图片裁剪弹窗组件</th>
        </tr>
        <tr>
          <th>x-date-picker</th>
          <th>日期时间选择框组件</th>
        </tr>
        <tr>
          <th>x-drag-table</th>
          <th>表格拖动组件</th>
        </tr>
        <tr>
          <th>x-drag-table-tree</th>
          <th>表格树拖动组件</th>
        </tr>
        <tr>
          <th><b>x-flow</b></th>
          <th class="v140"><b>简式流程组件</b></th>
        </tr>
        <tr>
          <th><b>x-flow-record</b></th>
          <th class="v140"><b>流程记录组件</b></th>
        </tr>
        <tr>
          <th>x-force-render</th>
          <th class="v140">渲染控制组件</th>
        </tr>
        <tr>
          <th>x-guide</th>
          <th>引导组件</th>
        </tr>
        <tr>
          <th>x-icon</th>
          <th>图标显示组件</th>
        </tr>
        <tr>
          <th>x-input-serial</th>
          <th class="v140">流水号输入框</th>
        </tr>
        <tr>
          <th><b>x-layout-admin</b></th>
          <th><b>框架布局组件</b></th>
        </tr>
        <tr>
          <th>x-modal</th>
          <th>弹窗组件</th>
        </tr>
        <tr>
          <th>x-radio-group</th>
          <th>单选框组件</th>
        </tr>
        <tr>
          <th>x-range-number</th>
          <th>数字范围输入框组件</th>
        </tr>
        <tr>
          <th>x-scroll</th>
          <th>浮动滚动条组件</th>
        </tr>
        <tr>
          <th>x-search-complex</th>
          <th>高级查询组件</th>
        </tr>
        <tr>
          <th>x-search-simple</th>
          <th>简单查询组件</th>
        </tr>
        <tr>
          <th>x-select</th>
          <th>下拉列表组件</th>
        </tr>
        <tr>
          <th>x-select-color</th>
          <th>颜色选择输入框组件</th>
        </tr>
        <tr>
          <th>x-select-cron</th>
          <th>cron输入框组件</th>
        </tr>
        <tr>
          <th>x-select-icon</th>
          <th>图标选择输入框组件</th>
        </tr>
        <tr>
          <th>x-select-table</th>
          <th>表格选择框组件</th>
        </tr>
        <tr>
          <th>x-select-tree</th>
          <th>下拉树选择框组件</th>
        </tr>
        <tr>
          <th>x-select-user</th>
          <th class="v140">人员选择框组件</th>
        </tr>
        <tr>
          <th>x-signature</th>
          <th class="v140">签名组件</th>
        </tr>
        <tr>
          <th>x-split-panel</th>
          <th>分割面板组件</th>
        </tr>
        <tr>
          <th><b>x-pro-table</b></th>
          <th><b>高级表格组件</b></th>
        </tr>
        <tr>
          <th>x-upload</th>
          <th>文件上传组件</th>
        </tr>
        <tr>
          <th>x-water-mark</th>
          <th>水印组件</th>
        </tr>
        <tr>
          <th>x-tinymce-editor</th>
          <th>富文本框组件</th>
        </tr>
        <tr>
          <th>x-wang-editor</th>
          <th>富文本框组件</th>
        </tr>
        <tr>
          <th><b>x-work-flow</b></th>
          <th class="v140"><b>简式工作流组件</b></th>
        </tr>
        </tbody>
      </table>
    </a-card>

  </div>
</template>

<script lang="ts">
export default defineComponent({
  components: {},
  props: {
    title: String,
  },
  setup() {
    return {};
  },
  methods: {},
});
</script>

<style lang="less" scoped>
.xin-table {
  &.xin-table-medium {
    th,
    td {
      padding: 3px 8px;
    }
  }
}

.v140::after {
  content: "v1.4.0新增";        /* 要显示的上标内容 */
  vertical-align: super;
  font-size: 0.8em;
}
</style>
