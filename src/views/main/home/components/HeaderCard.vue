<template>
  <a-card :bordered="false" :body-style="{ padding: '20px' }">
    <div :class="['xin-cell', 'workplace-user-card']">
      <div class="xin-cell-content xin-cell">
        <a-avatar :size="68" :src="loginUser.headPhoto">
          <template v-if="!loginUser.headPhoto" #icon>
            <x-icon icon="UserOutlined" :size="36"/>
          </template>
        </a-avatar>
        <div class="xin-cell-content">
          <h4 class="xin-elip">XinSite Ant-Design-Vue 3.0+ 前端框架 </h4>
          <div class="xin-text-secondary">
            <span class="flex-1">
              <em style="padding-left: 0px">
                是一个基于vue3.0、vite、 pinia、 ant-design-vue、typescript 的前端框架，为中大型项目开发提供现成的开箱解决方案及丰富的示例，利用代码生成系统，高效快速的开发出企业应用系统。
              </em>
            </span>
          </div>
        </div>
      </div>
      <div class="workplace-count-group"></div>
    </div>
  </a-card>
</template>

<script lang="ts">
import {useUserStore} from '@/store/modules/user-store';

export default defineComponent({
  components: {},
  setup() {
    const userStore = useUserStore();
    const loginUser = computed(() => userStore.info ?? {}); // 当前登录用户信息
    return {loginUser};
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
</style>
