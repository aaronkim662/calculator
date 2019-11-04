import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    actual : 0,
    display : '',
    number: 0,
    show : false,
    sign : '',
    test : [],
    total : '',
  }

  accumulate = (char) => {
    if( this.state.sign === ''){

    }

    this.setState(prevState => ({
      test : [...prevState.test, char]
    }))

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
    // if(char === '+'){
    // this.setState(prevState => ({
    //   number : prevState.number + char
    // }))
    // }else{
    //   this.setState(prevState => ({
    //     number : prevState.number + parseInt(char)
    //   }))
    // }
  
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

  testTotal = () => {
    this.setState({
      show : true
    })
    const arr = this.state.test;
    let currentNum = 0
    let sum = parseInt(arr[0]);
    for(let i = 1; i < arr.length; i+=2){
      if(arr[i] === '+'){
        sum += parseInt(arr[i+1]);
      }else if(arr[i] === '-'){
        sum -= parseInt(arr[i+1]);
      }else if(arr[i] === '*'){
        sum *= parseInt(arr[i+1]);
      }else if(arr[i] === '/'){
        sum = parseFloat(sum / parseInt(arr[i+1]));
      }else{
        currentNum += arr[i]
      }
    }
    this.setState({
      total : sum
    })
  }

  render (){
    return (
      <div className='App'>
        <h1>Calculator</h1>
        <div className='calcRow'>
          <h2 onClick={() => this.accumulate('1')} className='numbers'>1</h2>
          <h2 onClick={() => this.accumulate('2')} className='numbers'>2</h2>
          <h2 onClick={() => this.accumulate('3')} className='numbers'>3</h2>
        </div>
        <div className='calcRow'>
          <h2 onClick={() => this.accumulate('4')} className='numbers'>4</h2>
          <h2 onClick={() => this.accumulate('5')} className='numbers'>5</h2>
          <h2 onClick={() => this.accumulate('6')} className='numbers'>6</h2>
        </div>
      <div className='calcRow'>
        <h2 onClick={() => this.accumulate('7')} className='numbers'>7</h2>
        <h2 onClick={() => this.accumulate('8')} className='numbers'>8</h2>
        <h2 onClick={() => this.accumulate('9')} className='numbers'>9</h2>
      </div>
      <div className='calcRow'>
        <h2 onClick={() => this.accumulate('+')} className='numbers'>+</h2>
        <h2 onClick={() => this.accumulate('-')} className='numbers'>-</h2>
        <h2 onClick={() => this.accumulate('*')} className='numbers'>*</h2>
        <h2 onClick={() => this.accumulate('/')} className='numbers'>/</h2>
      </div>
      <h4>Display: {this.state.display}</h4>
      <h4>Number: {this.state.number}</h4>
      <h4>{7+ 10}</h4>
      <h4 onClick={() => this.testTotal()}>=</h4>
      <h4>Total : {this.state.show ? this.state.total : null}</h4>
    </div>
    )
  }
}



export default App;
