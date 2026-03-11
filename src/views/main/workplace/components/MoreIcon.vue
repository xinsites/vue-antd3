<template>
  <a-dropdown placement="bottomRight" class="bottom-right item-over" :trigger="['click']">
    <x-icon icon="MoreOutlined" class="xin-text-secondary" :size="18" />
    <template #overlay>
      <a-menu :selectable="false" @click="onClick">
        <a-menu-item key="refresh" v-if="refresh">
          <div class="f_c_s">
            <x-icon icon="ReloadOutlined" />
            <div class="xin-cell-content">刷新</div>
          </div>
        </a-menu-item>
        <a-menu-item key="navConfig" v-if="navConfig">
          <div class="f_c_s">
            <x-icon icon="NodeExpandOutlined" />
            <div class="xin-cell-content">导航配置</div>
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="hide">
          <div class="f_c_s xin-text-danger">
            <x-icon icon="EyeInvisibleOutlined" />
            <div class="xin-cell-content">隐藏</div>
          </div>
        </a-menu-item>
        <a-menu-item key="edit">
          <div class="f_c_s">
            <x-icon icon="EditOutlined" />
            <div class="xin-cell-content">编辑视图</div>
          </div>
        </a-menu-item>
        <a-menu-item key="reset">
          <div class="f_c_s">
            <x-icon icon="UndoOutlined" />
            <div class="xin-cell-content">重置布局</div>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
  const props = defineProps({
    navConfig: { type: Boolean, required: false, default: false },
    refresh: { type: Boolean, required: false, default: true },
  });
  const emit = defineEmits<{
    (e: 'refresh'): void;
    (e: 'edit'): void;
    (e: 'hide'): void;
    (e: 'reset'): void;
    (e: 'navConfig'): void;
  }>();

  const onClick = ({ key }) => {
    emit(key);
  };
</script>
<style lang="less" scoped>
  .xin-cell-content {
    margin-left: 10px;
    margin-right: 14px;
  }

  .bottom-right {
    cursor: pointer;
  }
</style>
