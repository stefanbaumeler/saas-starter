import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'

import baseConfig from '../../eslint.config.mjs'
import { defineConfig } from 'eslint/config'
import nx from '@nx/eslint-plugin'

export default defineConfig([
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            react: reactPlugin,
            'react-hooks': hooksPlugin,
            '@next/next': nextPlugin
        },
        rules: {
            ...reactPlugin.configs['jsx-runtime'].rules,
            ...hooksPlugin.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,
            '@next/next/no-img-element': 'error',
            'react/self-closing-comp': 'error',
            'react/jsx-closing-bracket-location': ['error', {
                location: 'line-aligned'
            }],
            'react/jsx-max-props-per-line': ['error', {
                maximum: 1
            }],
            'react/jsx-first-prop-new-line': 'error',
            'react/jsx-one-expression-per-line': 'error',
            'react/jsx-tag-spacing': ['error', {
                beforeSelfClosing: 'always'
            }]
        }
    },
    ...baseConfig,
    ...nx.configs['flat/react-typescript']
])
