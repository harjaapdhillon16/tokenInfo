import React, { useEffect, useState, useContext } from "react";
import { IconDeal, IconFeedback, IconForms, IconContacts, IconQR, IconUser } from "../assets/icons/icons"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Dropdown } from "react-bootstrap";
import AppCard from "../components/card/card";
import Header from "../components/header/header";
import AppContext from "../context/appContext";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user }= useContext(AppContext);

  useEffect(() => {

  }, []);

  const appCards = [
    {  icon:<IconDeal />,
       title:'Deals',
       desc:'Review and manage your leads and deals pipeline.',
       sectionPath:"/deals"
      },
      {  icon:<IconFeedback />,
        title:'Feedback',
        desc:'Keep track of and aggregate feedback on listings.',
        sectionPath:"/feedback"
       },
       {  icon:<IconForms />,
        title:'Contacts',
        desc:'Add contacts, edit client info and view relationship history',
        sectionPath:"/contacts"
       },
       {  icon:<IconContacts />,
        title:'Forms',
        desc:'View status, download signed forms and send reminders.',
        sectionPath:"/forms"
       },
       {  icon:<IconQR />,
        title:'QR Codes',
        desc:'QR codes to forms when you are on the go.',
        sectionPath:"/code"
       },
       {  icon:<IconUser />,
        title:'Account',
        desc:'Review and update your account information',
        sectionPath:"/account"
       },
  ]


  return (
    <Container fluid> 
      <Header/>
    <Container>
      <Row>
        <Col md={12} className="dashboardCards pt-5">
          <h1>
          {user.attributes.email}
          </h1>
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
        {appCards.map(item=> <Col md={4}>
          <AppCard icon={item.icon} title={item.title} desc={item.desc} sectionPath={item.sectionPath} />
        </Col> )}
      </Row>

    </Container>
    </Container>

  );
};

export default Dashboard;