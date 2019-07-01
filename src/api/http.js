import axios from "axios";
import qs from "qs";
import store from "@store";
import {SET_LOADING,SET_TOKEN} from "@store/mutation-types";
import { Toast } from 'cube-ui'

// 请求配置参数
const http = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://admin.pickown.com/api"
      : "http://192.168.2.50/api", // 基础路径
    timeout: 15000 // 请求延时
});
http.defaults.withCredentials = true;

// 请求拦截
http.interceptors.request.use(config => {
  // 参数解析
  config.method === "post"
    ? (config.data = qs.stringify({ ...config.data }))
    : (config.params = { ...config.params });
  // 数据类型
  config.headers["Accept"] = "application/json";
  // token
  if(store.state.token){
    config.headers.token = store.state.token;
  }
  return config;
});

// 请求返回拦截
http.interceptors.response.use(response => {
  const { data } = response;
  if (response.status === 200 && data.code === 200) {
    if(data.data.token){
      store.commit(SET_TOKEN, data.data.token)
    }
    return Promise.resolve(data);
  } else {
    // 返回错误提示
    const {msg} = data;
    store.commit(SET_LOADING, false);
    const toast = Toast.$create({
      txt: msg || "服务器繁忙，稍后再试！",
      time: 2000,
      type:'txt'
    })
    toast.show()
    return Promise.reject(data);
  }
},error=>{
  store.commit(SET_LOADING, false);
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    const toast = Toast.$create({
      txt: "请求超时，请重新请求",
      time: 2000,
      type:'txt'
    })
    toast.show()
    return false
  }
});

/**
 * post请求
 * @export
 * @param {*} url
 * @param {*} [data={}]
 * @returns
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    http
      .post(url, data)
      .then(json => {
        resolve(json);
      })
      .catch(err => reject(err));
  });
}

/**
 * get请求
 * @export
 * @param {*} url
 * @param {*} [data={}]
 * @returns
 */
export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    http
      .get(url, {params: data})
      .then(json => {
        resolve(json);
      })
      .catch(err => reject(err));
  });
}
