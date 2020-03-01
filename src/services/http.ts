import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { message } from 'antd';

const baseURL = 'https://t2.learnta.cn/__api';

type TRequest = (url: string, data?: object) => Promise<any>;

interface IHttpRequest {
  get?: TRequest;
  post?: TRequest;
  delete?: TRequest;
  put?: TRequest;
}

type Method = 'get' | 'post' | 'delete' | 'put';

const methods: Method[] = ['get', 'post', 'delete', 'put'];

const http: IHttpRequest = {};

const baseConfig = {
  baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
};

methods.forEach(v => {
  http[v] = (url: string, data: any) => {
    const config: AxiosRequestConfig = {
      url,
      method: v,
      ...baseConfig,
    };
    const instance = axios.create({ ...config });
    // 请求拦截
    instance.interceptors.request.use(
      cfg => {
        // TODO:添加请求头信息
        cfg.headers.Authorization = 'Bearer 2aa13342-6d77-3a69-a8e5-6939efb77f23';
        return cfg;
      },
      error => {
        // TODO:异常处理
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      res => {
        if (res && res.data) {
          return res.data;
        }
        return res;
      },
      error => {
        // TODO:异常处理
        return Promise.reject(error);
      },
    );
    if (v === 'get' || v === 'delete') {
      config.params = data;
    } else {
      config.data = qs.stringify(data);
    }

    return instance
      .request(config)
      .then(res => {
        return res;
      })
      .catch(err => {
        // TODO:异常处理
        message.destroy();
        if (!!err.response) {
          const errData = err.response.data;
          message.error(errData.message);
        } else {
          const msg = err.message === 'Network Error' ? '网络错误' : '未知错误';
          message.error(msg);
        }
        return Promise.reject(err);
      });
  };
});

export default http;
