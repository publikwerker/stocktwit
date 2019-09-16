import React from 'react';

export default class MessageList extends React.Component {

  render () {
    let messageList = this.props.twits.map((twit)=><li key={twit.id} className='messageList__twit-list--post'><span className='messageList__twit-list--username'>{twit.user.username}: </span>{twit.body}</li>
    );

    return (
      <ul className='messageList__twit-list'>
        {messageList}
      </ul>
    )
  }
}