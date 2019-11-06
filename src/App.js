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
      check: false
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

  // totaling = () => {
  //   let arr = this.state.test
  //   let sum = parseInt(arr[0]);
  //   for(let i = 1; i < arr.length; i+=2){
  //     if(arr[i] === '+'){
  //       sum += parseInt(arr[i+1]);
  //     }else if(arr[i] === '-'){
  //       sum -= parseInt(arr[i+1]);
  //     }else if(arr[i] === '*'){
  //       sum *= parseInt(arr[i+1]);
  //     }else if(arr[i] === '/'){
  //       sum = parseFloat(sum / parseInt(arr[i+1]));
  //     }
  //   }
  //   console.log('sum', sum, arr)
  //   if(!isNaN(sum)){
  //   this.setState({
  //     show : true,
  //     total: sum
  //   })
  // }
  //   return sum
  // }
  totaling = () => {
    let arr = this.state.test
    let operations = ['*', '/', '+', '-'];
    let go = true;
    while(go){
      for(let i = 0; i < arr.length; i += 1){
        if(arr[i] === operations[0]){
          const multiply = parseFloat(parseInt(arr[i-1])) * parseFloat(parseInt(arr[i+1]));
          const split = arr.splice(i-1,3);
          arr.splice(i-1,0,multiply);
          i = 0;
        }else if(arr[i] === operations[1]){
          const divide = parseFloat(parseInt(arr[i-1])) / parseFloat(parseInt(arr[i+1]));
          const split = arr.splice(i-1,3);
          arr.splice(i-1,0,divide);
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
          const add = parseFloat(parseInt(arr[i-1])) + parseFloat(parseInt(arr[i+1]));
          const split = arr.splice(i-1,3);
          arr.splice(i-1,0,add);
          i = 0;
        }else if(arr[i] === operations[1]){
          const subtract = parseFloat(parseInt(arr[i-1])) - parseFloat(parseInt(arr[i+1]));
          const split = arr.splice(i-1,3);
          arr.splice(i-1,0, subtract);
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
      test : [...prevState.test, this.state.number],
      number : '',
      check : true
      }))
    }
    let arr = this.state.test
    if(arr[arr.length-1] === '+' || arr[arr.length-1] === '-' || arr[arr.length-1] === '*' || arr[arr.length-1] === '/'){
      console.log('click')
    }else{
    this.totaling()
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
