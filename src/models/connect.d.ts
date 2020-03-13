import { AnyAction } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouteProps } from 'react-router-dom';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../config/defaultSettings';
import { IUserModelState } from './user';
import { ILoginModelState } from './login';

export { GlobalModelState, SettingModelState, IUserModelState };

export interface ILoading {
    global: boolean;
    effects: { [key: string]: boolean | undefined };
    models: {
        global?: boolean;
        menu?: boolean;
        setting?: boolean;
        user?: boolean;
        login?: boolean;
    };
}

export interface IConnectState {
    global: GlobalModelState;
    loading: ILoading;
    settings: SettingModelState;
    user: IUserModelState;
    login: ILoginModelState;
}

export interface IRoute extends MenuDataItem {
    routes?: IRoute[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps extends Partial<RouteProps>, IRoute {
    dispatch?: Dispatch<AnyAction>;
}
