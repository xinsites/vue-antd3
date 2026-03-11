import Mock from 'mockjs';
import {VITE_BASE_URL} from '@/config/common';
import {dateFormat, deepClone, parseQueryString, QueryParam, rowId} from "xin-antd3-ui";
import {getPageData} from "@/mock/mock-util";

/**
 * 定时任务--分页查询
 */
Mock.mock(`${VITE_BASE_URL}/system/qrtzjob/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(jobList, params),
    };
});

/**
 * 定时任务--新增
 */
Mock.mock(`${VITE_BASE_URL}/system/qrtzjob/add`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);
    newData.jobId = rowId(8, 1);
    newData.createTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    jobList.push(newData);
    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 定时任务--修改
 */
Mock.mock(`${VITE_BASE_URL}/system/qrtzjob/edit`, 'post', (options) => {
    const params = JSON.parse(options.body);
    const newData = deepClone(params);

    newData.updateTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    const job = jobList.find((t) => t.jobId == newData.jobId);
    if (job) {
        Object.assign(job, newData)
    }

    return {
        code: 0,
        message: '操作成功',
        data: newData,
    };
});

/**
 * 角色删除
 */
Mock.mock(`${VITE_BASE_URL}/system/qrtzjob/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    if (Array.isArray(params)) {
        params.forEach((jobId) => {
            const index = jobList.findIndex((t) => t.jobId == jobId);
            if (index != -1) {
                jobList.splice(index, 1);
            }
        });
    }

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

/**
 * 定时任务--详情
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/qrtzjob/detail` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = jobList.find((t) => t.jobId == params.jobId);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

/**
 * 定时任务--试运行
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/qrtzjob/try/run` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = jobList.find((t) => t.jobId == params.jobId);
    if (item) {
        item.runResult = '成功';
        item.lastRunTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    }
    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

/**
 * 定时任务日志--分页查询
 */
Mock.mock(`${VITE_BASE_URL}/system/qrtzjoblog/page`, 'post', (options) => {
    const params = JSON.parse(options.body) as QueryParam;
    return {
        code: 0,
        message: '操作成功',
        data: getPageData(jobLogList, params),
    };
});

/**
 * 定时任务日志--删除
 */
Mock.mock(`${VITE_BASE_URL}/system/qrtzjoblog/delete`, 'post', (options) => {
    const params = JSON.parse(options.body);
    jobLogList.splice(0, jobLogList.length);

    return {
        code: 0,
        message: '操作成功',
        data: null,
    };
});

/**
 * 定时任务日志--详情
 */
Mock.mock(RegExp(`${VITE_BASE_URL}/system/qrtzjoblog/detail` + ".*"), 'get', (options) => {
    const params = parseQueryString(options.url);
    const item = jobLogList.find((t) => t.logId == params.logId);

    return {
        code: item ? 0 : -1,
        message: item ? '操作成功' : '记录不存在！',
        data: item ? deepClone(item) : null,
    };
});

export const jobList = [
    {
        jobId: 1,
        jobName: 'Bean无参调用示例(异常)',
        invokeTarget: 'testJob.noParams',
        cronExpre: '0 0/5 * * * ? *',
        nextRunTime: '2021-08-05 11:40:00',
        lastRunTime: '2020-01-05 00:35:00',
        runResult: '失败',
        enableState: 1,
        issys: 1,
        remark: '',
        createTime: '2020-10-20 23:29:03',
        updateTime: '2023-02-06 09:06:40',
    },
    {
        jobId: 2,
        jobName: 'Bean有参调用示例',
        invokeTarget: 'testJob.moreParams(\'admin\', true, 2000l, 316.50d, 100)',
        cronExpre: '0 0/4 * * * ? *',
        nextRunTime: '2021-08-23 12:04:00',
        lastRunTime: '2021-08-23 12:00:00',
        runResult: '成功',
        enableState: 1,
        issys: 1,
        remark: '',
        createTime: '2019-10-21 16:44:41',
        updateTime: '2020-06-30 06:02:02',
    },
    {
        jobId: 3,
        jobName: 'Class类无参调用示例',
        invokeTarget: 'com.xinsite.core.quartz.cases.TestClassJob.noParams()',
        cronExpre: '0 0/6 * * * ? *',
        nextRunTime: '2021-08-05 11:36:00',
        lastRunTime: '2021-08-23 12:00:00',
        runResult: '失败',
        enableState: 1,
        issys: 0,
        remark: '',
        createTime: '2018-10-27 23:48:53',
        updateTime: '2021-07-24 01:14:49',
    },
    {
        jobId: 4,
        jobName: 'Class类有参调用示例',
        invokeTarget: 'testJob.noParams',
        cronExpre: '0 0/5 * * * ? *',
        nextRunTime: '2021-08-05 11:40:00',
        lastRunTime: '2021-08-23 12:00:00',
        runResult: '失败',
        enableState: 1,
        issys: 0,
        remark: '',
        createTime: '2018-10-27 23:48:53',
        updateTime: '2021-07-24 01:14:49',
    },
];

export const jobLogList = [
    {
        "logId": "2004053",
        "jobId": "2",
        "jobName": "Bean有参调用示例",
        "runTime": "2024-07-01 17:20:00",
        "runResult": "成功",
        "runLog": "Bean调用示例，多参测试，name=admin，boolean=true，long=2000，double=316.500000，int=100\n\n。总共耗时：0毫秒",
        "createTime": "2024-07-01 17:20:00",
    },
    {
        "logId": "2004051",
        "jobId": "3",
        "jobName": "Class类无参调用示例",
        "runTime": "2024-07-01 17:18:00",
        "runResult": "失败",
        "runLog": "异常日志：java.lang.ClassNotFoundException: com.xinsite.core.quartz.cases.TestClassJob",
        "createTime": "2024-07-01 17:18:00",
    },
    {
        "logId": "2004049",
        "jobId": "2",
        "jobName": "Bean有参调用示例",
        "runTime": "2024-07-01 17:16:00",
        "runResult": "成功",
        "runLog": "Bean调用示例，多参测试，name=admin，boolean=true，long=2000，double=316.500000，int=100\n\n。总共耗时：0毫秒",
        "createTime": "2024-07-01 17:16:00",
    },
    {
        "logId": "2004050",
        "jobId": "1",
        "jobName": "Bean无参调用示例(异常)",
        "runTime": "2024-07-01 17:16:00",
        "runResult": "失败",
        "runLog": "异常日志：java.lang.ClassNotFoundException: com.xinsite.core.quartz.cases.TestClassJob",
        "createTime": "2024-07-01 17:16:00",
    },
];
