import React from 'react';
import { router as DvaRouter } from 'dva';
import { stringify } from 'querystring';

const { Redirect } = DvaRouter;

class SecurityLayout extends React.Component<{}, {}> {
    render() {
        const { children } = this.props;
        // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
        const token = localStorage.getItem('token');

        const queryString = stringify({
            redirect: window.location.href
        });

        if ((!token || token === 'undefined') && window.location.pathname !== '/user/login') {
            return <Redirect to={`/user/login?${queryString}`} />;
        }
        return children;
    }
}

export default SecurityLayout;
