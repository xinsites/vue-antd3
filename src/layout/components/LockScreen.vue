<template>
  <transition name="fade-slide" mode="out-in" appear>
    <template v-if="isLock">
      <div class="lockscreen" @mousedown.stop @contextmenu.prevent>
        <div :class="['lock-box', state.showLogin ? 'hidden':'']" @click="unLockScreen">
          <div class="lock">
              <span class="lock-icon">
                  <x-icon icon="LockOutlined" :size="36"/>
              </span>
          </div>
          <div class="tips">点击解锁</div>
        </div>
        <div class="local-time">
          <div class="time">{{ hour }}:{{ minute }}</div>
          <div class="date">{{ month }}月{{ day }}号，星期{{ week }}</div>
        </div>
        <div class="computer-status">
            <span :class="{ offline: !isOnline }" class="network">
              <x-icon icon="WifiOutlined" class="network" :size="20"/>
            </span>
          <x-icon icon="ApiOutlined" :size="20"/>
        </div>
        <div :class="['login-box', state.showLogin ? '':'hidden']">
          <a-avatar :size="64" :src="loginUser.headPhoto">
            <template v-if="!loginUser.headPhoto" #icon>
              <x-icon icon="UserOutlined" :size="32"/>
            </template>
          </a-avatar>
          <div class="username">{{ loginUser.userName }}</div>
          <form>
            <a-input-search type="password" v-model:value="password" autofocus placeholder="请输入登录密码" size="large" @search="handleUnlock" autocomplete="off">
              <template #enterButton>
                <x-icon icon="LoadingOutlined" v-show="state.loginLoading"/>
                <x-icon icon="ArrowRightOutlined" v-show="!state.loginLoading"/>
              </template>
            </a-input-search>
          </form>
          <span style="width: 100%; margin-top: 10px;">
              <a style="float: left" @click="state.showLogin = false">返回</a>
              <a style="float: right" @click="handleReLogin">重新登录</a>
            </span>
        </div>
      </div>
    </template>
  </transition>
</template>
<script lang="ts">
import {useOnline} from '@vueuse/core';
import {useUserStore} from '@/store/modules/user-store';
import {useThemeStore} from '@/store/modules/theme-store';
import {LOGIN_IGNORE} from "@/config/common";
import {useTime} from "@/utils/comm-util";
import {LoginUserUnlockAPI} from "@/api/common/login-api";
import {message} from "ant-design-vue/es";
import {getUserPassword, logout} from "@/utils/user-util";

export default defineComponent({
  name: 'LockScreen',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      showLogin: false,
      loginLoading: false, // 正在登录
    });
    const password = ref("");
    const isOnline = useOnline();
    const {month, day, hour, minute, week} = useTime();

    const userStore = useUserStore();
    const loginUser = computed(() => userStore.info ?? {}); // 当前登录用户信息
    const themeStore = useThemeStore();
    const {currentRoute} = useRouter();
    const isLock = computed(() => themeStore.isLock);

    let timer;
    const timekeeping = () => {
      clearInterval(timer);
      state.showLogin = false;
      const lockTime = themeStore.lockTime;
      if (lockTime === 0) return; //手动锁屏
      const curPath = currentRoute.value.path;
      if (LOGIN_IGNORE.includes(curPath) || isLock.value) return; //不需要自动锁屏判断
      timer = setTimeout(() => {
        themeStore.setLockScreen(true); //页面无动作时间到，锁屏
      }, lockTime * 1000);
    };

    let timer2;
    //解锁登录
    const unLockScreen = () => {
      clearInterval(timer2);
      state.showLogin = true;
      timer2 = setTimeout(() => {
        state.showLogin = false;
      }, 180 * 1000);
    };

    onMounted(() => {
      document.addEventListener('mousedown', timekeeping);
    });

    onUnmounted(() => document.removeEventListener('mousedown', timekeeping));

    //验证解锁
    const handleUnlock = async () => {
      if (!password.value) {
        return message.error('请输入用户密码！');
      }

      state.loginLoading = true;
      LoginUserUnlockAPI({password: getUserPassword(password.value)}).then((msg) => {
        state.loginLoading = false;
        password.value = undefined;
        themeStore.setLockScreen(false);
        timekeeping();
      }).catch((e: Error) => {
        state.loginLoading = false;
        message.error(e.message || '解锁失败');
      });
    };

    //重新登录
    const handleReLogin = () => {
      logout(route.fullPath);
    };
    return {isLock, loginUser, unLockScreen, state, password, month, day, hour, minute, week, isOnline, handleUnlock, handleReLogin};
  },
});
</script>
<style lang="less" scoped>


.lockscreen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  overflow: hidden;
  color: white;
  //background: #000;
  background-image: url(../../assets/img/bg.jpg);
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;

  ::v-deep(.ant-input-search-button) {
    border-radius: 0 2px 1px 0 !important;
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }

  .login-box {
    position: absolute;
    top: 45%;
    left: 50%;
    display: flex;
    transform: translate(-50%, -50%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: opacity 0.5s ease-in-out;

    > * {
      margin-bottom: 14px;
    }

    .username {
      font-size: 30px;
    }

    a {
      color: white;
      font-size: 16px;
    }

    a:hover {
      color: white;
      text-decoration: underline;
    }
  }

  .lock-box {
    position: absolute;
    top: 42%;
    left: 50%;
    font-size: 34px;
    transform: translateX(-50%);
    cursor: pointer;
    transition: opacity 0.5s ease-in-out;

    .tips {
      color: white;
      font-size: 26px;
    }

    .lock {
      display: flex;
      justify-content: center;

      .lock-icon {
        .anticon-unlock {
          display: none;
        }

        &:hover .anticon-unlock {
          display: initial;
        }
      }
    }
  }

  .local-time {
    position: absolute;
    top: 60px;
    left: 60px;
    font-family: helvetica;

    .time {
      font-size: 70px;
    }

    .date {
      font-size: 40px;
    }
  }

  .computer-status {
    position: absolute;
    right: 60px;
    bottom: 60px;
    font-size: 24px;

    > * {
      margin-left: 14px;
    }

    .network {
      position: relative;

      &.offline::before {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        width: 2px;
        height: 28px;
        background-color: red;
        content: '';
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }
}
</style>
