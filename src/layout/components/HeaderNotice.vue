<template>
  <div class="item-trigger header-notify">
    <a-popover v-model:visible="visible" title="" trigger="click">
      <a-badge
          :count="unreadNum"
          :overflowCount="99"
          :offset="[-8, 0]"
          :number-style="{
          fontSize: '12px',
          padding: '0 4px',
        }">
        <x-icon icon="BellOutlined"/>
      </a-badge>
      <template #content>
        <div class="notice-pop">
          <div @click.stop="">
            <a-tabs v-model:active-key="active" :tabBarGutter="80" :centered="true">
              <a-tab-pane key="todo" :tab="todoTitle">
                <a-list item-layout="horizontal" :data-source="todo">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-list-item-meta :title="item.title">
                        <template #avatar>
                          <a-avatar style="background-color: #FF7400">
                            <template #icon>
                              <x-icon :size="18" icon="AuditOutlined"/>
                            </template>
                          </a-avatar>
                        </template>
                        <template #description>
                          <div>{{ item.createTime }}</div>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>
                  </template>
                </a-list>
                <div v-if="todo.length" class="d-flex notice-actions">
                  <div class="flex-1" @click="handleMoreTodo"> 查看更多</div>
                </div>
              </a-tab-pane>
              <a-tab-pane key="mail" :tab="mailTitle">
                <a-list item-layout="horizontal" :data-source="mail">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-list-item-meta :title="item.title">
                        <template #avatar>
                          <a-avatar :src="item.avatar"/>
                        </template>
                        <template #description>
                          <div>{{ item.time }}</div>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>
                  </template>
                </a-list>
                <div v-if="mail.length" class="d-flex notice-actions">
                  <div class="flex-1" @click="clearMail"> 清空邮件</div>
                  <a-divider type="vertical"/>
                  <div class="flex-1" @click="handleMoreMail"> 查看更多</div>
                </div>
              </a-tab-pane>
              <a-tab-pane key="notice" :tab="noticeTitle">
                <a-list item-layout="horizontal" :data-source="notice">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-list-item-meta :title="item.title" :description="item.time">
                        <template #avatar>
                          <a-avatar style="background-color: #2BCACD">
                            <template #icon>
                              <x-icon :size="18" icon="SoundOutlined"/>
                            </template>
                          </a-avatar>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>
                  </template>
                </a-list>
                <div v-if="notice.length" class="d-flex notice-actions">
                  <div class="flex-1" @click="clearNotice"> 清空通知</div>
                  <a-divider type="vertical"/>
                  <div class="flex-1" @click="handleMoreNotice"> 查看更多</div>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </template>
    </a-popover>
  </div>
</template>
<script lang="ts">
import {MailModel, NoticeModel, TodoModel} from '@/model/system/user-model';
import {getUnreadNoticeAPI} from "@/api/common/login-api";
import {message} from "ant-design-vue";

export default defineComponent({
  name: 'HeaderNotice',
  setup() {
    const router = useRouter();

    const visible = ref<boolean>(false);
    const active = ref<string>('todo');     // 选项卡选中
    const todo = ref<TodoModel[]>([]);      // 待办数据
    const mail = ref<MailModel[]>([]);      // 邮件数据
    const notice = ref<NoticeModel[]>([]);  // 通知数据

    // 通知标题
    const noticeTitle = computed(() => {
      return '通知' + (notice.value.length ? `(${notice.value.length})` : '');
    });

    // 邮件标题
    const mailTitle = computed(() => {
      return '邮件' + (mail.value.length ? `(${mail.value.length})` : '');
    });

    // 待办标题
    const todoTitle = computed(() => {
      return '待办' + (todo.value.length ? `(${todo.value.length})` : '');
    });

    // 未读数量
    const unreadNum = computed(() => {
      return notice.value.length + mail.value.length + todo.value.length;
    });

    /* 清空通知 */
    const clearNotice = () => {
      notice.value = [];
    };

    /* 清空邮件 */
    const clearMail = () => {
      mail.value = [];
    };

    /* 待办查看更多 */
    const handleMoreTodo = () => {
      visible.value = false;
      router.push('/message/list');
    };

    /* 邮件查看更多 */
    const handleMoreMail = () => {
      visible.value = false;
      router.push({path: '/message/list', query: {type: 'mail'}});
    };

    /* 通知查看更多 */
    const handleMoreNotice = () => {
      visible.value = false;
      router.push({path: '/message/list', query: {type: 'notice'}});
    };

    /* 查询数据 */
    const query = () => {
      getUnreadNoticeAPI().then((result) => {
        notice.value = result.notice;
        mail.value = result.mail;
        todo.value = result.todo;
      }).catch((e) => {
        if (e.message) message.error(e.message);
      });
    };

    query();

    return {visible, active, notice, mail, todo, noticeTitle, mailTitle, todoTitle, unreadNum, clearNotice, clearMail, handleMoreTodo, handleMoreMail, handleMoreNotice};
  },
  methods: {},
});
</script>
<style lang="less" scoped>
.header-notify {
  &__overlay {
    max-width: 360px;
  }

  .ant-tabs-content {
    width: 300px;
  }

  .ant-badge {
    font-size: 18px;
    //transform: scaleX(0.8);

    .ant-badge-multiple-words {
      padding: 0 4px;
    }

    svg {
      width: 0.9em;
    }
  }

  ::v-deep(.ant-badge) {
    color: var(--header-text-color);
  }
}

.notice-pop {
  padding: 0;
  width: 320px;
  max-width: 100%;
  margin: -12px 0px;

  // 内容
  .ant-list-item {
    padding-left: 24px;
    padding-right: 24px;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
      background: hsla(0, 0%, 60%, 0.05);
    }
  }

  .ant-tag {
    margin: 0;
  }

  // 操作按钮
  .notice-actions {
    border-top: 1px solid hsla(0, 0%, 60%, 0.15);

    & > .flex-1 {
      line-height: 46px;
      text-align: center;
      transition: background-color 0.3s;
      cursor: pointer;
      color: inherit;

      &:hover {
        background: hsla(0, 0%, 60%, 0.05);
      }
    }
  }
}
</style>
