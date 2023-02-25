import { useAuth0 } from "@auth0/auth0-react";
import { LoginOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button startIcon={<LoginOutlined/>} variant="outlined" color="success" onClick={() => loginWithRedirect()}>Login</Button>;
};

export default LoginButton;