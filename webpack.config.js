const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');


module.exports = {
    mode: 'development',
    entry: './public/javascripts/main.js',
    output: {
        path: path.resolve(__dirname, './public/javascripts/build'),
        publicPath: './javascripts/build/',
        filename: 'main.js?[hash]',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },{
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },{
                test: /.js?$/,
                use: 'babel-loader'
            }, {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader",
                options: {
                    name: '[path][name].[ext]',
                    publicPath: '/public/javascripts/build/'
                }
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./public/javascripts'),
            path.resolve('./node_modules'),
        ],
        alias: {
            'vue$': 'vue/dist/vue'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new UglifyJSPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
    ]
};