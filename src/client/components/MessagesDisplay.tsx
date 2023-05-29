import React from 'react';
import MessageDisplay from '../components/MessageDisplay';

type Props = {};

const MessagesDisplay = (props: Props) => {
  return (
    <div className="messages-display">
      <MessageDisplay />
    </div>
  );
};

export default MessagesDisplay;
