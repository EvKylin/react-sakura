const reducers = {
  changeLoginStatus(state, {payload}) {
    return {
      ...state,
      status: payload.status,
      type: payload.type,
      submitting: false,
    };
  },
  changeSubmitting(state, {payload}) {
    return {
      ...state,
      submitting: payload,
    };
  },
};

export default function login(user = {
  status: undefined,
}, action) {
  const handler = reducers[action.type.split('/')[1]];

  return handler ? handler(login, action) : login
}
