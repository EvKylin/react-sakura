/**
 * Created by QiHan Wang on 2018/1/22.
 * E-Mail: whenhan@foxmail.com
 * File Name: Counter
 */

import React from 'react';
import {Button} from 'antd';

const Counter = ({value, onIncrement, onDecrement, onIncrementAsync}) =>
  <div className={'sdfsdf'}>
    <Button onClick={onIncrementAsync}>Increment after 1 second</Button>
    {' '}
    <Button onClick={onIncrement}>Increment</Button>
    {' '}
    <Button onClick={onDecrement}>Decrement</Button>
    <hr />
    <Button>Clicked: {value} times</Button>
  </div>;
export default Counter;
