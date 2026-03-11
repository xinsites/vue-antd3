<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="false" :body-style="{ padding: '0px', height: '100%' }">
      <div :class="['d-flex', mode == 'horizontal' ? 'flex-column' : '']" style="height: 100%;">
        <div class="message-menu-wrap">
          <a-menu :selected-keys="active" @click="handleClickMenu" :mode="mode">
            <a-menu-item key="todo">
              <span>我的待办</span>
              <a-badge :offset="[-4, -18]" v-if="unReadTodo" :count="unReadTodo"/>
            </a-menu-item>
            <a-menu-item key="done">
              <span>我的已办</span>
            </a-menu-item>
            <a-menu-item key="apply">
              <span>我的申请</span>
            </a-menu-item>
            <a-menu-item key="send">
              <span>我的抄送</span>
            </a-menu-item>
            <a-menu-item key="mail">
              <span>我的邮件</span>
              <a-badge :offset="[-4, -18]" v-if="unReadMail" :count="unReadMail"/>
            </a-menu-item>
            <a-menu-item key="notice">
              <span>系统通知</span>
              <a-badge :offset="[-4, -18]" v-if="unReadNotice" :count="unReadNotice"/>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="flex-1" style="overflow-x: hidden">
          <my-todo v-if="loadedActive.includes('todo')" v-show="active.includes('todo')" @updateUnReadNum="updateUnReadNum"/>
          <my-done v-if="loadedActive.includes('done')" v-show="active.includes('done')"/>
          <my-apply v-if="loadedActive.includes('apply')" v-show="active.includes('apply')"/>
          <my-send v-if="loadedActive.includes('send')" v-show="active.includes('send')"/>
          <my-mail v-if="loadedActive.includes('mail')" v-show="active.includes('mail')" @updateUnReadNum="updateUnReadNum"/>
          <my-notice v-if="loadedActive.includes('notice')" v-show="active.includes('notice')" @updateUnReadNum="updateUnReadNum"/>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import {useLayoutStore} from "@/store/modules/layout-store";
import {getUnReadNumAPI} from "@/api/common/login-api";
import {message} from "ant-design-vue";
import {unref} from "vue";
import router from "@/router";

export default defineComponent({
  name: 'MessageList',
  components: {
    MyTodo: defineAsyncComponent(() => import('./components/MyTodo.vue')),
    MyDone: defineAsyncComponent(() => import('./components/MyDone.vue')),
    MyApply: defineAsyncComponent(() => import('./components/MyApply.vue')),
    MySend: defineAsyncComponent(() => import('./components/MySend.vue')),
    MyMail: defineAsyncComponent(() => import('./components/MyMail.vue')),
    MyNotice: defineAsyncComponent(() => import('./components/MyNotice.vue')),
  },
  setup() {
    const {path, query} = unref(router.currentRoute);
    const layoutStore = useLayoutStore();

    const type = (query.type || 'todo') as string;

    const active = ref<string[]>([type]); // 导航选中
    const unReadNotice = ref(0);  // 通知未读数量
    const unReadMail = ref(3);    // 邮件未读数量
    const unReadTodo = ref(0);    // 代办未读数量

    const loadedActive = ref<string[]>([type]); // 已加载过的导航

    // 导航模式
    const mode = computed(() => {
      return layoutStore.change.isMobile ? 'horizontal' : 'inline';
    });

    /* 查询未读数量 */
    const queryUnReadNum = () => {
      getUnReadNumAPI().then((result) => {
        // unReadTodo.value = result.todo;
        unReadMail.value = result.mail;
        unReadNotice.value = result.notice;
      }).catch((e) => {
        message.error(e.message);
      });
    };
    queryUnReadNum();

    const handleClickMenu = (menu) => {
      active.value = [menu.key];
      loadedActive.value.push(menu.key);
    }

    const updateUnReadNum = (type, num) => {
      if (type == 'todo') unReadTodo.value = num;
      if (type == 'mail') unReadMail.value = num;
      if (type == 'notice') unReadNotice.value = num;
    }
    return {handleClickMenu, active, loadedActive, unReadNotice, unReadMail, unReadTodo, mode, updateUnReadNum};
  },
  methods: {},
});
</script>

<style lang="less" scoped>
.message-menu-wrap {
  width: 140px;
  display: flex;

  span:first-child {
    padding-left: 10px;
  }

  ::v-deep(.ant-menu) {
    padding-top: 16px;

    .ant-badge-count {
      height: 16px;
      line-height: 16px;
      border-radius: 8px;
      box-shadow: none;
      min-width: 16px;
      padding: 0 2px;
    }
  }

}

@media screen and (max-width: 800px) {
  .message-menu-wrap {
    width: 100%;
    height: 60px;
    display: block;
  }
}
</style>
