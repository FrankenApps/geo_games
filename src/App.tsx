import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from './Sidebar';
import Home from './Home';
import UnMemberStates from './Games/World/UnMemberStates/UnMemberStates';
import Settings from './Settings';


function App() {
  let scoreVal = 0;
  const [score, setScore] = React.useState(scoreVal);

  const increaseScore = () => {
    scoreVal++;
    setScore(scoreVal);
  };

  return (
    <>
      <BrowserRouter>
        <Sidebar score={score}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/games/world/un-member-states" element={<UnMemberStates increaseScore={increaseScore} />}></Route>
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
