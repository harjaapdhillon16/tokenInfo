import React, { useContext, useState } from "react";
import {
  IconDeal,
  IconFeedback,
  IconForms,
  IconContacts,
  IconUser,
} from "../assets/icons/icons";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import AppCard from "../components/card/card";
import Header from "../components/header/header";
import AppContext from "../context/appContext";

import { Link } from "react-router-dom";

const appCards = [
  {
    icon: <IconDeal />,
    title: "Deals",
    desc: "Review and manage your leads and deals pipeline.",
    show: false,
    sectionPath: "/deals",
  },
  {
    icon: <IconFeedback />,
    title: "Feedback",
    desc: "Keep track of and aggregate feedback on listings.",
    show: false,
    sectionPath: "/feedback",
  },
  {
    icon: <IconForms />,
    title: "Contacts",
    desc: "Add contacts, edit client info and view relationship history",
    sectionPath: "/contacts",
    show: true,
  },
  {
    icon: <IconContacts />,
    title: "Forms",
    desc: "View status, download signed forms and send reminders.",
    sectionPath: "/forms",
    show: true,
  },
  //  {  icon:<IconQR />,
  //   title:'QR Codes',
  //   desc:'QR codes to forms when you are on the go.',
  //   sectionPath:"/code"
  //  },
  {
    icon: <IconUser />,
    title: "Account",
    desc: "Review and update your account information",
    sectionPath: "/account",
    show: true,
  },
];

const Dashboard = (props) => {
  const { user } = useContext(AppContext);
  const { agent } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  return (
    <Container fluid className="p-0">
      <Header />
      <Container>
        <Row>
          <Col md={12} className="dashboardCards pt-5">
            <h1>{agent.name}</h1>
            <div className="d-flex">
              <h6 className="pt-1">{agent.brokerageName}</h6>
              <h6 className="pt-1 pl-5">{agent.stateOfLicensure}</h6>
            </div>
          </Col>
        </Row>
        <Row>
          {appCards.map((item) => (
            <Col md={4}>
              {item.show ? (
                <Link to={item.sectionPath} className="cardwrap">
                  <AppCard
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                    sectionPath={item.sectionPath}
                    show={item.show}
                  />
                </Link>
              ) : (
                <Link onClick={handleShow} className="cardwrap disabled">
                  <AppCard
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                    sectionPath={item.sectionPath}
                    show={item.show}
                  />
                </Link>
              )}
            </Col>
          ))}
        </Row>
      </Container>
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>Beta Mode</Modal.Header>
        <Modal.Body>
          This is a beta feature that is in the process of being built. We would
          love any feedback on what we have so far. Please email
          team@cribfox.com with any thoughts or suggestions, we'd love to hear
          from you!
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
