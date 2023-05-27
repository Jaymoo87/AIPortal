import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GPT from './pages/GPT';
import Home from './pages/Home';

type Props = {};

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="/gpt" element={<GPT />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
