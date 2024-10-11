import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

const reactRules = react.configs.recommended.rules;
delete reactRules['react/display-name'];
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
      'react-hooks/exhaustive-deps': ['off'],
      'react/no-unknown-property': 'off',
      'react-hooks/rules-of-hooks': 'off',
      '@typescript-eslint/no-unused-vars': ['off'],
      'no-sparse-arrays': ['off'],
      '@typescript-eslint/no-non-null-asserted-optional-chain': ['off'],
      '@typescript-eslint/no-unnecessary-type-assertion': ['off'],
      '@typescript-eslint/no-unused-expressions': ['off'],
      '@typescript-eslint/no-unsafe-enum-comparison': ['off'],
    },
  }
);
