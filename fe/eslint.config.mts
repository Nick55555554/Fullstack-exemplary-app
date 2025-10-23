import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        extends: [js.configs.recommended],
        settings: {
            'import/resolver': {
                alias: {
                    map: [
                        ['@/store', './src/store'],
                        ['@/pages', './src/pages'],
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
            '@typescript-eslint/object-curly-spacing': 'off',
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
]);
