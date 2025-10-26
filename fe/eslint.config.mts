import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import {defineConfig} from 'eslint/config';

//TODO: configure lib without styles
const i18nJsonPlugin = require('eslint-plugin-i18n-json');

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        extends: [
            js.configs.recommended,
            'plugin:react/recommended',
            'plugin:react-i18next/recommended',
        ],
        settings: {
            'import/resolver': {
                alias: {
                    map: [
                        ['@/store', './src/store'],
                        ['@/todos', './src/units/todos'],
                        ['@/users', './src/units/users'],
                        ['@/typings', './src/typings'],
                        ['@/utils', './src/utils'],
                        ['@/shared', './src/shared'],
                    ],
                    extensions: ['.ts', '.tsx', '.js', '.jsx'],
                },
            },
        },
        languageOptions: {
            globals: {...globals.browser, ...globals.node, ...globals.jest},
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            prettier: eslintPluginPrettier,
            import: eslintPluginImport,
        },
        rules: {
            'prettier/prettier': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            'prefer-const': 'error',
            'no-console': 'warn',
            'no-unneeded-ternary': 'warn',
            'no-nested-ternary': 'warn',
            'comma-dangle': ['error', 'never'],

            'import/order': [
                'warn',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'always',
                    alphabetize: {order: 'asc'},
                },
            ],
        },
    },
    {
        files: ['**/*.{jsx,tsx}'],
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-uses-react': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/jsx-key': 'error',
            'object-curly-spacing': 'off',
            '@typescript-eslint/object-curly-spacing': 'warn',
            'react/jsx-no-useless-fragment': 'warn',
        },
    },
    {
        files: ['**/webpack.config.js', '**/*.config.*', '**/scripts/**'],
        rules: {
            'no-console': 'off',
            '@typescript-eslint/no-var-requires': 'off',
        },
    },
    {
        files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**'],
        rules: {
            'no-console': 'off',
            'no-nested-ternary': 'off',
        },
    },
    {
        files: ['**/*.json'],
        plugins: {
            'i18n-json': i18nJsonPlugin,
        },
        rules: {
            'i18n-json/valid-message-syntax': [2, {syntax: 'icu'}],
            'i18n-json/valid-json': 2,
            'i18n-json/sorted-keys': [2, {order: 'asc', indentSpaces: 2}],
            'i18n-json/identical-keys': 0,
            'i18n-json/identical-placeholders': 0,
        },
    },
]);
