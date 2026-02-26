import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/coverage/**',
    '**/.expo/**',
    '**/.next/**',
    '**/android/.gradle/**',
    '**/android/app/build/**',
  ]),
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: [
      '**/*.config.{js,cjs,mjs}',
      '**/react-native.config.js',
      '**/metro.config.js',
      '**/babel.config.js',
    ],
    languageOptions: {
      globals: globals.node,
      sourceType: 'commonjs',
    },
  },
])
