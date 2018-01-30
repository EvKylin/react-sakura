/**
 * Created by QiHan Wang on 2018/1/17.
 * E-Mail: whenhan@foxmail.com
 * File Name: user
 */
const reducers = {
  'user/save':(state, action) =>{
    return {
      ...state,
      list: action.payload,
    };
  },
  'user/changeLoading': (state, action) =>{
    return {
      ...state,
      loading: action.payload,
    };
  },
  'user/saveCurrentUser': (state, action) =>{
    return {
      ...state,
      currentUser: action.payload,
    };
  },
  'user/changeNotifyCount': (state, action) =>{
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
  const handler = reducers[action.type];

  return handler ? handler(user, action) : user
}
