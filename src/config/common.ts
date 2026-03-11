// 接口请求地址前缀
export const VITE_BASE_URL: string = import.meta.env.VITE_BASE_URL;

// 部署应用时的基本 URL，他由base配置项决定
export const BASE_URL = import.meta.env.BASE_URL;

// 文件下载、显示的host地址，与虚拟路径拼接成文件路径地址
export const VITE_FILE_HOST: string = import.meta.env.VITE_FILE_HOST;

// 组件库xin-antd3-ui使用
window['appConfig'] = { VITE_FILE_HOST: VITE_FILE_HOST, VITE_PUBLIC_PATH: import.meta.env.VITE_PUBLIC_PATH };

// 是否开发环境
export const IS_DEV: boolean = process.env.NODE_ENV === 'development';

// token 传递的 header 名称
export const TOKEN_HEADER_NAME = 'Authorization';

// token 在 storage 中存储的名称
export const TOKEN_STORE_NAME = 'access_token';

// 当前登录用户部门Id 在 storage 中存储的名称
export const TOKEN_CUR_DEPT_ID = 'login_cur_dept_id';

// 国际化语言列表
export const LOCALE_MSG_LIST = {};

// 以中文为key的国际化语言
export const LOCALE_MSG = {};

// 登录路由
export const LOGIN_PATH = '/login';

// 不需要登录的路由
export const LOGIN_IGNORE = ['/login', '/forget', '/register'];

// 需要重新登录的接口code集合
// 1001:登录状态已过期，请重新登录;1002:用户已停用;1003:用户已删除;1004:用户被踢出，请重新登录;1005:请求IP异常，请重新登录;
export const RELOGIN_CODES = [1001, 1002, 1003, 1004, 1005];

// 用户登录API
export const LOGIN_API = '/login/withPwd';

// 登录退出调用的API，没有请置空
export const LOGOUT_API = '/user/logout';

// XinAntd3 授权码, 请在.env.production中赋值你的生产授权码
export const LICENSE_CODE = import.meta.env.VITE_LICENSE_CODE;

// 记住我
export const REMEMBER_ME = 'remember_me';
