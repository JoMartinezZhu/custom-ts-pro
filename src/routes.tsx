import React, { lazy, Suspense } from 'react';
import { SmileOutlined, TableOutlined } from '@ant-design/icons';
import { renderRoutes } from '@utils/renderer-react';

// import UserLayout from '@layouts/UserLayout';
import SecurityLayout from '@layouts/SecurityLayout';
import BasicLayout from '@layouts/BasicLayout';
import NoFoundPage from '@pages/NoFoundPage';
import Admin from '@pages/Admin';
import { router as DvaRouter } from 'dva';

const { Router } = DvaRouter;

const Welcome = lazy(() => import(/* webpackChunkName:"Welcome" */ '@pages/Welcome'));

const routes = [
    // {
    //     path: '/user',
    //     component: UserLayout,
    //     routes: [
    //         {
    //             path: '/user',
    //             exact: true,
    //             redirect: '/user/login'
    //         },
    //         {
    //             name: 'login',
    //             path: '/user/login',
    //             component: Login
    //         }
    //     ]
    // },
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
                        icon: <SmileOutlined />,
                        component: Welcome
                    },
                    {
                        path: '/admin',
                        name: 'admin',
                        icon: <SmileOutlined />,
                        component: Admin,
                        routes: [
                            {
                                path: '/admin/sub-page',
                                name: 'sub-page',
                                icon: <SmileOutlined />,
                                component: Welcome
                            }
                        ]
                    },
                    {
                        name: 'list.table-list',
                        icon: <TableOutlined />,
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
