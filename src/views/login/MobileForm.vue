<template>
  <div class="login-form">
    <h2>手机登录<span class="t2">演示版v1.0.0</span></h2>
    <div class="v-tag">Vue3.x版本</div>
    <div style="margin: 20px 0px 10px 0px" @keypress="loginPress">
      <a-form :model="userInfo">
        <a-form-item name="phone">
          <a-input allow-clear size="large" v-model:value="userInfo.phone" placeholder="请输入手机号码">
            <template #prefix>
              <x-icon icon="PhoneOutlined"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="code">
          <div class="login-input-group">
            <a-input allow-clear size="large" v-model:value="userInfo.code" placeholder="请输入短信验证码">
              <template #prefix>
                <x-icon icon="SafetyCertificateOutlined"/>
              </template>
            </a-input>
            <a-button class="login-captcha" @click="changeCaptcha"> 获取验证码</a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
    <div class="loging-btn">
      <a-button size="large" style="width: 100%; margin-top: 10px" :loading="loading" type="primary" @click="handleSubmit">
        <span v-if="!loading">登录</span>
        <span v-else>正在登录...</span>
      </a-button>

      <a-button size="large" style="width: 100%; margin: 20px 0px 30px 0px" :loading="loading" @click="changeForm('login')"> 返回</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import {setToken} from '@/utils/user-util';

export default defineComponent({
  name: 'MobileForm',

  setup(props, {emit, slots}) {
    const {currentRoute, replace} = useRouter();
    const loading = ref(false); // 加载状态

    // 表单数据
    const userInfo = reactive({
      phone: '',
      password: '',
      code: '',
      UUID: undefined,
      remember: true,
    });
    const loginPress = (e) => {
      if (e.keyCode == 13) {
        handleSubmit();
      }
    };

    // 点击提交
    function handleSubmit() {
      const {query} = unref(currentRoute);
      setToken('abc', true);
      replace(String(query?.redirect || '/'));
    }

    // 变更Form表单
    function changeForm(formType) {
      emit('resetForm', formType);
    }

    /* 获取手机验证码 */
    function changeCaptcha() {
    }

    return {loading, userInfo, loginPress, handleSubmit, changeForm, changeCaptcha};
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
