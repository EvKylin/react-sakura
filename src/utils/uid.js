/**
 * Created by QiHan Wang on 2017/11/30.
 * E-Mail: whenhan@foxmail.com
 * File Name: uid
 */
let now = +new Date();
let index = 0;

function uid(prefix = 'uid') {
  return `${prefix}-${now}-${++index}`;
}

// 使用 crypto API 生成符合 RFC4122 版本4的UUID。 https://www.ietf.org/rfc/rfc4122.txt
const uuid = _ => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
export default uid;
