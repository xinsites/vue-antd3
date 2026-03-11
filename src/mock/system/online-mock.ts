import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {QueryParam} from "xin-antd3-ui";
import {getPageData} from "@/mock/mock-util";

/**
 * 在线用户--分页查询
 */
Mock.mock(`${VITE_BASE_URL}/system/online/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(onlineList, params),
    };
});

/**
 * 在线用户--下线
 */
Mock.mock(`${VITE_BASE_URL}/system/online/kickout`, 'post', (options) => {
    const params = JSON.parse(options.body);
    if (Array.isArray(params)) {
        params.forEach((onlineId) => {
            const index = onlineList.findIndex((t) => t.onlineId == onlineId);
            if (index != -1) {
                onlineList.splice(index, 1);
            }
        });
    }

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

export const onlineList = [
    {
        "onlineId": "439e0bcba93c4159966863180f7fae1b",
        "clientKey": "f43af58fe3ab7e655ecd745993cec65d",
        "userId": 2,
        "userName": "管理员",
        "deptName": null,
        "ipAddress": "192.168.1.100",
        "loginLocation": "XX",
        "browser": "Chrome 12",
        "version": "126.0.0.0",
        "device": "Windows 10",
        "onlineStatus": "on_line",
        "startTimestamp": "2024-07-20 14:43:54",
        "lastAccessTime": "2024-07-20 22:55:17",
    },
    {
        "onlineId": "2f6133f3c4414588add13d80c139d19b",
        "clientKey": "ba020fb9bdc5fa0c66f640f5451f9493",
        "userId": 2,
        "userName": "管理员",
        "deptName": null,
        "ipAddress": "192.168.1.100",
        "loginLocation": "XX",
        "browser": "Firefox 12",
        "version": "128.0",
        "device": "Windows 10",
        "onlineStatus": "on_line",
        "startTimestamp": "2024-07-20 13:19:59",
        "lastAccessTime": "2024-07-20 22:54:01",
    },
];
