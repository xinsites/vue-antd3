<template>
  <div class="login-form">
    <h2>二维码登录<span class="t2">演示版v1.0.0</span></h2>
    <div class="v-tag">Vue3.x版本</div>
    <div style="margin: -15px 0px 10px 0px; text-align: center">
      <img class="code-img" :src="qrCode" alt="" />
      <div class="explain">扫码后点击"确认"，即可完成登录</div>
    </div>
    <div class="loging-btn">
      <a-button size="large" style="width: 100%; margin: 10px 0px 20px 0px" :loading="loading" @click="changeForm('login')">返回</a-button>
    </div>
  </div>
</template>

<script lang="ts">
  import qrCode from '@/assets/img/qr-code.png';

  export default defineComponent({
    name: 'QrCodeForm',

    setup(props, { emit, slots }) {
      const { currentRoute, replace } = useRouter();
      const loading = ref(false); // 加载状态

      // 表单数据
      const userInfo = reactive({
        phone: '',
        password: '',
        code: '',
        UUID: undefined,
        remember: true,
      });

      // 变更Form表单
      function changeForm(formType) {
        emit('resetForm', formType);
      }

      return { loading, userInfo, changeForm, qrCode };
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
      padding: 10px 40px 10px 40px;
      width: 400px;
      background: white;
      text-align: left;
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

      .code-img {
        width: 280px;
        height: 280px;
      }

      .explain {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
</style>
