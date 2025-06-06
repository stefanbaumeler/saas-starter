import type { CodegenConfig } from '@graphql-codegen/cli'

const apiEslintRulesToDisable = [
    '@typescript-eslint/max-params',
    '@typescript-eslint/no-empty-object-type',
    '@typescript-eslint/no-explicit-any'
]

const webEslintRulesToDisable = [
    '@typescript-eslint/no-explicit-any'
]

const config: CodegenConfig = {
    schema: ['./libs/shared/schema/src/schema.gql'],
    watch: true,
    documents: ['**/*.gql'],
    overwrite: true,
    generates: {
        './libs/shared/schema/src/api.ts': {
            plugins: [
                'typescript',
                'typescript-resolvers',
                {
                    add: {
                        content: `/* eslint-disable ${apiEslintRulesToDisable.join(', ')} */`
                    }
                },
                {
                    add: {
                        content: `/* eslint-enable ${apiEslintRulesToDisable.join(', ')} */`,
                        placement: 'append'
                    }
                }
                // {
                //     add: {
                //         content: 'import { FileUpload } from \'graphql-upload-minimal\''
                //     }
                // }
            ],
            config: {
                scalars: {
                    Upload: 'Promise<FileUpload>'
                },
                preResolveTypes: false,
                useTypeImports: true,
                typesPrefix: 'T',
                addDocBlocks: true,
                dedupeFragments: true,
                omitOperationSuffix: true,
                avoidOptionals: true,
                maybeValue: 'T',
                withHooks: false,
                namingConvention: {
                    typeNames: 'pascal-case#pascalCase',
                    transformUnderscore: true
                }
            }
        },
        './libs/shared/schema/src/web.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-urql',
                {
                    add: {
                        content: `/* eslint-disable ${webEslintRulesToDisable.join(', ')} */`
                    }
                },
                {
                    add: {
                        content: `/* eslint-enable ${webEslintRulesToDisable.join(', ')} */`,
                        placement: 'append'
                    }
                }
                // {
                //     add: {
                //         content: 'import { FileUpload } from \'graphql-upload-minimal\''
                //     }
                // }
            ],
            config: {
                scalars: {
                    Upload: 'Promise<FileUpload>'
                },
                withMutationFn: true,
                preResolveTypes: false,
                useTypeImports: true,
                typesPrefix: 'T',
                addDocBlocks: true,
                dedupeFragments: true,
                omitOperationSuffix: true,
                avoidOptionals: true,
                maybeValue: 'T',
                withHooks: false,
                namingConvention: {
                    typeNames: 'pascal-case#pascalCase',
                    transformUnderscore: true
                }
            }
        }
    },
    hooks: {
        afterAllFileWrite: ['npx eslint --fix ./libs/shared/schema/src']
    }
}

export default config

