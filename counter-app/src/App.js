import React, { Component } from 'react';
import './App.css';
import Button from './components/Button';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      count: 0
    };
  }

  doDeviation = (operator) => {
    this.setState({
      count: this.state.count + (operator === "+" ? 1 : -1)
    });
  }

  render() {
    let { count } = this.state

    return (
      <div className="App">
        <h2>Count: {count} </h2>
        <Button
        title={ "+" }
        task={  () => this.doDeviation("+") }
        />
        <Button
        title={ "-" }
        task={ () => this.doDeviation("-") }
        />
      </div>
    );
  }
}
