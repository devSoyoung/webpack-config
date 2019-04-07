const path = require(`path`);

module.exports = {
    mode: "development",
    entry: {
        main: `./src/js/index.js`,
    },
    output: {
        path: path.resolve(__dirname, `dist`),
        filename: `[name].js`,
        publicPath: `/`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: 'node_modules',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
};