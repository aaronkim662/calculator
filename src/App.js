import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    basic: true,
    check : false,
    display : '',
    number: '',
    scientific: false,
    show : false,
    sign : '',
    test : [],
    total : '',
  }

  string = '';

  arrayIt = () => {
    let str = this.string;
    let arr = [];
    let go = true
    while(go){
    for(let i = 0; i < str.length; i+= 1){
      if(str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/'){
        let newStr = str.substring(0,i)
        arr.push(newStr)
        str = str.replace(str.substring(0,i), '')
        arr.push(str.substring(0,1))
        str = str.replace(str.substring(0,1),'')
        i = 0
        }
      }

      if(!str.includes('+') && !str.includes('-') && !str.includes('*')&& !str.includes('/')){
        go = false;
        arr.push(str)
      }
    }
      this.setState({
        test : arr
      })
  }

  accumulate = (char) => {
    if(this.state.show === true){
      this.clearAll()
    }
    this.string += char

    this.setState(prevState => ({
      display: prevState.display + char
    }))
    if (this.state.number === ''){
      this.setState({
        number : char
      })
    }else{
      this.setState(prevState => ({
        number : prevState.number + char
      }))
    }
    this.arrayIt()

  }

  clearAll = () => {
    this.setState({
      check: false,
      display: '',
      number: '',
      show: false,
      sign: '',
      test: [],
      total: '',
    })

    this.string = '';
  }
  // set sign to state
  // then add number to test
  setSign = (char) => {
    this.string += char;

    this.setState({
      sign : char,
    });

    this.setState(prevState => ({
      display: prevState.display + char
    }))

    this.setState({
      number : ''
    })

    this.arrayIt()
  };

  setScientific = () => {
    this.setState({
      basic: false,
      scientific : true
    })
  }
  handleChange = (e) => {
    e = e.target.value
    console.log(e)
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    if(!alphabet.includes(e.toLowerCase())){
      this.setState(prevState => ({
        display: e
      }))
    }
    this.string = e
    this.arrayIt();
    console.log('change', this.string)
  }

  totaling = () => {
    let arr1 = this.state.test
    let arr = arr1
    let operations = ['*', '/', '+', '-'];
    let go = true;
    while(go){
      for(let i = 0; i < arr.length; i += 1){
        if(arr[i] === operations[0]){
          const multiply = parseFloat(arr[i-1]) * parseFloat(arr[i+1]);
          arr.splice(i-1,3);
          arr.splice(i-1,0,multiply.toFixed(5));
          i = 0;
        }else if(arr[i] === operations[1]){
          const divide = (parseFloat(arr[i-1]) / parseFloat(arr[i+1]));
          arr.splice(i-1,3);
          arr.splice(i-1,0,divide.toFixed(5));
          i = 0;
        }
      }
      if(!arr.includes(operations[0]) && !arr.includes(operations[1])){
        go = false;
        operations.shift();
        operations.shift();
      }
    }
      let run = true;
      while(run){
      for(let i = 0; i < arr.length; i += 1){
        if(arr[i] === operations[0]){
          const add = parseFloat(arr[i-1]) + parseFloat(arr[i+1]);
          const split = arr.splice(i-1,3);
          arr.splice(i-1,0,add.toFixed(5));
          i = 0;
        }else if(arr[i] === operations[1]){
          const subtract = parseFloat(arr[i-1]) - parseFloat(arr[i+1]);
          const split = arr.splice(i-1,3);
          arr.splice(i-1,0, subtract.toFixed(5));
          i = 0;
        }
      }
      if(!arr.includes(operations[0]) && !arr.includes(operations[1])){
        run = false;
        operations.shift();
        operations.shift();
      }
    }
    this.setState({
      total : arr[0],
      show : true,
    })
  }

  testTotal = () => {
    if(this.state.number !== ''){
    this.setState(prevState => ({
      number : '',
      check : true
      }))
    }
    this.totaling()
  }

  render (){
    console.log('string', this.string)
    return (
      <div className='App'>
        <h1>Calculator</h1>
        <button onClick={this.setScientific}>Scientific</button>
        {this.state.basic ? 
        <>
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
        <h2 onClick={() => this.accumulate('0')} className='numbers'>0</h2>
        <h2 onClick={() => this.accumulate('.')} className='numbers'>.</h2>

      </div>
      <div className='calcRow'>
        <h2 onClick={() => this.setSign('+')} className='numbers'>+</h2>
        <h2 onClick={() => this.setSign('-')} className='numbers'>-</h2>
        <h2 onClick={() => this.setSign('*')} className='numbers'>*</h2>
        <h2 onClick={() => this.setSign('/')} className='numbers'>/</h2>
      </div>
      <h4>Display: {this.state.display}</h4>
      <h4>...</h4>
      <input className='calcInput' onChange={(e) => this.handleChange(e)} value={this.state.display}  />
      <div className='calcRow'>
      <h4 onClick={() => this.testTotal()}>=</h4>
      <h4>Total : {this.state.show ? this.state.total : null}</h4>
      <h4 onClick={() => this.clearAll()}>Clear</h4>
      </div>
      </>
       : 
       <>
       <div className='calcRow'>
          <h2 className='numbers'>1</h2>
          <h2 className='numbers'>2</h2>
          <h2 className='numbers'>3</h2>
          <h2 className='numbers'>4</h2>
       </div>
       <div className='calcRow'>
          <h2 className='numbers'>5</h2>
          <h2 className='numbers'>6</h2>
          <h2 className='numbers'>7</h2>
          <h2 className='numbers'>8</h2>
          <h2 className='numbers'>9</h2>
       </div>
       <div className='calcRow'>
          <h2 className='numbers'>-</h2>
          <h2 className='numbers'>*</h2>
          <h2 className='numbers'>/</h2>
          <h2 className='numbers'>+</h2>
       </div>
       <h4>Display: {this.state.display}</h4>
      <h4>...</h4>
      <input className='calcInput' onChange={(e) => this.handleChange(e)} value={this.state.display}  />
      <div className='calcRow'>
      <h4 onClick={() => this.testTotal()}>=</h4>
      <h4>Total : {this.state.show ? this.state.total : null}</h4>
      <h4 onClick={() => this.clearAll()}>Clear</h4>
      </div>
       </> }
    </div>
        
    )
  }
}

export default App;
