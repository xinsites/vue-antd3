//我的待办、我的已办、我的申请、我的抄送列表
export const flowColumns = [
    {
        title: '序号',
        fixed: 'left',
        width: 60,
        align: 'center',
        customRender: ({pageIndex, index}) => (pageIndex ?? 1) + index,
    },
    {
        title: '审批内容',
        ellipsis: true,
        dataIndex: 'title',
        customRender: ({index, record}) => `【${record.taskType}_${record.taskNo}】${record.title}`,
    },
    {
        title: '申请日期',
        width: 160,
        dataIndex: 'createTime',
    },
    {
        title: '申请人',
        width: 110,
        align: 'center',
        dataIndex: 'userText',
    },
    {
        title: '状态',
        width: 90,
        dataIndex: 'taskStatusText',
    },
    {
        title: '当前位置',
        width: 140,
        dataIndex: 'position',
    },
    {
        title: '操作',
        width: 80,
        align: 'center',
        fixed: 'right',
        settingDisabled: true,
        dataIndex: 'operation',
    },
];

//我的邮件列表
export const mailColumns = [
    {
        title: '序号',
        fixed: 'left',
        width: 60,
        align: 'center',
        customRender: ({pageIndex, index}) => (pageIndex ?? 1) + index,
    },
    {
        title: '邮件标题',
        ellipsis: true,
        dataIndex: 'title',
    },
    {
        title: '发送时间',
        width: 160,
        align: 'center',
        dataIndex: 'time',
    },
    {
        title: '状态',
        width: 90,
        dataIndex: 'status',
        align: 'center',
    },
    {
        title: '操作',
        width: 120,
        align: 'center',
        fixed: 'right',
        settingDisabled: true,
        dataIndex: 'operation',
    },
];

//系统通知列表
export const noticeColumns = [
    {
        title: '序号',
        fixed: 'left',
        width: 60,
        align: 'center',
        customRender: ({pageIndex, index}) => (pageIndex ?? 1) + index,
    },
    {
        title: '通知标题',
        ellipsis: true,
        dataIndex: 'title',
    },
    {
        title: '发送时间',
        width: 160,
        align: 'center',
        dataIndex: 'time',
    },
    {
        title: '状态',
        width: 90,
        dataIndex: 'status',
        align: 'center',
    },
    {
        title: '操作',
        width: 120,
        align: 'center',
        fixed: 'right',
        settingDisabled: true,
        dataIndex: 'operation',
    },
];
