import React, { useState, useEffect } from 'react';
import { FaPlus, FaArrowRight } from 'react-icons/fa';

const GPT = () => {
  const [value, setValue] = useState<any>(null);
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState<any>(null);
  const [previousChats, setPreviousChats] = useState<any>([]);
  const [currentTitle, setCurrenTitle] = useState(null);

  const createNewChat = () => {
    setMessage(null);
    setValue('');
    setCurrenTitle(null);
  };

  const handleClick = (uTitle) => {
    setCurrenTitle(uTitle);
    setMessage(null);
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
      const res = await fetch('http://localhost:8000/completions', options);
      const data = await res.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message);

    if (!currentTitle && value && message) {
      setCurrenTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
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

  const currentChat = previousChats.filter((pc) => pc.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map((pc) => pc.title)));

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>
          <FaPlus /> New Chat
        </button>
        <ul className="history">
          {uniqueTitles?.map((uTitle, index) => (
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
        {!currentTitle && <h1>Just inGPT</h1>}
        <ul className="feed">
          {currentChat.map((chatMessage, index) => (
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
