import React from 'react';

class Scientific extends React.Component {
    state = {
        display : '',
        mode :  'Deg',
        parens : true,
    }


    string = '';
    parensTest = '';

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
        // this.arrayIt();
    }

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
        // this.arrayIt();
    }

    handlePi = () => {
        this.setState(prevState => ({
          display: prevState.display + 'PI'
        }))
        this.string += '*Pi'
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
      
        // this.arrayIt();
      };

    setTrig = (char) => {
        this.string += char + '('
        console.log('string', this.string)
        this.setState({
            parens : false
        })

        this.setState(prevState => ({
            display: prevState.display + char + '(',
          }))
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
        this.parensTest = ''
      }
    render(){
        return(
            <>
            <div>Scientific</div>
            <button onClick={(e) => this.setMode(e)}>{this.state.mode}</button>
            <div className='calcRow'>
             <h2 onClick={() => this.accumulate('0')} className='numbers'>0</h2>
             <h2 onClick={() => this.accumulate('1')} className='numbers'>1</h2>
             <h2 onClick={() => this.accumulate('2')} className='numbers'>2</h2>
             <h2 onClick={() => this.accumulate('3')} className='numbers'>3</h2>
             <h2 onClick={() => this.accumulate('4')} className='numbers'>4</h2>
            </div>
            <div className='calcRow'>
             <h2 onClick={() => this.accumulate('5')} className='numbers'>5</h2>
             <h2 onClick={() => this.accumulate('6')} className='numbers'>6</h2>
             <h2 onClick={() => this.accumulate('7')} className='numbers'>7</h2>
             <h2 onClick={() => this.accumulate('8')} className='numbers'>8</h2>
             <h2 onClick={() => this.accumulate('9')} className='numbers'>9</h2>
            </div>
            <div className='calcRow'>
             <h2 onClick={() => this.setSign('+')} className='numbers'>+</h2>
             <h2 onClick={() => this.setSign('-')} className='numbers'>-</h2>
             <h2 onClick={() => this.setSign('*')} className='numbers'>*</h2>
             <h2 onClick={() => this.setSign('/')} className='numbers'>/</h2>
             <h2 onClick={() => this.addParens()} className='numbers'>()</h2>
            </div>
            <div className='calcRow'>
             <h2 onClick={() => this.setTrig('sin')} className='numbers'>sin</h2>
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
            </> 


        )
    }
}
export default Scientific