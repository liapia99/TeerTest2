import React from "react";
import { auth } from "../firebase";
import "../pages/Messages.css";

const LogOut = () => {
  const signOut = () => {
    signOut(auth);
  };

  return (
    <button onClick={() => auth.signOut()} className="button">
      Logout
    </button>
  );
};

export default LogOut;
