import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import routerMap from './routerMap';

import './index.scss';
import Provider from '@store/index';

function App() {
    return (
        <Suspense fallback={'loading'}>
            <Router>
                <Switch>
                    {routerMap.map(item => (
                        <Route exact key={item.path} path={item.path} component={item.component} />
                    ))}
                </Switch>
            </Router>
        </Suspense>
    );
}

ReactDOM.render(
    <Provider>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </Provider>,
    document.getElementById('app')
);
