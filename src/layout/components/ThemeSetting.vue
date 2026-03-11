<template>
  <div class="item-trigger" @click="showDrawer">
    <x-icon icon="MoreOutlined"/>
    <a-drawer
        v-model:visible="visible"
        :width="320"
        class="setting-drawer"
        :headerStyle="{ padding: '12px 24px' }"
        :bodyStyle="{ padding: '10px 24px 24px 24px' }"
        placement="right"
    >
      <template #title>
        {{ i18n('主题设置') }}
      </template>
      <div class="setting-wrapper">
        <a-divider orientation="">{{ i18n('系统主题') }}</a-divider>
        <div class="setting-colors">
          <div v-for="color in APP_THEMES" :key="color" :style="{ 'background-color': color }"
               class="setting-color-item" @click="setThemeValue('appStyle', color)">
            <x-icon icon="CheckOutlined" v-if="color === appStyle"/>
          </div>
          <x-color-picker :value="definedAppStyle" custom-class="xin-setting-color-picker"
                          @change="(value) => setThemeValue('appStyle', value)"/>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('开启暗黑模式') }}</div>
          <div class="setting-item-control">
            <a-switch size="small" :checked="darkMode" @change="(value) => setThemeValue('darkMode', value)"/>
          </div>
        </div>
        <a-divider orientation="" style="margin-top: 30px">{{ i18n('头部主题') }}</a-divider>
        <div class="setting-colors">
          <a-spin :indicator="indicator" :spinning="darkMode">
            <div v-for="item in HEAD_THEMES" :key="item.bg" :style="{ 'background-color': item.bg }"
                 class="setting-color-item" @click="setThemeValue('headStyle', item.bg)">
              <x-icon icon="CheckOutlined" v-if="item.bg === headStyle"
                      :style="{ color: headStyle === '#FFFFFF' ? '#151515' : '' }"/>
            </div>
            <x-color-picker :value="definedHeadStyle" custom-class="xin-setting-color-picker"
                            @change="(value) => setThemeValue('headStyle', value)"/>
          </a-spin>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('开启菜单搜索') }}</div>
          <div class="setting-item-control">
            <a-switch size="small" :checked="showMenuSearch"
                      @change="(value) => setThemeValue('showMenuSearch', value)"/>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('开启多页标签') }}</div>
          <div class="setting-item-control">
            <a-switch size="small" :checked="showTabs" @change="(value) => setThemeValue('showTabs', value)"/>
          </div>
        </div>

        <a-divider orientation="">{{ i18n('导航模式') }}</a-divider>
        <div class="setting-theme text-primary">
          <a-tooltip :title="i18n('左侧菜单布局')">
            <div class="bg-base side-dark" @click="setThemeValue('layoutStyle', 'side')">
              <span v-if="layoutStyle == 'side'"><x-icon icon="CheckOutlined"/></span>
            </div>
          </a-tooltip>
          <a-tooltip :title="i18n('顶部菜单布局')">
            <div class="bg-base head-top" @click="setThemeValue('layoutStyle', 'top')">
              <span v-if="layoutStyle == 'top'"><x-icon icon="CheckOutlined"/></span>
            </div>
          </a-tooltip>
          <a-tooltip :title="i18n('左侧菜单混合布局')">
            <div class="bg-base left-mix" @click="setThemeValue('layoutStyle', 'mix')" :disabled="true">
              <span v-if="layoutStyle == 'mix'"><x-icon icon="CheckOutlined"/></span>
            </div>
          </a-tooltip>
        </div>

        <template v-if="layoutStyle != 'top'">
          <a-divider orientation="" style="margin-top: 30px">{{ i18n('菜单主题') }}</a-divider>
          <div class="setting-colors">
            <a-spin :indicator="indicator" :spinning="darkMode || sideMenuDouble">
              <div
                  v-for="item in SIDE_THEMES"
                  :key="item.bg"
                  :style="{ 'background-color': item.bg }"
                  class="setting-color-item"
                  @click="setThemeValue('sideMenuStyle', item.bg)">
                <x-icon icon="CheckOutlined" v-if="item.bg === sideMenuStyle"
                        :style="{ color: sideMenuStyle === '#FFFFFF' ? '#151515' : '' }"/>
              </div>
              <x-color-picker :value="definedSideMenuStyle" custom-class="xin-setting-color-picker"
                              @change="(value) => setThemeValue('sideMenuStyle', value)"/>
            </a-spin>
          </div>
          <div class="setting-item">
            <div class="setting-item-title">{{ i18n('侧栏彩色图标') }}</div>
            <div class="setting-item-control">
              <a-switch size="small" :checked="colorfulIcon" @click="(value) => setThemeValue('colorfulIcon', value)"/>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-item-title">{{ i18n('侧栏双排菜单') }}</div>
            <div class="setting-item-control">
              <a-switch size="small" :checked="sideMenuDouble" @click="(value) => setThemeValue('sideMenuDouble', value)"/>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-item-title">{{ i18n('侧栏排他展开') }}</div>
            <div class="setting-item-control">
              <a-switch size="small" :checked="sideUniqueOpen"
                        @change="(value) => setThemeValue('sideUniqueOpen', value)"/>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-item-title">{{ i18n('菜单宽度拖拽') }}</div>
            <div class="setting-item-control">
              <a-switch size="small" :checked="canMenuDrag" @change="(value) => setThemeValue('canMenuDrag', value)"/>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-item-title">{{ i18n('菜单展开宽度') }}</div>
            <div class="setting-item-control">
              <a-input-number
                  style="width: 100px"
                  size="small"
                  :min="SIDE_BAR_MIN_WIDTH"
                  :max="SIDE_BAR_MAX_WIDTH"
                  :step="1"
                  v-model:value="menuWidth"
                  :formatter="
                  (value) => {
                    return `${value}px`;
                  }
                "
                  :parser="(value) => value.replace('px', '')"
                  @change="(value) => setThemeValue('menuWidth', value)"
              />
            </div>
          </div>
        </template>
        <a-divider orientation="" style="margin-top: 30px">{{ i18n('其他配置') }}</a-divider>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('回到顶部按钮') }}</div>
          <div class="setting-item-control">
            <a-switch size="small" :checked="backUpBtn" @change="(value) => setThemeValue('backUpBtn', value)"/>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('开启全局页脚') }}</div>
          <div class="setting-item-control">
            <a-switch size="small" :checked="showFooter" @change="(value) => setThemeValue('showFooter', value)"/>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('内容区域边距') }}</div>
          <div class="setting-item-control">
            <a-input-number
                style="width: 120px"
                size="small"
                :controls="false"
                :min="0"
                :max="30"
                :step="1"
                v-model:value="pagePadding"
                addon-after="px"
                @change="(value) => setThemeValue('pagePadding', value)"
            />
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('自动锁屏设置') }}</div>
          <div class="setting-item-control">
            <a-input-number
                style="width: 120px"
                size="small"
                :min="0"
                :max="1800"
                :step="30"
                v-model:value="lockTime"
                :formatter="
                (value) => {
                  return parseInt(value) === 0 ? `${i18n('0手动锁屏')}` : `${value + i18n('秒')}`;
                }
              "
                :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                @change="(value) => setThemeValue('lockTime', value)"
            />
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('页签显示风格') }}</div>
          <div class="setting-item-control">
            <a-select size="small" :value="tabStyle" style="width: 120px" :disabled="!showTabs"
                      @change="(value) => setThemeValue('tabStyle', value)">
              <a-select-option value="smooth">{{ i18n('圆滑') }}</a-select-option>
              <a-select-option value="underline">{{ i18n('下划线') }}</a-select-option>
              <a-select-option value="dot">{{ i18n('圆点') }}</a-select-option>
              <a-select-option value="card">{{ i18n('卡片') }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('刷新按钮') }}</div>
          <div class="setting-item-control">
            <a-select size="small" :value="refreshTrigger" style="width: 120px"
                      @change="(value) => setThemeValue('refreshTrigger', value)">
              <a-select-option value="none">{{ i18n('不显示') }}</a-select-option>
              <a-select-option value="top">{{ i18n('顶部') }}</a-select-option>
              <a-select-option value="tab">{{ i18n('当前页签') }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('表格统一尺寸') }}</div>
          <div class="setting-item-control">
            <a-select size="small" :value="tableSize" style="width: 120px"
                      @change="(value) => setThemeValue('tableSize', value)">
              <a-select-option value="default">{{ i18n('大号') }}</a-select-option>
              <a-select-option value="middle">{{ i18n('中等') }}</a-select-option>
              <a-select-option value="small">{{ i18n('紧凑') }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="setting-item" v-if="layoutStore.i18nEnable">
          <div class="setting-item-title">{{ i18n('国际化语言') }}</div>
          <div class="setting-item-control">
            <a-select size="small" :value="interLang" style="width: 120px"
                      @change="(value) => setThemeValue('interLang', value)">
              <a-select-option v-for="item in LOCALE_LIST" :key="item.lang">
                {{ item.icon + '-' + item.label }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <a-divider orientation="" style="margin-top: 30px">{{ i18n('动画配置') }}</a-divider>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('顶部进度条') }}</div>
          <div class="setting-item-control">
            <a-switch size="small" :checked="openNProgress" @change="(value) => setThemeValue('openNProgress', value)"/>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('页面切换动画') }}</div>
          <div class="setting-item-control">
            <a-switch size="small" :checked="enableTransition"
                      @change="(value) => setThemeValue('enableTransition', value)"/>
          </div>
        </div>
        <div class="setting-item">
          <div class="setting-item-title">{{ i18n('动画类型') }}</div>
          <div class="setting-item-control">
            <a-select
                size="small"
                :disabled="!enableTransition"
                :value="animationType"
                style="width: 120px"
                @change="(value) => setThemeValue('animationType', value)">
              <a-select-option value="zoom-in">{{ i18n('放大渐变') }}</a-select-option>
              <a-select-option value="zoom-out">{{ i18n('缩小渐变') }}</a-select-option>
              <a-select-option value="fade-slide">{{ i18n('滑动渐变') }}</a-select-option>
              <a-select-option value="fade">{{ i18n('淡入淡出') }}</a-select-option>
              <a-select-option value="slide-bottom">{{ i18n('底部消退') }}</a-select-option>
              <a-select-option value="slide-right">{{ i18n('右侧消退') }}</a-select-option>
            </a-select>
          </div>
        </div>
        <a-divider/>
        <a-alert show-icon type="warning" :message="i18n('主题配置对本地浏览器具有缓存功能，配置生效后不需要保存，下次打开具有同样效果。')">
          <template #icon>
            <x-icon icon="SoundOutlined"/>
          </template>
        </a-alert>
        <a-button block type="dashed" @click="resetSetting">{{ i18n('重置') }}</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, computed, h} from "vue";
import {storeToRefs} from 'pinia';
import {
  APP_THEMES,
  HEAD_THEMES,
  SIDE_BAR_MAX_WIDTH,
  SIDE_BAR_MIN_WIDTH,
  SIDE_THEMES,
  LOCALE_LIST,
} from 'xin-antd3-ui';
import {useThemeStore} from "../../store/modules/theme-store";
import {useLayoutStore} from "../../store/modules/layout-store";
import {useI18n} from "vue-i18n";

//主题配置组件
export default defineComponent({
  name: 'SettingView',
  setup() {
    const {t} = useI18n();
    const visible = ref<boolean>(false);
    const layoutStore = useLayoutStore();
    const themeStore = useThemeStore();
    const {
      interLang,
      layoutStyle,
      appStyle,
      headStyle,
      sideMenuStyle,
      menuWidth,
      lockTime,
      tabStyle,
      refreshTrigger,
      animationType,
      darkMode,
      colorfulIcon,
      sideMenuDouble,
      canMenuDrag,
      sideUniqueOpen,
      showMenuSearch,
      showTabs,
      showFooter,
      openNProgress,
      enableTransition,
      backUpBtn,
      pagePadding,
      tableSize,
    } = storeToRefs(themeStore);

    const showDrawer = () => {
      visible.value = true;
      themeStore.fixedCollapse = true;
    };

    watch(
        () => themeStore.isLock,
        (isLock) => {
          if (isLock) {
            visible.value = false;
            themeStore.fixedCollapse = false;
          }
        },
    );

    // 系统主题自定义颜色
    const definedAppStyle = computed(() => {
      if (appStyle && APP_THEMES.indexOf(appStyle.value) === -1) {
        return appStyle.value;
      }
      return undefined;
    });

    // 头部主题自定义颜色
    const definedHeadStyle = computed(() => {
      if (headStyle && !HEAD_THEMES.some((t) => t.bg === headStyle.value)) {
        return headStyle.value;
      }
      return undefined;
    });

    // 头部主题自定义颜色
    const definedSideMenuStyle = computed(() => {
      if (sideMenuStyle && !SIDE_THEMES.some((t) => t.bg === sideMenuStyle.value)) {
        return sideMenuStyle.value;
      }
      return undefined;
    });
    const indicator = h('span', {
      style: {
        fontSize: '12px',
      },
    });

    return {
      t,
      interLang,
      visible,
      showDrawer,
      layoutStore,
      themeStore,
      APP_THEMES,
      HEAD_THEMES,
      SIDE_THEMES,
      LOCALE_LIST,
      SIDE_BAR_MIN_WIDTH,
      SIDE_BAR_MAX_WIDTH,
      animationType,
      darkMode,
      colorfulIcon,
      sideMenuDouble,
      canMenuDrag,
      sideUniqueOpen,
      showMenuSearch,
      showTabs,
      showFooter,
      openNProgress,
      enableTransition,
      indicator,
      backUpBtn,
      pagePadding,
      tableSize,
      appStyle,
      headStyle,
      layoutStyle,
      menuWidth,
      lockTime,
      tabStyle,
      refreshTrigger,
      sideMenuStyle,
      definedAppStyle,
      definedHeadStyle,
      definedSideMenuStyle,
    };
  },
  methods: {
    setThemeValue(key: string, value: string | number | boolean) {
      const themeSetting = {};
      themeSetting[key] = value;
      this.themeStore.setThemeSetting(themeSetting);
    },
    resetSetting() {
      this.themeStore.resetSetting();
    },
  },
});
</script>
<style lang="less" scoped>
.ant-divider-horizontal.ant-divider-with-text {
  margin: 16px 0;
  font-size: 14px;
  //color: rgba(0, 0, 0, 0.55);
}

.bg-base {
  background-color: var(--setting-theme-bg3);
}

.text-primary {
  color: #1890ff;
}

.setting-wrapper {
  padding: 0px 0px;
  overflow: hidden;

  .setting-title {
    font-size: 13px;
    margin-bottom: 15px;
  }

  /* 主题风格 */

  .setting-theme {
    overflow: hidden;
    width: 500px;
  }

  .setting-theme > div {
    width: 62px;
    height: 40px;
    line-height: 1;
    border-radius: 3px;
    margin: 0 18px 16px 0;
    padding: 16px 0 0 26px;
    box-sizing: border-box;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    display: inline-block;
    vertical-align: top;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: background-color 0.2s;

    &:before,
    &:after,
    & > .bg-primary {
      content: '';
      width: 100%;
      height: 10px;
      background: var(--setting-theme-bg1);
      position: absolute;
      left: 0;
      top: 0;
      transition: background-color 0.2s;
    }

    &:after {
      width: 14px;
      height: 100%;
    }

    &.head-top:before {
      background: var(--setting-theme-bg1);
    }

    &.head-top:after {
      background: transparent;
    }

    &.top-mix:before,
    &.left-mix:before {
      background: var(--setting-theme-bg4);
    }

    &.side-dark:after,
    &.left-mix:after,
    &.top-mix:after {
      background: var(--setting-theme-bg2);
    }

    &.head-light:before,
    & > .bg-primary {
      z-index: 1;
    }

    &.top-mix:before {
      z-index: 2;
    }

    &.layout-top {
      padding-left: 19px;

      &:after {
        display: none;
      }
    }
  }

  /* 主题色选择 */

  .setting-colors {
    color: #fff;
    margin-bottom: 20px;
  }

  .setting-color-item {
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    margin: 8px 10px 0 0;
    display: inline-block;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    vertical-align: top;
    position: relative;
    text-align: center;
    cursor: pointer;

    .setting-color-tooltip {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  /* 主题配置项 */

  .setting-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .setting-item-title {
      flex: 1;
      line-height: 28px;
    }

    .setting-item-control {
      line-height: 1;
    }
  }

  .ant-divider {
    margin-bottom: 20px;
  }

  .ant-alert + .ant-btn {
    margin-top: 12px;
  }
}
</style>
