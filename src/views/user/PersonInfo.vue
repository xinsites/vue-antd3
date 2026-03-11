<template>
  <div :class="['xin-page-full', 'horizontal-layout']">
    <a-card :bordered="false" :style="{ width: '25%', overflow: 'auto' }">
      <div class="t-c">
        <div class="cropper-bg user-info-avatar-group" @click="handleOpenCropper">
          <a-avatar :size="110" :src="form.headPhoto">
            <template v-if="!loginUser.headPhoto" #icon>
              <x-icon icon="UserOutlined" :size="56"/>
            </template>
          </a-avatar>
          <x-icon icon="upload-outlined" class="user-info-avatar-icon" :size="30"/>
        </div>
        <h1>{{ loginUser.userName }}</h1>
        <div>{{ loginUser.remark }}</div>
      </div>
      <div class="user-info-list">
        <div class="f_c_s">
          <x-icon icon="user-outlined"/>
          <div class="xin-cell-content">资深前后端工程师</div>
        </div>
        <div class="f_c_s">
          <x-icon icon="home-outlined"/>
          <div class="xin-cell-content">某某公司 - 研发部 - 某某组</div>
        </div>
        <div class="f_c_s">
          <x-icon icon="environment-outlined"/>
          <div class="xin-cell-content">中国 • 安徽省 • 合肥市</div>
        </div>
        <div class="f_c_s">
          <x-icon icon="tag-outlined"/>
          <div class="xin-cell-content">JavaScript、HTML、CSS</div>
        </div>
      </div>
      <a-divider dashed/>
      <h6>标签</h6>
      <div class="user-info-tags">
        <a-tag>Antd3</a-tag>
        <a-tag>Antd4</a-tag>
        <a-tag>Layui</a-tag>
        <a-tag>Element</a-tag>
        <a-tag>Extjs</a-tag>
        <a-tag>Java</a-tag>
        <a-tag>Net.Core</a-tag>
        <a-tag>mysql</a-tag>
        <a-tag>oracle</a-tag>
        <a-tag>kingbase8</a-tag>
      </div>
    </a-card>
    <a-card :bordered="false" :body-style="{ paddingTop: '12px' }" :style="{ marginLeft: '10px', overflow: 'auto' }">
      <a-tabs v-model:active-key="active">
        <a-tab-pane tab="基本信息" key="info">
          <a-form
              ref="formRef"
              :model="form"
              :rules="rules"
              :label-col="{ flex: '100px' }"
              :wrapper-col="{ flex: '1' }"
              style="max-width: 580px; margin-top: 20px"
          >
            <a-form-item label="姓名" name="userName">
              <a-input
                  v-model:value="form.userName"
                  placeholder="请输入姓名"
                  allow-clear
              />
            </a-form-item>
            <a-form-item label="性别" name="userSex">
              <x-radio-group v-model:value="form.userSex" :disabled="true" dictKey="STATIC_SEX"/>
            </a-form-item>
            <a-form-item label="邮箱" name="email">
              <a-input
                  v-model:value="form.email"
                  placeholder="请输入邮箱"
                  allow-clear
              />
            </a-form-item>
            <a-form-item label="手机号:">
              <a-input
                  :disabled="true"
                  v-model:value="form.phone"
                  placeholder="请输入手机号"
                  allow-clear
              />
            </a-form-item>
            <a-form-item label="员工号">
              <a-input
                  :disabled="true"
                  v-model:value="form.employeeId"
                  placeholder="请输入员工号"
                  allow-clear
              />
            </a-form-item>
            <a-form-item label="个人简介">
              <a-textarea
                  v-model:value="form.remark"
                  placeholder="请输入个人简介"
                  :rows="4"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 4 }">
              <a-button type="primary" :loading="loading" @click="handleSave">
                {{ loading ? '保存中..' : '保存更改' }}
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="账号绑定" key="account">
          <div class="user-account-list">
            <div class="f_c_b">
              <div class="xin-cell-content">
                <div class="xin-cell-title">密保手机</div>
                <div class="xin-cell-desc">已绑定手机: 123****8901</div>
              </div>
              <a>去修改</a>
            </div>
            <a-divider/>
            <div class="f_c_b">
              <div class="xin-cell-content">
                <div class="xin-cell-title">密保邮箱</div>
                <div class="xin-cell-desc">
                  已绑定邮箱: xinsite@qixsun.com
                </div>
              </div>
              <a>去修改</a>
            </div>
            <a-divider/>
            <div class="f_c_b">
              <div class="xin-cell-content">
                <div class="xin-cell-title">密保问题</div>
                <div class="xin-cell-desc">未设置密保问题</div>
              </div>
              <a>去设置</a>
            </div>
            <a-divider/>
            <div class="f_c_s">
              <x-icon icon="qq-outlined" :size="26" class="user-account-icon" style="background: #3492ed; "/>
              <div class="xin-cell-content flex-1">
                <div class="xin-cell-title">绑定QQ</div>
                <div class="xin-cell-desc">当前未绑定QQ账号</div>
              </div>
              <a>去绑定</a>
            </div>
            <a-divider/>
            <div class="f_c_s">
              <x-icon icon="wechat-outlined" :size="26" class="user-account-icon" style="background: #4daf29;"/>
              <div class="xin-cell-content flex-1">
                <div class="xin-cell-title">绑定微信</div>
                <div class="xin-cell-desc">当前未绑定绑定微信账号</div>
              </div>
              <a>去绑定</a>
            </div>
            <a-divider/>
            <div class="f_c_s">
              <x-icon icon="alipay-outlined" :size="26" class="user-account-icon anticon-alipay"/>
              <div class="xin-cell-content flex-1">
                <div class="xin-cell-title">绑定支付宝</div>
                <div class="xin-cell-desc">当前未绑定绑定支付宝账号</div>
              </div>
              <a>去绑定</a>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <!-- 头像裁剪弹窗 -->
    <x-cropper-modal
        :src="form.headPhoto"
        v-model:visible="visible"
        @ok="handleCrop"
    />
  </div>
</template>

<script lang="ts">
import {useUserStore} from "@/store/modules/user-store";
import type {Rule} from "ant-design-vue/es/form";
import {message} from "ant-design-vue";
import {updateUserInfoAPI} from "@/api/common/login-api";
import {fileUrl} from "@/utils/comm-util";

export default defineComponent({
  name: 'PersonInfo',
  setup() {
    const userStore = useUserStore();
    const loginUser = computed(() => userStore.info ?? {}); // 当前登录用户信息

    const formRef = ref(null);
    const loading = ref(false);
    const visible = ref(false);
    const active = ref('info');

    // 表单数据
    const form = reactive({
      userName: loginUser.value.userName,
      userSex: loginUser.value.userSex,
      email: loginUser.value.email,
      remark: loginUser.value.remark,
      phone: loginUser.value.phone,
      headPhoto: loginUser.value.headPhoto,
      employeeId: loginUser.value.employeeId,
    });

    // 表单验证规则
    const rules = reactive<Record<string, Rule[]>>({
      userName: [
        {
          required: true,
          message: '请输入姓名',
          type: 'string',
        },
      ],
      userSex: [
        {
          required: true,
          message: '请选择性别',
          type: 'string',
        },
      ],
      email: [
        {
          required: true,
          message: '请输入邮箱',
          type: 'string',
        },
      ],
    });

    /* 头像裁剪完成回调 */
    const handleCrop = (base64: string) => {
      form.headPhoto = base64;
      visible.value = false;
    };

    const handleOpenCropper = () => {
      visible.value = true;
    };

    /* 修改登录用户 */
    const updateLoginUser = (obj: Record<string, any>) => {
      userStore.updateUserInfo({...loginUser.value, ...obj});
    };

    /* 保存更改 */
    const handleSave = () => {
      if (!formRef.value) return;
      formRef.value.validate().then(() => {
        loading.value = true;
        updateUserInfoAPI(form).then((data) => {
          loading.value = false;
          message.success('信息保存成功');
          data.headPhoto = fileUrl(data.headPhoto);
          updateLoginUser(data);
        }).catch((e) => {
          loading.value = false;
          message.error(e.message);
        });
      }).catch(() => {
      });
    };

    return {handleOpenCropper, loginUser, formRef, loading, visible, active, form, handleCrop, rules, handleSave};
  },
  methods: {},
});
</script>

<style lang="less" scoped>

.f_c_s {
  height: 30px;
  padding-left: 10px;
}

/* 用户资料卡片 */
.user-info-avatar-group {
  margin: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  border-radius: 50%;

  .user-info-avatar-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 30px;
    display: none;
    z-index: 2;
  }

  &:hover .user-info-avatar-icon {
    display: block;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: transparent;
    transition: background-color 0.3s;
  }

  &:hover:after {
    background-color: rgba(0, 0, 0, 0.4);
  }

  & + h1 {
    margin-bottom: 8px;
  }
}

/* 用户信息列表 */
.user-info-list {
  margin: 47px 0 32px 0;

  .xin-cell + .xin-cell {
    margin-top: 16px;
  }

  & + .ant-divider {
    margin-bottom: 16px;
  }
}

/* 用户标签 */
.user-info-tags {
  margin: 16px 0 4px 0;

  .ant-tag {
    margin: 0 12px 8px 0;
  }
}

.user-account-list {
  padding-bottom: 12px;

  .user-account-icon {
    color: #fff;
    padding: 8px;
    border-radius: 50%;

    &.anticon-alipay {
      background: #1476fe;
    }
  }
}

</style>
