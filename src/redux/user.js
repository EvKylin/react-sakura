/**
 * Created by QiHan Wang on 2018/1/17.
 * E-Mail: whenhan@foxmail.com
 * File Name: user
 */
const reducers = {
  save(state, action) {
    return {
      ...state,
      list: action.payload,
    };
  },
  changeLoading(state, action) {
    return {
      ...state,
      loading: action.payload,
    };
  },
  saveCurrentUser(state, action) {
    return {
      ...state,
      currentUser: action.payload,
    };
  },
  changeNotifyCount(state, action) {
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        notifyCount: action.payload,
      },
    };
  },
};
export default function user(user = {
  list: [],
  loading: false,
  currentUser: {},
}, action) {
  const handler = reducers[action.type.split('/')[1]];

  return handler ? handler(user, action) : user
}
