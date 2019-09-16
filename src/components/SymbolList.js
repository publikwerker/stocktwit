import React from 'react';
    
export default class SymbolList extends React.Component {

  render(){
    let formattedList = this.props.symbols.join();

    let display = this.props.symbols ? <p className="body__display--symbol-list">These are the symbols you are tracking: {formattedList}</p> : <p className="body__display--symbol-list">You aren't following any symbols, yet.</p>
    return (
      <div className="symbol-list">
      {display}
      </div>
    );
  }
}