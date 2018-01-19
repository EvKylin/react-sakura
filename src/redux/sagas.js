/**
 * Created by QiHan Wang on 2018/1/19.
 * E-Mail: whenhan@foxmail.com
 * File Name: sagas
 */
import {delay} from 'redux-saga'
import {put, takeEvery, all, call} from 'redux-saga/effects'


function* helloSaga() {
  yield delay(1000);
  console.log('Hello Sagas!')
}

function* incrementAsync() {
  yield delay(1000)
  yield put({type: 'INCREMENT'})
}




function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function* login({ payload }, { call, put }) {
  console.log('df')
  yield put({
    type: 'changeSubmitting',
    payload: true,
  });
/*  const response = yield call(fakeAccountLogin, payload);
  yield put({
    type: 'changeLoginStatus',
    payload: response,
  });
  // Login successfully
  if (response.status === 'ok') {
    //yield put(routerRedux.push('/'));
  }*/
};

function* watchLogin() {
  yield takeEvery('login', login)
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchLogin()
  ])
}
