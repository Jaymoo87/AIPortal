import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Link to="/gpt">GPT</Link>
      <Link to="/dalle">DALL-E</Link>
    </>
  );
};

export default Home;
