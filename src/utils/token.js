/**
 * Created by QiHan Wang on 2017/10/20.
 * E-Mail: whenhan@foxmail.com
 * File Name: Token
 */
import qs from 'qs';
import md5 from 'blueimp-md5';
import config from '../config';
import params from './params';
import Storage from './storage';

const brand = config.brand ? `${config.brand.toUpperCase()}_` : '';
const TOKEN_USER = `${brand}TOKEN_USER`;// 用户Token
const TOKEN_APP = `${brand}TOKEN_APP`;  // 应用Token
const USER_INFO = `${brand}USER_INFO`;  // 用户信息
const USER_GID = `${brand}USER_GID`;    // 机构ID
const USER_UID = `${brand}USER_UID`;    // 用户UID


/**
 * Token
 * 平台应用Token管理
 */
export default class Token {
  // 获取本地已存在的用户Token
  static getUserToken() {
    return config[TOKEN_USER] || Storage().get(TOKEN_USER);
  }

  // 获取本地已存在的应用Token
  static getAppToken() {
    return config[TOKEN_APP] || Storage().get(TOKEN_APP);
  }

  // 设置本地用户Token
  static setUserToken(token) {
    Storage().set(TOKEN_USER, token);
    config[TOKEN_USER] = token;
  }

  // 设置本地应用Token
  static setAppToken(token) {
    Storage().set(TOKEN_APP, token);
    config[TOKEN_APP] = token;
  }

  // 删除Token
  static delToken() {
    Storage().del(TOKEN_USER);
  }

  // =======================================================================================
  // 获取当前时间戳
  static getCurrentTime() {
    return parseInt(new Date().getTime() / 1000, 10);
  }

  // 从服务器获取最新用户Token
  static fetchUserToken() {
    // 生产环境从地址栏获取用户token
    if (process.env.NODE_ENV === `production`) {
      const token = params.searchParamName('AccessToken');  // 值为字符串或null
      return new Promise(function (resolve, reject) {
        if (token) {
          resolve({Ret: 0, Data: {Token: token}});
        } else {
          reject('AccessToken is not found！');
        }
      })
    }

    if (process.env.NODE_ENV === `development`) {
      const ts = this.getCurrentTime();
      return fetch(`${config.api}base/v3/Auth/GetOpenAPITokenByUser?${qs.stringify({
        uxcode: config.user,
        md5pwd: md5(config.pwd),
        appid: config.appId,
        ts,
        md5ts: md5(config.appSecret + ts)
      })}`).then(function (response) {
        return response.json();
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      });
    }
  }

  // 从服务器获取最新应用oken
  static fetchAppToken() {
    const ts = this.getCurrentTime();
    return fetch(`${config.api}base/v3/Auth/GetOpenAPITokenByAppid?${qs.stringify({
      appid: config.appId,
      ts: ts,
      md5ts: md5(config.appSecret + ts)
    })}`).then(function (response) {
      return response.json();
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    });
  }

  // =======================================================================================
  // 组织机构
  static getGid() {
    return config[USER_GID] || Storage().get(USER_GID);
  }

  static setGid(gid) {
    Storage().set(USER_GID, gid);
    config[USER_GID] = gid;
  }

  static delGid() {
    Storage().del(USER_GID);
  }

  // 用户UID
  static getUid() {
    return config[USER_UID] || Storage().get(USER_UID);
  }

  static setUid(uid) {
    Storage().set(USER_UID, uid);
    config[USER_UID] = uid;
  }

  static delUid() {
    Storage().del(USER_UID);
  }

  // 用户Info
  static getUserInfo() {
    return config[USER_INFO] || Storage().get(USER_INFO);
  }

  static setUserInfo(info) {
    Storage().set(USER_INFO, info);
    config[USER_INFO] = info;
  }

  static delUserInfo() {
    Storage().del(USER_INFO);
  }

  // ===================================================================================================================
  // 移动端内嵌H5身份绑定
  static fetchAppInfo(fn) {
    this.fn = fn;
    window.location.href = 'ucux://getappinfo?callback=onGetAppInfo'
  }

  // 注册移动端获取用户信息方法
  static setFetchAppInfoMethod() {
    window.onGetAppInfo = dataStr => {
      const data = JSON.parse(dataStr);
      this.setUserToken(data.AccessToken);
      this.setUserInfo(data);
      //this.setAppVer(data.CurAppVer);
      if (this.fn) {
        this.fn(data);
        this.fn = null;
      }
    }
  }
}
