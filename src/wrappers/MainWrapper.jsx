import React, { useEffect, useState, useContext } from "react";
import { IconBuilding, IconEmail, IconSmartphone, IconMenu } from "../assets/icons/icons"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Dropdown } from "react-bootstrap";
import AppCard from "../components/card/card";
import Header from "../components/header/header";
import ApplicationRouter from "../router/applicationRouter";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import AppContext from "../context/appContext";



const MainWrapper = () => {
  const { user, onUserUpdate}= useContext(AppContext);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then(userData => {
      onUserUpdate(userData)
       // return Auth.changePassword(user, 'oldPassword', 'newPassword');
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));

  }, []);

 if(!user) return("Loading...")
  return (
    <Container fluid>
      <Header />
       <ApplicationRouter />
     </Container>
  );
};

export default withAuthenticator(MainWrapper);
