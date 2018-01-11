/**
 * Created by QiHan Wang on 2018/1/11.
 * E-Mail: whenhan@foxmail.com
 * File Name: global
 */

const reducers = {
  changeLayoutCollapsed(state, {payload}) {
    return {
      ...state,
      collapsed: payload,
    };
  },
  saveNotices(state, {payload}) {
    return {
      ...state,
      notices: payload,
      fetchingNotices: false,
    };
  },
  saveClearedNotices(state, {payload}) {
    return {
      ...state,
      notices: state.notices.filter(item => item.type !== payload),
    };
  },
  changeNoticeLoading(state, {payload}) {
    return {
      ...state,
      fetchingNotices: payload,
    };
  },
};

export default function global(global = {
  collapsed: false,
  notices: [],
  fetchingNotices: false,
}, action) {
  const handler = reducers[action.type.split('/')[1]];

  return handler ? handler(global, action) : global
}
