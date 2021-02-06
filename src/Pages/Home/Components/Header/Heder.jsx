import React, { Component, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./Header.scss";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const user = localStorage.getItem("userId");
  const UDetail = JSON.parse(localStorage.getItem(user));
  console.log("userDetails", UDetail);
  const [state, setState] = useState({
    name: UDetail.name,
    password: UDetail.password,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNameChange = (e) => {
    const { value } = e.target;
    setState({ ...state, name: value });
  };
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setState({ ...state, password: value });
  };

  const UpdateDeatils = () => {
    const objStr = localStorage.getItem(user);
    const obj = JSON.parse(objStr);
    obj.name = state.name;
    obj.password = state.password;
    localStorage.setItem(user, JSON.stringify(obj));
    alert("Profile updated successfully");
  };

  const body = (
    <div style={modalStyle} className={classes.paper + " modal-container"}>
      <div>
        <TextField
          id="login-name"
          onChange={handleNameChange}
          label="Full Name"
          value={state.name}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          id="login-pw"
          onChange={handlePasswordChange}
          type="password"
          value={state.password}
          label="Password"
          variant="outlined"
        />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={UpdateDeatils}>
          Update
        </Button>
      </div>
    </div>
  );
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
        <div className="cur-pointer" onClick={handleOpen}>
          Edit Profile
        </div>
        <div className="cur-pointer">
          <Avatar alt="Remy Sharp" src="/akash.jpg" />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default Header;
