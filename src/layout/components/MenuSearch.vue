<template>
  <div class="item-trigger" @click="visible = true">
    <a-tooltip :mouseEnterDelay="0.5">
      <template #title>{{ i18n('搜索') }}</template>
      <x-icon icon="SearchOutlined"/>
    </a-tooltip>
    <a-modal
        v-model:visible="visible"
        :centered="true"
        :title="i18n('搜索菜单')"
        :keyboard="false"
        @cancel="handleClose"
        wrap-class-name="xs-modal-movable xs-modal-resizable"
    >
      <a-input ref="inputRef" size="large" allow-clear v-model:value="keyword" clearable :placeholder="i18n('请输入关键词搜索')" @change="handleSearch">
        <template #prefix>
          <x-icon icon="SearchOutlined"/>
        </template>
      </a-input>
      <div>
        <a-empty style="margin: 20px" v-if="resultOptions.length === 0" :description="i18n('暂无搜索结果')"/>
        <ul class="search-list" ref="scrollWrap">
          <li
              v-for="(item, index) in resultOptions"
              :key="item.path"
              :data-index="index"
              @mouseenter="handleMouse(item)"
              @click="handleEnter"
              :class="['search-list-item', item.path == activePath ? 'active' : '']"
          >
            <div class="search-list-item-icon">
              <x-icon :icon="item.meta.icon ? item.meta.icon : 'BookOutlined'"/>
            </div>
            <div class="search-list-item-text">
              {{ item.meta?.title }}
            </div>
            <div class="search-list-item-enter">
              <x-icon icon="EnterOutlined"/>
            </div>
          </li>
        </ul>
      </div>

      <template #footer>
        <div class="search-footer">
          <x-icon icon="EnterOutlined" class="search-footer-item"/>
          <span>{{ i18n('确认') }}</span>
          <x-icon icon="ArrowUpOutlined" class="search-footer-item"/>
          <x-icon icon="ArrowDownOutlined" class="search-footer-item"/>
          <span>{{ i18n('切换') }}</span>
          <!--          <x-icon icon="CloseOutlined" class="search-footer-item" />-->
          <span class="search-footer-item"><b style="transform: scale(0.8)">ESC</b></span>
          <span>{{ i18n('关闭') }}</span>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts">
import {useDebounceFn, onKeyStroke} from '@vueuse/core';
import {defineComponent, ref, watch} from "vue";
import {getCurrentInstance} from 'vue';
import {transformRouteToList} from "xin-antd3-ui/es/utils/menu-util";
import {useLayoutStore} from "@/store/modules/layout-store";
import {isHttpLink} from "xin-antd3-ui";

export default defineComponent({
  name: 'HeaderSearch',
  components: {},
  setup() {
    const visible = ref<boolean>(false);
    const router = useRouter();
    const {proxy} = getCurrentInstance() as any;
    const layoutStore = useLayoutStore();
    const keyword = ref('');
    const activePath = ref('');
    const handleSearch = useDebounceFn(search, 300);
    const resultOptions = shallowRef([]);
    const menusList = transformRouteToList(layoutStore.menus);

    watch(visible, async (val) => {
      if (val) {
        await nextTick();
        proxy.$refs.inputRef?.focus();
      }
    });

    /** 查询 */
    function search() {
      resultOptions.value = menusList.filter((menu) => {
        const title = menu.meta?.title;
        return keyword.value && title?.toLocaleLowerCase().includes(keyword.value.toLocaleLowerCase().trim());
      });
      activePath.value = resultOptions.value?.length > 0 ? resultOptions.value[0].path : '';
    }

    /** 关闭 */
    const handleClose = () => {
      visible.value = false;
    };

    /** 鼠标移入 */
    const handleMouse = (menu) => {
      activePath.value = menu.path;
    };

    /** 回车确认 */
    const handleEnter = () => {
      const {length} = resultOptions.value;
      if (length === 0 || activePath.value === '') return;
      if (isHttpLink(activePath.value)) {
        window.open(activePath.value);
      } else {
        router.push(activePath.value);
        handleClose();
      }
    };

    /** 上移 */
    const handleUp = () => {
      const {length} = resultOptions.value;
      if (length === 0) return;
      const index = resultOptions.value.findIndex((item) => item.path === activePath.value);
      if (index === 0) {
        activePath.value = resultOptions.value[length - 1].path;
      } else {
        activePath.value = resultOptions.value[index - 1].path;
      }
    };

    /** 下移 */
    const handleDown = () => {
      const {length} = resultOptions.value;
      if (length === 0) return;
      const index = resultOptions.value.findIndex((item) => item.path === activePath.value);
      if (index + 1 === length) {
        activePath.value = resultOptions.value[0].path;
      } else {
        activePath.value = resultOptions.value[index + 1].path;
      }
    };

    onKeyStroke('Enter', handleEnter);
    onKeyStroke('ArrowUp', handleUp);
    onKeyStroke('ArrowDown', handleDown);
    onKeyStroke('Escape', handleClose);
    return {visible, keyword, handleSearch, resultOptions, activePath, handleClose, handleEnter, handleMouse};
  },
  methods: {},
});
</script>
<style lang="less" scoped>
.icon {
  box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
}

.mt-20px {
  margin-top: 20px;
}

.search-list {
  max-height: 450px;
  padding: 0 1px 20px 1px;
  margin: 0 auto;
  overflow: auto;

  .active {
    color: #fff;
    background-color: var(--primary-5);
  }

  &-item {
    position: relative;
    display: flex;
    width: 100%;
    height: 42px;
    padding-bottom: 4px;
    padding-left: 14px;
    margin-top: 12px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    background-color: #e5e7eb;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #d4d9e1;
    transition: all 0.5s ease;
    align-items: center;

    > div:first-child,
    > div:last-child {
      display: flex;
      align-items: center;
    }

    &-icon {
      width: 30px;
    }

    &-text {
      flex: 1;
    }

    &-enter {
      width: 30px;
    }
  }
}

.search-footer {
  position: relative;
  display: flex;
  height: 44px;
  padding: 0 16px;
  font-size: 12px;
  color: #666;
  //background-color: #fff;
  border-radius: 0 0 16px 16px;
  align-items: center;
  flex-shrink: 0;

  &-item {
    display: flex;
    width: 20px;
    height: 18px;
    padding-bottom: 2px;
    margin-right: 0.4em;
    border-radius: 2px;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgb(30 35 90 / 40%);
    align-items: center;
    justify-content: center;

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(6) {
      margin-left: 14px;
    }
  }
}
</style>
