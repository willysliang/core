module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'scss/at-function-pattern': null, // 函数名不限制短横线命名，可以驼峰命名
    'scss/percent-placeholder-pattern': null, // 占位选择器不限制短横线命名，可以驼峰命名
    'scss/at-mixin-pattern': null, // mxin不限制短横线命名，可以驼峰命名
    'scss/no-global-function-names': null, // 忽略 mix 等公共函数名的调用
    'function-no-unknown': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'for',
          'each',
          'include',
          'mixin',
          'else',
          'return',
        ],
      },
    ],
    'no-empty-source': null,
    'string-quotes': null,
    'named-grid-areas-no-invalid': null,
    'unicode-bom': 'never',
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
    indentation: 'tab',
    'declaration-empty-line-before': 'never',
    'block-closing-brace-empty-line-before': 'never',
    'max-empty-lines': 1,
    'block-no-empty': true,
    'no-invalid-double-slash-comments': true,
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
      extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-prettier-scss',
      ],
    },
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
      extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-prettier-scss',
      ],
    },
  ],
}
