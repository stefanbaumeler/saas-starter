export default {
    'lint:fix': {
        executor: 'nx:run-commands',
        cache: true,
        inputs: [
            '{workspaceRoot}/eslint.config.mjs'
        ],
        options: {
            command: 'eslint . --fix'
        }
    }
}
