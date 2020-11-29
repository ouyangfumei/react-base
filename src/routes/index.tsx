import React from 'react';
import {HashRouter,Route,Link,Switch,Redirect} from 'react-router-dom';
import BaseRoutes from './base';


// 后期加入radux的使用todo
// import { Provider } from 'react-redux';
// import rootReducer from '@/redux/index';
// import configStore from '@/redux/store';
// const store = configStore(rootReducer);
/**
 * 1.react-router-dom使用
 * HashRouter:如有多个子元素，则需要一个父容器将多个子元素全部包裹，否则报错
 * Switch\Route:将需要路由的组件写在双标签Switch中，并使用单标签Route，将定义好的组件给到component 
 * Link:跳转
 * Redirect：重定向
 * 2.redux的结合
 * Provider：provider包裹在根组件外层，使所有的子组件都可以拿到state
*/
const defaultRoute = '/'
export default class AppRouter extends React.Component{
    render() {
        return(
            <HashRouter>
                <ul>
                    <li> <Link to="/">首页1</Link> </li>
                    <li><Link to="/list">列表</Link> </li>
                </ul>
                <Switch>
                    {BaseRoutes.length&&BaseRoutes.map((route,index)=>{
                        return(
                            <Route key={index} path={route.path} exact component={route.component} />
                        )
                    })}
                    <Redirect to={defaultRoute}></Redirect>
                </Switch>
            </HashRouter>
       )
    }
}