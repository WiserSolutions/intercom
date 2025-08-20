// ESLint 9 flat config bridging existing eslintrc shareable config
// See: https://eslint.org/docs/latest/use/configure/migration-guide
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname,
  // Provide mapping for "eslint:recommended" used by ESLintRC configs
  recommendedConfig: js.configs.recommended,
});

export default [
  // Bridge your existing shareable config "@wisersolutions" (eslintrc format)
  ...compat.extends('@wisersolutions'),

  // Project-specific settings previously in .eslintrc
  ...compat.config({
    env: {
      browser: true,
    },
  }),

  // Ignore build outputs and deps
  {
    ignores: ['lib/**', 'es/**', 'node_modules/**'],
  },
];
