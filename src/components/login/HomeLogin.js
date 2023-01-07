import React from "react";
import homePageLogin from "../../assets/opening.png";

export default function HomeLogin(props) {
  return (
    <div>
      <img onClick={()=>props.login(true)} src={homePageLogin} />
    </div>
  );
}
