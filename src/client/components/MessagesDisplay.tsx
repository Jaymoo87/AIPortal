import React from 'react';
import MessageDisplay from '../components/MessageDisplay';

interface UserMessage {
  role: string;
  content: string;
}

type MessageDisplayProps = {
  userMessages: UserMessage[];
};

const MessagesDisplay = ({ userMessages }: MessageDisplayProps) => {
  return (
    <div className="messages-display">
      {userMessages.map((userMessage, index) => (
        <MessageDisplay message={userMessage} key={index} />
      ))}
    </div>
  );
};

export default MessagesDisplay;
