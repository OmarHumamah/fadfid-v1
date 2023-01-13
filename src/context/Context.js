import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const SettingContext = React.createContext();

export default function Show(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [cover, setCover] = useState("https://via.placeholder.com/900x200.png");
  const [pic, setPic] = useState(false);
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState([]);
  const [birthday, setBirthday] = useState(null);

  const [posts, setPosts] = useState([]);

  const state = {
    isAuthenticated,
    user,
    isLoading,
    profileVar: {
      cover,
      pic,
      bio,
      interests,
      birthday,
    },
    profileHandler: {
      setCover,
      setPic,
      setBio,
      setInterests,
      setBirthday,
    },
    posts,
    setPosts,
  };

  return (
    <SettingContext.Provider value={state}>
      {props.children}
    </SettingContext.Provider>
  );
}
