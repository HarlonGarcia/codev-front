/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'semi': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0 }],
    'array-bracket-spacing': ['error', 'always', { 'objectsInArrays': false, 'singleValue': false }],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'quotes': ['error', 'single'],
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    'arrow-parens': [
      'error',
      'always'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'no-unused-vars': 'warn',
    'no-unsafe-call': 'off',
    'no-unsafe-member-access': 'off',
    'no-unsafe-assignment': 'off',
  },
}
