import React from 'react';
import StoTwi from '../utils/stoTwi';
import TwitDisplay from './TwitDisplay';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      symbols: [],
      messages: []
    };
  }

  // adds new symbols to 
  // array in state
  setSymbols=async(value)=>{
    try {
      value = value.toUpperCase();
      let symbolList = value.split(',').map((symbol)=>symbol.trim())

      await this.setState({
        symbols: [...this.state.symbols, ...symbolList]
      });
    } catch(err) {
      console.log(err);
    };
  }

  // saves an object with key/value pairs
  // of symbol and twits to an array 
  // in state called messages
  loadMessages = async (symbols) => {
    try {
      for(let symbol of symbols) {
        await StoTwi(symbol, (error, symMess) => {
          if (error) {
            alert(error);
          } else {
            console.log(symMess);
            return this.setState({
              messages: [...this.state.messages, {
                symbol,
                twits: [...symMess]
              }]
            });
          }
        });
      }
    } catch (err) {
      console.log(err);
    };
  }

  // adds keystrokes to state
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }


  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await this.setSymbols(this.state.value);
      await this.loadMessages(this.state.symbols);
    } catch (err) {
      console.log(err);
    }
  }

  render(){

    return (
      <main>
      <div className="symbol-input">
        <form name="symbolInput" onSubmit={this.handleSubmit}>
          <label>
            Symbol or comma separated list of symbols:
            <input type="text" name="name" placeholder="AAPL" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
        <TwitDisplay />
      </div>
    </main>
  )
}
}