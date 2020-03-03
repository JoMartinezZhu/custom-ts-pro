import { lazy } from 'react';

import { RouteConfig } from 'react-router-config';

import UserLayout from '@layouts/UserLayout';
import SecurityLayout from '@layouts/SecurityLayout';
import BasicLayout from '@layouts/BasicLayout';
import NoFoundPage from '@pages/NoFoundPage';
import Admin from '@pages/Admin';

const Login = lazy(() => import(/* webpackChunkName:"Login" */ '@pages/user/login'));
const Welcome = lazy(() => import(/* webpackChunkName:"Login" */ '@pages/Welcome'));
const Home = lazy(() => import(/* webpackChunkName:"Login" */ '@pages/Home'));

const routes = [
    {
        path: '/user',
        component: UserLayout,
        routes: [
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
                // authority: ['admin', 'user'],
                routes: [
                    {
                        path: '/',
                        redirect: '/welcome'
                    },
                    {
                        path: '/welcome',
                        name: 'welcome',
                        icon: 'smile',
                        component: Welcome
                    },
                    {
                        path: '/admin',
                        name: 'admin',
                        icon: 'crown',
                        component: Admin,
                        // authority: ['admin'],
                        routes: [
                            {
                                path: '/admin/sub-page',
                                name: 'sub-page',
                                icon: 'smile',
                                component: Home
                                // authority: ['admin']
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
        ]
    },
    {
        component: NoFoundPage
    }
] as RouteConfig[];

export default routes;
