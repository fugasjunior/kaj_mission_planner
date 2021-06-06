const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.mp3$/i,
                // include: SRC,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            'postcssOptions': {
                                'config': path.resolve(__dirname, 'postcss.config.js'),
                            },
                        }
                    },
                    {
                        loader: 'sass-loader', options: { sourceMap: true }
                    }
                ]
            }
        ],
    },
    devServer: {
        contentBase: './dist',
    },
};