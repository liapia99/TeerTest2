import React, { useState } from "react";
import PIC from "../Images/logo(1).png";
import "./Sidebar.css";
import { FaBars, FaUserAlt, FaPlus, FaCommentAlt, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/requests",
      name: "Requests",
      icon: <FaPlus />
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt />
    },
    {
      path: "/messages",
      name: "Messages",
      icon: <FaCommentAlt />
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <FaCog />
    }
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            {" "}
            <div className="PIC">
              <img src={PIC} class="logo" alt="logo" />
            </div>
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default SideBar;
