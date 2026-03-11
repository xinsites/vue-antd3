<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '20px' }">
    <div>
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="2026-03" header="工作流+优化" extra="2026-03">
          <ol>
            <li>新增签名组件</li>
            <li>新增简式流程组件</li>
            <li>新增简式工作流组件</li>
            <li>新增流程记录组件</li>
            <li>新增流水号输入框</li>
            <li>新增日历月数据组件</li>
            <li>更改路由属性：keepAlive规则</li>
            <li>下拉列表组件，url赋值两次加载BUG</li>
            <li>signPushTabPage：路由地址参数undefined无效修复</li>
            <li>........</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2025-06" header="优化+新增" extra="2025-06">
          <ol>
            <li>新增x-checkbox组件</li>
            <li>x-pro-table添加工具栏属性：btnAddText、btnDelText</li>
            <li>新增xModal.confirm</li>
            <li>校验添加：isPhoneTel、IPv6、isZipCode</li>
            <li>菜单滚动条兼容性优化</li>
            <li>x-modal弹出框二次弹出窗口未最前BUG修改</li>
            <li>下拉列表、下拉树级联选择，窗口编辑二次打开无法显示BUG修复</li>
            <li>树列表没有子结点时，无法拖动变成叶子结点BUG修复</li>
            <li>........</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2025-03" header="优化" extra="2025-03">
          <ol>
            <li>简单查询组件，快速查询弹窗条件无法加载</li>
            <li>高级查询组件，快速查询弹窗条件无法加载</li>
            <li>简单查询组件，弹窗条件查询后清空快速查询条件</li>
            <li>高级查询组件，弹窗条件查询后清空快速查询条件</li>
            <li>弹窗组件，默认Modal挂载结点在tab页面</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2025-01" header="优化" extra="2025-01">
          <ol>
            <li>组件无法智能提示BUG</li>
            <li>动态路由点击后无法展开菜单数据BUG</li>
            <li>动态路由元数据添加selPath属性无法显示菜单BUG</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2024-09" header="优化" extra="2024-09">
          <ol>
            <li>样式浮动滚动条修改</li>
            <li>标签选项卡页面，右击刷新时参数丢失BUG</li>
            <li>系统数据源，按关键字查询BUG</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2024-04" header="实例编写" extra="2024-04">
          <ol>
            <li>用户中心</li>
            <li>代码生成实-单表实例</li>
            <li>代码生成实-多表实例</li>
            <li>代码生成实-树列表实例</li>
            <li>系统管理</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2024-03" header="组件封装，通过依赖包下载" extra="2024-03">
          <ol>
            <li>引导组件</li>
            <li>打印插件</li>
            <li>表格拖动排序</li>
            <li>简单查询</li>
            <li>高级查询</li>
            <li>图片裁剪</li>
            <li>输入框组件</li>
            <li>表格组件</li>
            <li>组件封装npm发布</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2024-02" header="组件封装，通过依赖包下载" extra="2024-02">
          <ol>
            <li>框架布局</li>
            <li>弹窗扩展</li>
            <li>分割面板</li>
            <li>水印组件</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2024-01" header="组件封装，通过依赖包下载" extra="2024-01">
          <ol>
            <li>图标组件</li>
            <li>颜色选择</li>
            <li>浮动滚动条</li>
            <li>全局化配置</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2023-12" header="组件封装" extra="2024-12">
          <ol>
            <li>组件封装项目搭建</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2023-09" header="扩展组件" extra="2023-09">
          <ol>
            <li>用户表格自定义属性前端数据库保存</li>
            <li>多页标签，页面滚动条位置记录</li>
            <li>多页标签页面缓存，刷新后不变</li>
            <li>高级查询组件及示例</li>
            <li>简单查询组件及示例</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2023-08" header="扩展表格组件" extra="2023-08">
          <ol>
            <li>
              表格组件封装【x-pro-table】：
              <ol>
                <li>表格导入导出扩展(toolConfig)</li>
                <li>表格宫格与微端视图扩展(gridConfig)</li>
              </ol>
            </li>
            <li>添加响应式布局指令(v-col)</li>
            <li>用户表格自定义属性配置</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="9" header="扩展表格组件" extra="2023-07">
          <ol>
            <li>
              表格组件封装【x-pro-table】：
              <ol>
                <li>表格树展开扩展(treeConfig)</li>
                <li>表格单选多选相关属性扩展(selectConfig)</li>
                <li>表格拖动排序相关属性扩展(dragConfig)</li>
                <li>表格编辑行相关属性扩展(editConfig)</li>
                <li>表格编辑行验证提示扩展</li>
                <li>表格右键菜单插槽扩展(contextmenuPopup 插槽)</li>
              </ol>
            </li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="8" header="扩展滚动条、表格等组件" extra="2023-06">
          <ol>
            <li>
              表格组件封装【x-pro-table】：
              <ol>
                <li>表格工具栏UI及相关功能</li>
                <li>表格数据源设置扩展(loadConfig)</li>
                <li>表格分页相关属性扩展(pageConfig)</li>
                <li>表格树相关属性扩展(treeConfig)</li>
                <li>表格添加斑马纹属性</li>
              </ol>
            </li>
            <li>滚动条组件，替代样式：overflow: overlay</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="7" header="扩展分割面板、水印等组件" extra="2023-05">
          <ol>
            <li>
              分割面板：
              <ol>
                <li>左右布局、上下布局的面板</li>
                <li>可以自由拉伸、折叠</li>
                <li>可以自适应尺寸大小</li>
              </ol>
            </li>
            <li>添加宽高填充布局指令(v-fit)</li>
            <li>添加响应式布局指令(v-span)</li>
            <li>分割面板上下填充布局示例</li>
            <li>分割面板左右填充布局示例</li>
            <li>水印组件+示例</li>
            <li>
              表格选择组件封装+示例：
              <ol>
                <li>气泡卡片、弹出窗口选择</li>
                <li>以下拉输入框选择、按钮选择</li>
                <li>配置表格数据源、自定义组件等</li>
                <li>配置属性太多，具体看示例......</li>
              </ol>
            </li>
            <li> 手机版左侧浮动菜单</li>
            <li> 表格树【a-table】拖动排序新增父节点高亮效果</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="6" header="输入框等组件扩展" extra="2023-04">
          <ol>
            <li>
              多选框扩展组件：
              <ol>
                <li>dictKey、url获取数据源</li>
                <li>选中、填充时，数组自动转换成字符串</li>
                <li>选中、填充回调(原组件少了填充回调)</li>
                <li>禁用、隐藏结点配置</li>
              </ol>
            </li>
            <li>
              单选框扩展组件：
              <ol>
                <li>dictKey、url获取数据源</li>
                <li>禁用、隐藏结点配置</li>
                <li>选中、填充回调(原组件少了填充回调)</li>
              </ol>
            </li>
            <li>
              日期时间选择框扩展组件：
              <ol>
                <li>日期选择框</li>
                <li>日期范围选择框</li>
                <li>时间选择框</li>
                <li>时间范围选择框</li>
              </ol>
            </li>
            <li>
              文件上传扩展组件：
              <ol>
                <li>拖动排序配置</li>
                <li>文件上传值属性</li>
                <li>单文件上传最大限制配置</li>
                <li>是否选取文件后立即上传配置</li>
              </ol>
            </li>
            <li>
              富文本框扩展组件：
              <ol>
                <li>富文本框 WangEditor封装</li>
                <li>富文本框 TinymceEditor封装</li>
              </ol>
            </li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="5" header="下拉列表组件扩展" extra="2023-03">
          <ol>
            <li>
              级联选择输入框扩展组件：
              <ol>
                <li>dictKey、url获取数据源</li>
                <li>参数level配置指定层级数据源</li>
                <li>参数lazyLoad配置(懒)加载数据源</li>
                <li>选中、填充回调(原组件少了填充回调)</li>
                <li>参数配置将值保存到多个字段</li>
                <li>选中、填充时，数组自动转换成字符串</li>
                <li>........</li>
              </ol>
            </li>
            <li>
              下拉列表选择输入框扩展组件：
              <ol>
                <li>dictKey、url获取数据源</li>
                <li>参数cascader配置成级联选择</li>
                <li>参数remote配置后远程加载数据源</li>
                <li>选中、填充回调(原组件少了填充回调)</li>
                <li>多选时，数组自动转换成字符串</li>
                <li>........</li>
              </ol>
            </li>
            <li>
              下拉树选择输入框扩展组件：
              <ol>
                <li>dictKey、url获取数据源</li>
                <li>参数cascader配置成级联选择</li>
                <li>参数lazyLoad配置(懒)加载数据源</li>
                <li>选中、填充回调(原组件少了填充回调)</li>
                <li>多选时，数组自动转换成字符串</li>
                <li>........</li>
              </ol>
            </li>
            <li>内嵌页面内链接跳转</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="相关页面" extra="2023-02">
          <ol>
            <li>添加刷新按钮主题配置</li>
            <li>隐藏路由挂靠菜单可由query参数传递</li>
            <li>动态修改tab标签名称</li>
            <li>内嵌页面(有缓存、无缓存)</li>
            <li>
              主控平台：
              <ol>
                <li>首页</li>
                <li>工作台</li>
                <li>监控页面</li>
              </ol>
            </li>
            <li>
              登录页面：
              <ol>
                <li>用户登录页面</li>
                <li>忘记密码页面</li>
                <li>手机登录页面</li>
                <li>二维码登录页面</li>
              </ol>
            </li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="组件示例" extra="2023-01">
          <ol>
            <li>
              拖动排序：
              <ol>
                <li>列表拖动排序</li>
                <li>宫格拖动排序</li>
                <li>a-table拖动排序</li>
                <li>a-table树拖动排序</li>
                <li>a-tree拖动排序</li>
              </ol>
            </li>
            <li>打印插件</li>
            <li>
              种类页面布局：
              <ol>
                <li>单块内容满屏</li>
                <li>水平方向满屏</li>
                <li>垂直方向满屏</li>
                <li>表格滚动条上下</li>
                <li>表格滚动条左右</li>
              </ol>
            </li>
            <li>cron选择输入框</li>
            <li>颜色选择输入框</li>
            <li>图标选择输入框：antd图标、iconfont图标、svg图标、img图标</li>
            <li>弹窗扩展：拖动、定位、拉伸</li>
            <li>结果页面：成功、失败</li>
            <li>异常页面：403、404、500、无数据、网络错误</li>
            <li>表单页面：基础表单、分步表单、高级表单</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="主题设置" extra="2022-11">
          <ol>
            <li>导航模式</li>
            <li>系统主题</li>
            <li>头部主题</li>
            <li>暗黑模式主题</li>
            <li>菜单主题</li>
            <li>侧栏彩色图标</li>
            <li>侧栏双排菜单</li>
            <li>侧栏排他展开配置</li>
            <li>菜单宽度拖拽</li>
            <li>菜单展开宽度配置</li>
            <li>侧栏双排菜单</li>
            <li>自动锁屏设置</li>
            <li>长内容回到顶部按钮配置</li>
            <li>全局页脚配置</li>
            <li>内容区域边距设置</li>
            <li>自动锁屏设置</li>
            <li>页签显示风格：圆滑、默认、圆点、卡片</li>
            <li>菜单折叠按钮位置配置</li>
            <li>国际化语言配置</li>
            <li>页面切换动画配置</li>
          </ol>
        </a-collapse-panel>
        <a-collapse-panel key="1" header="搭建框架" extra="2022-08">
          <ol>
            <li>主框架总布局</li>
            <li>添加静态路由</li>
            <li>路由面包屑</li>
            <li>菜单栏目搜索</li>
            <li>主页锁屏</li>
            <li>主页信息通知</li>
            <li>多页标签</li>
          </ol>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </a-card>
</template>

<script lang="ts">
export default defineComponent({
  components: {},
  props: {
    title: String,
  },
  setup() {
    const activeKey = ref(['2026-03']);
    return {activeKey};
  },
  methods: {},
});
</script>

<style lang="less" scoped>
ol,
ul {
  margin-top: 0;
  margin-bottom: 5px;
}

ol {
  display: block;
  list-style-type: decimal;
  margin-block-start: 5px;
  margin-block-end: 5px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 140px;
  padding-left: 50px;
}

ol li {
  margin-top: 0;
  margin-bottom: 5px;
  padding-left: 10px;
}

li ol {
  margin-left: -25px;
}
</style>
