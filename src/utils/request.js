/**
 * Created by QiHan Wang on 2017/5/27.
 */
import config from '../config';
import qs from 'qs';
import Token from '../utils/token';

const Request = function (method, url, data) {
  // 根据传入Url类型 重新组合Url
  if (Object.prototype.toString.call(url) === '[object Object]') {
    url = (url.domain || '') + (url.url || '');
  } else {
    url = config.api + url;
  }

  method = method.toUpperCase(); // 传入方法转为大写

  // 验证是否传入token
  if (!(data && Reflect.has(data, 'token'))) {
    const token = Token.getUserToken();
    if (token) {
      data = Object.assign({token}, (data || {}));
    } else {
      return new Promise(function (resolve, reject) {
        reject(`Interface: "${url}" Token is not found!`);
      });
    }
  }

  // 开发测试
  //if (process.env.NODE_ENV === `development`) Object.assign(data, {IsMoke: true});

  if (method === 'GET') {
    // 配置查询参数
    // 方法一
    /*if (data) {
      for (let [key, value] of Object.entries(data)) {
        if (value !== undefined && value !== '')
          url += `${url.indexOf("?") === -1 ? "?" : "&"}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    }*/

    // 方法二
    url += qs.stringify(data, {addQueryPrefix: true});

    // 请求服务器 获取数据
    return fetch(url).then(function (response) {
      return response.json();
    }).catch(function (ex) {
      console.log('parsing failed', ex);
    });

  } else if (method === 'POST') {
    // 配置POST请求参数
    // 方法一
    for (let [key, value] of Object.entries(data)) {
      if (key !== 'body') {
        url += `${url.indexOf("?") === -1 ? "?" : "&"}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    }

    // 方法二
    //url += qs.stringify(data, {addQueryPrefix: true, filter: (prefix, value) => prefix !== 'body'});

    let config = {method: 'POST'};
    const isObject = Object.prototype.toString.call(data.body) === '[object Object]';
    const isArray = Object.prototype.toString.call(data.body) === '[object Array]';
    if (isObject || isArray) {
      config = {
        ...config,
        /*headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: qs.stringify(isArray ? {'': data.body} : data.body),*/
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data.body)
      };
    } else {
      config = {...config, body: data.body}
    }

    return fetch(url, config).then(function (response) {
      return response.json();
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    });
  }
};


export default Request;
