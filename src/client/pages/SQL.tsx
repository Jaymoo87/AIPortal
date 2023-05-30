import React, { useState } from 'react';
import MessagesDisplay from '../components/MessagesDisplay';
import CodeDisplay from '../components/CodeDisplay';

type Props = {};

interface ChatData {
  role: string;
  content: string;
}

const SQL = (props: Props) => {
  const [value, setValue] = useState<string>('');
  const [chat, setChat] = useState<ChatData[]>([]);

  const getQuery = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: value,
        }),
      };

      const response = await fetch('/api/sql', options);
      const data = await response.json();
      console.log(data);

      const userMessage = {
        role: 'user',
        content: value,
      };
      setChat((oldChat) => [...oldChat, data, userMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  const clearChat = () => {
    setValue('');
    setChat([]);
  };

  const filteredUserMessages = chat.filter((m) => m.role === 'user');
  const latestResponse = chat.filter((m) => m.role === 'assistant').pop();

  return (
    <div className="flex justify-center w-full h-full ">
      <div className="sql-app">
        <h1 className="m-4 text-xl font-extrabold">Just inSQL</h1>

        <MessagesDisplay userMessages={filteredUserMessages} />
        <input value={value} onChange={(e) => setValue(e.target.value)} className="sql-input" />
        <h3>Generate an SQL query with a simple prompt</h3>
        <CodeDisplay code={latestResponse?.content || ''} />
        <div className="button-container">
          <button onClick={getQuery} id="get-query">
            Generate Query
          </button>
          <button onClick={clearChat} id="clear-chat">
            Clear Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default SQL;
