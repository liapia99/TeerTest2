import React from "react";
import SignIn from "./SignIn";
import LogOut from "./LogOut";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div className="nav">
      <h1 className="not">Notifications</h1>
      {user ? <LogOut /> : <SignIn />}
    </div>
  );
};

export default Navbar;
