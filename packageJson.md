"@babel/core://js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js  
@pmmmwh/react-refresh-webpack-plugin:react热更新（只在react-dom16.9+中支持），比较于 react-hot-loader，对hook支持更加稳定和完善，react-hot-loader在react-dom16.9+中不建议使用将退役  
@svgr/webpack：把ts中svg转成react component
@testing-library/jest-dom：单元测试     
@testing-library/react：单元测试  
@testing-library/user-event：单元测试  
@types/xx系列，在ts环境中支持xx
@types/jest：ts环境中支持单元测试  
@types/node:ts环境中支持node  
@types/react：ts环境中支持react包  
@types/react-dom：ts环境中支持react-dom包    
@typescript-eslint/eslint-plugin：这是一个eslint插件，包含了各类定义好了检测ts的代码规范  
@typescript-eslint/parse：eslint解析器，用于解析ts,从而检查和规范ts代码

web-vitals:页面加载性能之Web Vitals?todo具体如何使用