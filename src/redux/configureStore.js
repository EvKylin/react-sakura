/**
 * Created by QiHan Wang on 2018/1/12.
 * E-Mail: whenhan@foxmail.com
 * File Name: configureStore
 */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {routerReducer, routerMiddleware} from 'react-router-redux';
//import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';


const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const {logger} = require(`redux-logger`);
  middlewares.push(logger);
}

export default function configureStore(history, initialState) {
  /* const nextMiddlewares = [...middlewares, routerMiddleware(history)];
   return compose(applyMiddleware(...nextMiddlewares))(createStore)(combineReducers({
     ...reducers,
     router: routerReducer
   }), initialState)*/
  middlewares.push(routerMiddleware(history));

  return createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    applyMiddleware(...middlewares)
  )
}
