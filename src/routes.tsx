import React, { lazy, Suspense } from 'react';

import { renderRoutes } from '@utils/renderer-react';

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
    // {
    //     path: '/',
    //     exact: true,
    //     redirect: '/welcome'
    // },
    {
        path: '/user',
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
        path: '/',
        component: SecurityLayout,
        routes: [
            {
                path: '/',
                component: BasicLayout,
                routes: [
                    {
                        path: '/',
                        exact: true,
                        redirect: '/welcome'
                    },
                    {
                        path: '/welcome',
                        exact: true,
                        name: 'welcome',
                        icon: 'smile',
                        component: Welcome
                    },
                    {
                        path: '/admin',
                        name: 'admin',
                        icon: 'crown',
                        component: Admin,
                        routes: [
                            {
                                path: '/admin/sub-page',
                                name: 'sub-page',
                                icon: 'smile',
                                component: Welcome
                            }
                        ]
                    },
                    {
                        name: 'list.table-list',
                        icon: 'table',
                        path: '/list',
                        component: Welcome
                    },
                    {
                        component: NoFoundPage
                    }
                ]
            },
            {
                component: NoFoundPage
            }
        ]
    },
    {
        component: NoFoundPage
    }
] as any;

function GeneratorRoutes(props: any) {
    return (
        <Suspense fallback="loading">
            <Router history={props.history}>{renderRoutes({ routes })}</Router>
        </Suspense>
    );
}
export default GeneratorRoutes;
