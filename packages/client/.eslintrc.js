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
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/no-unresolved': [2, { ignore: ['.png$', '.webp$', '.jpg$'] }],
    'import/prefer-default-export': 'off',
    'linebreak-style': 0,
  },
};
