import React, { useEffect, useState, useContext } from "react";
import { IconBuilding, IconEmail, IconSmartphone, IconMenu } from "../assets/icons/icons"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Dropdown } from "react-bootstrap";
import AppCard from "../components/card/card";
import Header from "../components/header/header";
import ApplicationRouter from "../router/applicationRouter";

const MainWrapper = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  }, []);


  return (
    <Container fluid>
      <Header />
       <ApplicationRouter />
     </Container>
  );
};

export default MainWrapper;
