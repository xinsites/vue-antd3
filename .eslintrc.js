module.exports = {
  root: true, // 停止在父级目录中寻找
  // 指定环境全局变量，下面的配置指定为浏览器环境
  env: {
    browser: true, //指定为浏览器环境
    node: true, // Node.js 全局变量和 Node.js 作用域
    es6: true, //启用 ES6 语法支持以及新的 ES6 全局变量或类型
  },
  parser: 'vue-eslint-parser', //指定eslint解析器，解析器必须符合规则
  //指定javaScript语言类型和风格
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module', //指定js导入方式，默认是script，此处设置为module
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'], //提供的插件
  //配置标准js风格
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier', // 避免vue 与 prettier冲突
    // 'plugin:prettier/recommended', //prettier规则覆盖与eslint冲突的规则，注意放在最后面，【放开后，保存时(ctrl+s)链式代码自动换行】
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    // "off"或者0    //关闭规则关闭
    // "warn"或者1    //在打开的规则作为警告（不影响退出代码）
    // "error"或者2    //把规则作为一个错误（退出代码触发时为1）
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // semi: ["warn", "always"], // 代码结尾加分号
    // quotes: [1, "double"], // 只使用双引号
    'comma-dangle': ['error', 'only-multiline'], //仅多行,结束或属性位于不同的行时，允许（但不要求）尾随逗号;结束或属性位于同行时，不允许尾随逗号
    'no-use-before-define': 'off', // 未定义前不能使用
    '@typescript-eslint/no-use-before-define': 'off', // 未定义前不能使用
    '@typescript-eslint/ban-ts-ignore': 'off', // 允许使用ts-ignore
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型时的警告
    '@typescript-eslint/no-var-requires': 'off', // 关闭var变量声明
    '@typescript-eslint/no-empty-function': 'off', // 关闭空函数警告
    '@typescript-eslint/ban-ts-comment': 'off', // 关闭 忽略
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off', //关闭non-null断言
    '@typescript-eslint/explicit-module-boundary-types': 'off', //关闭函数返回类型
    // "@typescript-eslint/no-unused-vars": "off",   //关闭当声明了变量而未使用时出现的警告
    'no-unused-vars': [1, { vars: 'all', args: 'after-used' }], //警告有声明后未被使用的变量或参数
    'space-before-function-paren': 'off', //函数定义时括号前面要不要有空格

    // vue相关
    // 'vue/no-reserved-component-names': 'off', //不允许在组件定义中使用保留名称
    'vue/custom-event-name-casing': 'off', //关闭,强制自定义事件名称始终使用kebab-case(短横线命名)
    'vue/script-setup-uses-vars': 'error', //如果使用 script-setup可开启
    'vue/attributes-order': 'off', // class方法等顺序问题
    'vue/one-component-per-file': 'off', //关闭,强制每个组件都应该在单独的文件中
    'vue/html-closing-bracket-newline': 'off', //关闭,要求或不允许在标记的结束括号之前有换行符
    'vue/max-attributes-per-line': 'off', //关闭,强制执行每行的最大属性数
    'vue/multiline-html-element-content-newline': 'off', //关闭,在多行元素的内容之前和之后需要换行
    'vue/singleline-html-element-content-newline': 'off', //关闭,在单行元素的内容之前和之后需要换行
    'vue/attribute-hyphenation': 'off', //关闭,在模板中的自定义组件上执行属性命名样式
    'vue/require-default-prop': 'off', //关闭,props需要默认值
    'vue/comment-directive': 'off', //关闭,支持< template >中的注释指令
    'vue/html-self-closing': [
      //报错,执行自闭的风格
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/v-on-event-hyphenation': 'off', //关闭事件命名样式需要用连字符
    'vue/multi-word-component-names': 'off', //禁止文件命名语法检测
  },
};
