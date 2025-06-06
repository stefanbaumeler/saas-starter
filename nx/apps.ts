import { CreateNodesV2 } from '@nx/devkit'
import lint from './targets/lint'
import lintFix from './targets/lint-fix'

export const createNodesV2: CreateNodesV2 = [
    'apps/*/package.json',
    (indexPathList) => {
        return indexPathList.map((indexPath) => {
            const [apps, app] = indexPath.split('/')

            return [
                indexPath,
                {
                    projects: {
                        [`${apps}/${app}`]: {
                            name: `@saas-starter/${app}`,
                            sourceRoot: '{projectRoot}',
                            projectType: 'application',
                            tags: ['scope:apps', `app:${app}`],
                            targets: {
                                ...lint,
                                ...lintFix
                            }
                        }
                    }
                }
            ]
        })
    }
]
