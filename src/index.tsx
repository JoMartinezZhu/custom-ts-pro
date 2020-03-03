import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import routes from './routes';

import './global.scss';

function App() {
    return (
        <Suspense fallback={'loading'}>
            <Router>
                <Switch>
                    {routes.map(item => (
                        <Route exact key={item.path} path={item.path} component={item.component} />
                    ))}
                </Switch>
            </Router>
        </Suspense>
    );
}

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>,
    document.getElementById('app')
);
