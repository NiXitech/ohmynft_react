/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";
import { toast } from "react-toastify";
import { HttpRequestParams } from "../../../types/types";
// import { LStorage } from "../cooike/storage";

// import { LoginUserCookie } from "../cooike/cookie";

// 设置默认超时时间
axios.defaults.timeout = 1000 * 60 * 2;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
      config.data = JSON.stringify(config.data);
        config.headers = {
          "Content-Type": "application/json",
        };
      // let accessToken: string = LStorage.get('accessToken')
      // accessToken && (config.headers.authorization = accessToken)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    console.log('%c🀄︎ ', 'color: #731d1d; font-size: 20px;', error);
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url: string, params = {}, config: AxiosRequestConfig = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params, ...config })
      .then((response) => {
        resolve(response.data);
        // if (response.data.code === 200) {
        //   resolve(response.data);
        // } else {
        //   toast.error(response.data.error.msg,{
        //     hideProgressBar: false,
        //   });
        //   reject(response.data.error.msg);
        // }
      })
      .catch((error) => {
        console.log('%c🀆 error', 'color: #00ff88; font-size: 20px;', error);
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url: string, data: any, config: AxiosRequestConfig = {}) {
  return new Promise((resolve, reject) => {
    let newParams = _.cloneDeep(data);
    Object.keys(newParams).forEach((ele: any) => {
      if (typeof newParams[ele] === "string") {
        newParams[ele] = newParams[ele].trim();
      }
    });
    data = newParams;
    axios.post(url,  data , config).then(
      (response) => {
        //关闭进度条
        resolve(response.data);
        // if (response.data.code === 200) {
        //   resolve(response.data);
        // } else {
        //   toast.error(response.data.error.msg,{
        //     hideProgressBar: false,
        //   });
        //   reject(response.data.error.msg);
        // }
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(
  url: string,
  data: any = {},
  config: AxiosRequestConfig = {}
) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data, config).then(
      (response) => {
        if (response.data.code === 200) {
          resolve(response.data);
        } else {
          toast.error(response.data.error.msg,{
            hideProgressBar: false,
          });
          reject(response.data.error.msg);
        }
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(
  url: string,
  data: any = {},
  config: AxiosRequestConfig = {}
) {
  return new Promise((resolve, reject) => {
    axios.put(url, data, config).then(
      (response) => {
        if (response.data.code === 200) {
          resolve(response.data);
        } else {
          toast.error(response.data.error.msg,{
            hideProgressBar: false,
          });
          reject(response.data.error.msg);
        }
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function Axiosdelete(url: string, config: AxiosRequestConfig = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, config).then(
      (response) => {
        if (response.data.code === 200) {
          resolve(response.data);
        } else {
          toast.error(response.data.error.msg,{
            hideProgressBar: false,
          });
          reject(response.data.error.msg);
        }
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

//统一接口处理，返回数据
export default function (params: HttpRequestParams) {
  return new Promise((resolve, reject) => {
    switch (params.method) {
      case "get":
        get(params.url, params.params, params.config)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      case "post":
        post(params.url, params.params, params.config)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      case "put":
        put(params.url, params.params, params.config)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      case "delete":
        Axiosdelete(params.url, params.config)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
          break;
      default:
        break;
    }
  });
}

//失败提示
function msag(err: any) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert("未授权，请登录");
        break;

      case 403:
        alert("拒绝访问");
        break;

      case 404:
        alert("请求地址出错");
        break;

      case 408:
        alert("请求超时");
        break;

      case 500:
        alert("服务器内部错误");
        break;

      case 501:
        alert("服务未实现");
        break;

      case 502:
        alert("网关错误");
        break;

      case 503:
        alert("服务不可用");
        break;

      case 504:
        alert("网关超时");
        break;

      case 505:
        alert("HTTP版本不受支持");
        break;
      default:
    }
  }
}

