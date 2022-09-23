module.exports = {
  env: {
    es2020: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', 'jest', 'import-helpers'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // Prettier identifica e retorna erro no eslint
    'class-methods-use-this': 'off', // Permite classes não usar o this
    'no-param-reassign': 'off', // Permite receber e alterar parametros
    camelcase: 'off', // Permite utilizar _ no nome de variáveis
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }], // Der erro apenas se, ignore next do middleware
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: ['/^express/', 'module', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
