/* eslint-env node */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname
  },
  plugins: [
    'react',
    'react-refresh',
    'import',
    'eslint-plugin-import-helpers',
    'react-hooks'
  ],
  rules: {
    'max-len': ['warn', { code: 80 }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    semi: 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0 }],
    'array-bracket-spacing': [
      'error',
      'always',
      { objectsInArrays: false, singleValue: false }
    ],
    'arrow-spacing': ['error', { before: true, after: true }],
    quotes: ['error', 'single'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'arrow-parens': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'no-unused-vars': 'warn',
    'no-unsafe-call': 'off',
    'no-unsafe-member-access': 'off',
    'no-unsafe-assignment': 'off',
    'no-whitespace-before-property': 'warn',
    'no-trailing-spaces': 'warn',
    'no-multiple-empty-lines': ['warn', { max: 1, maxBOF: 0 }],

    // Import helpers
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/^react/',
          '/^styles/',
          'module',
          '/^@shared/',
          ['parent', 'sibling', 'index']
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true
        }
      }
    ]
  }
};
