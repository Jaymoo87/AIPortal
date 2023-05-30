import React from 'react';

interface UserMessage {
  role: string;
  content: string;
}

type MessageDisplayProps = {
  message: UserMessage;
};

const MessageDisplay = ({ message }: MessageDisplayProps) => {
  return (
    <div className="message-display">
      <p id="icon">X</p>
      <p>{message.role}</p>
      <p>{message.content}</p>
    </div>
  );
};

export default MessageDisplay;
