<template>
  <div style="height:100%">
    <x-upload
        v-model:value="attachValue"
        :accept="accept"
        :host="host"
        :editFileName="editFileName"
        :openExplain="openExplain"
        :explain="explain"
        :uploadBtnText="uploadBtnText"
        :listType="listType"
        :maxCount="maxCount"
        :maxSize="maxSize"
        :disabled="disabled"/>
  </div>
</template>

<script lang="ts">

import {onMounted} from "vue";
import {VITE_FILE_HOST} from "@/config/common";
import {deepClone} from "xin-antd3-ui";

export default defineComponent({
  props: {
    list: Array,
    listType: {
      type: String,
      default: 'picture-card',
    },
    //接受上传的文件类型
    accept: {
      type: String,
      default: '.pdf,.txt,.zip,.rar,.7z,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.git,.svg,.ico,.bmp',
    },
    //限制上传数量
    maxCount: {
      type: Number,
      default: 10,
    },
    //扩展属性：单文件上传最大限制，默认5M
    maxSize: {
      type: Number,
      default: 5 * 1024 * 1024,
    },
    host: {
      type: String,
      default: VITE_FILE_HOST,
    },
    //附件id统一字段
    attachId: {
      type: String,
      default: 'attachId',
    },
    //附件名称统一字段
    attachName: {
      type: String,
      default: 'attachName',
    },
    //附件类型统一字段
    attachType: {
      type: String,
      default: 'attachType',
    },
    //附件地址统一字段
    attachPath: {
      type: String,
      default: 'attachPath',
    },
    //附件大小统一字段
    attachSize: {
      type: String,
      default: 'attachSize',
    },
    //附件排序号统一字段
    attachSerial: {
      type: String,
      default: 'sortIdx',
    },
    //启用状态
    attachState: {
      type: String,
      default: 'attachState',
    },
    //是否禁用
    disabled: Boolean,
    //是否支持修改文件名
    editFileName: {
      type: Boolean,
      default: true,
    },
    openExplain: {
      type: Boolean,
      default: true,
    },
    explain: String,
    uploadBtnText: String,
  },
  setup(props, {emit, slots}) {
    const attachValue = ref('');
    const dataSource = ref([]);
    const initSource = ref([]);

    onMounted(() => {
      watch(() => props.list,
          (list?: []) => {
            dataSource.value = list || [];
            attachValue.value = getValue(list || []);
            initSource.value = deepClone(list || []);
          }, {
            immediate: true,
          },
      );
    });

    const handleLoadList = (list?) => {
      dataSource.value = list || [];
      attachValue.value = getValue(list || []);
    };

    const getValue = (list) => {
      const attachList = [];
      list.forEach((item, index) => {
        attachList.push({
          name: item[props.attachName],
          path: item[props.attachPath],
          size: item[props.attachSize],
          state: item[props.attachState] ?? 1,
          serial: index + 1,
        });
      });
      return JSON.stringify(attachList);
    };

    /**
     * 获取验证后的有效数据
     */
    const getValidateData = async () => {
      if (!attachValue.value) return [];
      const attachList = JSON.parse(attachValue.value);
      const list = [];
      attachList.forEach((item, index) => {
        list.push(getRecord(item, index));
      });
      return list;
    };

    //列表数据重置
    const handleResetList = () => {
      handleLoadList(deepClone(initSource.value))
    };

    const fileType = (path: string) => {
      if (typeof path != 'string') return 'unknown';
      const attr = path.split('.');
      if (attr.length > 0) return attr[attr.length - 1];
      return 'unknown';
    }

    const getRecord = (item, index) => {
      const record = {};
      record[props.attachId] = getAttachId(item);
      record[props.attachName] = item.name;
      record[props.attachPath] = item.path;
      record[props.attachSize] = item.size;
      record[props.attachType] = fileType(item.path);
      record[props.attachSerial] = index + 1;
      record[props.attachState] = item.state ?? 1;
      return record;
    }

    const getAttachId = (item) => {
      let attachId = 0;
      dataSource.value.forEach((row) => {
        if (attachId == 0 && row[props.attachSize] == item.size && row[props.attachId] > 0) {
          if (item.path?.indexOf(row[props.attachPath]) !== -1) {
            attachId = row[props.attachId];
          }
        }
      });
      return attachId;
    }

    return {
      attachValue,
      handleLoadList,
      getValidateData,
      handleResetList,
    };
  },

  methods: {},
});
</script>

<style lang="less" scoped></style>
