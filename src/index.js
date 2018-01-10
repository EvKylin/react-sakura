import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import App from './views/Dashboard/App';
import cloneDeep from 'lodash/cloneDeep';
import registerServiceWorker from './registerServiceWorker';

import {getNavData} from './common/nav';


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
  <Router>
    <Switch>
      {/* <Route path="/user" render={props => <UserLayout {...props} {...passProps} />}/>*/}
      <Route path="/" render={props => <BasicLayout {...props} {...passProps} />}/>
    </Switch>
  </Router>, document.getElementById('root')
)
;
registerServiceWorker();
