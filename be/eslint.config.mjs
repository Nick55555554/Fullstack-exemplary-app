import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import stylistic from '@stylistic/eslint-plugin';

const baseConfig = tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      '@stylistic': stylistic,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-const': 'error',
      'no-console': 'warn',


      '@stylistic/object-curly-spacing': ['warn', 'never'],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  }
);

const testConfig = tseslint.config(
  {
    files: ['**/*.e2e-spec.ts', '**/*.test.ts'],
  }
);

export default [...baseConfig, ...testConfig];