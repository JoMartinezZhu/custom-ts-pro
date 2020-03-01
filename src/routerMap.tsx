import React, { lazy } from 'react';

const Home = lazy(() => import(/* webpackChunkName:"Home" */ '@pages/Home'));
const Login = lazy(() => import(/* webpackChunkName:"Login" */ '@pages/Login'));
const About = lazy(() => import(/* webpackChunkName:"About" */ '@pages/About'));

const routerMap = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/about',
        component: About
    }
];

export default routerMap;
