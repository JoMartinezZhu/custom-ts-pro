import { Alert } from 'antd';
import React, { useState } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect, router as DvaRouter } from 'dva';
import { ILoginModelState } from '@models/login';
import { LoginParamsType } from '@services/login';
import { IConnectState } from '@models/connect';
import LoginFrom from './components/Login';

import styles from './style.module.less';

const { Mobile, Captcha, Submit } = LoginFrom;
interface ILoginProps {
    dispatch: Dispatch<AnyAction>;
    userLogin: ILoginModelState;
    submitting?: boolean;
}

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24
        }}
        message={content}
        type="error"
        showIcon
    />
);

const Login: React.FC<ILoginProps> = props => {
    const { userLogin = {}, submitting } = props;
    const { status } = userLogin;

    const handleSubmit = (values: LoginParamsType) => {
        const { dispatch } = props;
        dispatch({
            type: 'login/login',
            payload: { ...values }
        });
    };
    return (
        <div className={styles.main}>
            <LoginFrom onSubmit={handleSubmit}>
                {status === 'error' && !submitting && <LoginMessage content="验证码错误" />}
                <Mobile
                    name="mobile"
                    placeholder="手机号"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号！'
                        },
                        {
                            pattern: /^1\d{10}$/,
                            message: '手机号格式错误！'
                        }
                    ]}
                />
                <Captcha
                    name="captcha"
                    placeholder="验证码"
                    countDown={120}
                    getCaptchaButtonText="xxxx"
                    getCaptchaSecondText="秒"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码！'
                        }
                    ]}
                />
                <Submit loading={submitting}>登录</Submit>
            </LoginFrom>
        </div>
    );
};

export default connect(({ login, loading }: IConnectState) => ({
    userLogin: login,
    submitting: loading.effects['login/login']
}))(Login);
