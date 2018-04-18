import { put, takeEvery, all, call } from "redux-saga/effects";
import { push } from "react-router-redux";

// 测试接口
const api = async params => {
  console.log(params);
  return fetch(
    "http://10.10.12.92:4000/graphql?query=query%7B%0A%20%20allLinks%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%20%20description%0A%20%20%20%20postedBy%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20email%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
  ).then(response => {
    return response.json();
  });
};

const models = {
  namespace: "login",
  state: {
    status: undefined
  },
  reducers: {
    changeLoginStatus: (state, { payload }) => {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        submitting: false
      };
    },
    changeSubmitting: (state, { payload }) => {
      return {
        ...state,
        submitting: payload
      };
    }
  },
  effects: {
    *login({ payload }) {
      //console.log(payload)
      yield put({
        type: "login/changeSubmitting",
        payload: true
      });
      const response = yield call(api, payload);
      yield put({
        type: "login/changeLoginStatus",
        payload: response
      });
      // Login successfully
      if (response.status === "ok" || response) {
        yield put(push("/"));
      }
    }
  }
};


// Reducer
const reducerMethods = (state = models.state, action) => {
  const reducers = {};
  Object.keys(models.reducers).forEach(key => {
    reducers[`${models.namespace}/${key}`] = models.reducers[key];
  });
  const handler = reducers[action.type];
  return handler ? handler(state, action) : state;
};

// Sagas
const sagasWatch = Object.keys(models.effects).map(key => {
  return (function*() {
    yield takeEvery(`${models.namespace}/${key}`, models.effects[key]);
  })();
});

export { reducerMethods, sagasWatch };
