import dva, { DvaInstance } from 'dva';
import createBrowserHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';

import './global.less';

let app: DvaInstance = null;
export function getApp() {
    return app;
}

export function onCreate() {
    app = dva({ history: createBrowserHistory() });
    app.use(createLoading());
    app.model({ namespace: 'global', ...require('./models/global').default });
    app.model({ namespace: 'login', ...require('./models/login').default });
    app.model({ namespace: 'setting', ...require('./models/setting').default });
    app.model({ namespace: 'user', ...require('./models/user').default });
    app.router(require('./routes').default);
    app.start('#root');
}

onCreate();
