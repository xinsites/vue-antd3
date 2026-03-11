<template>
  <x-modal
      ref="modalRef"
      :width="420"
      title="修改密码"
      :maxable="false"
      :resizable="false"
      v-model:visible="visible"
      :confirm-loading="loading"
      :getContainer="documentBody"
      @cancel="onCancel"
      @ok="onOk"
  >
    <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        :label-col="{ flex: '90px' }"
        :wrapper-col="{ flex: '1' }"
    >
      <a-form-item label="旧密码" name="oldPassword">
        <a-input-password
            v-model:value="form.oldPassword"
            placeholder="请输入旧密码"
        />
      </a-form-item>
      <a-form-item label="新密码" name="password">
        <a-input-password
            v-model:value="form.password"
            placeholder="请输入新密码"
        />
      </a-form-item>
      <a-form-item label="确认密码" name="password2">
        <a-input-password
            v-model:value="form.password2"
            placeholder="请再次输入新密码"
        />
      </a-form-item>
    </a-form>
  </x-modal>
</template>
<script lang="ts">
import {deepClone, formUtil} from "xin-antd3-ui";
import type {Rule} from "ant-design-vue/es/form";
import {message} from "ant-design-vue";
import {updatePasswordAPI} from "@/api/common/login-api";
import {getUserPassword} from "@/utils/user-util";

export default defineComponent({
  name: 'UpdatePassword',
  setup() {
    const modalRef = ref(null);
    const formRef = ref(null);
    const loading = ref<boolean>(false);
    const visible = ref<boolean>(false);

    // 表单数据
    const {form, resetFields} = formUtil({
      oldPassword: '',
      password: '',
      password2: '',
    });

    // 表单验证规则
    const rules = reactive<Record<string, Rule[]>>({
      oldPassword: [{
        required: true,
        type: 'string',
        message: '请输入旧密码',
        trigger: 'blur',
      }],
      password: [{
        required: true,
        type: 'string',
        message: '请输入新密码',
        trigger: 'blur',
      }],
      password2: [{
        required: true,
        type: 'string',
        validator: async (_rule: Rule, value: string) => {
          if (!value) {
            return Promise.reject('请再次输入新密码');
          }
          if (value !== form.password) {
            return Promise.reject('两次输入密码不一致');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      }],
    });

    /* 保存修改 */
    const onOk = () => {
      if (!formRef.value) return;
      formRef.value.validate().then(() => {
        loading.value = true;
        const userPassword = {
          oldPassword: getUserPassword(form.oldPassword),
          newPassword: getUserPassword(form.password),
        };
        updatePasswordAPI(userPassword).then((msg) => {
          loading.value = false;
          message.success(msg);
          visible.value = false;
        }).catch((e) => {
          loading.value = false;
          if (e.message) message.error(e.message);
        });
      }).catch(() => {
      });
    };

    /* 关闭回调 */
    const onCancel = () => {
      resetFields();
      formRef.value?.clearValidate();
      loading.value = false;
    };

    //打开修改密码窗口
    const openDialog = () => {
      onCancel();
      visible.value = true;
    };

    return {modalRef, formRef, loading, visible, form, rules, onOk, onCancel, openDialog};
  },
  methods: {
    documentBody() {
      return document.body
    }
  },
});
</script>
<style lang="less" scoped></style>
