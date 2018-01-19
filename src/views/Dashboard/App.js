import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux'
import logo from '../../assets/logo-react.svg';
import style from './App.css';
import {Button} from 'antd';

const Counter = ({value, onIncrement, onDecrement, onIncrementAsync}) =>
  <div>
    <button onClick={onIncrementAsync}>Increment after 1 second</button>
    {' '}
    <button onClick={onIncrement}>Increment</button>
    {' '}
    <button onClick={onDecrement}>Decrement</button>
    <hr/>
    <div>Clicked: {value} times</div>
  </div>;

class App extends Component {
  componentWillMount() {
    console.log(this.props)


    fetch('http://10.10.12.92:3000/graphql?query=query%7B%0A%20%20allLinks%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%20%20description%0A%20%20%20%20postedBy%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20email%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D').then(res => {
    })
  }


  render() {
    return (
      <div className={style.App}>
        <header className={style.AppHeader}>
          <img src={logo} className={style.AppLogo} alt="logo"/>
          <h1 className={style.AppTitle}>Welcome to React</h1>
        </header>
        <p className={style.AppIntro}>
          <Button type="primary" onClick={() => this.props.dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: !this.props.collapsed
          })}>sdf</Button>
          To get started, edit <code>src/App.js</code> and save to reload.

          <Counter
            value={this.props.xxx}
            onIncrement={() => this.props.dispatch({type: 'INCREMENT'})}
            onDecrement={() => this.props.dispatch({type: 'DECREMENT'})}
            onIncrementAsync={() => this.props.dispatch({type: 'INCREMENT_ASYNC'})}
          />
          <button onClick={() => this.props.dispatch({
            type: 'login', payload: {
              name: 'iiii',
              type: 5,
            },
          })}>sdfsf
          </button>
        </p>
      </div>
    );
  }
}

export default connect((state) => {
  console.log(state)
  return {
    //xxx: state.getState(),
    collapsed: state.global.collapsed
  }
})(App);
