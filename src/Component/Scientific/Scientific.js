import React from 'react';

class Scientific extends React.Component {
    state = {
        mode :  'Deg'
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
    render(){
        return(
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
            </> 


        )
    }
}
export default Scientific