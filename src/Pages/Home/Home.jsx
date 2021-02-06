import React, { Component, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import loginfun, { registerfun } from "../../Helper/HelperFunctions";
import { useHistory } from "react-router";
import Header from "./Components/Header/Heder";
import NewsContainer from "./Components/NewsContainer/NewsContainer";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Header />
      <NewsContainer />
    </div>
  );
};

export default Home;
