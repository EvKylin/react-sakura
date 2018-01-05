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
export default uid;
