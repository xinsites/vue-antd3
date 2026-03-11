import Mock from 'mockjs';

// 基础mock接口
import '@/mock/common/dict-mock';
import '@/mock/common/file-mock';
import '@/mock/common/home-mock';
import '@/mock/common/login-mock';
import '@/mock/common/notice-mock';

// 系统管理mock接口
import '@/mock/system/user-mock';
import '@/mock/system/dept-mock';
import '@/mock/system/role-mock';
import '@/mock/system/dict/area-mock';
import '@/mock/system/dict/dict-mock';
import '@/mock/system/dict/sys-mock';
import '@/mock/system/dict/enum-mock';
import '@/mock/system/menu-mock';
import '@/mock/system/job-mock';
import '@/mock/system/log-mock';
import '@/mock/system/online-mock';
import '@/mock/system/config-mock';

// 用例mock接口
import '@/mock/demo/demo-dept-mock';
import '@/mock/demo/demo-user-mock';

// 代码生成mock接口
import '@/mock/build/single/row-mock';
import '@/mock/build/single/modal-mock';
import '@/mock/build/single/tab-mock';
import '@/mock/build/multi/modal-mock';
import '@/mock/build/multi/tab-mock';
import '@/mock/build/tree/row-mock';
import '@/mock/build/tree/modal-mock';
import '@/mock/build/tree/tab-mock';

// 设置全局延时
Mock.setup({
    timeout: '200-400',
});
