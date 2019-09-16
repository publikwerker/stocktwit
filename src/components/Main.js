import React from 'react';
import StoTwi from '../utils/stoTwi';
import TwitDisplay from './TwitDisplay';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      symbols: [],
      messages: [],
      error: null
    };
  }

  // adds new symbols to 
  // array in state
  setSymbols=async(value)=>{
    try {
      value = value.toUpperCase();
      let symbolList = value.split(',').map((symbol)=>symbol.trim())

      await this.setState({
        value: '',
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
    let allMessages = [];
    try {
      for(let symbol of symbols) {
        await StoTwi(symbol, async (error, symMess) => {
          if (error) {
            this.setError(error);
          } 
          if (symMess) {
            try {
              await allMessages.push({
                symbol,
                twits: [...symMess]
              });
              console.log(allMessages); 
              await this.setState({
                messages: [...allMessages]
              })
            } catch (err) {
              this.setError(err);
            }
          }
        });
      }
    } catch (err) {
      this.setError(err);
    };
  }

  setError = (error) => {
    this.setState({error});
  }

  // adds keystrokes to state
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    error: null});
  }


  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if(!this.state.value){
        throw new Error('Error: Must type in symbol');
      }
      await this.setSymbols(this.state.value);
      await this.loadMessages(this.state.symbols);
    } catch (error) {
      console.log(error);
      this.setError({error});
    }
  }

  render(){
    let error;
    if(this.state.error){
      error = (<p className="error-text">{this.state.error.error.message}</p>)
    }
    return (
      <main className="body">
      <div className="body__symbol-input">
      {error}
        <form name="symbolInput" onSubmit={this.handleSubmit}>
          <label>
            <span className="body__symbol-input--label">
            Symbol or comma separated list of symbols: </span>
            <input type="text" name="body__symbol-input--name" placeholder="AAPL" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
        <TwitDisplay messages={this.state.messages}/>
    </main>
  )
}
}