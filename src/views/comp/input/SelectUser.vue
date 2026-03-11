<template>
  <div :class="['xin-page-full']">
    <a-card :bordered="false" title="">
      <a-form ref="formRef" :model="form" class="xin-form"
              :labelCol="{ style: 'min-width: 90px;max-width: 260px;' }" labelAlign="left">
        <a-row :gutter="48">
          <a-col :xl="24" :lg="24" :md="24">
            <div style="color: red; margin-bottom: 10px;">输入框选择-示例</div>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="多选:user1" name="user1">
              <x-select-user v-model:value="form.user1" placeholder="请选择" :max-selCount="3"
                             :request-config="{deptUrl:'/system/dept/list', deptFieldNames: { value: 'deptId', label: 'deptName'}, deptPidKey:'pid'  }"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="多选:user2" name="user2">
              <x-select-user v-model:value="form.user2" placeholder="请选择" valueFormat="array"/>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <a-form-item label="单选:user3" name="user3">
              <x-select-user v-model:value="form.user3" :multiple="false" placeholder="请选择" :max-selCount="3"/>
            </a-form-item>
          </a-col>
          <a-col :xl="24" :lg="24" :md="24">
            <div style="color: red; margin-bottom: 10px;">按钮选择-示例</div>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <div style="margin-bottom: 5px;">多选:user4，size="default"</div>
            <x-select-user v-model:value="form.user4" useType="button" size="default" :max-selCount="3"/>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <div style="margin-bottom: 5px;">多选:user5，size="small"</div>
            <x-select-user v-model:value="form.user5" useType="button" size="small"/>
          </a-col>
          <a-col :xl="8" :lg="12" :md="24">
            <div style="margin-bottom: 5px;">单选:user6，自定义</div>
            <x-select-user v-model:value="form.user6" useType="button" :multiple="false">
              <template #selectButton>
                <a-button type="primary">选择用户</a-button>
              </template>
              <template #selectOptions="{options}">
                {{ options }}
              </template>
            </x-select-user>
          </a-col>
          <a-col :xl="24" :lg="24" :md="24">
            <div style="margin-bottom: 10px; margin-top: 16px; color: red">
              <b>注意：user1、user2，值1，不在查询列表中</b>
            </div>
            <div style="color: red; margin-top: 20px; margin-bottom: 10px;">自定义选择-示例，初始化显示必须自定义，没有选择按钮</div>
          </a-col>
          <a-col :xl="12" :lg="12" :md="24">
            <a-table rowKey="deptId" size="middle" :columns="columns" :data-source="form.dept" :pagination="false">
              <template #bodyCell="{ column, record, text }">
                <template v-if="column.dataIndex === 'leaderText'">
                  <x-select-user v-model:value="record.leader" v-model:text="record.leaderText" useType="define" :max-selCount="2">
                    <template #selectDefine="{value, text}">
                      {{ text ? text : '尚未配置' }}
                    </template>
                  </x-select-user>
                </template>
              </template>
            </a-table>
          </a-col>
          <a-col :xl="12" :lg="12" :md="24">
            <a-col :xl="8" :lg="12" :md="24">
              <div style="margin-bottom: 5px;">多选:user7，自定义</div>
              <x-select-user v-model:value="form.user7" v-model:text="form.user7Text" useType="define">
                <!--                <template #selectDefine="{value, text}">-->
                <!--                  {{ text ? text : '尚未配置' }}-->
                <!--                </template>-->
              </x-select-user>
            </a-col>
          </a-col>
          <a-col :xl="12" :lg="12" :md="24">

          </a-col>
        </a-row>
        <div style="max-width: 90%; margin-top: 30px; line-height: 30px; word-break: break-word">
          {{ formData }}
        </div>
        <div class="f_c_s">
          <a-space>
            <a-form-item>
              <a-button style="margin-left: 10px" type="primary" @click="submit">提交</a-button>
            </a-form-item>
            <a-form-item>
              <a-button @click="resetForm">重置</a-button>
            </a-form-item>
          </a-space>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {formUtil} from "xin-antd3-ui";
import {useRouter} from "vue-router";
import {message} from 'ant-design-vue';

interface FormType {
  user1?: string;
  user2?: array<number | string>;
  user3?: string | number;
  user4?: string;
  user5?: string;
  user6?: string;
  user7?: string;
  user7Text?: string;
  user8?: string;
  user9?: string | number;
  dept?: any;
}

export default defineComponent({
  setup() {
    const formRef = ref(null);
    const {currentRoute} = useRouter();
    const disabled = ref(false);
    const loading = ref(false); // 加载状态
    const formData = ref('');

    // 表单数据
    const {form, resetFields, loadFields, clearFields} = formUtil<FormType>({
      user1: '1,2,8',
      user2: [1, 2],
      user3: 9,
      user4: '1,3,6',
      user5: '8',
      user6: '5', //单选
      user7: '2,6',
      user7Text: '系统管理员,徐西',
      user8: '3,7',
      user9: 4, //单选
      dept: [{
        deptId: 1,
        deptName: '研发部',
        leader: '',
        leaderText: '',
      }, {
        deptId: 2,
        deptName: '销售部',
        leader: '3,7',
        leaderText: '朱德华,苏英翠',
      }],
    });

    setTimeout(function () {
      form.user2 = '2,3';
    }, 2000);

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

    const changeTable2 = ref(null);
    const selectChangeTable2 = (selected, type) => {
      changeTable2.value = selected;
      console.log('selectChangeTable2======', type, selected);
    };
    const changeTable3 = ref(null);
    const selectChangeTable3 = (selected) => {
      changeTable3.value = selected;
    };

    const columns = [
      {
        title: 'Id',
        fixed: 'left',
        dataIndex: 'deptId',
      },
      {
        title: '部门名称',
        dataIndex: 'deptName',
      },
      {
        title: '部门领导',
        dataIndex: 'leaderText',
      },
    ];
    return {
      formRef,
      disabled,
      form,
      formData,
      loading,
      submit,
      resetForm,
      loadForm,
      clearForm,
      changeTable2,
      selectChangeTable2,
      changeTable3,
      selectChangeTable3,
      columns,
    };
  },
  methods: {},
});
</script>

<style lang="less" scoped>

</style>
