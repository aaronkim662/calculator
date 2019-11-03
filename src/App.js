import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [number, setNumber] = React.useState({
    current : ''
  });
  const [sign, setSign] = React.useState({
    sign: ''
  });
  const [show, setShow] = React.useState({
    show: false,
    value: 0
  })

  const display = (e) => {
    e.preventDefault();
    setShow({show: true})

  }

  const operation = (num) => {
    if(number.current === ''){
      setNumber({current : num})
    }
    if (sign.sign === '' ){
      setNumber({current : number.current + num})
    }
    if (sign.sign === '+'){
      setNumber({current: num})
      setShow({value: parseInt(number.current) + parseInt(num)})
    }else if (sign.sign === '-'){
      setShow({value: parseInt(number.current) - parseInt(num)})
      setNumber({current: ''})
    }else if (sign.sign === '*'){
      setShow({value: parseInt(number.current) * parseInt(num)})
      setNumber({current: ''})
    }else if (sign.sign === '/'){
      setShow({value: parseFloat(number.current / parseInt(num))})
      setNumber({current: ''})
    }
  }

  return(
    <div className='App'>
    <div className='calcRow'>
      <h2 onClick={() => operation('1')}>1</h2>
      <h2 onClick={() => operation('2')}>2</h2>
      <h2 onClick={() => operation('3')}>3</h2>
    </div>
    <div className='calcRow'>
      <h2 onClick={() => operation('4')}>4</h2>
      <h2 onClick={() => operation('5')}>5</h2>
      <h2 onClick={() => operation('6')}>6</h2>
    </div>
    <div className='calcRow'>
      <h2 onClick={() => operation('7')}>7</h2>
      <h2 onClick={() => operation('8')}>8</h2>
      <h2 onClick={() => operation('9')}>9</h2>
    </div>
    <div className='calcRow'>
      <h2 onClick={() => setSign({sign: '+'})}>+</h2>
      <h2 onClick={() => setSign({sign: '-'})}>-</h2>
      <h2 onClick={() => setSign({sign: '*'})}>*</h2>
      <h2 onClick={() => setSign({sign: '/'})}>/</h2>
    </div>
    <div>
    <h2>Your value {show.show === true ? show.value : number.current }</h2>
    <h2>{number.current}</h2>
    <h2 onClick={(e) => display(e)}>=</h2>
    <h2 onClick={() => setNumber({current: 0})}>Clear</h2>
    </div>
    </div>

  )
}

export default App;
