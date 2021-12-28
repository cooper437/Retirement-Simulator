module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true,
    'jest/globals': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:react-hooks/recommended',
    'plugin:import/warnings',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@babel', 'jest', 'prettier'],
  ignorePatterns: ['/src/cronGenerator/*.js', '/src/serviceWorker.js'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'comma-dangle': ['error', 'never'],
    'react/jsx-props-no-spreading': ['off'],
    'react/prop-types': ['off'],
    'no-unused-vars': ['warn'],
    'linebreak-style': ['error', 'unix'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'function-expression'
      }
    ]
  }
};
