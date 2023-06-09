import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import GPT from './pages/GPT';
import DALLE from './pages/DALLE';
import SQL from './pages/SQL';

type Props = {};

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="/gpt" element={<GPT />}></Route>
        <Route path="/dalle" element={<DALLE />}></Route>
        <Route path="/sql" element={<SQL />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
