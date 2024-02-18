module.exports = {
  root: true,
  env: { browser: false, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@saritasa/eslint-config-saritasa',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    'linebreak-style': 'off',
    'naming-convention': 'off'
  },
}
