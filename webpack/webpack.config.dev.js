
const webpack = require('webpack');
// webpack config 合成器，常用于不同环境使用不同配置
const merge = require('webpack-merge');
const BaseConfig = require('./webpack.config.base');

module.exports = (env, argv) => {
    var baseWebpackConfig = BaseConfig(env, argv);
    var webpackConfig = merge(baseWebpackConfig, {
        devtool: 'eval-source-map', // 生成的代码对照，定位代码正确位置
        plugins: [
            new webpack.NamedModulesPlugin(), //用于启动HMR时可以显示模块的相对路径
            new webpack.HotModuleReplacementPlugin() //hot module replacement 启动模块热替换的插件
        ]
    });
    // console.log(webpackConfig);

    return webpackConfig;
};

