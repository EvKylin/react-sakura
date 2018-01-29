/**
 * Created by QiHan Wang on 2018/1/19.
 * E-Mail: whenhan@foxmail.com
 * File Name: sagas
 */
import {delay} from 'redux-saga'
import {put, takeEvery, all, call} from 'redux-saga/effects';
import {push} from 'react-router-redux'

const api = async (params) => {
  console.log(params)
  return fetch('http://10.10.12.92:4000/graphql?query=query%7B%0A%20%20allLinks%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%20%20description%0A%20%20%20%20postedBy%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20email%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D').then(response=>{
    return response.json();
  });
};

function* helloSaga() {
  yield delay(1000);
  console.log('Hello Sagas!')
}

function* incrementAsync() {
  yield delay(1000);
  yield put({type: 'INCREMENT'})
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function* login({ payload }) {
  //console.log(payload)
  yield put({
    type: 'login/changeSubmitting',
    payload: true,
  });
  const response = yield call(api, payload);
  yield put({
    type: 'login/changeLoginStatus',
    payload: response,
  });
  // Login successfully
  if (response.status === 'ok' || response) {
    yield put(push('/'));
  }
}

function* watchLogin() {
  yield takeEvery('login/login', login)
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
