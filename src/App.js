// import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainWrapper from './wrappers/MainWrapper'
import FormController from "./views/FormController"
import { Switch, Route, Redirect } from "react-router-dom";

 

function App() {
  return (
    
    <>
    <MainWrapper />
     <Switch>
        <Route path="/formSubmission/:id" component={FormController} />
        {/* <Route exact path="/" component={MainWrapper} /> */}
      </Switch>
 
   </>
  );
}
export default App;
