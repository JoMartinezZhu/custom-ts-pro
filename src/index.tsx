import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import dva, { DvaInstance } from 'dva';
import createBrowserHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';

import { renderRoutes } from 'react-router-config';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import routes from './routes';

import './global.scss';

function App() {
    return (
        <Suspense fallback={'loading'}>
            <Router>
                {/* <Switch>
                    {routes.map(item => (
                        <Route exact key={item.path} path={item.path} component={item.component} />
                    ))}
                </Switch> */}
                {renderRoutes(routes)}
            </Router>
        </Suspense>
    );
}

let app: DvaInstance = null;
export function getApp() {
    return app;
}

export class DvaContainer extends React.Component {
    render() {
        const app = getApp();
        app.router(() => this.props.children);
        return app.start()();
    }
}

// 1.Initialize
// 可配置 history 模式 browser or hash

export function onCreate() {
    app = dva({ history: createBrowserHistory() });
    app.use(createLoading());
    app.model({ namespace: 'global', ...require('./models/global').default });
    app.model({ namespace: 'login', ...require('./models/login').default });
    app.model({ namespace: 'setting', ...require('./models/setting').default });
    app.model({ namespace: 'user', ...require('./models/user').default });
    ReactDOM.render(
        <ConfigProvider locale={zhCN}>
            <DvaContainer>
                <App />
            </DvaContainer>
        </ConfigProvider>,
        document.getElementById('app')
    );
}

onCreate();

//2.Plugins
//app.use({});

//3.Model
//app.model(require(‘./models/app’).default);

//4.Router
// app.router(require(‘./router’).default);

//5.Start
// app.start(‘#root’);
