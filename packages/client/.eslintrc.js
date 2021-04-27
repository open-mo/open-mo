module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      parcel2: {
        root: ['./src'],
      },
    },
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {},
};
