import axios from "axios";
import qs from "qs";
import store from "@store";
import {Loading, Notify} from "quasar"

// 请求配置参数
const http = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://test.pickown.com/api"
      : "https://test.pickown.com/api", // 基础路径
      // http://pickown.test/api
      // https://test.pickown.com/api
      // https://manage.pickown.com/api
    timeout: 15000 // 请求延时
});

// 请求拦截
http.interceptors.request.use(config => {
  // 参数解析
  config.method === "post"
    ? (config.data = qs.stringify({ ...config.data }))
    : (config.params = { ...config.params });
  // 数据类型
  config.headers["Accept"] = "application/json";
  // token
  config.headers["token"] =
    process.env.NODE_ENV !== "production"
      ? `${store.state.token}`
      : `${store.state.token}`;
  return config;
});

// 请求返回拦截
http.interceptors.response.use(response => {
  const { data } = response;
  if (response.status === 200 && data.code === 200) {
    return Promise.resolve(data);
  } else {
    // 返回错误提示
    const {message} = data;
    Loading.hide();
    Notify.create({
      message: message || "服务器繁忙，稍后再试！",
      timeout: 1500,
      color: 'red',
      position:"center"
    })
    return Promise.reject(data);
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
