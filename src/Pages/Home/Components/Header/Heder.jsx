import React, { Component, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./Header.scss";

const Header = () => {
  const handleDelete = () => {
    const userId = localStorage.getItem("userId");
    localStorage.removeItem(userId);
    localStorage.setItem("userId", "");
  };
  return (
    <div className="header-wrapper">
      <div className="header-title">NEWS PORTAL</div>
      <div className="profile-details">
        <div className="cur-pointer" onClick={handleDelete}>
          Delete Account
        </div>
        <div className="cur-pointer">Edit Profile</div>
        <div className="cur-pointer">
          <Avatar alt="Remy Sharp" src="/akash.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Header;
