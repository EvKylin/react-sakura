/**
 * Created by QiHan Wang on 2017/5/27.
 * 用于生产环境下环境常量
 */
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
export default {
  api: `${protocol}://api.ucuxin.com/`,
  appSecret: '7c198e9b76504ec889b6ba17de485bfe',
  appAddress: `${protocol}://m.ucuxin.com/`,
};


