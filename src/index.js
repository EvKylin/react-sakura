import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import App from './views/Dashboard/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/user" render={props => <UserLayout {...props} {...passProps} />}/>
      <Route path="/" render={props => <BasicLayout {...props} {...passProps} />}/>
    </Switch>
  </Router>, document.getElementById('root'));
registerServiceWorker();
