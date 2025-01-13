import eslintPluginReact from 'eslint-plugin-react';

export default {
  languageOptions: {
    globals: {
      browser: true,
      es2021: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: {
    react: eslintPluginReact,
  },
  rules: {
    'react/prop-types': 'off', // If you are not using prop-types
    'no-console': 'warn', // Warn about console logs
    'no-unused-vars': 'warn', // Warn about unused variables
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
};
