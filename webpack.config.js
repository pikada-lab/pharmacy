var path = require('path');

module.exports = {
    mode: "production",
    entry: './src/index.ts',
    devtool: "source-map",

    resolve: {
        extensions: [".ts"]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [{
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: "ts-loader"
                }]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};