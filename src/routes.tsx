import React, { lazy, Suspense } from 'react';

import { RouteConfig } from 'react-router-config';
import renderRoutes from '@utils/renderRoutes';

import UserLayout from '@layouts/UserLayout';
import SecurityLayout from '@layouts/SecurityLayout';
import BasicLayout from '@layouts/BasicLayout';
import NoFoundPage from '@pages/NoFoundPage';
import Admin from '@pages/Admin';
import { router as DvaRouter } from 'dva';

const { Router } = DvaRouter;

const Login = lazy(() => import(/* webpackChunkName:"Login" */ '@pages/user/login'));
const Welcome = lazy(() => import(/* webpackChunkName:"Login" */ '@pages/Welcome'));
const Home = lazy(() => import(/* webpackChunkName:"Login" */ '@pages/Home'));

const routes = [
    {
        path: '/',
        exact: true,
        redirect: '/welcome'
    },
    {
        path: '/user',
        exact: true,
        component: UserLayout,
        routes: [
            {
                path: '/user',
                exact: true,
                redirect: '/user/login'
            },
            {
                name: 'login',
                path: '/user/login',
                component: Login
            }
        ]
    },
    {
        path: '/welcome',
        exact: true,
        component: Welcome
    },
    {
        path: '/404',
        exact: true,
        component: NoFoundPage
    }
] as any;

function GeneratorRoutes(props: any) {
    return (
        <Suspense fallback="loading">
            <Router history={props.history}>{renderRoutes(routes)}</Router>
        </Suspense>
    );
}
export default GeneratorRoutes;
