import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: [
      ".eslintrc.js",
      "build/*",
      "node_modules/*",
      "**/*.{css,json,png,avif,webp,jpeg,jpg,sql,svg,sh,scss,html}"
    ],
    languageOptions: {
      globals: { ...globals.browser },
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: pluginReact,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y
    },
    extends: [
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
    ],
    rules: {
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-floating-promises": "off",
      "react/react-in-jsx-scope": "off",
      "curly": "error",
      "prefer-const": "off",
      "max-lines": ["warn", 500],
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "no-unused-vars": "off",
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@mui/material/Tabs",
              message: "Import Tabs from @cgi-retailsuite/core-frontend instead of MUI.",
            },
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "typeLike",
          format: ["PascalCase"],
          custom: {
            regex: "^[A-Z][A-Z]",
            match: false,
          },
        },
        {
          selector: ["variableLike", "classProperty"],
          leadingUnderscore: "allow",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },
        {
          selector: ["method"],
          format: ["camelCase"],
        },
        {
          selector: "typeProperty",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },
      ],
    }
  }
];
