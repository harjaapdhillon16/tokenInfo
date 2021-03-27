import React, { useEffect, useState, useContext } from "react";
import { IconBuilding, IconEmail, IconSmartphone, IconMenu } from "../assets/icons/icons"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Dropdown } from "react-bootstrap";
import AppCard from "../components/card/card";
import Header from "../components/header/header";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  }, []);


  return (

    <Container>
      <Row>
        <Col md={12} className="dashboardCards pt-5">
          <h1>Chris Oliver</h1>
          <div className="d-flex">
            <h6 className="pt-1">HomeDax Real Estate</h6>
            <Dropdown>
              <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                New York
          </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <AppCard icon={<IconEmail />} title={'Clients'} desc={'Add clients, edit clients info and view history.'} />
        </Col>
        <Col md={4}>
          <AppCard icon={<IconBuilding />} title={'Forms'} desc={'View status, download signed forms and send reminders'} />
        </Col>
        <Col md={4}>
          <AppCard icon={<IconSmartphone />} title={'Account'} desc={' Review and update your account information.'} />

        </Col>


      </Row>

    </Container>

  );
};

export default Dashboard;
