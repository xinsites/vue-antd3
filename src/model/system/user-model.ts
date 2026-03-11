/**
 * 用户
 */
export interface User {
    // 用户id
    userId?: number;
    // 账号
    username?: string;
    // 密码
    password?: string;
    // 昵称
    nickname?: string;
    // 头像
    avatar?: string;
    // 性别(字典)
    sex?: string;
    // 手机号
    phone?: string;
    // 邮箱
    email?: string;
    // 出生日期
    birthday?: string;
    // 个人简介
    remark?: string;
    // 状态, 0正常, 1冻结
    status?: number;
    // 性别名称
    sexName?: string;
    // 创建时间
    createTime?: string;
}

/**
 * 登录参数
 */
export interface LoginParam {
    // 账号
    username?: string;
    // 密码
    password?: string;
    // 租户id
    tenantId?: number;
    // 是否记住密码
    remember?: boolean;
}


/**
 * 通知数据格式
 */
export interface NoticeModel {
    // 图标颜色
    color?: string;
    // 图标
    icon?: string;
    // 标题
    title?: string;
    // 时间
    time?: string;
}

/**
 * 私信数据格式
 */
export interface MailModel {
    // 头像
    avatar?: string;
    // 标题
    title?: string;
    // 内容
    content?: string;
    // 时间
    time?: string;
}

/**
 * 代办数据格式
 */
export interface TodoModel {
    // 状态
    status?: number;
    // 标题
    title?: string;
    // 描述
    description?: string;
}
