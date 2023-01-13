import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Site from "./context/Context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-zblleygl.us.auth0.com"
    clientId="yRHX7865ifHE406Yy2xQt8qqk2DGdvzF"
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <React.StrictMode>
        <Site>
          <App />
        </Site>
      </React.StrictMode>
    </BrowserRouter>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
