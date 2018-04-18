import { put, takeEvery, all, call } from "redux-saga/effects";

const models = {
  namespace: "user",
  state: {
    list: [],
    loading: false,
    currentUser: {}
  },
  reducers: {
    save: (state, action) => {
      return {
        ...state,
        list: action.payload
      };
    },
    changeLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload
      };
    },
    saveCurrentUser: (state, action) => {
      return {
        ...state,
        currentUser: action.payload
      };
    },
    changeNotifyCount: (state, action) => {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload
        }
      };
    }
  },
  effects: {}
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
