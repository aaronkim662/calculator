import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    actual : 0,
    display : '',
    number: '',
    show : false,
    sign : '',
    total : '',
  }

  accumulate = (char) => {
    if (char === '+' || char === '-' || char === '*' || char === '/'){
      this.setState({
        actual: 0
      })
    }else{
      this.setState(prevState => ({
        actual : prevState.actual +parseInt(char)
      }))
    }
    this.setState(prevState => ({
      display: prevState.display + char
    }))

  }

  newNumber = () => {
    this.setState({
      actual: 0
    })
  }

  totaling = () => {
    this.setState({
      show : true
    })
    const arr = this.state.display.split('+')
    const sum = parseInt(arr[0]) + parseInt(arr[1])
    this.setState({
      total: sum
    })
  }

  render (){
    return (
      <div className='App'>
        <div className='calcRow'>
          <h2 onClick={() => this.accumulate('1')}>1</h2>
          <h2 onClick={() => this.accumulate('2')}>2</h2>
          <h2 onClick={() => this.accumulate('3')}>3</h2>
        </div>
        <div className='calcRow'>
          <h2 onClick={() => this.accumulate('4')}>4</h2>
          <h2 onClick={() => this.accumulate('5')}>5</h2>
          <h2 onClick={() => this.accumulate('6')}>6</h2>
        </div>
      <div className='calcRow'>
        <h2 onClick={() => this.accumulate('7')}>7</h2>
        <h2 onClick={() => this.accumulate('8')}>8</h2>
        <h2 onClick={() => this.accumulate('9')}>9</h2>
      </div>
      <div className='calcRow'>
        <h2 onClick={() => this.accumulate('+')}>+</h2>
        <h2 onClick={() => this.accumulate('-')}>-</h2>
        <h2 onClick={() => this.accumulate('*')}>*</h2>
        <h2 onClick={() => this.accumulate('/')}>/</h2>
      </div>
      <h4>{this.state.display}</h4>
      <h4 onClick={() => this.totaling()}>=</h4>
      <h4>{this.state.show ? this.state.total : null}</h4>
    </div>
    )
  }
}



export default App;
