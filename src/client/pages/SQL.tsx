import React from 'react';
import MessagesDisplay from '../components/MessagesDisplay';
import CodeDisplay from '../components/CodeDisplay';

type Props = {};

const SQL = (props: Props) => {
  return (
    <div>
      <MessagesDisplay />
      <input />
      <CodeDisplay />
      <div className="button-container">
        <button id="get-query"></button>
        <button id="clear-chat"></button>
      </div>
    </div>
  );
};

export default SQL;
