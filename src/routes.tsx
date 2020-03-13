import React, { lazy, Suspense } from 'react';
import { SmileOutlined, TableOutlined } from '@ant-design/icons';
import { renderRoutes } from '@utils/renderer-react';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import NoFoundPage from '@pages/NoFoundPage';
import { router as DvaRouter } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';

const { Router } = DvaRouter;

const UserLayout = lazy(() => import(/* webpackChunkName:"UserLayout" */ '@layouts/UserLayout'));
const SecurityLayout = lazy(() => import(/* webpackChunkName:"SecurityLayout" */ '@layouts/SecurityLayout'));
const BasicLayout = lazy(() => import(/* webpackChunkName:"BasicLayout" */ '@layouts/BasicLayout'));

const Login = lazy(() => import(/* webpackChunkName:"Login" */ '@pages/user/login'));
const Welcome = lazy(() => import(/* webpackChunkName:"Welcome" */ '@pages/Welcome'));
const Admin = lazy(() => import(/* webpackChunkName:"Admin" */ '@pages/Admin'));

const routes = [
    {
        path: '/user',
        component: UserLayout,
        routes: [
            {
                name: 'login',
                path: '/user/login',
                component: Login
            },
            {
                path: '/user',
                exact: true,
                redirect: '/user/login'
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
                        path: '/',
                        exact: true,
                        redirect: '/welcome'
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
        <Suspense fallback={<PageLoading />}>
            <ConfigProvider locale={zhCN}>
                <Router history={props.history}>{renderRoutes({ routes })}</Router>
            </ConfigProvider>
        </Suspense>
    );
}
export default GeneratorRoutes;
