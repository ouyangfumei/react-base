
import React from 'react';
import Loadable from 'react-loadable';
// import CommonApp from '../common/app/index';
// import Home from '../pages/home';
/**
 * Loadable:代码分割
*/
const Loading = ()=>{
    return <div>loading！</div>
}
const BaseRoutes =  [
    {
        path: '/',
        component: Loadable({ loader: () => import('../pages/home'), loading:Loading}),
    },
    {
        path: '/login',
        component: Loadable({ loader: () => import('../pages/login'), loading:Loading}),
    },
    {
        path: '/test2',
        component: Loadable({ loader: () => import('../pages/test2'), loading:Loading}),
    }
];

export default BaseRoutes;