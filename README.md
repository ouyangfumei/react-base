# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## files and folders

```
|-- src(代码仓库)
    |-- common(公用模块)
    |-- core(公用核心代码)??？
    |-- components(组件仓库)
    |-- pages(路由页面以文件夹形式存在，命名方式驼峰法，最好与路由保持一致)
        |-- index.html (web入口)
        |-- index.js (js入口文件)
    |-- routes(路由)
    |-- less(样式文件，以组件/页面名字命名)
        |-- app.less(公用样式)
|-- dist(编译仓库)
|-- static(静态资源仓库)
    |-- asserts(资源)
        |-- iconfont(字体icon)
        |-- images(图片、icon)
    |-- libs(第三方库)
|-- less(样式文件，以 _ + 组件/页面名字命名)???
    |-- components(组件样式)
    |-- pages(页面样式)
    |-- app.less(引入各个组件样式文件)
    |-- theme.less(引入各个页面样式文件)
|-- node_modules(node依赖包仓库)
|-- webpack(webpack配置)????
    |-- config.utils.js(公用配置)
    |-- webpack.config.base.js(基础配置)
    |-- webpack.config.dev.js(开发环境配置)
    |-- webpack.config.prod.js(上线环境配置)
|-- templates(Template Generator 模板仓库,插件地址：https://marketplace.visualstudio.com/itemdetails?itemName=prui.template-generator-vscode)
    使用方式：装完插件右键目录就可以根据模板创建文件啦
|-- .vscode(vscode配置,目前还未添加todo)
    |-- setting.json(配置文件)
|-- tsconfig.json(ts预编译配置文件)
|-- package.json(yarn/npm依赖包配置文件)
|-- script(node编译文件)
    |-- build.js(生产环境编译)
    |-- start.js(开发环境编译)
    |-- test.js(测试环境编译)
```