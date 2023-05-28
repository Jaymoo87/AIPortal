import React, { useState } from 'react';
import config from '../../server/config';
import { FaArrowRight } from 'react-icons/fa';

type Props = {};

const DALLE = (props: Props) => {
  const [images, setImages] = useState<any>([]);
  const [value, setValue] = useState<any>('');
  const [error, setError] = useState<string>('');

  const surpriseOptions = [
    'A Beautiful Sunset over a forest fire',
    'A thing from your nightmares',
    'the inevitable end of an era',
  ];

  const surpriseMe = () => {
    setImages(null);
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getImages = async () => {
    setImages(null);
    if (value === null) {
      setError('Error, you must type something');
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          message: value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch('/api/dalle', options);
      const data = await response.json();
      console.log(data);
      setImages(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="app">
        <section className="side-bar">
          <ul className="history">
            <li>previous pics</li>
          </ul>
          <nav>
            <p>Made by Justin</p>
          </nav>
        </section>
        <section className="main">
          <section className="image-section">
            {images?.map((img: any, index: number) => (
              <img src={img.url} key={`image-key-${index}`} alt={`Generated Image of ${value}`} />
            ))}
          </section>
          <div className="bottom-section">
            <div className="input-container">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="a surprising image with some flair"
              />
              <span onClick={surpriseMe} className="surprise">
                surprise me
              </span>
              <div id="submit" onClick={getImages}>
                <FaArrowRight />
              </div>
            </div>
            <p className="info">DALL-E sample testing</p>
          </div>
        </section>
      </div>
      {/* <div className="w-full h-full dalle-app">
      <section className="search-section">
        <p>
          Start with detailed description{' '}
          <span onClick={surpriseMe} className="surprise">
            surprise me
          </span>
        </p>
        <div className="dalle-input-container">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="a surprising image with some flair"
          />
          <button onClick={getImages}>Generate</button>
        </div>
        {error && <p>{error}</p>}
      </section>
      <section className="image-section">
        {images?.map((img: any, index: number) => (
          <img src={img.url} key={`image-key-${index}`} alt={`Generated Image of ${value}`} />
        ))}
      </section>
    </div></> */}
    </>
  );
};

export default DALLE;
