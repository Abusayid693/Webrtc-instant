import React, {useEffect, useRef} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {connectWithSocketIOServer} from './utils/wss';
//-
import IntroductionPage from './introductionPage/introductionPage';
import RoomPage from './roomPage/roomPage';
import JoinRoom from './joinRoomPage/joinRoomPage';

const App = () => {
  useEffect(() => {
    console.log('connectWithSocketIOServer');
    connectWithSocketIOServer();
  }, []);
  return (
    <nav>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<IntroductionPage />} />
            <Route path="/join-room" element={<JoinRoom />} />
            <Route path="/room" element={<RoomPage />} />
          </Routes>
        </div>
      </Router>
    </nav>
  );
};

export default App;
