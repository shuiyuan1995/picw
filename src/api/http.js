import axios from "axios";
import qs from "qs";
import store from "@store";

// 请求配置参数
const http = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://manage.pickown.com/api"
      : "http://pickown.test/api", // 基础路径
  timeout: 5000 // 请求延时
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
