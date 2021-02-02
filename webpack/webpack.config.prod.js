
// const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BaseConfig = require('./webpack.config.base');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const OfflinePlugin = require('offline-plugin');

module.exports = (env, argv) => {
    var baseWebpackConfig = BaseConfig(env, argv);
    var webpackConfig = merge(baseWebpackConfig, {
        // devtool: "module-source-map",
        module: {
            rules: [{ // 压缩图片文件
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'image-webpack-loader',
                    options: {
                        optipng: {
                            optimizationLevel: 7
                        },
                        gifsicle: {
                            interlaced: false
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        mozjpeg: {
                            quality: 65,
                            progressive: true
                        }
                    }
                }]
            }]
        },
        plugins: [
            new OptimizeCssAssetsPlugin(), // css 压缩
            new CleanWebpackPlugin() // 清理文件，默认清理 编译仓库
        ]
    });
    // console.log(webpackConfig);
    return webpackConfig;
};