import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import '../form3/css/style3.css';
import { IconFacebook,IconTwitter,IconLinkedin, IconInstagram } from "../../assets/icons/icons";
import Logo from "../../assets/FormImages/rebny-logo.png";
const Form3 = () => {
    return ( 
        <Container>
            <Row>
                <Col md={6} className="pt-5">
                <h4 class="resource-title font-weight-light">REBNY Resources | March 8,2021</h4>
                </Col>
                <Col md={6}>
                    <img src={Logo} alt="logo" />
                </Col>
            </Row>
            <Row>
                <Col md={10} className="pt-5 form-title pb-5">
                <h1>Health Questionnarie Screening form</h1>
                <h3>For Coronavirus (COVID-19)</h3>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="pt-5">
                    <p>
                    <span>The Real Estate Board of New York (REBNY) has put together this Coronavirus (COVID-19) Health Screening Questionnaire Form (the “Form”) which shall be
                        distributed to all persons who are attending any in-person property showings and/or meetings with the undersigned real estate licensee (the “Broker”). This Form
                        shall be distributed to all attendees within 24 hours of any scheduled meeting. Please understand that the purpose of this Form is to elicit information to help
                        promote the health and safety of all persons who may be involved in the meeting and/or showing, and that taking precautionary measures to prevent the spread of
                        the Coronavirus (COVID-19) is paramount to those efforts </span>
                    </p>
                    <p>
                        The Broker (or any agent of the Broker) may cancel or postpone any in-person showing or meeting without prejudice or penalty upon any indication that a person who is
                        attending the showing or meeting is exhibiting any <a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">symptoms of the Coronavirus (COVID-19)</a> or any other cold or flu-like symptoms. 
                    </p>
                    <p>
                    The person signing this Form hereby acknowledges and agrees that: (i) the information requested on this Form is being provided voluntarily, (ii) the information provided
                        on this Form is confidential and is not intended for use outside of determining whether an in-person showing or meeting can occur, (iii) the refusal or failure to answer
                        each question below may result in the cancellation of any scheduled meeting or showing, and that the Broker reserves the absolute right, in their sole discretion, to
                        refuse entry to that person; (iv) if the answer to questions 1-3 is “Yes” that person will not be permitted to attend the in-person showing or meeting; (v) if the answer to
                        question 4 is “Yes” and the answer to question 4a is “No” that person will not be permitted to attend the in-person showing or meeting; (vi) if the answer to question 5 is
                        “Yes” and the answer to question 5a is “No” that person will not be permitted to attend the in-person showing or meeting; (vii) any person may be asked in the future to
                        execute another Form in connection with a future meeting and/or showing; and (viii) they must notify the real estate licensee listed below if they become symptomatic
                        and/or test positive for COVID-19 within 48 hours of the last visit to the property. The Broker represents that they use and present this Form uniformly and in the same
                        manner for all in-person interactions and meetings and in accordance with all Federal, State and Local Fair Housing Laws.
                    </p>
                    <div class="col-md-12 pl-4 question-title"><h6><span>SCREENING QUESTIONS</span> Please answer the following 5 questions:</h6></div>
                </Col>
            </Row>
            <Row>
            <Col md={6} className="pl-4">
                <div class="pt-4">
                        <p><span>1.</span> Have you knowingly been in close or proximate contact in the past 14
                        days with anyone who has tested positive for COVID-19 or who has
                        had symptoms of COVID-19?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                            <label class="form-check-label" for="inlineCheckbox1">Yes</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                            <label class="form-check-label" for="inlineCheckbox2">No</label>
                        </div>
                </div>
                <div class="pt-4">
                        <p><span>2.</span> Have you tested positive for COVID-19 in the past 14 days?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option1"/>
                            <label class="form-check-label" for="inlineCheckbox3">Yes</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="option2"/>
                            <label class="form-check-label" for="inlineCheckbox4">No</label>
                        </div>
                </div>
                <div class="pt-4">
                        <p><span>3.</span> Have you experienced any symptoms of COVID-19 in the past 14
                            days?</p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox5" value="option1"/>
                            <label class="form-check-label" for="inlineCheckbox5">Yes</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox6" value="option2"/>
                            <label class="form-check-label" for="inlineCheckbox6">No</label>
                        </div>
                    </div>
                    <div class="pt-4">
                        <p><span>4.</span> In the past 10 days, have you traveled more than 24 hours to a state
                            or country for which New York State requires a quarantine? </p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox7" value="option1"/>
                            <label class="form-check-label" for="inlineCheckbox7">Yes</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox8" value="option2"/>
                            <label class="form-check-label" for="inlineCheckbox8">No</label>
                        </div>
                    </div>
                    <div class="pt-4 pl-3">
                        <p><span>a.</span> If yes, have you quarantined for at least three (3) days, been tested for
                            COVID-19 on or after the fourth (4th) day of returning to New York and
                            received a negative test result? OR have you quarantined for 10 days? </p>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox9" value="option1"/>
                            <label class="form-check-label" for="inlineCheckbox9">Yes</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox10" value="option2"/>
                            <label class="form-check-label" for="inlineCheckbox10">No</label>
                        </div>
                    </div>
                   
                </Col>
                <Col md={6}>
                <div class="pt-4">
                            <p><span>5.</span> In the past 10 days, have you traveled less than 24 hours to a state or
                                country which New York State deems to have a significant degree of
                                community-wide spread of COVID-19? </p>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox11" value="option1"/>
                                <label class="form-check-label" for="inlineCheckbox11">Yes</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox12" value="option2"/>
                                <label class="form-check-label" for="inlineCheckbox12">No</label>
                            </div>
                </div>
                <div class="pt-4 pl-3">
                            <p><span>a.</span> If yes, did you take a COVID-19 test on or after the 4th day following
                                your arrival and receive a negative test result? </p>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox13" value="option1"/>
                                <label class="form-check-label" for="inlineCheckbox13">Yes</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox14" value="option2"/>
                                <label class="form-check-label" for="inlineCheckbox14">No</label>
                            </div>
                        </div>
                        <div>
                            <div class="card mt-4">
                                <p class="card-text mb-0 p-3">*Per updated CDC guidance released on March 8, 2021, <span>“asymptomatic</span> fully vaccinated individuals,” meaning those who have
                                    received a single-shot vaccine or. <span>both</span> shots of a two-shot vaccine,
                                    are no longer required to quarantine if they have been in close
                                    contact with a person who has COVID-19. <span>However,</span>at least two
                                    weeks must have passed since the individual’s final shot prior to the
                                    exposure. Please read more from the <a href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/fully-vaccinated.html">CDC Here</a></p>
                                    <p class="card-text p-3">
                                        Please also note that <span>t PPE, social distancing and other protective
                                        protocols are still required and enforced for ALL individuals, including
                                        those fully vaccinated, in public settings.</span>
                                    </p>
                              </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div class="form-row detail pt-5">
                    <div class="col-md-4 mb-3">
                      <input type="text" class="form-control"/>
                      <label class="pt-2 input-head">Print Name</label>
                    </div>
                    <div class="col-md-4 mb-3">
                        <input type="text" class="form-control"/>
                        <label class="pt-2 input-head">Signature</label>
                      </div>
                      <div class="col-md-4 mb-3">
                        <input type="text" class="form-control"/>
                        <label class="pt-2 input-head">Date</label>
                      </div>
                </div>
                <div class="form-row detail pt-">
                    <div class="col-md-4 mb-3">
                      <input type="text" class="form-control"/>
                      <label class="pt-2 input-head">Property Address</label>
                    </div>
                    <div class="col-md-4 mb-3">
                        <input type="text" class="form-control"/>
                        <label class="pt-2 input-head">Name of Real Estate Licensee</label>
                      </div>
                      <div class="col-md-4 mb-3">
                        <input type="text" class="form-control"/>
                        <label class="pt-2 input-head">Name of Brokerage Company</label>
                      </div>
                </div>
                </Col>
            </Row>
                
                        <div className="footer pl-0">
                        <p><span>Important Note: </span>This Form should not be construed as offering or providing legal advice in any form. This Form is not intended to replace the reader’s need to speak with their own legal
                        ounsel regarding the issues presented. All readers should seek independent legal advice prior to instituting any re-entry policies and/or practices. </p>
                        <Row>
                            <Col md={6} className="p-0"> 
                            <ul>
                                <li>Real Estate board of New York</li>
                                <li>rebny.com</li>
                            </ul>
                            </Col>
                            <Col md={6} className="p-0">
                                <ul>
                                    <li>
                                        Stay in Touch
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
 
export default Form3;