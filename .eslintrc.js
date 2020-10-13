module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript'],
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'arrow-parens': ['warn', 'as-needed'],
    'no-console': 'off',
    'import/order': 'off'
  }
};
