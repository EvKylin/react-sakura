import React, { Component } from 'react';
import logo from '../../assets/logo-react.svg';
import './App.css';
import {Button} from 'antd';

class App extends Component {
  componentWillMount(){
    console.log(this.props)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <Button type="primary">sdf</Button>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
