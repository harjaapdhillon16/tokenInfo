import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  Button,
  Image,
} from "react-bootstrap";
import Logo from "../../assets/FormImages/og_image.png";
import "./css/style5.css";
const Form5 = () => {
  return (
    <Container className="form4">
      <Row className="pt-4">
        <Col md={2} sm={12} xs={12}>
          <img src={Logo} alt="logo" className=" img-fluid logo" />
        </Col>
        <Col md={4} sm={12} xs={12} className="top-title">
          <h2 className="border-left">Division of Licensing Service</h2>
        </Col>
        <Col md={6} sm={12} xs={12} className="header-right">
          <div>
            <ul>
              <li>New York state</li>
              <li>
                <span>Department of State</span>
                <li>
                  <span>Division of Licensing Services</span>
                </li>
              </li>
              <li>P.O. Box 22001</li>
              <li>Albany, NY 12201-2001</li>
              <li>Customer Service: (518) 474-4429</li>
              <li>
                <a href="https://www.dos.ny.gov/">www.dos.ny.gov</a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="title-bar">
            <h4 className="py-2 mb-0">
              New York State Housing Discrimination Disclosure Form
            </h4>
          </div>
          <p className="pt-3">
            Federal, State and local Fair Housing Laws provide comprehensive
            protections from discrimination in housing. It is unlawful for any
            property owner, landlord, property manager or other person who
            sells, rents or leases housing, to discriminate based on certain
            protected characteristics, which include, but are not limited to{" "}
            <b>
              race, creed, color, national origin, sexual orientation, gender
              identity or expression, military status, sex, age, disability,
              marital status, lawful source of income or familial status
            </b>
            . Real estate professionals must also comply with all Fair Housing
            Laws.
          </p>
          <b>
            Real estate brokers and real estate salespersons, and their
            employees and agents violate the Law if they:
          </b>
          <div>
            <ul>
              <li>
                Discriminate based on any protected characteristic when
                negotiating a sale, rental or lease, including representing that
                a property is not available when it is available
              </li>
              <li>
                Negotiate discriminatory terms of sale, rental or lease, such as
                stating a different price because of race, national origin or
                other protected characteristic.
              </li>
              <li>
                Discriminate based on any protected characteristic because it is
                the preference of a seller or landlord.
              </li>
              <li>
                Discriminate by “steering” which occurs when a real estate
                professional guides prospective buyers or renters towards or
                away from certain neighborhoods, locations or buildings, based
                on any protected characteristic.
              </li>
              <li>
                Discriminate by “blockbusting” which occurs when a real estate
                professional represents that a change has occurred or may occur
                in future in the composition of a block, neighborhood or area,
                with respect to any protected characteristics, and that the
                change will lead to undesirable consequences for that area, such
                as lower property values, increase in crime, or decline in the
                quality of schools.
              </li>
              <li>
                Discriminate by pressuring a client or employee to violate the
                Law.
              </li>
              <li>
                Express any discrimination because of any protected
                characteristic by any statement, publication, advertisement,
                application, inquiry or any Fair Housing Law record.
              </li>
            </ul>
          </div>
          <div>
            <h5>YOU HAVE THE RIGHT TO FILE THE COMPLAINT</h5>
            <p>
              <b>If you believe you have been the victim of housing discrimination </b>you should file a complaint with the New York State Division of Human Rights (DHR). Complaints may be filed by:</p>
              <ul>
                <li>
                  Downloading a complaint form from the DHR website: 
                  <a href="https://dhr.ny.gov/">www.dhr.ny.gov;</a> 
                </li>
                <li>
                  Stop by a DHR office in person, or contact one of the Division’s offices, by telephone or by mail, to obtain a complaint form and/or other assistance in filing a complaint. A list of office locations is available online at: 
                  <a href="https://dhr.ny.gov/contact-us">https://dhr.ny.gov/contact-us,</a> 
                  and the Fair Housing HOTLINE at (844)-862-8703. 
                </li>
              </ul>
              <p>
              You may also file a complaint with the NYS Department of State, Division of Licensing Services. Complaint may be filed by:
              <ul>
                <li>
                  Downloading a complaint form from the Department of State’s website
                  https://www.dos.ny.gov/licensing/complaint_links.html 
                </li>
                <li>
                Stop by a Department’s office in person, or contact one of the Department’s offices, by telephone or by mail, to obtain a complaint form. 
                </li>
                <li>
                Call the Department at (518) 474-4429. 
                </li>
              </ul>
              There is no fee charged to you for these services. It is unlawful for anyone to retaliate against you for filing a complaint. 
              </p>
          </div>
          <div>
          <p>For more information on Fair Housing Act rights and responsibilities please visit </p>
          <span>
            <a href="https://dhr.ny.gov/fairhousing">https://dhr.ny.gov/fairhousing </a>
          </span>
          <span>and </span>
          <span>
            <a href="https://www.dos.ny.gov/licensing/fairhousing.html"> https://www.dos.ny.gov/licensing/fairhousing.html.  </a>
          </span>
          </div>
          <form className="form-text">
            <p className="d-flex mt-5">
            This form was provided to me by 
              <Form.Control 
                  className="form-control text-field mx-3 "
                  type="text"
              />
              (print name of Real Estate Salesperson/

            </p>
            <p className="d-flex mt-5">
            Broker) of 
              <Form.Control 
                  className="form-control text-field mx-3 "
                  type="text"
              />
              (print name of Real Estate company, firm or brokerage) 

            </p>
            <p className="d-flex mt-5">
            (I)(We) 
              <Form.Control 
                  className="form-control text-field1 mx-3 "
                  type="text"
              />

            </p>
            <p>
            (Real Estate Consumer/Seller/Landlord) acknowledge receipt of a copy of this disclosure form: 
            </p>
            <div>
            <p className="d-flex mt-5">
            Real Estate Consumer/Seller/Landlord Signature
              <Form.Control 
                  className="form-control text-field mx-3 "
                  type="text"
              />
            
              Date
              <Form.Control 
                  className="form-control date-field mx-3 "
                  type="text"
              />
            
            </p>
            <p>
              Real Estate broker and real estate salespersons are required by New York State law to provide you with this Disclosure. 
              </p>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Form5;
