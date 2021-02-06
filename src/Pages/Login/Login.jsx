import React, { Component, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import loginfun, { registerfun } from "../../Helper/HelperFunctions";
import { useHistory } from "react-router";
import "./Login.scss";

const Login = () => {
  const [mode, setMode] = useState(0);
  const [state, setState] = useState({ name: "", userName: "", password: "" });
  const [validate, setValidate] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");
  const history = useHistory();

  const handleNameChange = (e) => {
    const { value } = e.target;
    setState({ ...state, name: value });
    handleValidation("name", value, "Special Characters are not allowed!!");
  };

  const handleUserNameChange = (e) => {
    const { value } = e.target;
    setState({ ...state, userName: value });
    handleValidation("email", value, "Email is not valid!!");
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setState({ ...state, password: value });
    handleValidation(
      "password",
      value,
      "Special Characters are not allowed or max length is 20!!"
    );
  };

  const handleValidation = (field, value, msg) => {
    if (!mode) return;
    const nameExp = new RegExp("^[a-zA-Z0-9]*$");
    const emailExp = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]$");
    const passwordExp = new RegExp("^[a-zA-Z0-9]{1,20}$");
    let result;
    if (field == "name") result = nameExp.test(value);
    if (field == "email") result = emailExp.test(value);
    if (field == "password") result = passwordExp.test(value);
    console.log("handleValidation", value, result);
    if (!result) {
      setValidate(false);
      setAlertMsg(msg);
      setTimeout(() => {
        setAlertMsg("");
      }, 2000);
    } else setValidate(true);
  };

  const handleLoginRegisterClick = () => {
    const result = mode ? registerfun(state, validate) : loginfun(state);
    if (!mode) history.push("/home");
    // setState({ name: "", userName: "", password: "" });
  };
  return (
    <div className="wrapper-login">
      <div className="card-login">
        <div className="header-login">
          <div
            className={`cur-pointer br-rad-left ${
              mode == 0 ? "login-head-select" : ""
            }`}
            onClick={() => setMode(0)}
          >
            LOGIN
          </div>
          <div
            className={`cur-pointer br-rad-right ${
              mode == 1 ? "login-head-select" : ""
            }`}
            onClick={() => setMode(1)}
          >
            REGISTER
          </div>
        </div>
        <div className="container-login pos-rel">
          {mode == 1 ? (
            <div>
              <TextField
                id="login-name"
                onChange={handleNameChange}
                label="Full Name"
                value={state.name}
                variant="outlined"
              />
            </div>
          ) : null}
          <div>
            <TextField
              id="login-un"
              onChange={handleUserNameChange}
              value={state.userName}
              label="Email"
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoginRegisterClick}
            >
              {mode == 0 ? "LOGIN" : "REGISTER"}
            </Button>
          </div>
          {alertMsg != "" ? (
            <div className="pos-abs warning-login">
              <Alert severity="warning">{alertMsg}</Alert>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Login;
