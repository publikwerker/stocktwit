import React from 'react';

export default class MessageList extends React.Component {

  render () {
    let messageList = this.props.twits.map((twit)=><li key={twit.id}><span className='twit-username'>{twit.user.username}</span>{twit.body}</li>
    );
    // const twitCompiler = (twit) => 
    //   <span key={twit.id} className='twits-container__item--message' >{twit.body}</span>;   
    
    // const messageList = (this.props.twits) => twits.forEach((twit)=>twitCompiler(twit));

    return (
      <ul className='twit-list'>
        {messageList}
      </ul>
    )
  }
}