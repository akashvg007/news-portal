import React, {Component} from 'react';
import RequireAuth from './SharedComponents/AuthComponent';
import {HashRouter as Router,Route,Switch} from "react-router-dom";
import './App.scss';
import Login from './Pages/Login/Login';
import HomeMain from './Pages/Login/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" render={(props)=> <RequireAuth Component={HomeMain} {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
