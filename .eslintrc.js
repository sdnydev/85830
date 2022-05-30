const prettierConfig = require('./.prettierrc.js');

/**
 * See: https://github.com/microsoft/vscode-eslint/issues/124#issuecomment-609360052
 * @type {import("eslint").Linter.Config}
 */
const config = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  ignorePatterns: ['**/*spec.ts'],
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'prettier/prettier': ['error', prettierConfig],
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      env: {
        es6: true,
        jest: true,
        node: true,
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './packages/apps/**/tsconfig.json', './packages/libs/**/tsconfig.json'],
      },
      plugins: ['@typescript-eslint', 'prettier'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/no-unsafe-argument': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        'prettier/prettier': ['error', prettierConfig],
      },
    },
  ],
};

module.exports = config;
