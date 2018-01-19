/**
 * Created by QiHan Wang on 2018/1/12.
 * E-Mail: whenhan@foxmail.com
 * File Name: configureStore
 */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';


// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

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

  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    applyMiddleware(...middlewares)
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
