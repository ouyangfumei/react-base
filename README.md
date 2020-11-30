
## start 
npm run start
建议使用node版本 v12.18.x

##  目录说明
```
|-- config(webpack打包配置)
|-- dist(编译仓库)
|-- node_modules(依赖包)
|-- public(公共资源)
    |-- favicon.ico、logo192、logo512(网页title默认图标)
    |-- index.html(页面入口)
    |-- manifest.json(页面公用资源配置文件)
|-- script(node编译文件)
    |-- build.js(生产环境编译)
    |-- start.js(开发环境编译)
    |-- test.js(测试环境编译)
|-- src(代码仓库)
    |-- api(http接口请求)
        .....
        |-- mock(mock模拟接口)
        |--http.js(axios封装)
    |-- common(公用模块、存放一些页面或者模块的公用业务js代码、或者util是公用函数)
    |-- components(组件仓库)
        ...
        |--base(公用基础组件)
    |-- less(样式文件)
        |-- common(组件样式)
            ...
            |--index.less(引入common所有样式文件)
        |-- components(组件样式)
            ...
            |--index.less(引入components所有样式文件)
        |-- pages(页面样式)
            |--index.less(引入pages所有样式文件)
        |-- index.less(引入所有样式文件)
    |-- pages(路由页面以文件夹形式存在，命名方式驼峰法，最好与路由保持一致)
        |-- index.html (web入口)
        |-- index.js (js入口文件)
    |-- routes(路由)
    |-- store(数据仓库)
    |-- index.tsx(spa入口)
    |--react-app-env.d.ts、reportWebVitals.ts、setupTests.ts(配置，具体作用和使用还需了解)
|-- static(静态资源仓库)
    |-- asserts(资源)
        |-- iconfont(字体icon)
        |-- images(图片、icon)
    |-- libs(第三方库)
|-- .eslintrc.js(eslintrc格式化配置文件)
|-- .gitignore(git忽略文件配置)
|-- .prettierrc.js(prettierrc格式化配置文件)
|-- package-lock.json(yarn/npm依赖包配置文件版本文件)
|-- package.json(yarn/npm依赖包配置文件)
|-- tsconfig.json(ts预编译配置文件)
|-- packageJson.md(yarn/npm依赖包配置说明文件)
|-- README.md(项目说明文件)
```