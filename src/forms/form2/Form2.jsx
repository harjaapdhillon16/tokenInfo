import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import '../form2/css/style2.css';
import { IconFacebook,IconTwitter,IconLinkedin, IconInstagram } from "../../assets/icons/icons";
import Logo from "../../assets/FormImages/og_image.png";
const Form2 = () => {
    return ( 
        <Container>
            <Row className="pt-4">
                <Col md={2} sm={2} xs={12} className="pt-md-5 pt-sm-5">
                    <img src={Logo} alt="logo" className=" img-fluid logo"/>
                </Col>
                 <Col md={4} sm={4} xs={12} className="pt-md-5 pt-sm-5">
                    <h1 className="border-left">Division of Licensing Service</h1>
                </Col> 
                <Col md={6} sm={6} xs={12} className="header-right">
                    <div>
                            <ul>
                                <li>
                                    New York state
                                </li>
                                <li>
                                    Department of state, Division of Licensing Services
                                </li>
                                <li>
                                    (518) 474-4429
                                </li>
                                <li>
                                    <a href="https://www.dos.ny.gov/">www.dos.ny.gov</a>
                                </li>
                            </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                New York state
                            </li>
                            <li>
                                Division of Consumer Rights
                            </li>
                            <li>
                                (888) 392-3644
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className="title-bar">
                    <h4 className="py-2">New York State Housing and Anti-Discrimination Disclosure Form</h4>
                    </div>
                    <div className="pt-3">
                        <p>
                            Federal, State and local Fair Housing and Anti-discrimination Laws provide comprehensive protections from
                            discrimination in housing. It is unlawful for any property owner, landlord, property manager or other person
                            who sells, rents or leases housing, to discriminate based on certain protected characteristics, which include,but are not limited to <span>race, creed, color, national origin, sexual orientation, gender identity or expression, military status, sex, age, disability, marital status, lawful source of income or familial status.</span> Real estate professionals must also comply with all Fair Housing and Anti-discrimination Laws.
                        </p>
                        <h5>
                            <span>Real estate brokers and real estate salespersons, and their employees and agents violate the Law if they:</span>
                        </h5>
                        <ul>
                            <li>
                                Discriminate based on any protected characteristic when negotiating a sale, rental or lease,
                                including representing that a property is not available when it is available
                            </li>
                            <li>
                                Negotiate discriminatory terms of sale, rental or lease, such as stating a different price because of race, national origin or other protected characteristic.
                            </li>
                            <li>
                                Discriminate based on any protected characteristic because it is the preference of a seller or landlord.
                            </li>
                            <li>
                                Discriminate by “steering” which occurs when a real estate professional guides prospective buyers or
                                renters towards or away from certain neighborhoods, locations or buildings, based on any protected
                                characteristic.
                            </li>
                            <li>
                                Discriminate by “blockbusting” which occurs when a real estate professional represents that a change has occurred or may occur in future in the composition of a block, neighborhood or area, with respect to any protected characteristics, and that the change will lead to undesirable consequences for that area, such as lower property values, increase in crime, or decline in the quality of schools.
                            </li>
                            <li>
                                Discriminate by pressuring a client or employee to violate the Law.
                            </li>
                            <li>
                                Express any discrimination because of any protected characteristic by any statement, publication,advertisement, application, inquiry or any Fair Housing Law record.

                            </li>
                        </ul>
                        <h5>
                                <span>YOU HAVE THE RIGHT TO FILE A COMPLAINT</span>
                            </h5>
                            <h6>
                                <span>If you believe you have been the victim of housing discrimination</span>you should file a complaint with the New York State Division of Human Rights (DHR). Complaints may be filed by:

                            </h6>
                            <ul>
                                <li>
                                    Downloading a complaint form from the DHR website: <a href="https://dhr.ny.gov/">www.dhr.ny.gov;</a>
                                </li>
                                <li>
                                    Stop by a DHR office in person, or contact one of the Division’s offices, by telephone or by mail, to obtain
                                    a complaint form and/or other assistance in filing a complaint. A list of office locations is available online at:
                                    <a href="https://dhr.ny.gov/contact-us">
                                    https://dhr.ny.gov/contact-us,</a> and the Fair Housing HOTLINE at (844)-862-8703.
                                </li>
                            </ul>
                            <p>
                                You may also file a complaint with the NYS Department of State, Division of Licensing Services. Complaints may be filed by:</p>
                                <ul>
                                    <li>
                                        Downloading a complaint form from the Department of State’s website 
                                        <a href="https://www.dos.ny.gov/licensing/complaint_links.html">
                                        https://www.dos.ny.gov/licensing/complaint_links.html</a>
                                    </li>
                                    <li>
                                        Stop by a Department’s office in person, or contact one of the Department’s offices, by telephone or by mail, to obtain a complaint form.
                                    </li>
                                    <li>
                                        Call the Department at (518) 474-4429.
                                    </li>
                                </ul>
                                <h6>There is no fee charged to you for these services. It is unlawful for anyone to retaliate against you for filing a complaint.</h6>
                    </div>
                </Col>
            </Row>
            <Row className="pt-4">
                <Col md={12}>
                <h5>For more information on Fair Housing Act rights and responsibilities please visit</h5>
                       <p>
                           <a href="https://dhr.ny.gov/fairhousing">https://dhr.ny.gov/fairhousing</a> and <a href="https://www.dos.ny.gov/licensing/fairhousing.html">https://www.dos.ny.gov/licensing/fairhousing.html
                           </a>
                       </p>
                       <form class="form-inline submit-form">
                           <p>
                            This form was provided to me by <input type="text" class="form-control mb-2 mr-sm-2"/>
                            (print name of Real Estate Salesperson/
                            Broker) of<input type="text" class="form-control mb-2 mr-sm-2" />
                            (print name of Real Estate company, firm or brokerage)<br/>
                            (I)(We)<input type="text" class="form-control mb-2 mr-sm-2"/>
                            (Buyer/Tenant/Seller/Landlord) acknowledge receipt of a copy of this disclosure form:
                           </p> 
                    </form>
                    <div class="form-row pt-4 detail ">
                        <div class="col-md-7 mb-3 d-flex">
                            <label class="pt-2 input-head">Buyer/Tenant/Seller/Landlord Signature</label>
                            <input type="text" class="form-control"/>
                          </div>
                    
                          <div class="col-md-5 mb-3 d-flex">
                            <label class="pt-2 input-head">Date:</label>
                            <input type="text" class="form-control"/>
                          </div>
                    </div>
                    <div class="form-row pt-4 detail ">
                        <div class="col-md-7 mb-3 d-flex">
                            <label class="pt-2 input-head">Buyer/Tenant/Seller/Landlord Signature</label>
                            <input type="text" class="form-control"/>
                          </div>
                    
                          <div class="col-md-5 mb-3 d-flex">
                            <label class="pt-2  input-head">Date:</label>
                            <input type="text" class="form-control"/>
                          </div>
                    </div>
                    <p class="pt-4">
                        Real Estate broker and real estate salespersons are required by New York State law to provide you with this Disclosure.
                    </p>
                  
                </Col>
            </Row>
            
        </Container>
     );
}
 
export default Form2 ;