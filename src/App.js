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
    test : [],
    total : '',
    check : false
  }

  accumulate = (char) => {
    if (this.state.number === ''){
      this.setState({
        number : char
      })
    }else{
      this.setState(prevState => ({
        number : prevState.number + char
      }))
    }

    this.setState(prevState => ({
      display: prevState.display + char
    }))
  }

  clearAll = () => {
    this.setState({
      display: '',
      number: '',
      show: false,
      sign: '',
      test: [],
      total: '',
      check: true
    })
  }
  // set sign to state
  // then add number to test
  setSign = (char) => {
    this.setState({
      sign : char,
    });

    this.setState(prevState => ({
      test : [...prevState.test, this.state.number]
    }));

    this.setState({
      number: ''
    })

    this.setState(prevState => ({
      test : [...prevState.test, char]
    }));

    this.setState(prevState => ({
      display: prevState.display + char
    }))
  };

  totaling = () => {

  }
  setTest = () => {

  }

  testTotal = () => {
    if(this.state.number !== ''){
    this.setState(prevState => ({
      test : [...prevState.test, this.state.number],
      check : true
    }))
  }
  if(this.state.check === true){
    let arr = this.state.test;
    let sum = parseInt(arr[0]);
    console.log('hello', arr)
    for(let i = 1; i < arr.length; i+=2){
      if(arr[i] === '+'){
        sum += parseInt(arr[i+1]);
      }else if(arr[i] === '-'){
        sum -= parseInt(arr[i+1]);
      }else if(arr[i] === '*'){
        sum *= parseInt(arr[i+1]);
      }else if(arr[i] === '/'){
        sum = parseFloat(sum / parseInt(arr[i+1]));
      }
    }
    this.setState({
      number : ''
    })
    if(!isNaN(sum)){
      console.log('true')
    this.setState({
      show : true,
      total : sum
    })
  }else{
    console.log('false')
    }
  }
    

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
        <h2 onClick={() => this.setSign('+')} className='numbers'>+</h2>
        <h2 onClick={() => this.setSign('-')} className='numbers'>-</h2>
        <h2 onClick={() => this.setSign('*')} className='numbers'>*</h2>
        <h2 onClick={() => this.setSign('/')} className='numbers'>/</h2>
      </div>
      <h4>Display: {this.state.display}</h4>
      <h4>Number: {this.state.number}</h4>
      <h4>...</h4>
      <div className='calcRow'>
      <h4 onClick={() => this.testTotal()}>=</h4>
      <h4>Total : {this.state.show ? this.state.total : null}</h4>
      <h4 onClick={() => this.clearAll()}>Clear</h4>
      </div>
    </div>
    )
  }
}



export default App;
