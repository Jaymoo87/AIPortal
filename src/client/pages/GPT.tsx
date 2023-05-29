import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const GPT = () => {
  const [value, setValue] = useState<string>('');

  const [message, setMessage] = useState<any>('');
  const [previousChats, setPreviousChats] = useState<any>([]);
  const [currentTitle, setCurrenTitle] = useState('');

  const createNewChat = () => {
    setMessage('');
    setValue('');
    setCurrenTitle('');
  };

  const handleClick = (uTitle: any) => {
    setCurrenTitle(uTitle);
    setMessage('');
    setValue('');
  };

  const getMessages = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: value,
      }),
    };
    try {
      const res = await fetch('/api/gpt', options);
      const data = await res.json();
      console.log(data);
      setMessage(data.choices[0].message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!value) {
      setValue('');
    }

    if (!currentTitle && value && message) {
      setCurrenTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats: any) => [
        ...prevChats,
        {
          title: currentTitle,
          role: 'user',
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  const currentChat = previousChats.filter((pc: any) => pc.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map((pc: any) => pc.title)));

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uTitle: any, index) => (
            <li onClick={handleClick} key={index}>
              {uTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made by Justin</p>
        </nav>
      </section>
      <section className="main">
        <h1 className="text-xl font-extrabold">Just inGPT</h1>
        <ul className="feed">
          {currentChat.map((chatMessage: any, index: number) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id="submit" onClick={getMessages}>
              <FaArrowRight />
            </div>
          </div>
          <p className="info">Chat GPT sample testing</p>
        </div>
      </section>
    </div>
  );
};

export default GPT;
