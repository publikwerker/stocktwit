import React from 'react';
import StoTwi from '../utils/stoTwi';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      symbols: []
    };
  }

  setSymbols=async(value)=>{
    value=value.toUpperCase();
    let symbolList = value.split(',').map(function(symbol){
      return symbol.trim();
    })

    console.log("symbolList = " + symbolList);
    await this.setState({symbols: [...this.state.symbols, ...symbolList]});
    for(let symbol of this.state.symbols){
      console.log(symbol);
      console.log(StoTwi(symbol))
    }
  }

  handleChange= (event)=>{
    this.setState({value: event.target.value});
  }


  handleSubmit=(event)=>{
    this.setSymbols(this.state.value);
    event.preventDefault();
  }

  render(){

    return (
      <main>
      <div className="symbol-input">
        <form name="symbolInput" onSubmit={this.handleSubmit}>
          <label>
            Symbol or list of symbols:
            <input type="text" name="name" placeholder="AAPL" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </main>
  )
}
}