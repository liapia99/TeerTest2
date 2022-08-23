import React from "react";
import Navbar from "../Components/Navbar";
import Chat from "../Components/Chat";
import "./Messages.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Messages() {
  const [user] = useAuthState(auth);
  //  console.log(user)
  return (
    <div className="appContainer">
      <div className="sectionContainer">
        {/* Navbar */}
        <Navbar />
        {user ? <Chat /> : null}
      </div>
    </div>
  );
}

export default Messages;
