
const merge = require('webpack-merge');
const DevConfig = require('./webpack.config.dev');
const ProdConfig = require('./webpack.config.prod');
const ConfigUtils = require('./config.utils');

module.exports = (env, argv) => {
    var WebpackDevConfig = argv.mode == 'production' ? ProdConfig(env, argv) : DevConfig(env, argv);
    var webpackConfig = merge(WebpackDevConfig, {
        devServer: {
            ...ConfigUtils.baseDevServerConf,
            open: true,
            openPage: '#/console-login',
            proxy: [
                {
                    context: ['/fp-api', '/doc'],
                    target: 'http://99.6.118.9:1080',
                    ...ConfigUtils.baseProxyConf
                }
                // 本地联调
                // {
                //     context: ['/test'],
                //     target: "http://99.6.118.222:12026/",
                //     pathRewrite: { '^/test': '' },
                //     ...ConfigUtils.baseProxyConf,
                // },
            ]
        }
    });
    return webpackConfig;
};