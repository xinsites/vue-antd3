//静态数据字典--测试用例
export const demoStaticDict = {
    STATIC_TEST_TREE: [
        {id: 1, value: 1, label: '品质部1'},
        {
            id: 2,
            value: 2,
            label: '品质部2',
            children: [
                {value: 21, label: '销售部1', type: 2},
                {value: 22, label: '销售部2'},
            ],
        },
        {id: 3, value: 3, label: '其他部门'},
    ],
    STATIC_TEST_LIST: [
        {value: 0, label: '转账支付'},
        {value: 1, label: '现金', type: 2},
        {value: 2, label: '支票'},
        {value: 3, label: '网银支付'},
        {value: 4, label: '其他'},
    ], // 付款方式
    STATIC_DEMO_FORM_TYPE: [
        {value: 1, label: '液化气'},
        {value: 2, label: '天然气'},
        {value: 3, label: '器具'},
        {value: 4, label: '集中供热'},
    ], //表单示例--分类
    STATIC_DEMO_FORM_MEDIA: [
        {value: 1, label: '文字'},
        {value: 2, label: '图片'},
        {value: 3, label: '视频'},
    ], //表单示例--媒体类型
    STATIC_DEMO_PERIOD: [
        {value: '1', label: '一周'},
        {value: '2', label: '一个月'},
        {value: '3', label: '半年'},
        {value: '4', label: '一年'},
    ], //表单示例--履行周期
    STATIC_DEMO_TYPE: [
        {value: '1', label: '购置费'},
        {value: '2', label: '维修费'},
    ], //表单示例--分类
    STATIC_INPUT_TYPE: [
        {value: 'textfield', label: '文本输入框'},
        {value: 'numberfield', label: '数值输入框'},
        {value: 'singlecombobox', label: '下拉单选框'},
        {value: 'multicombobox', label: '下拉多选框'},
        {value: 'treepicker', label: '下拉树选择框'},
        {value: 'datefield', label: '日期输入框'},
    ], //表单示例--输入框类型
    STATIC_APPLY_USER: [
        {value: 'zongjingli', label: '总经理'},
        {value: 'zongjian', label: '总监'},
        {value: 'jingli', label: '经理'},
        {value: 'zhuguan', label: '主管'},
        {value: 'banshiyuan', label: '办事员'},
    ], //表单示例--输入框类型
    STATIC_ITEM_TYPE: [
        {value: '1', label: '审批类'},
        {value: '2', label: '服务类'},
    ], //表单示例--事项类型
    STATIC_SECTOR_TYPE: [
        {value: '1', label: '高级'},
        {value: '2', label: '中级'},
        {value: '3', label: '初级'},
    ], //表单示例--行业类别
    STATIC_HANDLE_LABEL: [
        {value: '1', label: '全市通办'},
        {value: '2', label: '支持网上支付'},
        {value: '3', label: '支持网上办理'},
    ], //表单示例--办理标签
    STATIC_TRAFFIC: [
        {value: '1', label: '大巴'},
        {value: '2', label: '火车'},
        {value: '3', label: '飞机'},
        {value: '4', label: '自驾车'},
    ], //表单示例--交通工具
};
