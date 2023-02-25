import React, { useContext, useEffect, useState } from "react";
import HomeLogin from "./components/login/HomeLogin";
import NavBarHeader from "./components/navBarHeader/NavBarHeader";
import UserProfile from "./components/profile/UserProfile";
import UserInfoModal from "./components/userInfoModal/UserInfoModal";
import Profile from "./components/profile/Profile";
import Wall from "./components/wall/Wall";
import { SettingContext } from "./context/Context";
import { Route, Routes } from "react-router-dom";
import FriendsModal from "./components/profile/FriendsModal";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    backgroundColor: "dark",
    textColor: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
});
const lightTheme = createTheme({
  link: {
    textDecoration: "none",
    color: "black",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  palette: {
    mode: "light",
    backgroundColor: "#fef7f1",
    textColor: "black",
  },
});

function App() {
  const {
    isLoading,
    isAuthenticated,
    getAllUsers,
    getPosts,
    allUsers,
    user,
    posts,
  } = useContext(SettingContext);

  const [friendsModal, setFriendsModal] = useState({
    show: false,
    friends: [],
  });

  const userId = user && allUsers.find((u) => u.subId === user.sub);
  useEffect(() => {
    getAllUsers();
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={userId && userId.mood ? darkTheme : lightTheme}>
      {isLoading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress size={80} color="inherit" />
        </Box>
      ) : (
        <div className="App">
          {console.log(isAuthenticated)}
          {!isAuthenticated ? <HomeLogin /> : userId && <NavBarHeader />}
          <Routes>
            <Route
              path="/"
              element={isAuthenticated && userId && <Wall posts={posts} />}
            />
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
    </ThemeProvider>
  );
}

export default App;
