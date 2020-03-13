import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import history from '@utils/history';

import { fakeAccountLogin } from '@services/login';
import { setAuthority } from '@utils/authority';
import { getPageQuery } from '@utils/utils';

export interface ILoginModelState {
    status?: 'ok' | 'error';
}

export interface ILoginModel {
    namespace: string;
    state: ILoginModelState;
    effects: {
        login: Effect;
        logout: Effect;
    };
    reducers: {
        syncAuthorityData: Reducer<ILoginModelState>;
    };
}

const Model: ILoginModel = {
    namespace: 'login',

    state: {
        status: undefined
    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(fakeAccountLogin, payload);
            yield put({
                type: 'syncAuthorityData',
                payload: response
            });
            if (response.status === 'ok') {
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params as { redirect: string };
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        return (window.location.href = '/');
                    }
                }
                history.replace(redirect || '/');
            }
        },

        logout() {
            const { redirect } = getPageQuery();
            if (window.location.pathname !== '/user/login' && !redirect) {
                history.replace({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href
                    })
                });
            }
        }
    },

    reducers: {
        syncAuthorityData(state, { payload }) {
            setAuthority(payload.currentAuthority);
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                status: payload.status
            };
        }
    }
};

export default Model;
