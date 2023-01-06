import Request from "./axios";
import type { RequestConfig } from '../helpers/types';

const request = new Request({
  // baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000 * 60 * 5,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  interceptors: {
    requestInterceptors: config => {
      return config
    },
    responseInterceptors: result => {
      return result
    },
  },
});

interface HTTPRequestConfig<T> extends RequestConfig {
  data?: T
}
interface HTTPResponse<T> {
  code: number
  message: string
  data: T
}


const HttpRequest = <D, T = any>(config: HTTPRequestConfig<D>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<HTTPResponse<T>>(config)
}

export default HttpRequest;
