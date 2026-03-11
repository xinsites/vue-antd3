import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {deepClone, parseQueryString} from "xin-antd3-ui";
import {enumList} from "@/mock/common/dict-mock";

/**
 * 枚举数据源--列表全部加载
 */
Mock.mock(`${VITE_BASE_URL}/system/dict/enum/list`, 'post', (options) => {
    const params = JSON.parse(options.body);
    return {
        code: 0,
        message: 'success',
        data: deepClone(enumList),
    };
});




