/**
 * Created by QiHan Wang on 2017/5/27.
 * E-mail: whenhan@foxmail.com
 * 用于开发环境下环境常量
 */

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
//const port = process.env.PORT ? `:${process.env.PORT}` : '';

export default {
  //api: 'http://localhost:9000/api/',
  api: `${protocol}://api.test.ucuxin.com/`,
  //api:'http://10.10.12.178:5284',
  appSecret: '4a66e4e53bcd4c5e9e43241c711698ba', //1016
  appAddress: `${protocol}://m.test.ucuxin.com/`,
};
