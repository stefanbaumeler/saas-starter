import { CreateNodesV2 } from '@nx/devkit'
import lint from './targets/lint'
import lintFix from './targets/lint-fix'

export const createNodesV2: CreateNodesV2 = [
    'libs/*/*/*/index.ts',
    (indexPathList) => {
        return indexPathList.map((indexPath) => {
            const [libs, scope, library] = indexPath.split('/')

            return [
                indexPath,
                {
                    projects: {
                        [`${libs}/${scope}/${library}`]: {
                            name: `@saas-starter/${library}`,
                            sourceRoot: '{projectRoot}',
                            projectType: 'library',
                            tags: [`scope:${scope}`, `library:${library}`],
                            targets: {
                                ...lint,
                                ...lintFix,
                                build: {
                                    executor: 'nx:run-commands',
                                    cache: true,
                                    inputs: [
                                        '{workspaceRoot}/tsconfig.json',
                                        '{workspaceRoot}/tsconfig.base.json',
                                        '{workspaceRoot}/tsconfig.lib.json',
                                        '{projectRoot}/src/**'
                                    ],
                                    options: {
                                        command: 'tsc --build',
                                        cwd: '{projectRoot}'
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        })
    }
]
