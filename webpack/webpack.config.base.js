/** @format */

const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const ConfigUtils = require('./config.utils')
const OfflinePlugin = require('offline-plugin')
const Autoprefixer = require('autoprefixer')

const PATHS = ConfigUtils.paths
// less、css 从js中抽离
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    // const isOffline = !devMode; // 是否 使用 offline-plugin
    const isOffline = false // 离线缓存导致线上文件更新不及时，顾先去掉
    const isMinimize = !devMode // 是否压缩代码
    const today = new Date()
    const Ddigit = _n => (_n > 9 ? _n : '0' + _n)
    const version = `v${today.getFullYear()}${Ddigit(today.getMonth() + 1)}${Ddigit(today.getDate())}`
    // 利用ProvidePlugin这个webpack内置API将React设置为全局引入，从而无需单个页面import引入
    let webpackProvide = {
        React: 'react',
        ReactDOM: 'react-dom',
        _: 'lodash',
    }
    devMode && (webpackProvide.Mock = 'mockjs')
    let indexJS = [
        // react/react-router 使用的一些es5、es6语法的垫片注入，以支持ie9
        'react-app-polyfill/ie9',
        'react-app-polyfill/stable',
        // 'react-hot-loader/patch', // 局部刷新
    ]
    // 生产环境 引入 offline-plugin的 初始化
    isOffline && indexJS.push(path.join(PATHS.src, 'offline-plugin.js'))
    indexJS.push(path.join(PATHS.src, 'index.tsx')) // 项目入口js
    const webpackConfig = {
        // 入口文件
        entry: {
            index: indexJS,
        },
        // 输出到dist文件夹,生成入口index：dist/js/index.chunkhash.js
        output: {
            path: PATHS.output,
            // 生成chunkhash文件，这种格式文件在内容没有改变时候不会更新hash，有利于持久化缓存
            chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
        },
        performance: {
            hints: false,
        },
        module: {
            rules: [
                {
                    test: /\.(jsx?|tsx?)$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader', // js 代码解析器
                    options: {
                        presets: [
                            [
                                // 根据运行目标注入polyfill
                                '@babel/preset-env',
                                // {
                                //   "useBuiltIns": "usage", // 可以在运行时候注入引用的api对应的polyfill
                                //   "corejs":3, // 对应使用corejs库版本
                                //   "debug": true, // 打印出注入与目标识别的log
                                // }
                            ],
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                        plugins: [
                            // 解析类的属性,如es7修饰器
                            ['@babel/plugin-proposal-decorators', {legacy: true}],
                            'transform-class-properties', // 解决 es6 中使用class声明中 ：defaultProps={} 不支持的问题
                            '@babel/plugin-syntax-dynamic-import', // 支持import() 动态引入
                            '@babel/plugin-transform-react-jsx', // 转化jsx语法
                            // "react-hot-loader/babel"
                        ],
                        compact: true,
                        cacheDirectory: true,
                    },
                },
                {
                    test: /\.less$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        // 生产模式，抽离注入在js的less代码
                        devMode
                            ? 'style-loader'
                            : {
                                  loader: MiniCssExtractPlugin.loader,
                                  options: {
                                      publicPath: '../',
                                  },
                              },
                        'css-loader', // 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们
                        {
                            // css预处理器
                            loader: 'postcss-loader',
                            options: {plugins: [Autoprefixer]}, // 注入css 兼容写法
                        },
                        'less-loader', // less 代码转化
                    ],
                },
                {
                    test: /\.css$/,
                    exclude: /(node_modules|bower_components)/,
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                },
                {
                    // 处理js注入的图片文件（require（'assets/logo.png'））,
                    // 构建后生成在 dist/assets/logo.hash.png , 代码中注入引用路径
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: ['file-loader?hash=sha512&digest=hex&limit=8192&name=assets/[name].[hash:8].[ext]'],
                },
                {
                    // 同上
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use:
                        'url-loader??prefix=fonts/name=assets/[name].[hash:8].[ext]&limit=10000&mimetype=application/font-woff',
                },
                {
                    // 同上
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use:
                        'file-loader?prefix=fonts/&name=assets/[name].[hash:8].[ext]&limit=10000&mimetype=font/opentype',
                },
            ],
        },
        optimization: {
            // 文档地址：https://webpack.docschina.org/configuration/optimization/
            minimize: isMinimize, // 是否压缩代码，build时候执行压缩
            // minimizer: [
            //     new MinifyPlugin({}, {
            //         sourceMap: "cheap-module-source-map"
            //     })
            // ],
            minimizer: [
                //  压缩代码插件
                new UglifyJSPlugin({
                    sourceMap: true, // 是否生成压缩后的对照，方便我们定位error
                    uglifyOptions: {
                        // ie8: true,
                        compress: {
                            // 压缩时候去掉console、debugger
                            drop_debugger: true,
                            drop_console: true,
                        },
                    },
                }),
            ],
            usedExports: true,
            sideEffects: true,
            // 优化持久化缓存 , 辅助说明：https://segmentfault.com/q/1010000014954264
            runtimeChunk: {
                name: 'manifest',
            },
            // 代码切割
            splitChunks: {
                minSize: 30000, // (默认是30000)：形成一个新代码块最小的体积
                minChunks: 1, // （默认是1）：在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
                maxAsyncRequests: 5, //（默认是3）：一个入口最大的并行请求数
                maxInitialRequests: 3, //（默认是5）：按需加载时候最大的并行请求数
                name: false,
                cacheGroups: {
                    vendor: {
                        // 对于从node_modules引用的第三方包的代码，构建后生成在 dist/js/vendor.chunkhash.js
                        // test用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：RegExp、String和Function
                        test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的第三方包
                        name: 'vendor', // name(打包的chunks的名字)：字符串或者函数(函数可以根据条件自定义名字)
                        chunks: 'initial', // chunks (默认是async) ：initial、async和all
                        priority: 1, // 缓存组打包的先后优先级
                        reuseExistingChunk: false, // 可设置是否重用该chunk
                    },
                    common: {
                        // 抽离 fp-common 下 公共的模块
                        test: /[\\/]fp-common[\\/]/,
                        name: 'common',
                        chunks: 'initial',
                        priority: 1,
                    },
                },
            },
        },
        plugins: [
            // 注入环境变量，执行命令里注入的NODE_ENV会成为node编译环境的变量，所以需要在配置里再注入到代码运行环境中
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    VERSION: JSON.stringify(version),
                },
            }),
            // 抽离注入在js的css代码，构建后生成 dist/css 下，线上环境最好抽离css，避免产生运行错误
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
            // 拷贝静态文件
            new CopyWebpackPlugin([{from: PATHS.static, to: PATHS.output}]),
            // 利用ProvidePlugin这个webpack内置API将React设置为全局引入，从而无需单个页面import引入
            new webpack.ProvidePlugin(webpackProvide),
            // html文件生成
            new HtmlWebpackPlugin({
                template: path.join(PATHS.src, 'index.html'), // html模板
                inject: 'body', // 注入标签
                chunks: ['manifest', 'vendor', 'common', 'index'], // 注入哪些js模块，注意这些都是前面配置生成的模块
                hash: false,
                minify: {
                    removeComments: true,
                    collapseWhitespace: isMinimize, // 移除空白
                },
            }),
        ],
        resolve: {
            // 文件别名
            extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
            modules: [PATHS.node],
            alias: ConfigUtils.alias,
        },
    }
    // pwa离线缓存插件 offlinePlugin, 会生成默认的sw.js
    isOffline &&
        webpackConfig.plugins.push(
            new OfflinePlugin({
                ServiceWorker: {
                    cacheName: 'fintech-platform-admin-web',
                    events: true,
                },
                caches: {
                    // webpack打包后需要换的文件正则匹配
                    main: [
                        '**/*.js',
                        '**/*.css',
                        /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                        // /\.(woff2?|eot|ttf|otf)(\?.*)?$/
                    ],
                    additional: [':externals:'],
                },
                responseStrategy: 'cache-first', // 缓存优先
                AppCache: false, // 不启用appCache
                safeToUseOptionalCaches: true, // Removes warning for about `additional` section usage
                autoUpdate: true, // 自动更新
                // 想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，
                // 那就可以通过配置externals。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用。
                externals: ['libs/*', 'assets/fonts/*'],
            }),
        )
    return webpackConfig
}
