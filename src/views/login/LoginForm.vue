<template>
  <div class="login-form">
    <h2>{{ i18n('用户登录') }}<span class="t2">{{ i18n('演示版') }}v1.4.1</span></h2>
    <div class="v-tag">Vue3.x{{ i18n('版本') }}</div>
    <div style="margin: 20px 0px 10px 0px" @keypress="loginPress">
      <a-form ref="formRef" :model="userInfo" :rules="rules">
        <a-form-item name="userName">
          <a-input allow-clear size="large" v-model:value="userInfo.userName" :placeholder="i18n('请输入登录账号')">
            <template #prefix>
              <x-icon icon="UserOutlined"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="passWord">
          <a-input-password allow-clear size="large" v-model:value="userInfo.passWord" :placeholder="i18n('请输入登录密码')" autocomplete="off">
            <template #prefix>
              <x-icon icon="LockOutlined"/>
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item name="code">
          <div class="login-input-group">
            <a-input allow-clear size="large" v-model:value="userInfo.code" :placeholder="i18n('请输入验证码')">
              <template #prefix>
                <x-icon icon="SafetyCertificateOutlined"/>
              </template>
            </a-input>
            <a-button class="login-captcha" @click="changeCaptcha">
              <img v-if="captcha" :src="captcha" alt=""/>
            </a-button>
          </div>
        </a-form-item>
        <div>
          <a-checkbox v-model:checked="userInfo.remember">{{ i18n('记住密码') }}</a-checkbox>
          <a class="login-form-forgot" @click="changeForm('password')">{{ i18n('忘记密码') }}</a>
        </div>
      </a-form>
    </div>
    <div class="loging-btn">
      <a-button size="large" style="width: 100%" :loading="loading" type="primary" @click="handleSubmit">
        <span v-if="!loading">{{ i18n('登录') }}</span>
        <span v-else>{{ i18n('正在登录...') }}</span>
      </a-button>
    </div>
    <div class="action">
      <a @click="changeForm('mobile')">{{ i18n('手机登录') }}</a>
      <a @click="changeForm('code')">{{ i18n('二维码登录') }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import {message} from 'ant-design-vue/es';
import {loginAPI, loginCaptchaAPI} from '@/api/common/login-api';
import {useLayoutStore} from "@/store/modules/layout-store";
import {replaceHomePage} from "@/utils/tabs-util";
import {deepClone} from "xin-antd3-ui";
import {Rule} from "ant-design-vue/es/form";
import {getUserPassword} from "@/utils/user-util";
import {i18n} from '@/utils/i18n-util';
import {REMEMBER_ME} from "@/config/common";

export default defineComponent({
  name: 'LoginForm',
  setup(props, {emit, slots}) {
    const layoutStore = useLayoutStore();
    const {currentRoute, replace} = useRouter();
    const formRef = ref();
    const loading = ref(false); // 加载状态
    // 验证码base64数据
    const captcha = ref('');
    const captchaText = ref('');

    // 表单验证规则
    const rules = computed(() => {
      return {
        userName: [
          {
            required: true,
            message: i18n('请输入登录账号'),
            type: 'string',
            trigger: 'blur',
          },
        ],
        passWord: [
          {
            required: true,
            message: i18n('请输入登录密码'),
            type: 'string',
            trigger: 'blur',
          },
        ],
        code: [{
          required: true,
          type: 'string',
          validator: async (_rule: Rule, value: string) => {
            if (!value) {
              return Promise.reject(i18n('请输入验证码'));
            }
            if (value.toLowerCase() != captchaText.value?.toLowerCase()) {
              return Promise.reject(i18n('验证码输入错误'));
            }
            return Promise.resolve();
          },
          trigger: 'blur',
        }],
      };
    });

    // 表单数据
    const userInfo = reactive({
      userName: 'admin',
      passWord: '123456',
      code: '',
      remember: localStorage.getItem(REMEMBER_ME) == 'true' ? true : false,
    });
    const loginPress = (e) => {
      if (e.keyCode == 13) {
        handleSubmit();
      }
    };

    // 点击提交
    function handleSubmit() {
      formRef.value?.validate().then(async () => {
        loading.value = true;
        const user = deepClone(userInfo);
        user.passWord = getUserPassword(user.passWord, user.code);
        loginAPI(user).then((msg) => {
          message.success(i18n('登录成功'));
          localStorage.setItem(REMEMBER_ME, userInfo.remember + '');
          const {query} = unref(currentRoute);
          replaceHomePage(query?.redirect as string);
        }).catch((e: Error) => {
          changeCaptcha();
          message.error(e.message || i18n('登录出错'));
          loading.value = false;
        });
      });
    }

    // 变更Form表单
    function changeForm(formType) {
      emit('resetForm', formType);
    }

    /* 获取图形验证码 */
    function changeCaptcha() {
      loginCaptchaAPI().then((data) => {
        captcha.value = data.base64;
        captchaText.value = data.text;
        userInfo.code = data.text;
      }).catch((e: Error) => {
        message.error(e.message);
      });
    }

    changeCaptcha();

    return {rules, formRef, loading, userInfo, loginPress, handleSubmit, changeCaptcha, captcha, changeForm};
  },
  methods: {},
});
</script>
<style lang="less" scoped>
.login-contianer {
  width: 400px;

  .login-form {
    position: relative;
    overflow: hidden;
    // margin-top: 25px;
    border-radius: 5px;
    padding: 10px 40px 20px 40px;
    width: 400px;
    min-height: 340px;
    background: white;
    text-align: left;
    //background: rgba(255, 255, 255, 0.92);
    //height: 400px;
    box-shadow: 2px 5px 18px #6453534a;

    h2 {
      font-weight: 500;
      padding: 10px 0px;
      text-align: left;
      margin-top: 10px;
    }

    .t2 {
      font-size: 12px;
      margin-left: 6px;
      color: #ffffff;
      display: inline-block;
      background: #409eff;
      padding: 1px 5px 0px 5px;
      border-radius: 24px;
    }

    .v-tag {
      top: -23px;
      text-align: center;
      position: absolute;
      right: -43px;
      line-height: 49px;
      top: -17px;
      padding-left: 21px;
      font-size: 12px;
      width: 158px;
      background: #3a8ee6;
      padding-top: 25px;
      color: white;
      -webkit-transform: rotate(40deg);
      letter-spacing: 2px;
    }

    .login-form-forgot {
      float: right;
    }

    .action {
      text-align: right;
      margin-top: 20px;
      font-size: 13px;
      color: #9c9c9c;
      cursor: pointer;

      a {
        margin-left: 24px;
      }
    }

    /* 验证码 */

    .login-input-group {
      display: flex;
      align-items: center;

      ::v-deep(.ant-input-affix-wrapper) {
        flex: 1;
      }

      .login-captcha {
        width: 102px;
        height: 40px;
        margin-left: 10px;
        padding: 0;

        & > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
