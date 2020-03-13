import { Effect } from 'dva';
import { Reducer } from 'redux';

import { queryCurrent, query as queryUsers } from '@services/user';

export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
        key: string;
        label: string;
    }[];
    userid?: string;
    unreadCount?: number;
}

export interface IUserModelState {
    currentUser?: CurrentUser;
}

export interface IUserModel {
    namespace: 'user';
    state: IUserModelState;
    effects: {
        fetch: Effect;
        fetchCurrent: Effect;
    };
    reducers: {
        saveCurrentUser: Reducer<IUserModelState>;
        changeNotifyCount: Reducer<IUserModelState>;
    };
}

const UserModel: IUserModel = {
    namespace: 'user',

    state: {
        currentUser: {}
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(queryUsers);
            yield put({
                type: 'save',
                payload: response
            });
        },
        *fetchCurrent(_, { call, put }) {
            const response = yield call(queryCurrent);
            yield put({
                type: 'saveCurrentUser',
                payload: response
            });
        }
    },

    reducers: {
        saveCurrentUser(state, action) {
            return {
                ...state,
                currentUser: action.payload || {}
            };
        },
        changeNotifyCount(
            state = {
                currentUser: {}
            },
            action
        ) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload.totalCount,
                    unreadCount: action.payload.unreadCount
                }
            };
        }
    }
};

export default UserModel;
