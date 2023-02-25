import { useAuth0 } from "@auth0/auth0-react";
import { ListItem, ListItemIcon } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";


const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <ListItem onClick={() => logout({ returnTo: window.location.origin })}>
      <ListItemIcon>
        <LogoutIcon fontSize="small" />
      </ListItemIcon>
      Logout
    </ListItem>
  );
};

export default LogoutButton;
