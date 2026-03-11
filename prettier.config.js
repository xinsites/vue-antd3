module.exports = {
  tabWidth: 2, // 使用2个空格缩进
  semi: true, // 代码结尾是否加分号
  trailingComma: 'all', // 代码末尾需要逗号
  formatOnSave: true, // 自动格式化代码
  printWidth: 160, // 超过多少字符强制换行
  proseWrap: 'never', // 超过时不换行[对一行字符数超过printWidth的文本换行 （仅对markdown文件有效）]
  //配置 html 的 parser
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html',
      },
    },
  ],
  vueIndentScriptAndStyle: true, //vue文件的script标签和Style标签下的内容是否需要缩进
  singleQuote: true, // 是否使用单引号
  jsxSingleQuote: false, // jsx不使用单引号,而使用双引号

  htmlWhitespaceSensitivity: 'strict', //根据显示样式决定html要不要折行
  endOfLine: 'auto', // 文件换行符类型
};
