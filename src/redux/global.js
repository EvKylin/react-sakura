import { put, takeEvery, all, call } from "redux-saga/effects";
const models = {
  namespace: "global",
  state: {
    collapsed: false,
    notices: [],
    fetchingNotices: false
  },
  reducers: {
    changeLayoutCollapsed: (state, { payload }) => {
      return {
        ...state,
        collapsed: payload
      };
    },
    saveNotices: (state, { payload }) => {
      return {
        ...state,
        notices: payload,
        fetchingNotices: false
      };
    },
    saveClearedNotices: (state, { payload }) => {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload)
      };
    },
    changeNoticeLoading: (state, { payload }) => {
      return {
        ...state,
        fetchingNotices: payload
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
