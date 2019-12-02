import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    basic: true,
    check : false,
    display : '',
    mode : 'Rad',
    number: '',
    parens : true,
    scientific: false,
    show : false,
    sign : '',
    test : [],
    total : 0,
  }

  string = '';
  parensTest = '';

  // separate operators
  accountParens = () => {
    let arr = this.string
    let operations = ['*', '/', '+', '-','(',')'];
    let go = true;
    while(go){
      for(let i = 0; i < arr.length - 1; i += 1){
        if(arr[i] === ')' && arr[i+1] === '('){
          arr.splice(i+1,0,'*')
          i = 0
        }else if(!operations.includes(arr[i]) && arr[i+1] === '('){
          arr.splice(i+1,0,'*')
          i = 0
        }else if(arr[i] === ')' && !operations.includes(arr[i+1])){
          arr.splice(i+1,0,'*')
          i = 0
        }else{
          go = false
        }
      }
    }
    console.log('account', this.string)
    return arr
  }

  // keep adding to display and inputs
  accumulate = (char) => {
    if(this.state.show === true){
      this.clearAll();
    }
    this.string += char;

    this.setState(prevState => ({
      display: prevState.display + char,
    }))
    if (this.state.number === ''){
      this.setState({
        number : char,
      })
    }else{
      this.setState(prevState => ({
        number : prevState.number + char,
      }))
    }
    this.arrayIt();
  }

  // add parens to display
  addParens = () => {
    if(this.state.parens === true){
      this.setState(prevState => ({
        parens : false,
        display : prevState.display + '('
      }))
      this.string += '(';
    }else{
      this.setState(prevState => ({
        parens : true,
        display : prevState.display + ')'
      }))
      this.string += ')';
    }
    this.arrayIt();
  }

  arrayIt = () => {
    let str = this.string;
    let arr = [];
    let go = true;
    while(go){
    for(let i = 0; i < str.length; i+= 1){
      if(str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/' || (str[i] === '(') ||str[i] === ')'){
        let newStr = str.substring(0,i);
        if(newStr !== ''){
          arr.push(newStr)
        }
        str = str.replace(str.substring(0,i), '');

        if(str.substring(0,1) !== ''){
          arr.push(str.substring(0,1))
        }

        str = str.replace(str.substring(0,1),'');
        i = -1;
        }
      }

      if(!str.includes('+') && !str.includes('-') && !str.includes('*')&& !str.includes('/') && !str.includes('(') && !str.includes(')')){        
        go = false;
        arr.push(str);
      }
    }
    if(arr[arr.length - 1] === ''){
      arr.pop()
    }
      this.setState({
        test : arr,
      })
      this.parensTest = arr
      console.log('arrayIt', this.parensTest)
  }

  // do operations within parens
  parens = () => {
    let arr = this.parensTest
    let count = 0
    let start = 0;
    let stop = 0
    for(let i = 0; i < arr.length;i += 1){
      if(count !== 2 ){
        if(arr[i] === '('){
          start = i
          count += 1
        }else if(arr[i] === ')'){
          stop = i
          count += 1
        }
      }
    }

    if(count === 2){
      let newArr = arr.splice(start,stop - start + 1)
      let newArr1 = newArr.splice(1,newArr.length - 2)
      console.log('newArr1', newArr1)
      const newNum = this.totaling(newArr1)
      arr.splice(start,0,newNum)
      console.log('arrparens', newNum)
    }
    return this.parensTest
  }

  totaling = (input) => {
    // let arr1 = this.parensDisplay === '' ? this.state.display : this.parensDisplay
    // console.log('arr1', arr1)
    let arr = input;
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
          arr.splice(i-1,0,divide.toFixed(2));
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
          arr.splice(i-1,3);
          arr.splice(i-1,0,add.toFixed(5));
          i = 0;
        }else if(arr[i] === operations[1]){
          const subtract = parseFloat(arr[i-1]) - parseFloat(arr[i+1]);
          arr.splice(i-1,3);
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
    });
    console.log('totaling', arr[0])
    return arr[0]
  }

  testTotal = () => {
    let newArr = this.accountParens()
    console.log('parens', newArr)
    if(this.state.number !== ''){
    this.setState(prevState => ({
      number : '',
      check : true,
      test : newArr
      }))
    }
    let go = true
    while(go){
      if(this.state.test.includes('(') && this.state.test.includes(')')){
        this.parens();
      }else{
        go = false
      }
    }
    this.parensDisplay = '';
  
  return this.totaling(this.parensTest)
}

//

// handle changes
handleChange = (e) => {
  e = e.target.value;
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  if(!alphabet.includes(e.toLowerCase())){
    this.setState(prevState => ({
      display: e,
    }))
  }
  this.string = e;
  this.arrayIt();
}

handlePi = () => {
  this.setState(prevState => ({
    display: prevState.display + 'PI'
  }))
}
//
// set modes and states
setBasic = () => {
  this.setState({
    basic: true,
    scientific: false
  })
}

setMode = (e) => {
  e.preventDefault();
  if(this.state.mode === 'Rad'){
    this.setState({
      mode : 'Deg'
    })
  }else if(this.state.mode === 'Deg'){
    this.setState({
      mode : 'Rad'
    })
  }
}
// set sign to state
// then add number to test
setSign = (char) => {
  this.string += char;

  this.setState({
    sign : char,
  });

  this.setState(prevState => ({
    display: prevState.display + char,
  }))

  this.setState({
    number : '',
  })

  this.arrayIt();
};

setScientific = () => {
  this.setState({
    basic: false,
    scientific : true,
  })
}
// 

// Clear all
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
  this.parensTest = ''
}
// 


  render (){
    return (
      <div className='App'>
        <h1>Calculator</h1>
        <button onClick={this.setBasic}>Basic</button>
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
      </div>
      <div className='calcRow'>
        <h2 onClick={() => this.accumulate('0')} className='numbers'>0</h2>
        <h2 onClick={() => this.accumulate('.')} className='numbers'>.</h2>
        <h2 onClick={() => this.addParens()} className='numbers'>()</h2>
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
       <div>Scientific</div>
       <button onClick={(e) => this.setMode(e)}>{this.state.mode}</button>
       <div className='calcRow'>
        <h2 className='numbers'>0</h2>
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
       <div className='calcRow'>
        <h2 className='numbers'>sin</h2>
        <h2 className='numbers'>cos</h2>
        <h2 className='numbers'>tan</h2>
        <h2 className='numbers'>^</h2>
        <h2 className='numbers'>log</h2>
        <h2 className='numbers'>ln</h2>
        <h2 className='numbers'>e</h2>
        <h2 className='numbers' onClick={() => this.handlePi()}>π</h2>
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
