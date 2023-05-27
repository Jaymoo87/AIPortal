import React from 'react';

type Props = {};

const DALLE = (props: Props) => {
  const surpriseOptions = [
    'A Blue Ostrich eating melon',
    'A matisse style shark on the telephone',
    'the inevitable end of an era',
  ];

  return (
    <div className="dalle-app">
      <section className="search-section">
        <p>
          Start with detailed description <span className="surprise">surprise me</span>
        </p>
        <div className="input-container">
          <input placeholder="a surprising image with some flair" />
          <button>Generate</button>
        </div>
      </section>
      <section className="image-section"></section>
    </div>
  );
};

export default DALLE;
