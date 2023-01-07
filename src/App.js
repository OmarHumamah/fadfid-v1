import HomeLogin from "./components/login/HomeLogin";
import "./App.css";
import NavBarHeader from "./components/navBarHeader/NavBarHeader";
import { Route, Routes } from "react-router-dom";
import Wall from "./components/wall/Wall";
import Profile from "./components/profile/Profile";
import React, { useState } from "react";


function App() {
  const [authenticated, setAuthenticated] = useState(true);

  return (
    <div className="App">
      {!authenticated ? (
        <HomeLogin login={setAuthenticated}/>
      ) : (
        <NavBarHeader logout={setAuthenticated} />
      )}
      <Routes>    
        <Route path="/" element={authenticated && <Wall />} />
        <Route path="/profile" element={authenticated && <Profile />} />
      </Routes>
    </div>
  );
}

export default App;
