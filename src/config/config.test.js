/**
 * Created by QiHan Wang on 2017/5/27.
 * 用于生产环境下环境常量
 */
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
export default {
  api: `${protocol}://api.test.ucuxin.com/`,
  appSecret: '4a66e4e53bcd4c5e9e43241c711698ba', // 1016
  appAddress: `${protocol}://m.test.ucuxin.com/`,
};

