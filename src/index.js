import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Switch, Route} from 'react-router-dom';
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux';
import './index.css';
import cloneDeep from 'lodash/cloneDeep';
import registerServiceWorker from './registerServiceWorker';

// 本地路由
import {getNavData} from './common/nav';

import reducers from './common/reducers';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    // ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))


function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

function getRouteData(navData, path) {
  console.log(navData, path)
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  console.log(nodeList)
  return nodeList;
}

function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}


const navData = getNavData();
//const UserLayout = getLayout(navData, 'UserLayout').component;
const BasicLayout = getLayout(navData, 'BasicLayout').component;

const passProps = {
  navData,
  getRouteData: (path) => {
    return getRouteData(navData, path);
  },
};
// <Router history={history}>
ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <Switch>
        {/* <Route path="/user" render={props => <UserLayout {...props} {...passProps} />}/>*/}
        <Route path="/" render={props => <BasicLayout {...props} {...passProps} />}/>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
