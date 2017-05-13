var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var htmlWebpackPluginConfig = {
    template: "src/public/index.html",
    inject: 'body',
}

module.exports = function makeWebpackConfig(env) {
    var isDev = env.debug;
    var isProd = env.prod;
    var staticIP = "192.168.10.12:8080";
    // console.log(path.join(__dirname, '/node_modules'));

    var config = {};

    config.entry = {
        "main": './src/app/index.js',
    };
    config.output = {
        filename: '[name].js',
        path: path.join(__dirname, '/dist'),
    };
    if (isProd) {
        config.output.filename = "[name].[chunkhash].js";
    }
    config.devServer = {
        contentBase: './src/public',
        // stats: 'minimal'
    };
    config.plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"], // vendor libs + extracted manifest
            minChunks: function(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
        new HtmlWebpackPlugin(htmlWebpackPluginConfig),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ];
    if (isProd) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: false,
                }
            })
        );
    }

    config.devtool = "cheap-module-eval-source-map";
    if (isProd) {
        config.devtool = "source-map";
    }

    if (isDev) {
        config.watchOptions = {
            aggregateTimeout: 1000,
            ignored: "/node_modules/",
            poll: 1000,
        };
    }
    config.module = {
        rules: [
            {
                // JS LOADER
                // Reference: https://github.com/babel/babel-loader
                // Transpile .js files using babel-loader
                // Compiles ES6 and ES7 into ES5 code
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015"]
                }
            },
            {
                // HTML LOADER
                // Reference: https://github.com/webpack/raw-loader
                // Allow loading html through js
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ["style-loader", 'css-loader', 'sass-loader']
            },
            {
                test: /\.sass$/,
                use: ["style-loader", 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=8192'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=8192'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=8192'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=8192'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=8192'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=8192'
            },
        ]
    }


    return config;
};
