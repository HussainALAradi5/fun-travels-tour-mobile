// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    // Enums are a `const` object plus a same-named union type, which TypeScript merges by design.
    files: ['src/enums/**/*.ts'],
    rules: { '@typescript-eslint/no-redeclare': 'off' },
  },
]);
