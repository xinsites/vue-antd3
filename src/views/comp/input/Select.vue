<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="false" title="">
      <a-form ref="formRef" :model="form" class="xin-form"
              :labelCol="{ style: 'min-width: 90px;max-width: 260px;' }" labelAlign="left">
        <a-row :gutter="48">
          <a-col :xl="24" :lg="24" :md="24">
            <div style="color: red; margin-bottom: 10px">自定义数据源(a-select-option)：</div>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="单选:d1" name="d1" :rules="[{ required: false, message: '请选择名称!', trigger: 'blur' }]">
              <x-select v-model:value="form.d1" placeholder="请选择名称">
                <a-select-option value="d11">d11</a-select-option>
                <a-select-option value="d12">d12</a-select-option>
                <template #dropdownRender="{ menuNode: menu }">
                  <v-nodes :vnodes="menu"/>
                  <a-divider style="margin: 4px 0"/>
                  <div style="padding: 4px 8px; cursor: pointer" @mousedown="(e) => e.preventDefault()"> Add item</div>
                </template>
              </x-select>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="多选:d2" name="d2" :rules="[{ required: false, message: '请选择名称!', trigger: 'blur' }]">
              <x-select v-model:value="form.d2" mode="multiple" valueType="int" valueFormat="array" placeholder="请选择名称">
                <a-select-option :value="1">d21</a-select-option>
                <a-select-option :value="2">d22</a-select-option>
              </x-select>
            </a-form-item>
          </a-col>
          <a-col :xl="24" :lg="24" :md="24">
            <div style="color: red; margin-bottom: 10px">自定义数据源(自定义options)：</div>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="单选:single" name="single"
                         :rules="[{ required: true, message: '请选择地点!', trigger: 'blur' }]">
              <x-select v-model:value="form.single" :options="options" placeholder="请选择地点">
                <template #dropdownRender="{ menuNode: menu }">
                  <v-nodes :vnodes="menu"/>
                  <a-divider style="margin: 4px 0"/>
                  <div style="padding: 4px 8px; cursor: pointer" @mousedown="(e) => e.preventDefault()"> Add item</div>
                </template>
                <template #option="{ option }">
                  {{ option }}
                </template>
              </x-select>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="多选:multiple" name="multiple">
              <x-select v-model:value="form.multiple" :options="options" mode="multiple" placeholder="请选择地点"/>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24"/>
          <a-col :xl="24" :lg="24" :md="24">
            <div style="color: red; margin-bottom: 10px">静态数据字典(指定dictKey，从前端获取数据)：</div>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="单选数值:s1" name="s1">
              <x-select
                  v-model:value="form.s1"
                  dictKey="STATIC_TEST_LIST"
                  @selectChange="selectChange1"
                  :onDisabled="onDisabled"
                  placeholder="请选择付款方式"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24" style="margin-top: 5px"> 选中、填充回调: {{ selected1 }}</a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="多选数值:s2" name="s2">
              <x-select v-model:value="form.s2" dictKey="STATIC_TEST_LIST" mode="multiple" placeholder="请选择付款方式"/>
            </a-form-item>
          </a-col>
          <a-col :xl="24" :lg="24" :md="24">
            <div style="color: red; margin-bottom: 10px">动态数据字典(指定dictKey，从后端请求)：</div>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="单选数值:singleId" name="singleId">
              <x-select v-model:value="form.singleId" dictKey="DEMO_DEPT" placeholder="请选择部门">
                <template #option="{ option }"> {{ option.label }}【{{ option.value }}】</template>
              </x-select>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="多选数值:multipleId" name="multipleId">
              <x-select v-model:value="form.multipleId" dictKey="DEMO_DEPT" mode="multiple" placeholder="请选择部门"/>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="多选数值(文本保存):text" name="text">
              <x-select v-model:value="form.text" dictKey="DEMO_DEPT" mode="multiple" :saveText="true"
                        placeholder="请选择部门"/>
            </a-form-item>
          </a-col>
          <a-col :xl="24" :lg="24" :md="24">
            <div style="color: red; margin-bottom: 10px">级联选择(指定dictKey，从后端请求)：</div>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="选择省:province1" name="province1">
              <x-select v-model:value="form.province1" parentId="0" :cascader="true" dictKey="SYS_AREA"
                        placeholder="请选择省"/>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="选择市:city1" name="city1">
              <x-select v-model:value="form.city1" v-model:parentId="form.province1" :cascader="true" dictKey="SYS_AREA"
                        placeholder="请选择市"/>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="选择区:region1" name="region1">
              <x-select
                  v-model:value="form.region1"
                  v-model:parentId="form.city1"
                  :cascader="true"
                  disableValues="110102,110103,110104"
                  dictKey="SYS_AREA"
                  placeholder="请选择区"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="24" :lg="24" :md="24">
            <div style="color: red; margin-bottom: 10px">远程搜索(指定dictKey，从后端请求)：</div>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="选择省:remote1，minChars=1" name="remote1">
              <x-select v-model:value="form.remote1" parentId="0" :remote="true" :minChars="1" dictKey="SYS_AREA" placeholder="请选择省"/>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="多选省:remote2" name="remote2">
              <x-select
                  v-model:value="form.remote2"
                  v-model:text="form.remote2Text"
                  parentId="0"
                  :remote="true"
                  mode="multiple"
                  dictKey="SYS_AREA"
                  placeholder="请选择省"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="24" :lg="24" :md="24">
            <div style="color: red; margin-bottom: 10px">接口调用(指定url、params，从后端请求)：</div>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="选择市:url1" name="url1">
              <x-select v-model:value="form.url1" url="/dict/list" :params="{ dictKey: 'SYS_AREA', parentId: '130000' }" placeholder="请选择市"/>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="多选区:url2" name="url2">
              <x-select
                  v-model:value="form.url2"
                  url="/dict/list"
                  :params="{ dictKey: 'SYS_AREA', parentId: parentId }"
                  mode="multiple"
                  placeholder="请选择区"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <div style="color: #ff0000"><b>注意：d2：3、multiple：1、multipleId：234不在下拉列表中</b></div>
        <div style="max-width: 90%; margin-top: 30px; line-height: 30px; word-break: break-word">
          {{ formData }}
        </div>
        <div style="text-align: center; margin-top: 20px">
          <a-space size="middle">
            <a-button type="primary" :loading="loading" @click="submit"> 提交</a-button>
            <a-button @click="resetForm">重置</a-button>
            <a-button type="primary" @click="loadForm">加载</a-button>
            <a-button type="dashed" @click="clearForm">清空</a-button>
          </a-space>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {message} from 'ant-design-vue';
import {useRouter} from "vue-router";
import {formUtil} from "xin-antd3-ui";

interface FormType {
  region1?: string;
  city1?: string;
  province1?: string;
  text?: string;
  single?: string;
  multiple?: string;
  singleId?: string;
  multipleId?: string;
  s1?: string;
  s2?: string;
  remote1?: string;
  remote2?: string;
  remote2Text?: string;
  url1?: string;
  url2?: string;
}

export default defineComponent({
  components: {
    VNodes: (_, {attrs}) => {
      return attrs.vnodes;
    },
  },
  setup() {
    const formRef = ref(null);
    const {currentRoute} = useRouter();
    const loading = ref(false); // 加载状态
    const formData = ref('');
    const options = ref([
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
      {
        value: 'disabled',
        label: 'Disabled',
        disabled: true,
      },
      {
        value: 'yiminghe',
        label: 'Yiminghe',
      },
    ]);
    const parentId = ref('150100');

    // 表单数据
    const {form, resetFields, loadFields, clearFields} = formUtil<FormType>({
      d1: 'd11',
      d2: '1,2,3',
      region1: '130623',
      city1: '130600',
      province1: '130000',
      single: 'lucy',
      multiple: 'yiminghe,lucy,1',
      singleId: '21',
      multipleId: '11,21,234',
      text: '销售部,仓库部',
      s1: '3',
      s2: '1,2',
      remote1: '110000',
      remote2: '140000,210000',
    });

    /* 提交 */
    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate().then(() => {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          formData.value = JSON.stringify(form);
          message.success('提交成功');
        }, 500);
      }).catch(() => {
      });
    };

    const onDisabled = (record) => {
      return record.value == 4;
    };

    const resetForm = () => {
      resetFields();
    };

    const loadForm = () => {
      if (formData.value) loadFields(JSON.parse(formData.value));
      else message.info('无数据可加载');
    };

    const clearForm = () => {
      clearFields();
    };

    const selected1 = ref(null);
    const selectChange1 = (selectedOptions) => {
      selected1.value = selectedOptions;
    };

    const selected = ref(null);
    const selectChange = (selectedOptions) => {
      selected.value = selectedOptions;
    };

    return {
      formRef,
      form,
      formData,
      options,
      loading,
      submit,
      resetForm,
      loadForm,
      clearForm,
      selectChange1,
      selected1,
      selectChange,
      selected,
      parentId,
      onDisabled,
    };
  },
  methods: {},
});
</script>

<style lang="less" scoped>

</style>
