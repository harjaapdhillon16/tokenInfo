import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import '../form1/css/style1.css';
import { IconFacebook,IconTwitter,IconLinkedin, IconInstagram } from "../../assets/icons/icons";
import Logo from "../../assets/FormImages/rebny-logo.png";
const Form1 = () => {
    return ( 
        <Container>
            <Row>
                <Col md={6} className="pt-5">
                <h4 class="resource-title font-weight-light">REBNY Resources</h4>
                </Col>
                <Col md={6}>
                    <img src={Logo} alt="logo" />
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
                    With stay-at-home orders being lifted in New York State, any parties involved in a real estate transaction must
                    continue to be aware of the risks that are associated with the Coronavirus (COVID-19). 
                    </p>
                    <p>
                        Throughout the course of a real estate transaction, it may become necessary for a party to enter or access a
                        residential or commercial property in-person, which raises the possibility of potential liability resulting from
                        exposure to the Coronavirus (COVID-19).
                    </p>
                    <p>
                    By entering the property or permitting a party to enter the property, you acknowledge that there is an assumption of exposure to the Coronavirus (COVID-19) and any and all consequences that may result from such exposure,including but not limited to, physical injury, psychological injury, pain, suffering, illness, temporary or permanentdisability, death or economic loss.
                    </p>
                    <p>
                    This form is intended to notify the parties of the risks associated with conducting property visits in-person. All parties associated with the in-person meeting or showing (including the Agent or Broker) should sign this form. By signing this form, you hereby acknowledge and assume such risks and/or potential consequences
                    </p>
                    <p className="acknowledge">
                    The undersigned hereby acknowledges receipt of this Coronavirus (COVID-19) Limitation of Liability Form andunderstands that the refusal to sign this form may result in the cancellation of any scheduled in-person meeting or showing.
                    </p>
                </Col>
            </Row>
                <Form>
                <Form.Row className="detail pt-5">
                    <Col md={4}>
                        <Form.Group controlId="formBasicSign">
                        <Form.Control type="text" />
                        <Form.Label>Signature</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formBasicSign">
                        <Form.Control type="text" />
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
                        <Form.Control type="text" />
                        <Form.Label>Name of Real Estate License</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={1} className="text-center mb-3 pl-lg-5 pl-md-5">
                        of
                    </Col>
                    <Col md={4} className="mb-3">
                        <Form.Group controlId="formBasicSign">
                        <Form.Control type="text" />
                        <Form.Label>Real Estate Brokerage Company</Form.Label>
                        </Form.Group>
                    </Col>
                </Form.Row>
                </Form>
                        <div className="footer pl-0">
                            <p>Please note that this form should not be construed as providing legal advice and you should review this form with an attorney before signing</p>
                        <Row>
                            <Col md={6} className="pt-2"> 
                            <h6>Real Estate board of New York | rebny.com</h6>
                            </Col>
                            <Col md={6}>
                                <ul>
                                    <li>
                                        <h6 className="pt-1">Stay in Touch</h6>
                                    </li>
                                    <li><IconTwitter /></li>
                                    <li><IconFacebook /></li>
                                    <li><IconLinkedin /></li>
                                    <li><IconInstagram /></li>
                                </ul>
                            </Col>
                        </Row>
                        </div>
        </Container>
     );
}
 
export default Form1 ;