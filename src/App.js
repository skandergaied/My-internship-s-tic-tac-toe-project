import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Game from './componant/gamerun';
import Cell from './componant/cell';
import Signin from './componant/signin';
import Scoreboard from './componant/scoreborad';
import Login from './componant/Login';
import './index.css'
const App = () => {


  return (
      <div >
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/cell" element={<Cell />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/scoreboard" element={<Scoreboard/>} />
          <Route path="/" element={<Login/>} />
        </Routes>
      </div>
  );


};

export default App;