import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,mts,cts}'],

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'error',
      'preserve-caught-error': 'off',
    },
  },
])
