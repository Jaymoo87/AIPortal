import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Link to="/gpt">
        <button className="w-1/3 bg-gray-900 ">Just inGPT</button>
      </Link>
      <Link to="/dalle">
        <button className="w-1/3 bg-gray-800 ">JALL-E</button>
      </Link>
    </>
  );
};

export default Home;
