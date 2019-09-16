import React from 'react';
import StoTwi from '../utils/stoTwi';
import TwitDisplay from './TwitDisplay';
import SymbolList from './SymbolList';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.state = {
      fromTwitContainer: '',
      value: '',
      symbols: [],
      messages: [],
      error: null
    };
  }

  //receives delete data from twit__container
  //removes symbol from array in state
  handleData= async(data)=>{
    try {
      await this.setState({
        fromTwitContainer: data
      });
      await this.removeSymbol(data);
      await this.loadMessages();
    } catch (err) {
      this.setError(err)
    }

  }

  // adds keystrokes to value in state
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    error: null});
  }

  // adds new symbols to array in state from value
  setSymbols=async(value)=>{
    value = value.toUpperCase();
    let symbolList = value.split(',').map((symbol)=>symbol.trim());
    
    //check if symbol values already exist
    if(this.state.symbols.length>0){
      for(let val of this.state.symbols){
        return symbolList = symbolList.filter((value) => value !== val);
      }
    }
    
    try {
      await this.setState({
        value: '',
        symbols: [...this.state.symbols, ...symbolList]
      });
      document.getElementById("symbolInput").reset();
    } catch(err) {
      console.log(err);
    };
  }

  // removes symbol from symbol array in state
  removeSymbol(data){
    let newList = this.state.symbols.filter((symbol) => symbol !== data );
    if(newList.length){
      this.setState({
        symbols: [...newList]
      })
    } else this.setState({
      symbols: [],
      messages: [],
      fromTwitContainer: ''
    });
  }

  // saves an object with key/value pairs of symbol and twits 
  // to an array in state called messages
  loadMessages = async () => {
    let allMessages = [];
    try {
      for(let symbol of this.state.symbols) {
        await StoTwi(symbol, async (error, symMess) => {
          if (error) {
            await this.setError(error);
            await this.removeSymbol(symbol);
          } 
          if (symMess) {
            try {
              await allMessages.push({
                symbol,
                twits: [...symMess]
              });
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

  // sets error to state
  setError = (error) => {
    this.setState({error});
  }


  handleSubmit = async (event) => {
    try {
      event.preventDefault();

      //check if they submit an empty field
      if(!this.state.value){
        throw new Error('Error: Must type in symbol');
      }

      await this.setSymbols(this.state.value);
      await this.loadMessages(this.state.symbols);
    } catch (error) {
      console.log(error.message);
      this.setError(error.message);
    }
  }

  // rerender feed every 60 seconds
  componentDidUpdate(){
    const timer = setTimeout(()=> {
      this.loadMessages();
    }, 60000);
    return () => clearTimeout(timer);
  }

  render(){
    
    let error;
    if(this.state.error){
      error = (<p className="error-text">{this.state.error}</p>)
    }

    return (
      <main className="body">
      <div className="body__symbol-input">
      {error}
        <form name="symbolInput" id="symbolInput" onSubmit={this.handleSubmit}>
          <label>
            <span className="body__symbol-input--label">
            Enter a stock symbol or comma separated list of symbols: </span>
            <input type="text" name="body__symbol-input--name" placeholder="AAPL, for example" onChange={this.handleChange} />
          </label>
          <input type="submit" className="button button--submit" value="Submit"/>
        </form>
      </div>
      <section className="body__display">
        <SymbolList symbols={this.state.symbols}/>
        <TwitDisplay messages={this.state.messages} handlerFromParent={this.handleData}/>
      </section>
    </main>
  )
}
}