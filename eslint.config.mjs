import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  // Build output and dependencies
  { ignores: ["dist/**", "coverage/**", "node_modules/**"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Browser-ish globals for app + Vite config
  {
    files: ["src/**/*.{ts,tsx}", "*.{ts,mjs}", "vite.config.ts", "vitest.config.ts"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // React + JSX (jsx-runtime: no `React` import). Hooks: rules-of-hooks + exhaustive-deps only
  // (plugin v7 `configs.flat.recommended` also enables React Compiler migration rules — skipped here)
  {
    files: ["src/**/*.{jsx,tsx}"],
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    plugins: { "react-hooks": reactHooks },
    settings: { react: { version: "detect" } },
    rules: {
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Unused names: `_` prefix for intentionally unused params/locals
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
);
