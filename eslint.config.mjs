import nx from '@nx/eslint-plugin'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import stylistic from '@stylistic/eslint-plugin'
import tsEslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import eslintPluginJsonc from 'eslint-plugin-jsonc'
import graphqlPlugin from '@graphql-eslint/eslint-plugin'
import preferArrow from 'eslint-plugin-prefer-arrow'
import reactCompiler from 'eslint-plugin-react-compiler'

export default defineConfig([
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    reactCompiler.configs.recommended,
    ...eslintPluginJsonc.configs['flat/recommended-with-json'],
    {
        ignores: [
            'node_modules',
            '**/dist',
            '**/public',
            '.nx',
            '**/.next',
            '**/out-tsc'
        ]
    },
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.js',
            '**/*.jsx'
        ],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: [
                        '^.*/eslint(\\.base)?\\.config\\.[cm]?js$'
                    ],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: [
                                '*'
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        files: ['**/*.json'],
        ignores: ['package-lock.json'],
        rules: {
            'jsonc/auto': 'error',
            'jsonc/indent': ['error',
                4,
                {}]
        }
    },
    {
        files: ['**/*.gql', '**/*.graphql'],
        languageOptions: {
            parser: graphqlPlugin.parser
        },
        plugins: {
            '@graphql-eslint': graphqlPlugin
        }
    },
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.js',
            '**/*.jsx',
            '**/*.mjs',
            '**/*.cjs',
            '**/*.cts',
            '**/*.mts'
        ],
        plugins: {
            '@stylistic': stylistic,
            '@stylistic/ts': stylisticTs,
            '@typescript-eslint': tsEslint.plugin,
            'prefer-arrow': preferArrow
        },
        rules: {
            'func-style': ['error', 'expression'],
            'prefer-arrow-callback': 'error',
            'prefer-arrow/prefer-arrow-functions': [
                'error', {
                    disallowPrototype: true,
                    singleReturnOnly: true,
                    classPropertiesAllowed: false
                }
            ],
            'no-undef': 'off',
            'no-var': 'error',
            'no-alert': 'error',
            'no-const-assign': 'error',
            'no-useless-return': 'error',
            'no-self-compare': 'error',
            'no-self-assign': 'error',
            'no-multi-assign': 'error',
            'no-duplicate-imports': 'error',
            'no-nested-ternary': 'error',
            'comma-spacing': 'error',
            'comma-dangle': 'error',
            'arrow-spacing': 'error',
            'arrow-parens': 'error',
            curly: 'error',
            'prefer-object-spread': 'error',
            'object-shorthand': 'error',
            eqeqeq: 'error',
            quotes: ['error', 'single'],
            'prefer-template': 'error',
            'no-console': ['warn', {
                allow: ['warn', 'error']
            }],
            'no-restricted-syntax': ['error',
                {
                    message: 'Do not import default from lodash-es. Use a namespace import (* as) instead.',
                    selector: 'ImportDeclaration[source.value="lodash-es"] ImportDefaultSpecifier'
                }],
            'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            indent: 'off',
            '@stylistic/computed-property-spacing': ['error', 'never'],
            '@stylistic/dot-location': ['error', 'property'],
            '@stylistic/padded-blocks': ['error', 'never'],
            '@stylistic/array-bracket-newline': ['error', 'consistent'],
            '@stylistic/array-element-newline': ['error', 'consistent'],
            '@stylistic/no-multi-spaces': 'error',
            '@stylistic/no-whitespace-before-property': 'error',
            '@stylistic/array-bracket-spacing': ['error', 'never'],
            '@stylistic/template-curly-spacing': ['error', 'never'],
            '@stylistic/max-statements-per-line': 'error',
            '@stylistic/no-multiple-empty-lines': ['error', {
                max: 1
            }],
            '@stylistic/no-trailing-spaces': ['error', {
                skipBlankLines: true
            }],
            '@stylistic/function-paren-newline': ['error', 'multiline'],
            '@stylistic/curly-newline': ['error', 'always'],
            '@stylistic/ts/indent': ['error', 4, {
                SwitchCase: 1
            }],
            '@stylistic/ts/quote-props': ['error', 'as-needed'],
            '@stylistic/ts/no-extra-parens': 'error',
            '@stylistic/ts/space-infix-ops': 'error',
            '@stylistic/ts/keyword-spacing': 'error',
            '@stylistic/ts/key-spacing': 'error',
            '@stylistic/ts/function-call-spacing': 'error',
            '@stylistic/ts/space-before-blocks': 'error',
            '@stylistic/ts/object-property-newline': 'error',
            '@stylistic/ts/semi': ['error', 'never'],
            '@stylistic/ts/space-before-function-paren': ['error', {
                anonymous: 'never',
                named: 'always',
                asyncArrow: 'always'
            }],
            '@stylistic/ts/object-curly-spacing': ['error', 'always'],
            '@stylistic/ts/object-curly-newline': ['error', {
                ObjectExpression: {
                    minProperties: 1
                },
                ObjectPattern: {
                    minProperties: 1
                },
                ImportDeclaration: 'never',
                ExportDeclaration: 'never'
            }],
            '@stylistic/ts/member-delimiter-style': ['error', {
                multiline: {
                    delimiter: 'none',
                    requireLast: false
                },
                singleline: {
                    delimiter: 'comma',
                    requireLast: false
                }
            }],
            '@stylistic/ts/type-annotation-spacing': ['error', {
                before: false,
                after: true,
                overrides: {
                    arrow: {
                        before: true,
                        after: true
                    }
                }
            }],
            '@stylistic/ts/padding-line-between-statements': ['warn',
                {
                    blankLine: 'always',
                    prev: ['multiline-const', 'multiline-block-like', 'multiline-expression'],
                    next: '*'
                },
                {
                    blankLine: 'always',
                    prev: '*',
                    next: ['block-like', 'return']
                }],
            '@typescript-eslint/no-redeclare': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/array-type': ['error', {
                default: 'array'
            }],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error', {
                ignoreRestSiblings: true,
                caughtErrors: 'none'
            }],
            'max-params': 'off',
            '@typescript-eslint/no-explicit-any': 'error'
        }
    }
])
