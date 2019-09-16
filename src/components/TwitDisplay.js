import React from 'react';
import MessageList from './MessageList';

export default class TwitDisplay extends React.Component{
  
  render(){

    let list =[];
    for(let i=0; i<this.props.messages.length; i++){
      list.push(<li key={this.props.messages[i].symbol} className='twits-container__item'>
      <h2 className='twits-container__item--title' >{this.props.messages[i].symbol}: ({this.props.messages[i].twits.length})</h2>
      <MessageList twits={this.props.messages[i].twits}/>
      </li>)
    }
    return (
      <div className='twits'>
        <ul className='twits-container'>
          {list}
        </ul>
      </div>
    );
  }
}