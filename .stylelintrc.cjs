module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
    'stylelint-config-prettier',
  ],
  rules: {
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
