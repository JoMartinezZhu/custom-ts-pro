import React from 'react';
import ReactDOM from 'react-dom';
import dva, { DvaInstance } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import createBrowserHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';

// import { renderRoutes } from 'react-router-config';
import renderRoutes from '@utils/renderRoutes';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import routes from './routes';

import './global.scss';

let app: DvaInstance = null;
export function getApp() {
    return app;
}

// export class DvaContainer extends React.Component {
//     render() {
//         const app = getApp();
//         app.router(props => (
//             <Router history={props.history}>
//                 <Switch>
//                     {routes.map((item, index) => (
//                         <Route
//                             key={`${item.path}-${index}`}
//                             path={item.path}
//                             exact={item.exact}
//                             component={item.component}
//                         />
//                     ))}
//                 </Switch>
//             </Router>
//         ));
//         return app.start()();
//     }
// }

// 1.Initialize
// 可配置 history 模式 browser or hash

export function onCreate() {
    app = dva({ history: createBrowserHistory() });
    app.use(createLoading());
    app.model({ namespace: 'global', ...require('./models/global').default });
    app.model({ namespace: 'login', ...require('./models/login').default });
    app.model({ namespace: 'setting', ...require('./models/setting').default });
    app.model({ namespace: 'user', ...require('./models/user').default });
    app.router(require('./routes').default);
    app.start('#app');
}

onCreate();
