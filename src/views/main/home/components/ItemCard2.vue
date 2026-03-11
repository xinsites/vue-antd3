<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '0px' }">
    <x-scroll height="342px">
      <a-descriptions title="" layout="vertical" :column="3" size="small" bordered>
        <a-descriptions-item>
          <template #label>
            <a-checkbox v-model:checked="checked1" :disabled="checked2">前后端分离</a-checkbox>
          </template>
          <b>前端：</b>
          <ol>
            <li>Vue3 AntDesign+vite</li>
            <li class="xin-text-secondary">Vue3 ElementUI+vite</li>
            <li class="xin-text-secondary">Vue3 Layui</li>
          </ol>
          <div style="height: 180px">
            <b>后端：</b>
            <ol>
              <li>Java Spring Boot</li>
              <li class="xin-text-secondary">Java Spring Cloud</li>
              <li class="xin-text-secondary">Net Core</li>
            </ol>
          </div>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            <a-checkbox v-model:checked="checked2" :disabled="checked1">前后端不分离</a-checkbox>
          </template>
          <ol>
            <li>.net+Extjs4.2</li>
            <li>Java Spring Boot+Extjs4.2</li>
            <li>Java Spring Boot+Extjs7.2</li>
            <li>Java Spring Boot+Layui2.5</li>
          </ol>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label>
            <a-checkbox>数据库</a-checkbox>
          </template>
          <ol>
            <li>mysql</li>
            <li>sql server</li>
            <li>oracle</li>
            <li>dm(达梦)</li>
            <li>kingbase8(人大金仓)</li>
            <li>db2</li>
            <li>postgresql</li>
            <li>sqlite</li>
          </ol>
        </a-descriptions-item>
      </a-descriptions>
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
      const checked1 = ref<boolean>(false);
      const checked2 = ref<boolean>(false);
      return { checked1, checked2 };
    },
    methods: {},
  });
</script>

<style lang="less" scoped>
  ol,
  ul {
    margin-top: 0;
    margin-bottom: 10px;
  }

  ol {
    display: block;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 10px;
    padding-left: 40px;
  }

  ol li {
    margin-top: 0;
    margin-bottom: 10px;
    padding-left: 10px;
  }

  ::v-deep(.ant-descriptions-item-content) {
    vertical-align: top;
  }
</style>
