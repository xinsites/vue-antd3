<template>
  <div class="item-trigger" style="padding: 0px 15px">
    <a-dropdown placement="bottom">
      <div class="header-avatar">
        <a-avatar class="avatar" size="small" shape="circle" :src="loginUser.headPhoto" :loadError="loadError">
          <template v-if="!loginUser.headPhoto || imgLoadError" #icon>
            <x-icon style="margin-left: -2.5px" icon="UserOutlined"/>
          </template>
        </a-avatar>
        <span class="name">{{ loginUser.userName }}</span>
      </div>
      <template #overlay>
        <a-menu class="avatar-menu" @click="handleMenuClick">
          <a-menu-item key="personal">
            <a href="javascript:;">
              <x-icon icon="UserOutlined"/>
              <span>{{ i18n('个人中心') }}</span>
            </a>
          </a-menu-item>
          <a-menu-item key="password">
            <a href="javascript:;">
              <x-icon icon="KeyOutlined"/>
              <span>{{ i18n('修改密码') }}</span>
            </a>
          </a-menu-item>
          <a-sub-menu key="dept" v-if="loginUser.depts?.length > 0">
            <template #title>
              <x-icon icon="apartment-outlined"/>
              <span>{{ i18n('用户部门') }}</span>
            </template>
            <template v-for="dept in loginUser.depts" :key="`dept_${dept.deptId}`">
              <a-menu-item>
                <template #icon>
                  <x-icon v-if="dept.deptId == curDeptId" icon="check-outlined"/>
                  <div v-else style="width: 14px">&nbsp; &nbsp;</div>
                </template>
                <div style="margin-right: 16px;">{{ dept.deptName }}</div>
              </a-menu-item>
            </template>
          </a-sub-menu>
          <a-menu-divider/>
          <a-menu-item key="logout">
            <a href="javascript:;">
              <x-icon icon="PoweroffOutlined"/>
              <span>{{ i18n('退出登录') }}</span>
            </a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <UpdatePassword ref="updatePasswordRef"/>
  </div>
</template>
<script lang="ts">
import {useThemeStore} from '@/store/modules/theme-store';
import {useUserStore} from '@/store/modules/user-store';
import {logout} from "@/utils/user-util";

export default defineComponent({
  name: 'HeaderAvatar',
  components: {
    UpdatePassword: defineAsyncComponent(() => import('./UpdatePassword.vue')),
  },
  setup() {
    const router = useRouter();
    const updatePasswordRef = ref(null);
    const userStore = useUserStore();
    const loginUser = computed(() => userStore.info ?? {}); // 当前登录用户信息

    const curDeptId = computed(() => userStore.deptId); // 当前用户部门

    const themeStore = useThemeStore();
    return {themeStore, userStore, curDeptId, loginUser, updatePasswordRef, router};
  },
  data() {
    return {
      imgLoadError: false,
    };
  },
  methods: {
    loadError(e) {
      this.imgLoadError = true;
      return true;
    },
    handleMenuClick({key}) {
      if (key === 'personal') {
        this.router.push('/person/info');
      } else if (key === 'password') {
        this.updatePasswordRef.openDialog();
      } else if (key === 'logout') {
        logout();
      } else if (key.toString().indexOf('dept_') === 0) {
        this.userStore.setDeptId(parseInt(key.toString().replace('dept_', '')));
      }
    },
  },
});
</script>
<style lang="less" scoped>
.header-avatar {
  display: flex;

  .avatar,
  .name {
    align-self: center;
  }

  .avatar {
    margin-right: 8px;
  }

  .name {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }
}

.avatar-menu {
  min-width: 120px;

  ::v-deep(.ant-dropdown-menu-item) {
    padding: 8px 12px;
  }

  span {
    padding-left: 10px;
  }
}
</style>
