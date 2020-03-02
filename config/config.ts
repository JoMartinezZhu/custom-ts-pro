import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import proxy from './proxy';

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
const { REACT_APP_ENV } = process.env;

export default {
    routes: [
        {
            path: '/user',
            component: '../layouts/UserLayout',
            routes: [
                {
                    name: 'login',
                    path: '/user/login',
                    component: './user/login'
                }
            ]
        },
        {
            path: '/',
            component: '../layouts/SecurityLayout',
            routes: [
                {
                    path: '/',
                    component: '../layouts/BasicLayout',
                    authority: ['admin', 'user'],
                    routes: [
                        {
                            path: '/',
                            redirect: '/welcome'
                        },
                        {
                            path: '/welcome',
                            name: 'welcome',
                            icon: 'smile',
                            component: './Welcome'
                        },
                        {
                            path: '/admin',
                            name: 'admin',
                            icon: 'crown',
                            component: './Admin',
                            authority: ['admin'],
                            routes: [
                                {
                                    path: '/admin/sub-page',
                                    name: 'sub-page',
                                    icon: 'smile',
                                    component: './Welcome',
                                    authority: ['admin']
                                }
                            ]
                        },
                        {
                            name: 'list.table-list',
                            icon: 'table',
                            path: '/list',
                            component: './ListTableList'
                        },
                        {
                            component: './404'
                        }
                    ]
                },
                {
                    component: './404'
                }
            ]
        },
        {
            component: './404'
        }
    ],
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        // ...darkTheme,
        'primary-color': defaultSettings.primaryColor
    },
    define: {
        REACT_APP_ENV: REACT_APP_ENV || false
    },
    proxy: proxy[REACT_APP_ENV || 'dev']
} as any;
