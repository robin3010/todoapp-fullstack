import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import tailwindcss from 'eslint-plugin-tailwindcss'
import stylistic from '@stylistic/eslint-plugin'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  stylistic.configs.recommended,
  tailwindcss.configs['flat/recommended'],
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@stylistic': stylistic,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // settings: {
    //   tailwindcss: {
    //     config: 'client/src/index.css',
    //   },
    // },
    rules: {
      '@stylistic/max-len': ['error', { code: 120, ignorePattern: 'className=\\{?[`"].*[`"]\\}?' }],
      'tailwindcss/no-custom-classname': ['warn', { whitelist: ['font\\-noto', 'fa\\-.*'] }],

    },
  },
])
