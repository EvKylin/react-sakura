import { delay } from "redux-saga";
import { put, takeEvery, all, call } from "redux-saga/effects";
import { push } from "react-router-redux";

import { sagasWatch as login } from "./login";
import { sagasWatch as user } from "./user";
import { sagasWatch as global } from "./global";

function* helloSaga() {
  yield delay(1000);
  console.log("Hello Sagas!");
}

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), ...login, ...user, ...global]);
}
