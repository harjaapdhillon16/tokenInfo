import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button, Image } from "react-bootstrap";
import "../form3/css/style3.css";
import Nav from "react-bootstrap/Nav";
import {
  IconFacebook,
  IconTwitter,
  IconLinkedin,
  IconInstagram,
} from "../../assets/icons/icons";
import { Auth } from 'aws-amplify';
import SignaturePad from "react-signature-canvas";
import Logo from "../../assets/FormImages/rebny-logo.png";
import FontPicker from "font-picker-react";
import { API, graphqlOperation } from "aws-amplify";
import { updateFormData } from "../../graphql/mutations";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactToPdf from 'react-to-pdf';
import AuditTrail from './../../components/AuditTrail'

const Form3 = (formItem) => {
  console.log('formItem', formItem);

  const [show, setShow] = useState(false);
  const [canvasShow, setCanvasShow] = useState(true);
  const [fieldShow, setFieldShow] = useState(false);
  const sigPad = useRef({});
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [signImage, setSignImage] = useState("");
  const [signAsText, setSignAsText] = useState("");
  const [signMethod, setSignMethod] = useState("draw");
  const [activeFontFamily, setActiveFontFamily] = useState("Open Sans");
  const [formSubmitStatus, setFormSubmitStatus] = useState(false);
  const [viewedStatus, setViewedStatus] = useState(false);
  const ref = React.createRef();
  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [9,22]
  };

  useEffect(() => {
    sendViewStatus();
    checkaAuthentication();
  }, []);

  const checkaAuthentication = () => {
    Auth.currentAuthenticatedUser()
    .then(userData => {
      console.log('userData', userData);
      if(userData !== ""){
        setViewedStatus(true)
      }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  const sendViewStatus = async () => {
    if (formItem.formData.status === "SENT") {
      let data = {};
      data.id = formItem.formData.id;
      data.status = "VIEWED";
      console.log(data);

      try {
        const checkFormStatus = await API.graphql(
          graphqlOperation(updateFormData, { input: data })
        );
        console.log("checkFormStatus", checkFormStatus);
      } catch (err) {
        console.log(err, "Error updating Form View status");
      }
    }
  };

  const genrateImage = () => {
    setShow(false);
    setSignMethod("draw");
    setSignImage(sigPad.current.toDataURL());
  };

  const handleSignAsText = () => {
    setShow(false);
    setSignMethod("sign");
  };
  
  function clear() {
    sigPad.current.clear();
  }

  const toggleMethod = () => {
    if (canvasShow == false) {
      setCanvasShow(true);
      setFieldShow(false);
    } else {
      setCanvasShow(false);
    }
  };
  

  const toggleField = () => {
    if (fieldShow == false) {
      setFieldShow(true);
      setCanvasShow(false);
    } else {
      setFieldShow(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      checkValueFirst: "",
      checkValueSecond: "",
      checkValueThird: "",
      checkValueFourth: "",
      fullName: formItem.formData.data[1],
      currentdate: formItem.formData.data[3],
      propertyAddress: formItem.formData.data[5],
      realEstateName: formItem.formData.data[7],
      realEstateBrokerageCompany: formItem.formData.data[9]
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      checkValueFirst: Yup.boolean().required("First Required value"),
      checkValueSecond: Yup.boolean().required("Second Required value"),
      checkValueThird: Yup.boolean().required("Required value"),
      checkValueFourth: Yup.boolean().required("Required value"),
      fullName: Yup.string().required("Please enter the name"),
      currentdate: Yup.string().required("Please enter the date"),
      propertyAddress: Yup.string().required("Required property address"),
      realEstateName: Yup.string().required("Please enter the Real Estate Name"),
      realEstateBrokerageCompany: Yup.string().required("Please enter the Real Estate Company"),
    }),
    onSubmit: (values) => {
        console.log('values', values);
        submitForm(values);
    },
  });
  

  const submitForm = async (values) => {
    let updateData = [];
    let finalObject = {};

    let data = [];
    data[0] = "name";
    data[1] = values.fullName;
    data[2] = "date";
    data[3] = values.currentdate;
    data[4] = "property_address";
    data[5] = values.propertyAddress;
    data[6] = "real_estate_name";
    data[7] = values.realEstateName;
    data[8] = "name_of_brockerage_company";
    data[9] =  values.realEstateBrokerageCompany;
    data[10] = "checkValueFirst";
    data[11] = values.checkValueFirst;
    data[12] = "checkValueSecond";
    data[13] = values.checkValueSecond;
    data[14] = "checkValueThird";
    data[15] = values.checkValueThird;
    data[16] = "checkValueFourth";
    data[17] = values.checkValueFourth;

    if (signAsText !== "") {
      finalObject.id = formItem.formData.id;
      finalObject.isSignatureTyped = true;
      finalObject.signatureFont = activeFontFamily;
      finalObject.signature = signAsText;
      finalObject.status = "SIGNED";
      finalObject.data = data;
      updateData = finalObject;
    } else if (signImage !== "") {
      finalObject.id = formItem.formData.id;
      finalObject.isSignatureTyped = false;
      finalObject.signature = signImage;
      finalObject.status = "SIGNED";
      finalObject.data = data;
      updateData = finalObject;
    }

    console.log("updateData", updateData);

    try {
      const editForm = await API.graphql(
        graphqlOperation(updateFormData, { input: updateData })
      );
      console.log("editFormData", editForm);
      console.log(editForm.data.updateFormData.status);
      formItem.status = editForm.data.updateFormData.status;
    } catch (err) {
      console.log(err, "Error updating Form data");
    }
    setFormSubmitStatus(true);
  }

  console.log('viewedStatus', viewedStatus);
  return (
    <Container className="form3" ref={ref}>
      <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col md={6} className="pt-5">
          <h4 class="resource-title font-weight-light">
            REBNY Resources | March 8,2021
          </h4>
        </Col>
        <Col md={6} className="pt-5">
          <img src={Logo} alt="logo" className="logo" />
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
            <span>
              The Real Estate Board of New York (REBNY) has put together this
              Coronavirus (COVID-19) Health Screening Questionnaire Form (the
              “Form”) which shall be distributed to all persons who are
              attending any in-person property showings and/or meetings with the
              undersigned real estate licensee (the “Broker”). This Form shall
              be distributed to all attendees within 24 hours of any scheduled
              meeting. Please understand that the purpose of this Form is to
              elicit information to help promote the health and safety of all
              persons who may be involved in the meeting and/or showing, and
              that taking precautionary measures to prevent the spread of the
              Coronavirus (COVID-19) is paramount to those efforts{" "}
            </span>
          </p>
          <p>
            The Broker (or any agent of the Broker) may cancel or postpone any
            in-person showing or meeting without prejudice or penalty upon any
            indication that a person who is attending the showing or meeting is
            exhibiting any{" "}
            <a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">
              symptoms of the Coronavirus (COVID-19)
            </a>{" "}
            or any other cold or flu-like symptoms.
          </p>
          <p>
            The person signing this Form hereby acknowledges and agrees that:
            (i) the information requested on this Form is being provided
            voluntarily, (ii) the information provided on this Form is
            confidential and is not intended for use outside of determining
            whether an in-person showing or meeting can occur, (iii) the refusal
            or failure to answer each question below may result in the
            cancellation of any scheduled meeting or showing, and that the
            Broker reserves the absolute right, in their sole discretion, to
            refuse entry to that person; (iv) if the answer to questions 1-3 is
            “Yes” that person will not be permitted to attend the in-person
            showing or meeting; (v) if the answer to question 4 is “Yes” and the
            answer to question 4a is “No” that person will not be permitted to
            attend the in-person showing or meeting; (vi) if the answer to
            question 5 is “Yes” and the answer to question 5a is “No” that
            person will not be permitted to attend the in-person showing or
            meeting; (vii) any person may be asked in the future to execute
            another Form in connection with a future meeting and/or showing; and
            (viii) they must notify the real estate licensee listed below if
            they become symptomatic and/or test positive for COVID-19 within 48
            hours of the last visit to the property. The Broker represents that
            they use and present this Form uniformly and in the same manner for
            all in-person interactions and meetings and in accordance with all
            Federal, State and Local Fair Housing Laws.
          </p>
          <div class="col-md-12 pl-4 question-title">
            <h6>
              <span>SCREENING QUESTIONS</span> Please answer the following 5
              questions:
            </h6>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={7} className="pl-4">
          <div class="pt-4">
            <p>
              <span>1.</span>Have you knowingly been in close or proximate contact in the past 14 days with anyone who has tested positive for COVID-19 or who has had symptoms of COVID-19?
            </p>

            
              {formItem.formData.status !== "SIGNED" ? (
                <div>
                <div class="form-check form-check-inline">
                {viewedStatus ?
                  <input
                    class="form-check-input"
                    type="radio"
                    checked=""
                  />
                :
                  <input
                    class="form-check-input"
                    type="radio"
                    id="checkValueFirst"
                    name="checkValueFirst"
                    value="true"
                    checked={formik.values.checkValueFirst === "true"}
                    onChange={() => formik.setFieldValue("checkValueFirst", "true")}
                  />
                }
                <label class="form-check-label" for="inlineCheckbox1">
                  Yes
                </label>
              </div>

              <div class="form-check form-check-inline">
                {viewedStatus ?
                  <input
                    class="form-check-input"
                    type="radio"
                    checked=""
                  />
                :
                  <input
                    class="form-check-input"
                    type="radio"
                    id="checkValueFirst"
                    name="checkValueFirst"
                    value="false"
                    checked={formik.values.checkValueFirst === "false"}
                    onChange={() => formik.setFieldValue("checkValueFirst", "false")}
                  />
                }
                <label class="form-check-label" for="inlineCheckbox2">
                  No
                </label>
              </div>
              </div>
              
              ):(
                <div>
                  <div class="form-check form-check-inline">
                    {formItem.formData.data[11] === "true" ? (
                      <input
                        class="form-check-input"
                        type="radio"
                        checked={formItem.formData.data[11]}
                      />
                    ):(
                      <input
                        class="form-check-input"
                        type="radio"
                        checked=""
                      />
                    )}
                    <label class="form-check-label" for="inlineCheckbox1">
                      Yes
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    {formItem.formData.data[11] === "false" ? (
                      <input
                        class="form-check-input"
                        type="radio"
                        checked={formItem.formData.data[11]}
                      />
                    ):(
                      <input
                        class="form-check-input"
                        type="radio"
                        checked=""
                      />
                    )}
                  <label class="form-check-label" for="inlineCheckbox2">
                    No
                  </label>
                </div> 
              </div>
              )}
            {formik.touched.checkValueFirst && formik.errors.checkValueFirst && (
              <Form.Text className="text-error mx-3">{formik.errors.checkValueFirst}</Form.Text>
            )}
          </div>

          <div class="pt-4">
            <p>
              <span>2.</span> Have you tested positive for COVID-19 in the past
              14 days?
            </p>

            {formItem.formData.status !== "SIGNED" ?
              <div>
                <div class="form-check form-check-inline">
                  {viewedStatus ?
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  :
                    <input
                      class="form-check-input"
                      type="radio"
                      id="checkValueSecond"
                      name="checkValueSecond"
                      value="true"
                      checked={formik.values.checkValueSecond === "true"}
                      onChange={() => formik.setFieldValue("checkValueSecond", "true")}
                    />
                  }
                  <label class="form-check-label" for="inlineCheckbox3">
                    Yes
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  {viewedStatus ?
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  :
                    <input
                      class="form-check-input"
                      type="radio"
                      id="checkValueSecond"
                      name="checkValueSecond"
                      value="false"
                      checked={formik.values.checkValueSecond === "false"}
                      onChange={() => formik.setFieldValue("checkValueSecond", "false")}
                    />
                  }
                  <label class="form-check-label" for="inlineCheckbox4">
                    No
                  </label>
                </div>
              </div>
            :
              <div>
                <div class="form-check form-check-inline">
                  {formItem.formData.data[13] === "true" ? (
                    <input
                      class="form-check-input"
                      type="radio"
                      checked={formItem.formData.data[13]}
                    />
                  ):(
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  )}
                  <label class="form-check-label" for="inlineCheckbox3">
                    Yes
                  </label>
                </div>
                
                <div class="form-check form-check-inline">
                  {formItem.formData.data[13] === "false" ? (
                    <input
                      class="form-check-input"
                      type="radio"
                      checked={formItem.formData.data[13]}
                    />
                  ):(
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  )}
                  <label class="form-check-label" for="inlineCheckbox4">
                    No
                  </label>
                </div>
              </div>
            } 

            {formik.touched.checkValueSecond && formik.errors.checkValueSecond && (
              <Form.Text className="text-error mx-3">{formik.errors.checkValueSecond}</Form.Text>
            )}
          </div>


          <div class="pt-4">
            <p>
              <span>3.</span> Have you experienced any symptoms of COVID-19 in
              the past 14 days?
            </p>

            {formItem.formData.status !== "SIGNED" ?
              <div>
                <div class="form-check form-check-inline">
                  {viewedStatus ?
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  :
                    <input
                      class="form-check-input"
                      type="radio"
                      id="checkValueThird"
                      name="checkValueThird"
                      value="true"
                      checked={formik.values.checkValueThird === "true"}
                      onChange={() => formik.setFieldValue("checkValueThird", "true")}
                    />
                  }
                  <label class="form-check-label" for="inlineCheckbox5">
                    Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  {viewedStatus ?
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  :
                    <input
                      class="form-check-input"
                      type="radio"
                      id="checkValueThird"
                      name="checkValueThird"
                      value="false"
                      checked={formik.values.checkValueThird === "false"}
                      onChange={() => formik.setFieldValue("checkValueThird", "false")}
                    />
                  }
                  <label class="form-check-label" for="inlineCheckbox6">
                    No
                  </label>
                </div>
              </div>
            :
              <div>
                <div class="form-check form-check-inline">
                  {formItem.formData.data[15] === "true" ? (
                    <input
                      class="form-check-input"
                      type="radio"
                      checked={formItem.formData.data[15]}
                    />
                  ):(
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  )}
                  <label class="form-check-label" for="inlineCheckbox5">
                    Yes
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  {formItem.formData.data[15] === "false" ? (
                    <input
                      class="form-check-input"
                      type="radio"
                      checked={formItem.formData.data[15]}
                    />
                  ):(
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  )}

                  <label class="form-check-label" for="inlineCheckbox6">
                    No
                  </label>
                </div>
              </div>
            } 

            {formik.touched.checkValueThird && formik.errors.checkValueThird && (
              <Form.Text className="text-error mx-3">{formik.errors.checkValueThird}</Form.Text>
            )}
          </div>


          <div class="pt-4">
            <p>
              <span>4.</span> Are you fully vaccinated having completed your two-week immunity window following vaccination?
            </p>

            {formItem.formData.status !== "SIGNED" ?
              <div>
                <div class="form-check form-check-inline">
                  {viewedStatus ?
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  :
                    <input
                      class="form-check-input"
                      type="radio"
                      id="checkValueFourth"
                      name="checkValueFourth"
                      value="true"
                      checked={formik.values.checkValueFourth === "true"}
                      onChange={() => formik.setFieldValue("checkValueFourth", "true")}
                    />
                  }
                  <label class="form-check-label" for="inlineCheckbox7">
                    Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  {viewedStatus ?
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  :
                    <input
                      class="form-check-input"
                      type="radio"
                      id="checkValueFourth"
                      name="checkValueFourth"
                      value="false"
                      checked={formik.values.checkValueFourth === "false"}
                      onChange={() => formik.setFieldValue("checkValueFourth", "false")}
                    />
                  }
                  <label class="form-check-label" for="inlineCheckbox8">
                    No
                  </label>
                </div>
              </div>
            :
              <div>
                <div class="form-check form-check-inline">
                  {formItem.formData.data[17] === "true" ? (
                    <input
                      class="form-check-input"
                      type="radio"
                      checked={formItem.formData.data[17]}
                    />
                  ):(
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  )}
                  <label class="form-check-label" for="inlineCheckbox7">
                    Yes
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  {formItem.formData.data[17] === "false" ? (
                    <input
                      class="form-check-input"
                      type="radio"
                      checked={formItem.formData.data[17]}
                    />
                  ):(
                    <input
                      class="form-check-input"
                      type="radio"
                      checked=""
                    />
                  )}
                  <label class="form-check-label" for="inlineCheckbox8">
                    No
                  </label>
                </div>
              </div>
            }

            {formik.touched.checkValueFourth && formik.errors.checkValueFourth && (
              <Form.Text className="text-error mx-3">{formik.errors.checkValueFourth}</Form.Text>
            )}
          </div>
        </Col>
        <Col md={5}>
          <div>
            <div class="card mt-4">
              <p class="card-text mb-0 p-3">
              <a href="https://coronavirus.health.ny.gov/covid-19-travel-advisory">Per updated New York State travel guidance,</a> asymptomatic travelers entering
              New York from another country, U.S. state
              or territory are no longer required to test or
              quarantine as of April 10, 2021.</p>
              <p class="card-text p-3">Please note that <span>PPE, social distancing and
              other protective protocols are still required
              and enforced for ALL individuals, including
              those fully vaccinated, in public settings</span>.</p>
              <p class="card-text p-3">
              REBNY’s Health Questionnaire Screening
              Form is a suggested form, and therefore
              real estate licensees should continue to use
              their best judgment as to whether they feel
              comfortable showing property based on the
              information provided.
              </p>
            </div>
          </div>
        </Col>
        <Col md={12}>
          <div class="form-row detail pt-5">
            <div class="col-md-4 mb-3">
              {formik.touched.fullName && formik.errors.fullName && (
                <Form.Text className="text-error mx-3">{formik.errors.fullName}</Form.Text>
              )}

              {viewedStatus ?
                <input 
                  class="form-control" 
                  value={formik.values.fullName}
                  disabled
                />
              :
                <>
                {formItem.formData.status !== "SIGNED" ? 
                  <input 
                    class="form-control" 
                    id="fullName"
                    name="fullName"
                    type="text" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                  />
                :
                  <input 
                    class="form-control" 
                    value={formik.values.fullName}
                    disabled
                  />
                }
                </>
              }
              <label class="pt-2 pl-3 input-head">Print Name</label>
            </div>
            {formItem.formData.status !== "SIGNED" ? 
              <div class="col-md-4 mb-3">
                {signMethod === "draw" ? (
                  <div class="form-control">
                    <Image className="signature" src={signImage} />
                  </div>
                ) : (
                <input 
                  type="text" 
                  class="form-control apply-font"
                  value={signAsText} 
                />
                )}

                {viewedStatus ?
                  <label class="pt-2  pl-3 input-head">Signature</label>
                :
                  <label class="pt-2  pl-3 input-head" onClick={handleShow}>Signature</label>
                }
              </div>

            :

              <div class="col-md-4 mb-3">
               {formItem.formData.isSignatureTyped !== true ? (
                  <div class="form-control">
                    <Image className="signature" src={formItem.formData.signature} />
                  </div>
                ) : (
                <input 
                  type="text" 
                  class="form-control apply-font"
                  value={formItem.formData.signature}
                  disabled
                />
                )}
                <label class="pt-2  pl-3 input-head">Signature</label>
              </div>
            }
            <div class="col-md-4 mb-3">
              {formik.touched.currentdate && formik.errors.currentdate && (
                <Form.Text className="text-error mx-3">{formik.errors.currentdate}</Form.Text>
              )}

              {formItem.formData.status !== "SIGNED" ? 
                <>
                {viewedStatus ?
                  <input 
                    class="form-control"  
                    value={formik.values.currentdate}
                    disabled
                  />
                :
                  <input 
                    class="form-control"  
                    id="currentdate"
                    name="currentdate"
                    type="text" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.currentdate}
                  />
                }
                </>
              :

                <input 
                  class="form-control"  
                  value={formik.values.currentdate}
                  disabled
                />
              }
              <label class="pt-2  pl-3 inputhead">Date</label>
            </div>-
          </div>
          <div class="form-row detail pt-">
            <div class="col-md-4 mb-3">
              {formik.touched.propertyAddress && formik.errors.propertyAddress && (
                <Form.Text className="text-error mx-3">{formik.errors.propertyAddress}</Form.Text>
              )}

              
              {formItem.formData.status !== "SIGNED" ? 
                <>
                {viewedStatus ?
                  <input 
                    class="form-control" 
                    value={formik.values.propertyAddress}
                    disabled
                  />
                  :
                  <input 
                    class="form-control" 
                    id="propertyAddress"
                    name="propertyAddress"
                    type="text" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.propertyAddress}
                  />
                }
                </>
              :
                <input 
                  class="form-control" 
                  value={formik.values.propertyAddress}
                  disabled
                />
              }
              <label class="pt-2  pl-3 input-head">Property Address</label>
            </div>
            <div class="col-md-4 mb-3">
              {formik.touched.realEstateName && formik.errors.realEstateName && (
                <Form.Text className="text-error mx-3">{formik.errors.realEstateName}</Form.Text>
              )}

              {formItem.formData.status !== "SIGNED" ? 
                <>
                {viewedStatus ?
                  <input 
                    class="form-control" 
                    value={formik.values.realEstateName}
                    disabled
                  />
                :
                  <input 
                    class="form-control" 
                    id="realEstateName"
                    name="realEstateName"
                    type="text" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.realEstateName}
                  />
                }
                </>
              :
                <input 
                  class="form-control" 
                  value={formik.values.realEstateName}
                  disabled
                />
              }
              <label class="pt-2  pl-3 input-head">
                Name of Real Estate Licensee
              </label>
            </div>
            <div class="col-md-4 mb-3">
              {formik.touched.realEstateBrokerageCompany && formik.errors.realEstateBrokerageCompany && (
                <Form.Text className="text-error mx-3">{formik.errors.realEstateBrokerageCompany}</Form.Text>
              )}

            {formItem.formData.status !== "SIGNED" ? 
              <>  
              {viewedStatus ?
                <input  
                  class="form-control" 
                  value={formik.values.realEstateBrokerageCompany}
                  disabled
                />
              : 
                <input  
                  class="form-control" 
                  id="realEstateBrokerageCompany"
                  name="realEstateBrokerageCompany"
                  type="text" 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.realEstateBrokerageCompany}
                />
              }
              </>
            :
              <input  
                class="form-control" 
                value={formik.values.realEstateBrokerageCompany}
                disabled
              />  
            }
              <label class="pt-2  pl-3 input-head">
                Name of Brokerage Company
              </label>
            </div>
          </div>
        </Col>
      </Row> 

      {signImage !== "" && formSubmitStatus === false && (
        <Row className="bottomBar">
          <Col md={12} className="py-3 d-flex justify-content-center">
              <button class="btn btn-secondary" type="submit">Submit</button>
          </Col>
        </Row>
      )}

      {signAsText !== "" && formSubmitStatus === false && (
        <Row className="bottomBar">
          <Col md={12} className="py-3 d-flex justify-content-center">
              <button class="btn btn-secondary" type="submit">Submit</button>
          </Col>
        </Row>
      )}

      {formItem.formData.status === "SIGNED" &&
        <ReactToPdf targetRef={ref} filename={`${formItem.formData.formName}.pdf`} options={options} x={.2} y={.5} scale={0.8}>
          {({toPdf}) => (
            <Row className="downloadBar">
              <Col md={12} className="py-3 d-flex justify-content-end">
                <button class="btn btn-secondary mx-5" onClick={toPdf}>
                  Download
                </button>
              </Col>
            </Row>
          )}
        </ReactToPdf>
      }
      
      

      <div className="footer pl-0">
        <p>
          <span>Important Note: </span>This Form should not be construed as
          offering or providing legal advice in any form. This Form is not
          intended to replace the reader’s need to speak with their own legal
          ounsel regarding the issues presented. All readers should seek
          independent legal advice prior to instituting any re-entry policies
          and/or practices.{" "}
        </p>
        <Row>
        <Col md={6} className="pt-2 d-flex justify-content-center">
            <h6>Real Estate board of New York | rebny.com</h6>
          </Col>
          <Col md={6} className="p-0 d-flex justify-content-center">
            <ul>
              <li>Stay in Touch</li>
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
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Please Confirm Full name and Signature</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="draw-modal">
          <Nav fill variant="tabs" defaultActiveKey="link-1">
            <Nav.Item>
              <Nav.Link onClick={toggleMethod} eventKey="link-1">
                Draw
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={toggleField} eventKey="link-2">
                Type
              </Nav.Link>
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
              <p style={{ paddingTop: 10, paddingLeft: 30 }}>
                I am { formik.values.fullName }and this is my legal representation of my
                Signature.
              </p>
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
                <Form.Control
                  type="text"
                  value={signAsText}
                  onChange={(e) => setSignAsText(e.target.value)}
                  placeholder="Type your name here"
                  className="toggle-field apply-font"
                />
                <FontPicker
                  apiKey="AIzaSyBCM9e_yuN64gSRUQxGrmHTJtK1v2YKvL8"
                  activeFontFamily={activeFontFamily}
                  onChange={(nextFont) => setActiveFontFamily(nextFont.family)}
                />
              </div>
              <p style={{ paddingTop: 10, paddingLeft: 30 }}>
                I am {formik.values.fullName} and this is my legal representation of my
                Signature.
              </p>
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
      <AuditTrail formDataId={formItem.formData.id} />
    </Container>
  );
};

export default Form3;
