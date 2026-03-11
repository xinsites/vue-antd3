<template>
  <a-card :title="title" :bordered="false" :body-style="{ padding: '0px' }">
    <template #extra>
      <MoreIcon :refresh="false" :navConfig="true" @navConfig="openNavConfig" @edit="emit('edit')" @hide="emit('hide')" @reset="emit('reset')"/>
    </template>
    <x-scroll style="height: 342px; padding: 0px">
      <template v-for="item in gridSource" :key="item.name">
        <a-card-grid class="nav-grid-item" @click="linkOpen(item.url)">
          <span class="item">
            <x-icon :icon="item.icon" :color="item.color" :size="20"/>
            <span style="margin-top: 0.5rem"> {{ item.name }}</span>
          </span>
        </a-card-grid>
      </template>
    </x-scroll>
    <x-modal ref="dragModal" :width="900" title="快捷导航编辑" :maxable="true" :body-style="{ padding: '0 6px' }">
      <div style="padding: 0px">
        <x-drag-table :pagination="false" size="middle" :columns="columns" :dataSource="dataSource" dragIcon="HolderOutlined" @dropEnd="dataDragEnd">
          <template #bodyCell="{ column, text, record }">
            <template v-if="['color', 'name', 'url'].includes(column.dataIndex)">
              <div>
                <template v-if="editableData[record.id]">
                  <x-select-color
                      v-if="column.dataIndex === 'color'"
                      :allowClear="false"
                      style="margin: -6px 0px"
                      readOnly
                      v-model:value="editableData[record.id][column.dataIndex]"
                  />
                  <a-input v-else v-model:value="editableData[record.id][column.dataIndex]" style="padding: 4px 5px; margin: -6px 0px"/>
                </template>
                <template v-else>
                  <div class="cell-text">{{ text }}</div>
                </template>
              </div>
            </template>
            <template v-if="column.dataIndex === 'icon'">
              <x-select-icon
                  :hideInput="true"
                  :allowClear="false"
                  v-if="editableData[record.id]"
                  style="width: 60px; margin: -6px 0px"
                  v-model:value="editableData[record.id][column.dataIndex]"
              />
              <x-icon v-else :icon="record.icon" :color="record.color"/>
            </template>

            <template v-else-if="column.dataIndex === 'operation'">
              <div class="table-operation">
                <span v-if="editableData[record.id]">
                  <a @click="handleSave(record.id)" class="xin-text-success">保存</a>
                  <a-divider type="vertical"/>
                  <a-typography-link @click="handleCancel(record.id)">取消</a-typography-link>
                </span>
                <span v-else>
                  <a @click="handleEdit(record.id)">编辑</a>
                  <a-divider type="vertical"/>
                  <a-popconfirm title="确认要删除操作吗?" @confirm="handleDel(record.id)">
                    <a class="xin-text-danger">删除</a>
                  </a-popconfirm>
                </span>
              </div>
            </template>
          </template>
        </x-drag-table>
      </div>

      <template #footer>
        <div class="footer-box">
          <div class="footer-left">
            <a-button type="dashed" @click="addRow">新增一行</a-button>
          </div>
          <div class="footer-right">
            <a-button @click="closeNavConfig">关闭</a-button>
            <a-button>
              <a-popconfirm title="确认要重置快捷导航吗?" @confirm="handleResetConfig">重置导航</a-popconfirm>
            </a-button>
            <a-button type="primary" @click="handleSaveConfig(null)">保存配置</a-button>
          </div>
        </div>
      </template>
    </x-modal>
  </a-card>
</template>

<script lang="ts">
import MoreIcon from './MoreIcon.vue';
import {ref} from 'vue';
import {deepClone, getCacheData, guid, isHttpLink, setCacheData} from "xin-antd3-ui";
import {linkOpen} from "@/utils/comm-util";

const CACHE_KEY = 'quick-navs';
const DEFAULT = [
  {id: '1', name: '代码平台', icon: 'logo-xs.png', color: '#ff9c6e', url: 'http://xinsite.vip'},
  {id: '2', name: '代码生成', icon: 'logo-xb.png', color: '#B37431', url: 'http://build.xinsite.vip'},
  {id: '3', name: 'antdv', icon: 'logo-antd.svg', color: '#1fdaca', url: 'https://www.antdv.com/components/overview-cn'},
  {id: '4', name: 'vue', icon: 'logo-vue.png', color: '#ffd666', url: 'https://cn.vuejs.org/'},
  {id: '5', name: 'vite', icon: 'logo-vite.svg', color: '#b37feb', url: 'https://vitejs.cn/'},
  {id: '6', name: 'iconfont', icon: 'logo-iconfont.svg', color: '#95de64', url: 'https://www.iconfont.cn/'},
  {id: '7', name: 'vue3', icon: 'logo-vue3.png', color: '#5cdbd3', url: 'https://vue3js.cn/#provide-inject'},
  {id: '8', name: 'pinia', icon: 'logo-pinia.svg', color: '#ff85c0', url: 'https://pinia.web3doc.top/'},
  {id: '9', name: 'Vue Antd Admin', icon: 'logo-vadmin.png', color: '#ffc069', url: 'https://gitee.com/iczer/vue-antd-admin'},
];

export default defineComponent({
  components: {MoreIcon},
  props: {
    title: String,
  },
  setup(props2, {emit}) {
    const {proxy} = getCurrentInstance() as any;
    const gridSource = ref([...(getCacheData(CACHE_KEY) ?? DEFAULT)]);
    const dataSource = ref([]);
    const dragModal = ref();

    const editableData = reactive({});

    const handleEdit = (key: string) => {
      editableData[key] = deepClone(dataSource.value.filter((item) => key == item.id)[0]);
    };
    const handleDel = (key: string) => {
      dataSource.value = dataSource.value.filter((item) => key != item.id);
    };
    const handleSave = (key: string) => {
      Object.assign(dataSource.value.filter((item) => key == item.id)[0], editableData[key]);
      delete editableData[key];
    };
    const handleCancel = (key: string) => {
      delete editableData[key];
    };
    const dataDragEnd = ({newDataSource, sortParam, dragIndex, targetIndex}) => {
      dataSource.value = newDataSource;
    };

    const addRow = () => {
      if (dataSource.value.length == 0) {
        dataSource.value = [{id: '1', name: '代码平台', icon: 'logo-xs.png', color: '#ff9c6e', url: 'http://xinsite.vip/'}];
      } else {
        const row = deepClone(dataSource.value[dataSource.value.length - 1]);
        row.id = guid(8);
        dataSource.value.push(row);
        editableData[row.id] = deepClone(row);
      }
    };

    return {gridSource, dataSource, emit, dragModal, dataDragEnd, editableData, handleEdit, handleDel, handleSave, handleCancel, addRow, linkOpen};
  },
  data() {
    return {
      columns: [
        {
          width: 40,
          dataIndex: 'id',
          title: '',
          align: 'center',
          rowDrag: true,
          customRender: ({index}) => '',
        },
        {
          title: '图标',
          width: 80,
          dataIndex: 'icon',
          align: 'center',
        },
        {
          title: '名称',
          width: '22%',
          dataIndex: 'name',
        },
        {
          title: '颜色',
          width: '15%',
          dataIndex: 'color',
        },
        {
          ellipsis: true,
          title: '链接地址',
          dataIndex: 'url',
        },
        {
          title: '操作',
          width: 110,
          align: 'center',
          dataIndex: 'operation',
        },
      ],
    };
  },
  methods: {
    clickMenu(path) {
      if (isHttpLink(path)) {
        window.open(path);
      } else {
        this.$router.push(path);
      }
    },
    //保存配置窗口
    openNavConfig() {
      this.dataSource = deepClone(this.gridSource);
      this.dragModal.openDialog();
    },
    //关闭配置窗口
    closeNavConfig() {
      this.dragModal.closeDialog();
    },
    //重置导航
    handleResetConfig() {
      this.handleSaveConfig([...DEFAULT], false);
      this.dataSource = deepClone(this.gridSource);
    },
    //保存配置
    handleSaveConfig(dataDefault, close = true) {
      this.gridSource = [...(dataDefault ?? this.dataSource)];
      setCacheData(CACHE_KEY, this.gridSource);
      if (close) this.closeNavConfig();
    },
  },
});
</script>

<style lang="less" scoped>
.nav-grid-item {
  width: 33.33%;
  height: 114px;
  cursor: pointer;
  //line-height: 100px;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 6px;
    text-align: center;
  }
}

.cell-text {
  height: 32px;
  line-height: 32px;
  margin: -6px 0px;
}
</style>
