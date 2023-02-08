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
import { Spinner, Modal, ListGroup, Image } from "react-bootstrap";

function App() {
  const { isLoading, isAuthenticated, getAllUsers, getPosts, allUsers, user } =
    useContext(SettingContext);

  const [friendsModal, setFriendsModal] = useState({
    show: false,
    friends: [],
  });

  useEffect(() => {}, []);

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
        </div>
      )}
      <Modal
        show={friendsModal.show}
        onHide={() => setFriendsModal({ show: false, friends: [] })}
      >
        <Modal.Header>Friends</Modal.Header>
        <Modal.Body>
          <ListGroup>
            {friendsModal.friends.map((f, n) => (
              <ListGroup.Item key={n}>
                <a
                  href={
                    "/" + user &&
                    allUsers.find((u) => u.subId === user.sub).subId === f.id
                      ? "profile"
                      : allUsers.find((u) => u.subId === f.id).userName
                  }
                >
                  <Image
                    src={allUsers.find((u) => u.subId === f.id).pic}
                    roundedCircle
                    width={40}
                  />
                  {`${allUsers.find((u) => u.subId === f.id).firstName} ${
                    allUsers.find((u) => u.subId === f.id).lastName
                  }`}
                </a>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
