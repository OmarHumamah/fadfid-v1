import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import HomeLogin from "./components/login/HomeLogin";
import NavBarHeader from "./components/navBarHeader/NavBarHeader";
import UserProfile from "./components/profile/UserProfile";
import UserInfoModal from "./components/userInfoModal/UserInfoModal";
import Profile from "./components/profile/Profile";
import Wall from "./components/wall/Wall";
import { SettingContext } from "./context/Context";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import FriendsModal from "./components/profile/FriendsModal";

function App() {
  const { isLoading, isAuthenticated, getAllUsers, getPosts, allUsers, user, posts } =
    useContext(SettingContext);

  const [friendsModal, setFriendsModal] = useState({
    show: false,
    friends: [],
  });

  useEffect(() => {
    getAllUsers();
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner animation="grow" />
      ) : (
        <div className="App">
          {!isAuthenticated ? <HomeLogin /> : <NavBarHeader />}
          <Routes>
            <Route path="/" element={isAuthenticated && <Wall posts={posts}/>} />
            <Route
              path={`/profile`}
              element={
                isAuthenticated && <Profile setFriendsModal={setFriendsModal} />
              }
            />
            <Route
              path="/:userName"
              element={<UserProfile setFriendsModal={setFriendsModal} />}
            />
          </Routes>
          {isAuthenticated && <UserInfoModal />}
          {
            <FriendsModal
              friendsModal={friendsModal}
              setFriendsModal={setFriendsModal}
              allUsers={allUsers}
              user={user}
            />
          }
        </div>
      )}
    </>
  );
}

export default App;
