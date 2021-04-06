// import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainWrapper from './wrappers/MainWrapper'
import { withAuthenticator } from '@aws-amplify/ui-react';

function App() {
  return (
    <>
    <MainWrapper />
   </>
  );
}
export default withAuthenticator(App);
