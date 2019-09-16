import React from 'react';
import MessageList from './MessageList';

export default class TwitDisplay extends React.Component{

  submitHandler = (e) => {
    e.preventDefault();
    // pass the input field value to the event handler passed
    // as a prop by the Main component
    this.props.handlerFromParent(e.target.id);
  }

  render(){

    let list =[];
    for(let i=0; i<this.props.messages.length; i++){
      list.push(
        <li key={this.props.messages[i].symbol} className='twits-container__item'>
          <h2 className='twits-container__item--title' >{this.props.messages[i].symbol}: ({this.props.messages[i].twits.length})</h2>
          <form 
            name="deleteForm" 
            id={this.props.messages[i].symbol} className="deleteForm"
            onSubmit={this.submitHandler}>
            <input type="submit" className="button button--delete" value="Delete" />
          </form>
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