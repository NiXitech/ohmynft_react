import axios, { AxiosResponse } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestConfig, RequestInterceptors } from '../helpers/types';

class Request {
  instance: AxiosInstance;
  interceptorsObj?: RequestInterceptors;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;

    this.instance.interceptors.request.use((res: AxiosRequestConfig) => {
      return res;
    }, (err: any) => err);

    this.instance.interceptors.request.use(this.interceptorsObj?.requestInterceptors, this.interceptorsObj?.requestInterceptorsCatch);
    this.instance.interceptors.response.use(this.interceptorsObj?.responseInterceptors, this.interceptorsObj?.responseInterceptorsCatch);

    this.instance.interceptors.response.use((res: AxiosResponse) => {
      return res.data;
    }, (err: any) => err);
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res)
          }

          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export default Request;
