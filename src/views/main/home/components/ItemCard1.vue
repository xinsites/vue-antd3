<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '0px' }">
    <x-scroll height="342px">
      <div style="margin: 20px 30px 10px 30px">
        <div style="text-indent: 2em; line-height: 200%" v-if="visible">
          采用vue3.x + ant-design-vue3.x 前后端分离开发模式，支持javascript、typescript。界面简洁美观，可灵活配置主题；响应式布局，自适应全屏幕尺寸。
          <p style="text-indent: 2em; ">
            30多个自定义扩展组件，文档注释详细，便于学习和扩展，版本的持续更新，集大众之所需。专属的开发者文档，助你快速掌握；多种表单的代码生成，帮助你完成基础开发，可以生成单表、多表、树列表表单。
          </p>
          <p style="text-indent: 2em; margin-top: 10px;">
            Antd3是Ant Design Vue3最终版本。 如果没有XinSite后端框架，前端以mockjs模拟数据可直接运行，
            如果有XinSite后端框架，注释掉mockjs，配置好代理接口即可。
          </p>
        </div>

        <div class="footer-box" style="margin-top: 18px">
          <div class="footer-left">
            <p style="margin-top: 10px"><b>当前版本：</b><span>v1.4.0</span></p>
          </div>
          <div class="footer-right">
            <a-button>
              <template #icon>
                <x-icon icon="home-outlined" class="icon-color"/>
              </template>
              <a href="http://www.xinsite.vip" target="_blank"> 访问主页 </a>
            </a-button>
          </div>
        </div>
      </div>
    </x-scroll>
  </a-card>
</template>

<script lang="ts">
export default defineComponent({
  components: {},
  props: {
    title: String,
  },
  setup() {
    const visible = ref<boolean>(true);
    return {visible};
  },
  methods: {},
});
</script>

<style lang="less" scoped>
.icon-color {
  color: var(--primary-color);
}
</style>
