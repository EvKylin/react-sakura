/**
 * Created by QiHan Wang on 2017/5/27.
 * 基础常量及项目所环境配置
 */

// 不同环境下采用不同参数
let configEvn = {};
if (process.env.NODE_ENV === `development`) {
  configEvn = require('./config.dev');
}

if (process.env.NODE_ENV === `production`) {
  /*configEvn = require('./config.prod');*/
  configEvn = require('./config.test');
}

const config = {
  brand: 'ucuxin',
  version: '1.0.1',
  appId: 1016,
  user:'18688821932',
  //user:'13534204275',
  pwd:'123456',
  ...configEvn.default
};

export default config;
