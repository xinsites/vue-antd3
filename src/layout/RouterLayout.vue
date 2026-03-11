<!-- router-view 结合 keep-alive 组件 -->
<template>
  <router-view v-slot="{ route, Component }">
    <transition :name="transitionName" mode="out-in" appear>
      <keep-alive :include="include">
        <component :is="wrap(route, Component)"/>
      </keep-alive>
    </transition>
  </router-view>
  <!--  <router-view/>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { guid, REDIRECT_ROUTES } from 'xin-antd3-ui';

export default defineComponent({
  name: 'RouterLayout',
  props: {
    transitionName: String,
    include: {
      type: Array<string>,
      default: () => [],
    },
  },
  methods: {
    // 为keep-alive里的组件自定义name
    wrap(route, component) {
      const keepAlive = route.meta?.keepAlive;

      if (keepAlive === false || !component) return component;
      if (keepAlive === true) {
        component.type.name = route.path;
      } else {
        const componentName = route.fullPath || route.path;
        const oldName = !REDIRECT_ROUTES.includes(route.path) ? component.type.oldName : undefined;

        component.type.oldName = componentName;
        component.type.name = oldName == componentName ? componentName : guid(8);  //变更地址后，缓存无效
      }
      return component;
    },
  }
});
</script>
