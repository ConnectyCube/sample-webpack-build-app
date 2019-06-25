const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    let WebpackConfig = {
        mode: env.production ? 'production' : 'development',
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'main.js',
            sourceMapFilename: 'main.map'
        },
        optimization: { minimize: true },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                filename: path.resolve(__dirname, 'dist', 'index.html'),
                files: {
                    js: ['main.js']
                }
            })
        ],
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    include: /src/,
                    exclude: /(node_modules|dist)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    ]
                }
            ]
        },
        externals: ['nativescript-xmpp-client', 'node-xmpp-client', 'node-fetch', 'form-data']
    };

    if (env.development) {
        WebpackConfig.devtool = 'source-map';
        WebpackConfig.devServer = {
            contentBase: path.join(__dirname, 'dist'),
            host: 'localhost',
            port: '3000',
            open: true
        };
        WebpackConfig.watch = true;
    }

    return WebpackConfig;
};
