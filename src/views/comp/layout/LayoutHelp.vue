<template>
  <div :class="['xin-page-full', 'horizontal-layout']">
    <a-card :bordered="true">

      <div class="title" style="margin-top: 0px">框架布局<b>x-layout-admin</b>所有属性如下：
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
          <tr @click="layoutExpanded = !layoutExpanded">
            <th class="plus-th">
              <x-icon :icon="!layoutExpanded ? 'plus-outlined' : 'minus-outlined'"/>
              layout
            </th>
            <th>LayoutState</th>
            <th>框架布局store，登录用户不可配置</th>
            <th style="text-align: center"></th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">menus</th>
            <th>MenuTreeType[]</th>
            <th>侧边栏菜单数据</th>
            <th style="text-align: center">[]</th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">tabs</th>
            <th>TabItem[]</th>
            <th>页签数据</th>
            <th style="text-align: center">[]</th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">appName</th>
            <th>string | slot</th>
            <th>系统标题</th>
            <th style="text-align: center"></th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">homePath</th>
            <th>string</th>
            <th>首页地址，点击左上角logo跳转的地址</th>
            <th style="text-align: center"></th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">fixedPaths</th>
            <th>string[]</th>
            <th>固定标签路由(不能关闭的Tab标签)</th>
            <th style="text-align: center"></th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">reClickMenuRefresh</th>
            <th>boolean</th>
            <th>重复点击菜单，是否刷新页面</th>
            <th style="text-align: center">true</th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">breadcrumbHide</th>
            <th>boolean</th>
            <th>侧边栏导航模式时，面包屑是否隐藏</th>
            <th style="text-align: center">false</th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">dblClickCloseTab</th>
            <th>boolean</th>
            <th>双击标签页关闭页签</th>
            <th style="text-align: center">true</th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">tabsCache</th>
            <th>boolean</th>
            <th>是否支持页签缓存，刷新页面页签保持不变</th>
            <th style="text-align: center">true</th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">tabsSortable</th>
            <th>boolean</th>
            <th>是否支持页签拖动排序</th>
            <th style="text-align: center">true</th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">i18nEnable</th>
            <th>boolean</th>
            <th>是否开启国际化功能</th>
            <th style="text-align: center">true</th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">scrollTopCache</th>
            <th>boolean</th>
            <th>是否缓存滚动条高度，页签切换时滚动条高度保持不变</th>
            <th style="text-align: center">true</th>
          </tr>
          <tr v-if="layoutExpanded" class="child-row">
            <th class="child-item">menuScrollType</th>
            <th>enum</th>
            <th>菜单栏滚动条显示配置: none(不显示), auto(自动), overlay(浮动)</th>
            <th style="text-align: center;">auto</th>
          </tr>
          <tr @click="themeExpanded = !themeExpanded">
            <th class="plus-th">
              <x-icon :icon="!themeExpanded ? 'plus-outlined' : 'minus-outlined'"/>
              theme
            </th>
            <th>ThemeState</th>
            <th>主题状态store，登录用户可配置</th>
            <th style="text-align: center"></th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">interLang</th>
            <th>string</th>
            <th>国际化语言</th>
            <th style="text-align: center">zh_CN</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">collapse</th>
            <th>boolean</th>
            <th>是否折叠侧边栏</th>
            <th style="text-align: center">false</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">sideNavCollapse</th>
            <th>boolean</th>
            <th>双排菜单靠边小折叠栏</th>
            <th style="text-align: center">false</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">bodyFullscreen</th>
            <th>boolean</th>
            <th>内容区域是否全屏</th>
            <th style="text-align: center">false</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">layoutStyle</th>
            <th>enum</th>
            <th>布局风格: side(默认), top(顶部菜单), mix(左侧混合菜单)</th>
            <th style="text-align: center">side</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">appStyle</th>
            <th>enum</th>
            <th>系统主题颜色</th>
            <th style="text-align: center;color:#1890ff;">#1890ff</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">headStyle</th>
            <th>enum</th>
            <th>头部主题颜色</th>
            <th style="text-align: center;">#FFFFFF</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">sideMenuStyle</th>
            <th>enum</th>
            <th>侧边栏菜单颜色</th>
            <th style="text-align: center;color:#001529;">#001529</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">sideMenuDouble</th>
            <th>boolean</th>
            <th>是否开启侧栏双排菜单</th>
            <th style="text-align: center">false</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">mixCollapse</th>
            <th>boolean</th>
            <th>侧栏双排菜单是否折叠侧边栏</th>
            <th style="text-align: center">false</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">darkMode</th>
            <th>boolean</th>
            <th>是否是暗黑模式</th>
            <th style="text-align: center">false</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">colorfulIcon</th>
            <th>boolean</th>
            <th>侧栏是否多彩图标</th>
            <th style="text-align: center">false</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">canMenuDrag</th>
            <th>boolean</th>
            <th>菜单宽度拖拽</th>
            <th style="text-align: center">true</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">sideUniqueOpen</th>
            <th>boolean</th>
            <th>侧栏排他展开</th>
            <th style="text-align: center">true</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">showMenuSearch</th>
            <th>boolean</th>
            <th>开启菜单搜索</th>
            <th style="text-align: center">true</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">showTabs</th>
            <th>boolean</th>
            <th>是否开启多页签</th>
            <th style="text-align: center">true</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">showFooter</th>
            <th>boolean</th>
            <th>是否开启页脚</th>
            <th style="text-align: center">false</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">lockTime</th>
            <th>number</th>
            <th>自动锁屏时间(秒)，0值只能手动锁屏</th>
            <th style="text-align: center">0</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">menuWidth</th>
            <th>number</th>
            <th>侧栏菜单宽度</th>
            <th style="text-align: center">240</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">tabStyle</th>
            <th>enum</th>
            <th>标签页风格: smooth(圆滑), underline(下划线), dot(圆点), card(卡片)</th>
            <th style="text-align: center;">smooth</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">refreshTrigger</th>
            <th>enum</th>
            <th>刷新按钮位置: none(不显示), top(顶部), tab(当前页签)</th>
            <th style="text-align: center;">tab</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">tableSize</th>
            <th>enum</th>
            <th>表格统一尺寸配置: default(大号), middle(中等), small(紧凑)</th>
            <th style="text-align: center;">middle</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">openNProgress</th>
            <th>boolean</th>
            <th>页面加载，是否显示顶部进度条</th>
            <th style="text-align: center">true</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">enableTransition</th>
            <th>boolean</th>
            <th>是否开启动画</th>
            <th style="text-align: center">false</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">animationType</th>
            <th>enum</th>
            <th>动画类型: zoom-in(放大渐变), zoom-out(缩小渐变), fade-slide(滑动渐变), fade(淡入淡出), slide-bottom(底部消退), slide-right(右侧消退)
            </th>
            <th style="text-align: center;">fade</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">backUpBtn</th>
            <th>boolean</th>
            <th>内容区域太长，是否显示回到顶部按钮</th>
            <th style="text-align: center">false</th>
          </tr>
          <tr v-if="themeExpanded" class="child-row">
            <th class="child-item">pagePadding</th>
            <th>number</th>
            <th>内容区域加内边距，单位px</th>
            <th style="text-align: center">16</th>
          </tr>
          </tbody>
        </table>
      </Help>
      <div class="title" style="margin-top: 20px">框架布局<b>x-layout-admin</b>扩展插槽：</div>
      <Help>
        <table class="xin-table xin-table-border xin-table-medium">
          <colgroup>
            <col width="160"/>
            <col/>
            <col width="420"/>
          </colgroup>
          <thead>
          <tr>
            <th>名称</th>
            <th>说明</th>
            <th>参数</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>default</th>
            <th>
              默认插槽，内容页面
            </th>
            <th>{ transitionName, keepAliveInclude }</th>
          </tr>
          <tr>
            <th>appLogo</th>
            <th>左上角系统logo图标</th>
            <th></th>
          </tr>

          <tr>
            <th>appName</th>
            <th>左上角系统标题</th>
            <th></th>
          </tr>
          <tr>
            <th>headerLogo</th>
            <th>头部logo区域(logo+系统标题)，定义后appLogo、appName失效</th>
            <th>{logoWidth, collapse}</th>
          </tr>
          <tr>
            <th>headerLeft</th>
            <th>头部左侧区域，面包屑前面，导航模式类型=side有效</th>
            <th></th>
          </tr>
          <tr>
            <th>headerRight</th>
            <th>头部右侧区域</th>
            <th></th>
          </tr>
          <tr>
            <th>footer</th>
            <th>底部区域</th>
            <th>{ year, isMobile }</th>
          </tr>

          <tr>
            <th>menuName</th>
            <th>菜单栏，菜单名自定义</th>
            <th>{menu:MenuTreeType}</th>
          </tr>
          <tr>
            <th>tabName</th>
            <th>标签页，标签名自定义</th>
            <th>{tab:TabItem, activeKey, theme}</th>
          </tr>
          <tr>
            <th>rightMenu</th>
            <th>标签页右键菜单</th>
            <th>{tab:TabItem, isMobile, locale}</th>
          </tr>
          <tr>
            <th>topMixMenu</th>
            <th>菜单混合布局顶部自定义</th>
            <th>args:{mixTopMenus,activeKey,handleClick(menu)}</th>
          </tr>
          </tbody>
        </table>
      </Help>
      <div class="title" style="margin-top: 20px">框架布局<b>x-layout-admin</b>事件列表：</div>
      <Help>
        <table class="xin-table xin-table-border xin-table-medium">
          <colgroup>
            <col width="160"/>
            <col/>
            <col width="360"/>
          </colgroup>
          <thead>
          <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>回调参数</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>sortTabChange</th>
            <th>
              标签页拖动排序改变事件
            </th>
            <th>function(tabs:TabItem[])</th>
          </tr>
          <tr>
            <th>routeChange</th>
            <th>路由地址变更事件</th>
            <th>function(tab:TabItem)</th>
          </tr>
          <tr>
            <th>removeTab</th>
            <th>标签页移除事件，不包括右键菜单“<b>关闭当前页</b>”</th>
            <th>function(path:string)</th>
          </tr>
          <tr>
            <th>reloadPage</th>
            <th>刷新页面事件，不包括右键菜单“<b>重新加载</b>”</th>
            <th>function(path:string)</th>
          </tr>
          <tr>
            <th>logoClick</th>
            <th>logo 点击事件</th>
            <th>function(home:string)</th>
          </tr>
          <tr>
            <th>fullScreenChange</th>
            <th>标签页全屏事件</th>
            <th>function(fullScreen:boolean)</th>
          </tr>
          <tr>
            <th>sideCollapse</th>
            <th>侧栏菜单更新 collapse 事件</th>
            <th>function(collapse:boolean)</th>
          </tr>
          <tr>
            <th>sideNavCollapse</th>
            <th>侧栏双排菜单更新 collapse 事件</th>
            <th>function(collapse:boolean)</th>
          </tr>
          <tr>
            <th>mixHeadMenuClick</th>
            <th>混合布局头部菜单点击事件</th>
            <th>function(path:string)</th>
          </tr>
          <tr>
            <th>sideNavMenuClick</th>
            <th>侧栏双排菜单一级菜单点击事件</th>
            <th>function(path:string)</th>
          </tr>
          </tbody>
        </table>
      </Help>
      <div class="title" style="margin-top: 20px">路由参数meta可配置的特殊值说明：</div>
      <Help>
        <table class="xin-table xin-table-border xin-table-medium">
          <colgroup>
            <col width="160"/>
            <col/>
            <col width="400"/>
          </colgroup>
          <thead>
          <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>示例</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>title</th>
            <th>
              路由标题，做为菜单栏名称或者标签页名称
            </th>
            <th>meta: {title: '查询列表'}</th>
          </tr>
          <tr>
            <th>icon</th>
            <th>
              菜单图标，没有配置时，默认的菜单图标规则：父菜单：folder-outlined，子菜单：file-outlined。不需要显示菜单图标，配置成：icon:''
            </th>
            <th>meta: {title: '查询列表', icon: 'book-outlined'}</th>
          </tr>
          <tr>
            <th>hide</th>
            <th>
              是否隐藏路由，没有配置表示非隐藏路由
            </th>
            <th>meta: {title: '修改页面', hide: true}</th>
          </tr>
          <tr>
            <th>selPath</th>
            <th>
              隐藏路由打开时，需要选中的路由菜单，与hide配合使用
            </th>
            <th>meta: {title: '通知公告', hide: true, selPath: '/home'}</th>
          </tr>
          <tr>
            <th>sign</th>
            <th>
              打开该页面是否签名验证，路由加meta.sige=true配置，跳转到该路由请调用方法signPushTabPage
            </th>
            <th>meta: {title: '签名修改页面', sign: true}</th>
          </tr>
          <tr>
            <th>keepAlive</th>
            <th>
              页面缓存配置，不配置或者keepAlive:true，表示缓存页面
            </th>
            <th>meta: {title: '非缓存页面', keepAlive: false}</th>
          </tr>
          </tbody>
        </table>
      </Help>
      <a-alert style="margin-top: 20px" show-icon type="warning">
        <template #message>
          路由配置特殊说明：
          <div style="padding: 6px 0px 16px 26px; line-height: 26px">
            1、 隐藏路由打开时，左边菜单选中说明：<br/>
            <div style="padding: 2px 0px 6px 26px; line-height: 26px">
              a、配置了selPath值，优先级最高<br/>
              b、没有配置selPath值，以打开的路由为选中菜单<br/>
              c、没有配置selPath值，找不到打开的路由(在隐藏路由页面整个刷新)，以隐藏路由的父页面为选中菜单<br/>
              <b style="color: red">
                隐藏路由，如果想在打开时有选中菜单，要么配置selPath值，要么将隐藏路由配置在选中菜单的孩子结点中。
                依靠b方法，在刷新页面时会没有选中菜单</b>
            </div>
            2、 缓存页面中，如果fullPath值变更，则缓存失效，重走生命周期<br/>
            3、 内嵌iframe页面，component: createIframeComponent(iframeUrl)<br/>
            4、 外链接页面，path: 'http://xinsite.vip/', component: BlankComponent<br/>
          </div>
        </template>
        <template #icon>
          <x-icon icon="SoundOutlined"/>
        </template>
      </a-alert>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  components: {
    Help: defineAsyncComponent(() => import('../../../components/Help.vue')),
  },
  setup() {
    const layoutExpanded = ref(false);
    const themeExpanded = ref(false);

    return {layoutExpanded, themeExpanded};
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

.tree-table {
  tr {
    th:first-child {
      padding-left: 28px;
    }

    th.plus-th {
      padding-left: 8px;
    }
  }

  .child-row {
    th,
    td {
      color: var(--header-text-color);
      background: var(--theme-background);
    }

    .child-item {
      padding-left: 38px;
    }
  }
}
</style>
