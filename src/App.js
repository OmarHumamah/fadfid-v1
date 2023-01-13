import HomeLogin from "./components/login/HomeLogin";
import "./App.css";
import NavBarHeader from "./components/navBarHeader/NavBarHeader";
import { Route, Routes } from "react-router-dom";
import Wall from "./components/wall/Wall";
import Profile from "./components/profile/Profile";
import React, { useState, useContext } from "react";
import { SettingContext } from "./context/Context";
import { Modal, Spinner } from "react-bootstrap";

function App() {
  const settings = useContext(SettingContext);
  return (
    <>{settings.isLoading ? <Spinner animation="grow" /> :
      <div className="App">
        {!settings.isAuthenticated ? <HomeLogin /> : <NavBarHeader />}
        <Routes>
          <Route path="/" element={settings.isAuthenticated && <Wall />} />
          <Route
            path="/profile"
            element={settings.isAuthenticated && <Profile />}
          />
        </Routes>
      </div>
 } </>
  );
}

export default App;
