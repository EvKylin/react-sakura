const reducers = {
  'login/changeLoginStatus': (state, {payload}) => {
    return {
      ...state,
      status: payload.status,
      type: payload.type,
      submitting: false,
    };
  },
  'login/changeSubmitting':(state, {payload})=> {
    return {
      ...state,
      submitting: payload,
    };
  },
};

export default function login(user = {
  status: undefined,
}, action) {
  const handler = reducers[action.type];

  return handler ? handler(login, action) : login
}
