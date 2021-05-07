import React, { Component, useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import FontPicker from "font-picker-react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import "../form1/css/style1.css";
import {
  IconFacebook,
  IconTwitter,
  IconLinkedin,
  IconInstagram,
} from "../../assets/icons/icons";
import Nav from "react-bootstrap/Nav";
import Accordion from "react-bootstrap/Accordion";
import Logo from "../../assets/FormImages/rebny-logo.png";


const Form1 = ({formItem}) => {
  console.log('formItem', formItem);
  
  const [show, setShow] = useState(false);
  const [canvasShow, setCanvasShow] = useState(true);
  const [fieldShow, setFieldShow] = useState(false);
  const sigPad = useRef({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [signImage, setSignImage] = useState(null);
  const [activeFontFamily,setActiveFontFamily] = useState("Open Sans");
  const [signAsText,setSignAsText] = useState("");
  const [signMethod,setSignMethod]= useState("draw")

  function clear() {
    sigPad.current.clear();
  }

  const genrateImage = () => {
    setShow(false);
    setSignMethod("draw")
    setSignImage(sigPad.current.toDataURL());
  };
  const handleSignAsText = () => {
    setShow(false);
    setSignMethod("sign");

  }

  const toggleMethod = () => {
    if (canvasShow == false) {
      setCanvasShow(true);
      setFieldShow(false);
    } else {
      setCanvasShow(false);
      
    }
  };

  const toggleField =() => {
    if(fieldShow == false) {
      setFieldShow(true);
      setCanvasShow(false);
    }
    else{
      setFieldShow(false);
    }
  }
 
  return (
    <Container className="form1">
      <Row>
        <Col md={6} className="pt-5">
          <h4 class="resource-title font-weight-light">REBNY Resources</h4>
        </Col>
        <Col md={6} className="pt-5">
          <img src={Logo} alt="logo" className="form1-logo" />
        </Col>
      </Row>
      <Row>
        <Col md={10} className="pt-5 form-title pb-5">
      
          <h1>Limitation of Liability-Form</h1>
          <h3>For Coronavirus (COVID-19)</h3>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="pt-5">
          <p>
            With stay-at-home orders being lifted in New York State, any parties
            involved in a real estate transaction must continue to be aware of
            the risks that are associated with the Coronavirus (COVID-19).
          </p>
          <p>
            Throughout the course of a real estate transaction, it may become
            necessary for a party to enter or access a residential or commercial
            property in-person, which raises the possibility of potential
            liability resulting from exposure to the Coronavirus (COVID-19).
          </p>
          <p>
            By entering the property or permitting a party to enter the
            property, you acknowledge that there is an assumption of exposure to
            the Coronavirus (COVID-19) and any and all consequences that may
            result from such exposure,including but not limited to, physical
            injury, psychological injury, pain, suffering, illness, temporary or
            permanentdisability, death or economic loss.
          </p>
          <p>
            This form is intended to notify the parties of the risks associated
            with conducting property visits in-person. All parties associated
            with the in-person meeting or showing (including the Agent or
            Broker) should sign this form. By signing this form, you hereby
            acknowledge and assume such risks and/or potential consequences
          </p>
          <p className="acknowledge">
            The undersigned hereby acknowledges receipt of this Coronavirus
            (COVID-19) Limitation of Liability Form andunderstands that the
            refusal to sign this form may result in the cancellation of any
            scheduled in-person meeting or showing.
          </p>
        </Col>
      </Row>
      <Form>
        <Form.Row className="detail pt-5">
          <Col md={4}>
            <Form.Group onClick={handleShow} controlId="formBasicSign">
             { signMethod === "draw" ?  <img src={signImage} /> : <span className="sign apply-font">{signAsText}</span>}  
              <div className="sign-field">
              {/* <Form.Control type="text" className="apply-font" /> */}
              </div>
              <Form.Label>Signature</Form.Label>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formBasicSign">
              <Form.Control type="text" value={formItem.data[1]}/>
              <Form.Label>Full Name</Form.Label>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formBasicSign">
              <Form.Control type="text" />
              <Form.Label>Date</Form.Label>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
      <Form>
        <Form.Row className="detail pt-4">
          <Col md={4} className="mb-3">
            <p>This form was presented to me by </p>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group controlId="formBasicSign">
              <Form.Control type="text" value={formItem.data[3]}/>
              <Form.Label>Name of Real Estate License</Form.Label>
            </Form.Group>
          </Col>
          <Col md={1} className="text-center mb-3 pl-lg-5 pl-md-5">
            of
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group controlId="formBasicSign">
              <Form.Control type="text" value={formItem.data[5]} />
              <Form.Label>Real Estate Brokerage Company</Form.Label>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
      <div className="footer pl-0">
        <p>
          Please note that this form should not be construed as providing legal
          advice and you should review this form with an attorney before signing
        </p>
        <Row>
          <Col md={6} className="pt-2 d-flex justify-content-center">
            <h6>Real Estate board of New York | rebny.com</h6>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <ul>
              <li>
                <h6 className="pt-1">Stay in Touch</h6>
              </li>
              <li>
                <IconTwitter />
              </li>
              <li>
                <IconFacebook />
              </li>
              <li>
                <IconLinkedin />
              </li>
              <li>
                <IconInstagram />
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Please Confirm Full name and Signature</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="draw-modal">
          <Nav fill variant="tabs" defaultActiveKey="link-1">
            <Nav.Item>
              <Nav.Link onClick={toggleMethod} eventKey="link-1">Draw</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={toggleField} eventKey="link-2">Type</Nav.Link>
            </Nav.Item>
          </Nav>
          {canvasShow && (
            <>
              <SignaturePad
                canvasProps={{
                  width: 400,
                  height: "auto",
                  className: "sigCanvas",
                }}
                ref={sigPad}
              />
                <p style={{paddingTop: 10, paddingLeft: 30}}>I am Chris Oliver and this is my legal representation of my Signature.</p>
                <div className="d-flex justify-content-center">
                <Button variant="secondary" onClick={clear} className="mr-3">
                  Clear{" "}
                </Button>
                <Button variant="primary" onClick={genrateImage}>
                Insert Signature
                </Button>
                </div>
              
              </>
            )}
            {fieldShow && (
              <>
              <div className="d-flex">
               <Form.Control type="text" value={signAsText} onChange={(e)=> setSignAsText(e.target.value)} placeholder="Type your name here" className="toggle-field apply-font" />
                 <FontPicker
                    apiKey="AIzaSyBCM9e_yuN64gSRUQxGrmHTJtK1v2YKvL8"
                    activeFontFamily={activeFontFamily}
                    
                    onChange={(nextFont) =>
                        setActiveFontFamily(
                          nextFont.family,
                        )
                    }
                />
                </div>
               <p style={{paddingTop: 10, paddingLeft: 30}}>I am Chris Oliver and this is my legal representation of my Signature.</p>
                <div className="d-flex justify-content-center">
                <Button variant="secondary" onClick={clear} className="mr-3">
                  Clear{" "}
                </Button>
                <Button variant="primary" onClick={handleSignAsText}>
                Insert Signature
                </Button>
                </div>
                
                
                </>
           
          )}
        
        </Modal.Body>
       
      </Modal>
    </Container>
  );
};

export default Form1;
