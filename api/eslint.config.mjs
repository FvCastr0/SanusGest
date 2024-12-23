import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  {
    rules: [
      '@typescript-eslint/no-unused-vars': 0
    ]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
