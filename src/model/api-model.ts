/**
 * 接口统一返回结果
 */
export interface ApiResult<T> {
    code: number; // 状态码
    message?: string; // 状态信息
    data?: T; // 返回数据
}

/**
 * 分页查询统一返回结果
 */
export interface PageResult<T> {
    code: number; // 状态码
    message?: string; // 状态信息
    data?: {
        list: T[]; // 返回数据
        total: number; // 总数量
    };
}
