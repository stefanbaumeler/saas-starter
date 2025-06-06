const {
    RunScriptWebpackPlugin
} = require('run-script-webpack-plugin')

const {
    NxAppWebpackPlugin
} = require('@nx/webpack/app-plugin')

const {
    join
} = require('path')

module.exports = (options) => {
    return {
        ...options,
        output: {
            ...options.output,
            path: join(__dirname, 'dist')
        },
        plugins: [
            ...options.plugins,
            new NxAppWebpackPlugin({
                target: 'node',
                compiler: 'tsc',
                main: './src/main.ts',
                tsConfig: './tsconfig.app.json',
                optimization: false,
                outputHashing: 'none'
            }),
            new RunScriptWebpackPlugin({
                name: options.output.filename
            })
        ]
    }
}
