import HomeLogin from "./components/login/HomeLogin";
import "./App.css";
import NavBarHeader from "./components/navBarHeader/NavBarHeader";
import { Route, Routes } from "react-router-dom";
import Wall from "./components/wall/Wall";
import Profile from "./components/profile/Profile";
import React, { useContext, useEffect } from "react";
import { SettingContext } from "./context/Context";
import { Spinner } from "react-bootstrap";
import UserInfoModal from "./components/userInfoModal/UserInfoModal";
import UserProfile from "./components/profile/UserProfile";

function App() {
  const { isLoading, isAuthenticated, getAllUsers, getPosts } =
    useContext(SettingContext);

  useEffect(() => {
    getAllUsers();
    getPosts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner animation="grow" />
      ) : (
        <div className="App">
          {!isAuthenticated ? <HomeLogin /> : <NavBarHeader />}
          <Routes>
            <Route path="/" element={isAuthenticated && <Wall />} />
            <Route path={`/profile`} element={isAuthenticated && <Profile />} />
            <Route path="/:userName" element={<UserProfile/>} />
            <Route path="/*" element={<UserProfile/>} />
          </Routes>
          {isAuthenticated && <UserInfoModal />}
        </div>
      )}
    </>
  );
}

export default App;
