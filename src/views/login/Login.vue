<template>
  <div class="login-bg" :style="{ backgroundImage: `url(${loginBg})` }">
    <div class="login-header">
      <span>{{ i18n('在线体验，用户名 admin，密码 123456') }}</span>
      <ul>
        <li>
          <LocalePicker/>
        </li>
        <li><a href="#">{{ i18n('用户注册') }}</a></li>
        <li><a href="#">{{ i18n('帮助') }}</a></li>
      </ul>
    </div>
    <div class="content">
      <div class="left-box">
        <div class="desc">
          <div class="title"> xinsite.<span class="title-small">vue3.x</span></div>
          <p>{{ i18n('开箱即用的低代码管理系统') }}</p>
          <p>SpringBoot、JWT、Druid、MyBatis、Redis</p>
          <p>vue、vite、pinia、ant design、axios、vue-i18n</p>
          <p>{{ i18n('演示账号') }}：admin &nbsp; &nbsp;{{ i18n('密码') }}:123456</p>
          <p>{{ i18n('本地账号') }}：admin &nbsp; &nbsp;{{ i18n('密码') }}:123456</p>
          <div style="margin-top: 30px" class="link">
            <a href="http://www.xinsite.vip/" target="_blank"> <span>GitHub</span></a>
            <a href="http://www.xinsite.vip/" target="_blank"> <span>Gitee</span></a>
            <a href="http://www.xinsite.vip/" target="_blank"> <span>{{ i18n('官网') }}</span></a>
            <a href="http://www.xinsite.vip/" target="_blank"> <span>{{ i18n('框架文档') }}</span></a>
          </div>
        </div>
      </div>
      <div class="login-contianer">
        <transition name="fade" mode="out-in" appear>
          <LoginForm @resetForm="resetForm" v-if="formType == 'login'"/>
          <MobileForm @resetForm="resetForm" v-else-if="formType == 'mobile'"/>
          <QrCodeForm @resetForm="resetForm" v-else-if="formType == 'code'"/>
          <ForgetPassword @resetForm="resetForm" v-else-if="formType == 'password'"/>
        </transition>
      </div>
    </div>
    <div class="login-footer">
      <span>copyright © 2019-{{year}} <a href="http://www.xinsite.vip" target="_blank">xinsite.vip</a> all rights reserved.</span>
    </div>
  </div>
</template>

<script lang="ts">
import LoginForm from './LoginForm.vue';
import loginBg from '@/assets/login-bg.jpg';
import {dateFormat} from "xin-antd3-ui";

export default defineComponent({
  name: 'Login',
  components: {
    LoginForm,
    MobileForm: defineAsyncComponent(() => import('./MobileForm.vue')),
    QrCodeForm: defineAsyncComponent(() => import('./QrCodeForm.vue')),
    ForgetPassword: defineAsyncComponent(() => import('./ForgetPassword.vue')),
    LocalePicker: defineAsyncComponent(() => import('./LocalePicker.vue')),
  },
  setup() {
    const {currentRoute, replace} = useRouter();
    const year = dateFormat(new Date(), 'YYYY');
    const formType = ref('login');

    return {loginBg, year, formType};
  },
  methods: {
    resetForm(formTypeStr) {
      this.formType = formTypeStr;
    },
  },
});
</script>
<style lang="less" scoped>
/* 背景 */
.login-bg {
  position: relative;
  box-sizing: border-box;
  //background-image: url('@/assets/login-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;

    .left-box {
      border-radius: 5px;
      width: 400px;
      margin-right: 15px;
      //border: 1px solid #5c87ff;

      .desc {
        text-align: left;
        width: 450px;
        padding: 10px 30px;
        box-sizing: border-box;
        height: 100%;
      }

      .desc p {
        font-size: 15px;
        color: white;
        line-height: 30px;
      }

      .desc p:before {
        top: 0px;
        content: '◇';
        position: relative;
        margin-right: 8px;
      }

      .title {
        z-index: 999;
        font-size: 64px;
        font-weight: bold;
        color: white;
      }

      .title-small {
        font-size: 13px;
        background: #46c706;
        border-radius: 24px;
        padding: 4px 9px;
        border: 1px solid;
        margin-left: 5px;
      }

      .link a {
        color: #ffff;
        border: 1px solid #ffff;
        width: 80px;
        margin-right: 5px;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        cursor: pointer;

        white-space: nowrap;
        user-select: none;
        padding: 5px 15px 6px;
        font-size: 12px;
        border-radius: 32px;
      }
    }

    .login-contianer {
      width: 400px;
    }
  }
}

.login-header {
  height: 36px;
  line-height: 36px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  letter-spacing: 0.5px;
  color: #fff;
  font-family: Arial;
  font-size: 13px;
  background: rgba(0, 0, 0, 0.025);

  span {
    line-height: 36px;
    text-indent: 20px;
    color: #fff;
    float: left;
  }

  ul {
    float: right;
    height: 36px;
    margin: 0;
    padding-right: 30px;
  }

  ul li {
    float: left;
    margin-left: 20px;
    height: 36px;
    list-style-type: none;
    line-height: 36px;
  }

  ul li a {
    color: #fff;
  }
}

.login-footer a,
.login-footer a:focus,
.login-footer a:hover {
  color: #fefffe;
  text-decoration: none;
}

/* 底部版权 */
.login-footer {
  height: 36px;
  line-height: 36px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  letter-spacing: 0.5px;
  color: #fff;
  font-family: Arial;
  font-size: 13px;
  background: rgba(0, 0, 0, 0.068);
}

/* 响应式 */
@media screen and (max-height: 520px) {
  .login-footer {
    display: none;
  }
}

/* 响应式 */
@media screen and (max-width: 820px) {
  .left-box {
    display: none;
  }
}
</style>
