export default {
    lint: {
        executor: 'nx:run-commands',
        cache: true,
        inputs: [
            '{workspaceRoot}/eslint.config.mjs'
        ],
        options: {
            command: 'eslint .',
            cwd: '{projectRoot}'
        },
        dependsOn: [
            '^codegen'
        ]
    }
}
