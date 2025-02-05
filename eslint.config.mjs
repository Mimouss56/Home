import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import { configs } from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "react/prop-types": "off",
      'react/react-in-jsx-scope': 'off',
      "react/jsx-props-no-spreading": "off",
      "react/jsx-filename-extension": [
        2,
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      "linebreak-style": 0,
      "no-restricted-imports": "error",
      "no-unused-vars": "error",
    },
  },
  pluginJs.configs.recommended,
  configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginPrettierRecommended,
];
