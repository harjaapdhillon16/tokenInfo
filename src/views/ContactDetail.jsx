import React, { useEffect, useState, useContext } from "react";
import { IconChecked } from "../assets/icons/icons";
import { Container, Row, Col, Card, InputGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/header/header";
import { Dropdown } from "react-bootstrap";
import {getContact} from "../graphql/queries";
import Accordion from "react-bootstrap/Accordion";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { API, graphqlOperation } from "aws-amplify";
import AppContext from "../context/appContext";

const ContactDetail = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleContact();
  }, []);

  const [userDetail, setUserDetail] = useState({});
  const { contacts, onUpdateContacts} = useContext(AppContext);
  const handleContact = async () => {
    const data = { id: props.match.params.id };
    console.log(props.match.params.id)
    try {
      const getContactData = await API.graphql(graphqlOperation(getContact, {
        id: props.match.params.id
      }));

      setUserDetail(getContactData.data.getContact);
      console.log();
       
    
    } catch (err) {
      console.log(err);

    }
  };
  console.log(userDetail)
  return (
    <Container fluid className="p-0">
      <Header />

      <Container className="p-0">
        <Breadcrumb className="title-bar">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/contacts">Contacts</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{userDetail.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col md={12} className="pt-5">
            <h5>{userDetail.name}</h5>
            <span>Director at Smith & Wesson</span>
          </Col>
        </Row>
        <Row className="mt-3 ">
          <Col md={4}>
            <Accordion defaultActiveKey="0">
              <Card className ="pb-0 about-detail mb-4">
                <Card.Header className="pl-0">
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <h6>About</h6>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="border-bottom py-3">
                      <h6>Name</h6>
                      {userDetail.name}
                    </div>
                    <div className="border-bottom py-3">
                      <h6>Email</h6>
                      {userDetail.email}
                    </div>
                    <div className="border-bottom py-3">
                      <h6>Phone</h6>
                      917-552-7895
                    </div>
                    <div className="border-bottom py-3">
                      <h6>Company</h6>
                      Smith & Wesson
                    </div>
                    <div className="border-bottom py-3 mb-3">
                      <h6>Title</h6>
                      Director
                    </div>
                    <Button variant="outline-secondary invite d-flex justify-content-center m-auto mb-lg-3">
                      Show More{" "}
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Accordion defaultActiveKey="0">
              <Card className ="pb-0 about-detail mb-4">
                <Card.Header className="pl-0">
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <h6>Deals</h6>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="border-bottom py-3">
                      <p>
                          <Link to='#'>TBD</Link></p>
                          <p>$800,000 | Active | Buyer</p>
                          <span>Last updated 3/31/2021 at 2:02 PM ET</span>
                    </div>
                    <div className="border-bottom py-3">
                      <p>
                          <Link to='#'>1000 Biscayne Blvd, Miami, FL 35413</Link></p>
                          <p>$1,000,000 | Contract | Seller</p>
                          <span>Last updated 3/20/2021 at 1:02 PM ET</span>
                    </div>
                    <div className="border-bottom py-3 mb-3">
                      <p>
                          <Link to='#'>4888 Collins Ave, Apt 23, Miami, FL</Link></p>
                          <p>$5,200 | Closed | Tenant</p>
                          <span>Last updated 1/15/2020 at 9:02 PM ET</span>
                    </div>
                    <Button variant="outline-secondary invite d-flex justify-content-center m-auto mb-lg-3">
                      Show More{" "}
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col md={8} className="detail-contact-right px-5">
            <div className="d-flex">
              <Dropdown className="pt-4">
                <Dropdown.Toggle className="drop-btn pt-0 pl-0">
                  History
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="pt-4 ml-auto">
                <Dropdown.Toggle className="drop-btn pt-0">
                  Filter
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="border-bottom pt-4 pb-2">
              <h6 className="border-bottom pb-2">March 2021</h6>
              <p className="my-2 mt-3">
                John Smith signed
                <Link to="#"> REBNY COVID Liability Form </Link>
              </p>
              <span className="pt-3">3/31/2021 at 2:02 PM ET</span>
            </div>
            <div className="border-bottom pt-2 pb-2">
              <p className="my-2 mt-3">
                You sent John Smith
                <Link to="#"> REBNY COVID Liability Form </Link>to sign
              </p>
              <span className="pt-3">3/29/2021 at 12:02 PM ET</span>
            </div>
            <div className="pt-2 pb-2">
              <p className="my-2 mt-3">
                You added a note to
                <Link to="#">buyer deal at TBD</Link>with John Smith
              </p>
              <span className="pt-3">3/15/2021 at 1:02 PM ET</span>
            </div>
            <div className="border-bottom pt-4 pb-2">
              <h6 className="border-bottom pb-2">February 2021</h6>
              <p className="my-2 mt-3">
                You created a<Link to="#">buyer deal at TBD</Link>with John
                Smith
              </p>
              <span className="pt-3">2/29/2021 at 12:02 PM ET</span>
            </div>
            <div className="border-bottom pt-2 pb-2">
              <p className="my-2 mt-3">
                You created a listing feedback form at
                <Link to="#">111 Fifth Avenue</Link>with John
              </p>
              <span className="pt-3">2/12/2021 at 4:02 PM ET</span>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ContactDetail;
