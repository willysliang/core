module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
  },
  extends: [
    // 'standard-with-typescript',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    // 'plugin:vue/recommended',
    // 'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  overrides: [],
  // parser: 'vue-eslint-parser',
  // parserOptions: {
  //   ecmaVersion: 'latest',
  //   sourceType: 'module',
  //   project: './tsconfig.json',
  //   parser: '@typescript-eslint/parser',
  // },
  plugins: ['vue'],
  globals: {
    document: false,
    navigator: false,
    window: false,
  },
  rules: {
    'eslint-disable-next-line': 0,
    'eslint-disable': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'comma-dangle': ['off', 'always'],
    quotes: 'off',
    semi: 'off',
    'no-tabs': 0,
    '@typescript-eslint/no-explicit-any': ['off'],
    'vue/no-v-html': 'off', // 关闭 v-html 的校验
    'no-extend-native': 'off', // 原型中可添加属性
    'func-call-spacing': 'off', // 函数存在意外空格
    'space-before-function-paren': 'off',
    '@typescript-eslint/triple-slash-reference': 'off', // 引用路径
    '@typescript-eslint/no-non-null-assertion': 'off', // 可使用断言
    // '@typescript-eslint/no-var-requires': 'off', // 可使用 require
    'no-use-before-define': ['error', { classes: false }], // class可以在定义之前使用变量（防止引用自身报错）
    'prefer-promise-reject-errors': 'off',
    'no-async-promise-executor': 'off',
  },
}
