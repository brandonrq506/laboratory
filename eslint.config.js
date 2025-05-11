import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginQuery from "@tanstack/eslint-plugin-query";
import testingLibrary from "eslint-plugin-testing-library";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReactHooks from "eslint-plugin-react-hooks";
import reactCompiler from "eslint-plugin-react-compiler";
import reactRefresh from "eslint-plugin-react-refresh";
import jestDom from 'eslint-plugin-jest-dom';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...pluginQuery.configs["flat/recommended"],
  reactRefresh.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ...testingLibrary.configs["flat/react"],
  },
  {
    files: ["**/*.spec.{tsx,ts}"],
    ...jestDom.configs['flat/recommended'],
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "react-compiler": reactCompiler,
    },
  },
  {
    ignores: ["dist", "eslint.config.js", "html/**"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  eslintConfigPrettier,
  {
    rules: {
      "sort-imports": ["error", { allowSeparatedGroups: true }],
      "array-callback-return": "error",
      complexity: "warn",
      "default-case": "error",
      "default-case-last": "error",
      "default-param-last": "error",
      "dot-notation": "error",
      eqeqeq: "error",
      "logical-assignment-operators": "error",
      "line-comment-position": "error",
      "max-depth": "error",
      "max-lines": [
        "error",
        { max: 170, skipBlankLines: true, skipComments: true },
      ],
      "max-lines-per-function": [
        "error",
        { skipBlankLines: true, skipComments: true },
      ],
      "multiline-comment-style": ["error", "bare-block"],
      "no-await-in-loop": "error",
      "no-alert": "error",
      "no-duplicate-imports": "error",
      "no-else-return": "error",
      "no-implicit-coercion": "error",
      "no-lonely-if": "error",
      "no-magic-numbers": ["error", { ignore: [-1, 0, 1] }],
      "no-multi-assign": "error",
      "no-negated-condition": "error",
      "no-nested-ternary": "error",
      "no-return-assign": ["error", "always"],
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-throw-literal": "error",
      "no-undef-init": "error",
      "no-unmodified-loop-condition": "error",
      "no-unneeded-ternary": "error",
      "no-unreachable-loop": "error",
      "no-use-before-define": "error",
      "no-useless-computed-key": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "react-compiler/react-compiler": "error",
      "testing-library/no-debugging-utils": "error",
      "testing-library/prefer-user-event": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-promise-reject-errors": "error",
      "prefer-rest-params": "error",
      "prefer-template": "error",
      "require-await": "error",
      yoda: "error",
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
  {
    files: ["src/**/*.tsx"],
    rules: {
      "max-lines-per-function": [
        "error",
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    files: ["tailwind.config.js"],
    rules: {
      "no-restricted-exports": "off",
    },
  },
  {
    files: ["**/*.spec.{tsx,ts}"],
    rules: {
      "max-lines-per-function": [
        "error",
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
      "no-magic-numbers": "off",
    },
  },
];
