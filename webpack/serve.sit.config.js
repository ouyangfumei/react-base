
const merge = require('webpack-merge');
const DevConfig = require('./webpack.config.dev');
const ProdConfig = require('./webpack.config.prod');
const ConfigUtils = require('./config.utils');
// const ip = require('ip');

module.exports = (env, argv) => {
    var WebpackDevConfig = argv.mode == 'production' ? ProdConfig(env, argv) : DevConfig(env, argv);
    var webpackConfig = merge(WebpackDevConfig, {
        devServer: {
            ...ConfigUtils.baseDevServerConf,
            port: 8112,
            // host: ip.address(),
            open: true,
            openPage: '#/console-login',
            proxy: [{
                context: ['/fp-api', '/doc'],
                target: 'http://150.129.193.16:1081',
                ...ConfigUtils.baseProxyConf
            }]
        }
    });
    return webpackConfig;
};