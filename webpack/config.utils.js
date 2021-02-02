/** @format */

const path = require('path')
const ROOT_PATH = path.resolve(__dirname, '..')

const PATHS = {
    root: ROOT_PATH,
    src: path.join(ROOT_PATH, 'src'),
    output: path.join(ROOT_PATH, 'dist'),
    static: path.join(ROOT_PATH, 'static'),
    node: path.join(ROOT_PATH, 'node_modules'),
}
module.exports = {
    paths: PATHS,
    // 获取文件夹alias
    alias: {
        '@src': PATHS.src,
        '@static': PATHS.static,
    },
    baseDevServerConf: {
        contentBase: PATHS.output,
        port: 8111, // 本地服务器端口号
        host: '0.0.0.0',
        // stats: "errors-only",
        open: true,
        openPage: '/#/console-login',
        stats: {
            all: false,
            errors: true,
            timings: true,
            colors: true,
        },
        progress: true,
        // inline: true,
        compress: true,
        hot: true,
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        historyApiFallback: true, //让所有404的页面定位到index.html
        // disableHostCheck: false, // 设置为 true 时，此选项绕过主机检查。不建议这样做，因为不检查主机的应用程序容易受到 DNS 重新连接攻击。
    },
    baseProxyConf: {
        changeOrigin: true,
        logLevel: 'debug',
    },
    getCssRemOption: function () {
        return {
            dpr: 2,
            rem: 75,
            exclude: ['background-size'],
        }
    },
}
