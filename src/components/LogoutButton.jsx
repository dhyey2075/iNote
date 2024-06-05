import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = ({text}) => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      {text}
    </button>
  );
};

export default LogoutButton;