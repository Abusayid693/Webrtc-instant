import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import IntroductionPage from './introductionPage/introductionPage';
import RoomPage from './roomPage/roomPage';
import JoinRoom from './joinRoomPage/joinRoomPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<IntroductionPage />} />
          <Route path="/join-room" element={<JoinRoom />} />
          <Route path="/room" element={<RoomPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
