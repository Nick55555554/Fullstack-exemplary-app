import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import {defineConfig} from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        plugins: {js},
        extends: ["js/recommended"],
        settings: {
            "import/resolver": {
                alias: {
                    map: [
                        ["@", "./src"],
                        ["@pages", "./src/ui/pages"],
                    ],
                    extensions: [".ts", ".tsx", ".js", ".jsx"],
                },
            },
        },
        languageOptions: {
            globals: {...globals.browser, ...globals.node, ...globals.jest},
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/explicit-function-return-type": "warn",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-argument": "error",
            "prefer-const": "error",
            "no-console": "warn",
        },
    },
    {
        files: ["**/*.{jsx,tsx}"],
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/jsx-uses-react": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react/jsx-key": "error",
            "react/jsx-no-dsuplicate-props": "error",
            "object-curly-spacing": ["warn", "never"],
            "@typescript-eslint/object-curly-spacing": ["warn", "never"],
            "import/no-cycle": "error",
        },
    },
    {
        files: ["**/webpack.config.js", "**/*.config.*", "**/scripts/**"],
        rules: {
            "no-console": "off",
            "@typescript-eslint/no-var-requires": "off",
        },
    },
    {
        files: ["**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**"],
        rules: {
            "no-console": "off",
        },
    },
]);
