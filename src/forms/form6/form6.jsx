import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  Button,
  Image,
  Nav
} from "react-bootstrap";
import Logo from "../../assets/FormImages/og_image.png";
import "./css/style6.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { format } from 'date-fns';
import FontPicker from 'font-picker-react';
import SignaturePad from 'react-signature-canvas';
const Form6 = ({ formData, viewMode, onFormSubmission }) => {

  console.log("formData of Form 4", formData);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [canvasShow, setCanvasShow] = useState(true);
  const [canvasShow2, setCanvasShow2] = useState(true);
  const [fieldShow, setFieldShow] = useState(false);
  const [fieldShow2, setFieldShow2] = useState(false);
  const sigPad = useRef({});
  const sigPad2 = useRef({});
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const [signImage, setSignImage] = useState('');
  const [signImage2, setSignImage2] = useState('');
  const [signAsText, setSignAsText] = useState('');
  const [signAsText2, setSignAsText2] = useState('');
  const [activeFontFamily, setActiveFontFamily] = useState('Open Sans');
  const [activeFontFamily2, setActiveFontFamily2] = useState('Open Sans');
  const [signMethod, setSignMethod] = useState('draw');
  const [signMethod2, setSignMethod2] = useState('draw');
  const [formSubmitStatus, setFormSubmitStatus] = useState(false);
  const [viewedStatus, setViewedStatus] = useState(false);
  const [signTabState, setSignTabState] = useState('link-1');
  const [signTabState2, setSignTabState2] = useState('link-1');


  useEffect(() => {
    if (show && signImage && sigPad.current !== null) sigPad.current.fromDataURL(signImage);
  }, [show]);

  useEffect(() => {
    if (show2 && signImage2 && sigPad2.current !== null) sigPad2.current.fromDataURL(signImage2);
  }, [show2]);

  const genrateImage = () => {
    setShow(false);
    setSignMethod('draw');
    setSignImage(sigPad.current.toDataURL());
  };

  const genrateImage2 = () => {
    setShow2(false);
    setSignMethod2('draw');
    setSignImage2(sigPad2.current.toDataURL());
  };

  const handleSignAsText = () => {
    setShow(false);
    setSignMethod('sign');
  };
  const handleSignAsText2 = () => {
    setShow2(false);
    setSignMethod2('sign');
  };

  function clear() {
    setSignAsText('')
    setSignImage('')

    if (sigPad.current !== null) {
      sigPad.current.clear();

    }
  }
  function clear2() {
    setSignAsText2('')
    setSignImage2('')

    if (sigPad2.current !== null) {
      sigPad2.current.clear();

    }
  }

  const toggleMethod = () => {
    if (canvasShow == false) {
      setCanvasShow(true);
      setSignTabState('link-1')
      setFieldShow(false);
    } else {
      //setCanvasShow(false);
      setSignTabState('link-2')
    }
  };

  const toggleMethod2 = () => {
    if (canvasShow2 == false) {
      setCanvasShow2(true);
      setSignTabState2('link-1')
      setFieldShow2(false);
    } else {
      //setCanvasShow(false);
      setSignTabState2('link-2')
    }
  };

  const toggleField = () => {
    if (fieldShow == false) {
      setFieldShow(true);
      setSignTabState('link-2')
      setCanvasShow(false);
    } else {
      //setFieldShow(false);
      setSignTabState('link-1')
    }
  };
  const toggleField2 = () => {
    if (fieldShow2 == false) {
      setFieldShow2(true);
      setSignTabState2('link-2')
      setCanvasShow2(false);
    } else {
      //setFieldShow(false);
      setSignTabState2('link-1')
    }
  };



  const date = new Date();
  let today = format(date, 'MM/dd/yyyy');
  today = moment(today, 'MM-DD-YYYY').toDate();

  const formik = useFormik({
    initialValues: {
      fullName: formData.data[1],
      nameOfLicensee: formData.data[3],
      companyName: formData.data[5],
      mainOption: formData.data[7],
      childOption: formData.data[9],
      BuyerCurrentDate: formData.data[11] ? new Date(formData.data[11]) : today,
      SellerCurrentDate: formData.data[13] ? new Date(formData.data[13]) : today,
      representLandlordName: formData.data[15],
      representTenantName: formData.data[17],
      signatureAs: formData.data[19],
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Please enter the name'),
      nameOfLicensee: Yup.string().required('Please enter the Name of Licensee'),
      companyName: Yup.string().required('Please enter the Real Estate Company'),
      BuyerCurrentDate: Yup.string().required('Please enter the Date'),
      SellerCurrentDate: Yup.string().required('Please enter the Date'),
      signatureAs: Yup.string().required('Please select the Signature option'),
      // representLandlordName: Yup.string().required('Please enter the Represent Buyer Name'),
      // representTenantName: Yup.string().required('Please enter the Represent Seller Name'),
    }),
    onSubmit: (value) => {
      submitForm(value)
    }
  })

  const submitForm = async (values) => {
    let data = [
      'name',
      values.fullName,
      'nameOfLicensee',
      values.nameOfLicensee,
      'companyName',
      values.companyName,
      'mainOption',
      values.mainOption,
      'childOption',
      values.childOption,
      'landLordDate',
      values.BuyerCurrentDate,
      'SellerCurrentDate',
      values.SellerCurrentDate,
      'representLandlordName',
      values.representLandlordName,
      'representTenantName',
      values.representTenantName,
      "signatureAs",
      values.signatureAs
    ]
    let finalObject = { ...formData };

    finalObject.status = 'SIGNED';
    finalObject.data = data;
    if (signAsText !== '') {
      finalObject.isSignatureTyped = true;
      finalObject.signatureFont = activeFontFamily;
      finalObject.signature = signAsText;
    } else if (signImage !== '') {
      finalObject.isSignatureTyped = false;
      finalObject.signature = signImage;
      finalObject.status = 'SIGNED';
    }

    // if (signAsText2 !== '') {
    //   finalObject.isSignatureTyped2 = true;
    //   finalObject.signatureFont2 = activeFontFamily2;
    //   finalObject.signature2 = signAsText2;
    // } else if (signImage2 !== '') {
    //   finalObject.isSignatureTyped2 = false;
    //   finalObject.signature2 = signImage2;
    //   finalObject.status2 = 'SIGNED';
    // }


    onFormSubmission(finalObject, 'SIGNED');

  }

  console.log("formik values", formik.values);
  return (
    <Container className="form6">
      <Form onSubmit={formik.handleSubmit}>
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
                New York State Disclosure Form for Landlord and Tenant
              </h4>
            </div>
            <Row>
              <Col md={6}>
                <div className="pt-3 text-bottom-border">
                  <h5 className="py-2 mb-0 text-center font-weight-bold">
                    THIS IS NOT A CONTRACT
                  </h5>
                  <p>
                    New York State law requires real estate licensees who are
                    acting as agents of landlords and tenants of real property to
                    advise the potential landlords and tenants with whom they
                    work of the nature of their agency relationship and the rights
                    and obligations it creates. This disclosure will help you to
                    make informed choices about your relationship with the real
                    estate broker and its sales agents. {" "}
                  </p>
                  <p>
                    Throughout the transaction you may receive more than
                    one disclosure form. The law may require each agent
                    assisting in the transaction to present you with this
                    disclosure form. A real estate agent is a person qualified to
                    advise about real estate.
                  </p>
                  <p>
                    If you need legal, tax or other advice, consult with a
                    professional in that field.
                  </p>
                </div>
                <div className="pt-3 ">
                  <h5 className="py-2 mb-0 text-center font-weight-bold">
                    Disclosure Regarding Real Estate
                    Agency Relationships
                  </h5>
                  <h6 className="mb-0 font-weight-bold">Landlord’s Agent </h6>
                  <p>
                    A landlord’s agent is an agent who is engaged by a landlord
                    to represent the landlord’s interest. The landlord’s agent
                    does this by securing a tenant for the landlord’s apartment or
                    house at a rent and on terms acceptable to the landlord. A
                    landlord’s agent has, without limitation, the following
                    fiduciary duties to the landlord: reasonable care, undivided
                    loyalty, confidentiality, full disclosure, obedience and duty to
                    account. A landlord’s agent does not represent the interests
                    of the tenant. The obligations of a landlord’s agent are also
                    subject to any specific provisions set forth in an agreement
                    between the agent and the landlord. In dealings with the
                    tenant, a landlord’s agent should (a) exercise reasonable
                    skill and care in performance of the agent’s duties; (b) deal
                    honestly, fairly and in good faith; and (c) disclose all facts
                    known to the agent materially affecting the value or
                    desirability of property, except as otherwise provided by law.

                  </p>
                </div>
                <div className="pt-3 ">
                  <h6 className="font-weight-bold">Tenant’s Agent</h6>
                  <p>
                    A tenant’s agent is an agent who is engaged by a tenant to
                    represent the tenant’s interest. The tenant’s agent does this
                    by negotiating the rental or lease of an apartment or house
                    at a rent and on terms acceptable to the tenant. A tenant’s
                    agent has, without limitation, the following fiduciary duties to
                    the tenant: reasonable care, undivided loyalty,
                    confidentiality, full disclosure, obedience and duty to
                    account. A tenant’s agent does not represent the interest of
                    the landlord. The obligations of a tenant’s agent are also
                    subject to any specific provisions set forth in an agreement
                    between the agent and the tenant. In dealings with the
                    landlord, a tenant’s agent should (a) exercise reasonable
                  </p>
                  <p>
                    tenant’s agent representing the interests of and advocating
                    on behalf of the tenant and the designated sales agent for
                    the landlord will function as the landlord’s agent representing
                    the interests of and advocating on behalf of the landlord in
                    the negotiations between the tenant and the landlord. A
                    designated sales agent cannot provide the full range of
                    fiduciary duties to the landlord or tenant. The designated
                    sales agent must explain that like the dual agent under
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="pt-3 ">
                  <p>
                    skill and care in performance of the agent’s duties; (b) deal
                    honestly, fairly and in good faith; and (c) disclose all facts
                    known to the agent materially affecting the tenant’s ability
                    and/or willingness to perform a contract to rent or lease
                    landlord’s property that are not consistent with the agent’s
                    fiduciary duties to the tenant.
                  </p>
                  <h6 className="font-weight-bold">Broker’s Agents</h6>
                  <p>
                    A broker’s agent is an agent that cooperates or is engaged
                    by a listing agent or a tenant’s agent (but does not work for
                    the same firm as the listing agent or tenant’s agent) to assist
                    the listing agent or tenant’s agent in locating a property to
                    rent or lease for the listing agent’s landlord or the tenant
                    agent’s tenant. The broker’s agent does not have a direct
                    relationship with the tenant or landlord and the tenant or
                    landlord cannot provide instructions or direction directly to
                    the broker’s agent. The tenant and the landlord therefore do
                    not have vicarious liability for the acts of the broker’s agent.
                    The listing agent or tenant’s agent do provide direction and
                    instruction to the broker’s agent and therefore the listing
                    agent or tenant’s agent will have liability for the acts of the
                    broker’s agent. {" "}
                  </p>
                  <h6 className="mb-0 font-weight-bold">Dual Agent</h6>
                  <p>
                    A real estate broker may represent both the tenant and the
                    landlord if both the tenant and landlord give their informed
                    consent in writing. In such a dual agency situation, the agent
                    will not be able to provide the full range of fiduciary duties to
                    the landlord and the tenant. The obligations of an agent are
                    also subject to any specific provisions set forth in an
                    agreement between the agent, and the tenant and landlord.
                    An agent acting as a dual agent must explain carefully to
                    both the landlord and tenant that the agent is acting for the
                    other party as well. The agent should also explain the
                    possible effects of dual representation, including that by
                    consenting to the dual agency relationship the landlord and
                    tenant are giving up their right to undivided loyalty. A
                    landlord and tenant should carefully consider the possible
                    consequences of a dual agency relationship before agreeing
                    to such representation. A landlord or tenant may provide
                    advance informed consent to dual agency by indicating the
                    same on this form.{" "}
                  </p>
                  <h6 className="mb-0 font-weight-bold">
                    Dual Agent with Designated Sales Agents
                  </h6>
                  <p>
                    If the tenant and the landlord provide their informed consent
                    in writing, the principals and the real estate broker who
                    represents both parties as a dual agent may designate a
                    sales agent to represent the tenant and another sales agent
                    to represent the landlord. A sales agent works under the
                    supervision of the real estate broker. With the informed
                    consent in writing of the tenant and the landlord, the
                    designated sales agent for the tenant will function as the
                  </p>
                  <p>
                    whose supervision they function, they cannot provide
                    undivided loyalty. A landlord or tenant should carefully
                    consider the possible consequences of a dual agency
                    relationship with designated sales agents before agreeing to
                    such representation. A landlord or tenant may provide
                    advance informed consent to dual agency with designated
                    sales agents by indicating the same on this form.

                  </p>
                </div>
              </Col>
            </Row>
            {/* <Row className="pt-4"> */}
            {/* <div className="pt-3 text-bottom-border"></div> */}
            {/* <Col md={12}> */}
            <div class="form-inline submit-form pt-4">
              <Row>
                <Col md={12}>
                  <ul class="form-inline">
                    <li>
                      <p className="apply-font">
                        This form was provided to me by
                      </p>
                    </li>
                    <li>
                      <span>
                        {/* <Form.Control
                        class="form-control mb-2 mr-sm-2"
                        id="senderName"
                        name="senderName"
                        type="text"
                      /> */}
                        <Form.Control
                          class="form-control mb-2 mr-sm-2"
                          id="senderName"
                          name="nameOfLicensee"
                          value={formik.values.nameOfLicensee}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={viewMode}
                          type="text"
                        />
                      </span>
                      {formik.touched.nameOfLicensee && formik.errors.nameOfLicensee && (
                        <Form.Text className="text-error mx-3">
                          {formik.errors.nameOfLicensee}
                        </Form.Text>
                      )}
                      <p className="text-center font-italic">
                        (Print Name of Licensee){" "}
                      </p>
                    </li>
                    <li>
                      <p className="apply-font"> of</p>
                    </li>
                    <li>
                      <span>
                        {/* <Form.Control
                        class="form-control mb-2 mr-sm-2"
                        type="text"
                        id="senderCompany"
                        name="senderCompany"
                      /> */}
                        <Form.Control
                          class="form-control mb-2 mr-sm-2"
                          type="text"
                          id="senderCompany"
                          name="companyName"
                          value={formik.values.companyName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={viewMode}
                        />
                      </span>
                      {formik.touched.companyName && formik.errors.companyName && (
                        <Form.Text className="text-error mx-3">
                          {formik.errors.companyName}
                        </Form.Text>
                      )}
                      <p className="text-center font-italic">
                        (Print Name of Company, Firm or Brokerage){" "}
                      </p>
                    </li>
                    <li>
                      <p className="apply-font">
                        a licensed real estate broker acting in the interest
                        of the:
                      </p>
                    </li>
                  </ul>
                </Col>
              </Row>

              <Row className="w-100">
                <Col md={6}>
                  <div class="form-check">
                    {(formik.values.mainOption === `I'm acting in the interest of the Landlord`) ?
                      <input
                        type="checkbox"
                        class="form-check-input main-check"
                        checked={true}
                        id="exampleCheck1"
                      />
                      :
                      <input
                        type="checkbox"
                        class="form-check-input main-check"
                        id="exampleCheck1"
                        disabled={true}
                      />
                    }
                    <label class="form-check-label" for="exampleCheck1">
                      Landlord as a (check relationship below)
                    </label>
                  </div>
                  <div>
                    <div class="form-check">
                      {/* <input
                      type="checkbox"
                      class="form-check-input"
                      id="exampleCheck2"
                    /> */}.
                      {(formik.values.mainOption === `I'm acting in the interest of the Landlord` && formik.values.childOption === `As the Landlord’s Agent`) ?
                        <input
                          type="checkbox"
                          class="form-check-input"
                          checked={true}
                          id="exampleCheck2"
                        />
                        :
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck2"
                          disabled={true}
                        />

                      }
                      <label class="form-check-label" for="exampleCheck2">
                        Landlord’s Agent
                      </label>
                    </div>
                    <div class="form-check">
                      {/* <input
                      type="checkbox"
                      class="form-check-input"
                      id="exampleCheck3"
                    /> */}
                      {(formik.values.mainOption === `I'm acting in the interest of the Landlord` && formik.values.childOption === `As the Broker’s Agent`) ?
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck3"
                          checked={true}
                        />
                        :
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck3"
                          disabled={true}
                        />
                      }
                      <label class="form-check-label" for="exampleCheck3">
                        Broker’s Agent
                      </label>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div class="form-check">
                    {/* <input
                    type="checkbox"
                    class="form-check-input  main-check"
                    id="exampleCheck4"
                  /> */}
                    {(formik.values.mainOption === `I'm acting in the interest of the Tenant`) ?
                      <input
                        type="checkbox"
                        class="form-check-input  main-check"
                        id="exampleCheck4"
                        checked={true}
                      />
                      :
                      <input
                        type="checkbox"
                        class="form-check-input  main-check"
                        id="exampleCheck4"
                        disabled={true}
                      />
                    }
                    <label class="form-check-label" for="exampleCheck4">
                      Tenant as a (check relationship below)
                    </label>
                  </div>
                  <div class="form-check">
                    {/* <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck5"
                  /> */}
                    {(formik.values.childOption === `As the Tenant’s Agent`) ?
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="exampleCheck5"
                        checked={true}
                      />
                      :
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="exampleCheck5"
                        disabled={true}
                      />
                    }
                    <label class="form-check-label" for="exampleCheck5">
                      Tenant’s Agent
                    </label>
                  </div>
                  <div class="form-check">
                    {/* <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck6"
                  /> */}
                    {(formik.values.mainOption === `I'm acting in the interest of the Tenant` && formik.values.childOption === `As the Broker’s Agent`) ?
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="exampleCheck6"
                        checked={true}
                      />
                      :
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="exampleCheck6"
                        disabled={true}

                      />
                    }

                    <label class="form-check-label" for="exampleCheck6">
                      Broker’s Agent {" "}
                    </label>
                  </div>
                </Col>
              </Row>
              <Row className="w-100">
                <Col md={5} className="m-auto">
                  <div class="form-check dual-check" style={{ marginLeft: "-48%" }}>
                    {/* <input
                    type="checkbox"
                    class="form-check-input main-check"
                    id="exampleCheck7"
                  /> */}
                    {(formik.values.mainOption === `I'm acting as a dual agent`) ?

                      <input
                        type="checkbox"
                        class="form-check-input main-check"
                        id="exampleCheck7"
                        checked={true}
                      />
                      :
                      <input
                        type="checkbox"
                        class="form-check-input main-check"
                        id="exampleCheck7"
                        disabled={true}
                      />
                    }
                    <label class="form-check-label" for="exampleCheck7">
                      Dual Agent{" "}
                    </label>
                  </div>
                  <div class="form-check">
                    {/* <input
                    type="checkbox"
                    class="form-check-input main-check"
                    id="exampleCheck8"
                  /> */}
                    {
                      (formik.values.mainOption === `I'm acting as a dual agent with designated sales agent`) ?
                        <input
                          type="checkbox"
                          class="form-check-input main-check"
                          id="exampleCheck8"
                          checked={true}
                        />
                        :
                        <input
                          type="checkbox"
                          class="form-check-input main-check"
                          id="exampleCheck8"
                          disabled={true}
                        />
                    }
                    <label class="form-check-label" for="exampleCheck8">
                      Dual Agent with Designated Sales Agent{" "}
                    </label>
                  </div>
                </Col>
                <p className="pt-4">
                  For advance informed consent to either dual agency or dual
                  agency with designated sales agents complete section below:
                </p>
                <div className="m-auto">
                  <div class="form-check dual-check1" style={{ marginLeft: "-37%" }}>
                    {/* <input
                    type="checkbox"
                    class="form-check-input main-check"
                    id="exampleCheck9"
                  /> */}
                    {(formik.values.mainOption === `I'm acting as a dual agent with designated sales agent` && formik.values.childOption === `Advance informed consent dual agency`) ?
                      <input
                        type="checkbox"
                        class="form-check-input main-check"
                        id="exampleCheck9"
                        checked={true}
                      />
                      :
                      <input
                        type="checkbox"
                        class="form-check-input main-check"
                        id="exampleCheck9"
                        disabled={true}
                      />
                    }
                    <label class="form-check-label" for="exampleCheck9">
                      Advance Informed Consent Dual Agency{" "}
                    </label>
                  </div>
                  <div class="form-check">
                    {/* <input
                    type="checkbox"
                    class="form-check-input main-check"
                    id="exampleCheck10"
                  /> */}
                    {(formik.values.mainOption === `I'm acting as a dual agent with designated sales agent` && formik.values.childOption === `Advance informed consent to dual agency with designated sales agents`) ?
                      <input
                        type="checkbox"
                        class="form-check-input main-check"
                        id="exampleCheck10"
                        checked={true}
                      />
                      :
                      <input
                        type="checkbox"
                        class="form-check-input main-check"
                        id="exampleCheck10"
                        disabled={true}
                      />
                    }
                    <label class="form-check-label" for="exampleCheck10">
                      Advance Informed Consent to Dual Agency with Designated
                      Sales Agents{" "}
                    </label>
                  </div>
                </div>
              </Row>
            </div>
            <div className="pt-3">
              <Row>
                <Col md={12} className="p-0">
                  <ul class="form-inline pt-5 pl-md-2">
                    <li>
                      <p className="apply-font">
                        If dual agent with designated sales agents is indicated above:
                      </p>
                    </li>
                    <li>
                      <span className="mx-3 text-field">
                        <Form.Control
                          class="form-control"
                          id="senderName"
                          name="representLandlordName"
                          type="text"
                          value={formik.values.representLandlordName}
                          // onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </span>
                      {formik.touched.representLandlordName && formik.errors.representLandlordName && (
                        <Form.Text className="text-error mx-3">
                          {formik.errors.representLandlordName}
                        </Form.Text>
                      )}
                    </li>
                    <li>
                      <p className="apply-font">is appointed to represent the</p>
                    </li>
                    <li>
                      <p className="apply-font">
                        tenant; and:
                      </p>
                    </li>
                    <li>
                      <span className="mx-3 text-field1">
                        <Form.Control
                          class="form-control"
                          id="senderName"
                          name="representTenantName"
                          type="text"
                          value={formik.values.representTenantName}
                          // onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </span>
                      {formik.touched.representTenantName && formik.errors.representTenantName && (
                        <Form.Text className="text-error mx-3">
                          {formik.errors.representTenantName}
                        </Form.Text>
                      )}
                    </li>
                    <li>
                      <p className="apply-font">is appointed to represent the landlord in this transaction.</p>
                    </li>
                    <li>
                      <p className="apply-font">
                        (I) (We)
                      </p>
                    </li>
                    <li>
                      <span className="mx-3 text-field1">
                        <Form.Control
                          class="form-control"
                          id="senderName"
                          name="fullName"
                          type="text"
                          value={formik.values.fullName}
                          // onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </span>
                      {formik.touched.fullName && formik.errors.fullName && (
                        <Form.Text className="text-error mx-3">
                          {formik.errors.fullName}
                        </Form.Text>
                      )}
                    </li>
                    <li>
                      <p className="apply-font">acknowledge receipt of a copy of this disclosure form:</p>
                    </li>
                  </ul>
                  <div className="d-flex py-3">
                    Signature of
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input main-check"
                        id="exampleCheck11"
                        name="Sign"
                        checked={formik.values.signatureAs === 'Landlord' ? true : false}
                        value={formik.values.signatureAs}
                        onChange={() => formik.setFieldValue('signatureAs', 'Landlord')}

                      />
                      <label class="form-check-label pl-3" for="exampleCheck11">
                        Landord(s)  and/or
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input main-check"
                        id="exampleCheck11"
                        value={formik.values.signatureAs}
                        checked={formik.values.signatureAs === 'Tenant' ? true : false}
                        onChange={() => formik.setFieldValue('signatureAs', 'Tenant')}
                        name="Sign"
                      />
                      <label class="form-check-label pl-3" for="exampleCheck12">
                        Tenant(s):
                      </label>

                    </div>

                  </div>
                  {formik.touched.signatureAs && formik.errors.signatureAs && (
                    <Form.Text className="text-error mx-3">
                      {formik.errors.signatureAs}
                    </Form.Text>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {!viewMode ? (
                    <>
                      <div onClick={handleShow} >
                        {signMethod === 'draw' ? (
                          <>
                            {signImage ? (
                              <div className="empty-field ">
                                <img src={signImage} className="img-set " />
                              </div>
                            ) : (
                              <div className="empty-field my-5 pb-3">
                                <img src={signImage} />
                              </div>
                            )

                            }
                          </>


                        ) : (
                          <Form.Control className="form-control my-5 empty-field" type="text" value={signAsText} />
                        )}

                      </div>


                    </>
                  ) : (
                    <>
                      {formData.isSignatureTyped === true ? (
                        <Form.Control
                          className="form-control my-5 empty-field "
                          type="text"
                          value={formData.signature}
                          style={{ fontFamily: formData.signatureFont }}
                        />
                      ) : (
                        <>
                          {(formData.signature) ? (

                            <div className="empty-field ">
                              <img src={formData.signature} className="img-set " />
                            </div>
                          ) : (
                            <>
                              <div className="empty-field my-5 p-2">
                                <img src={formData.signature} className="img-set " />
                              </div>
                            </>
                          )

                          }

                        </>

                      )}

                    </>
                  )

                  }


                  <div className="d-flex my-5 text-field1 date-picker-set">
                    <label className="text-center font-italic pr-2 ">
                      Date:
                    </label>

                    <DatePicker
                      className="form-control"
                      name="currentDate"
                      selected={formik.values.BuyerCurrentDate}
                      onChange={(date) => formik.setFieldValue('BuyerCurrentDate', date)}
                      disabled={viewMode}
                    />
                  </div>


                </Col>
                <Col md={6}>
                  {/* <Form.Control
                  className="form-control my-5 empty-field "
                  id="senderName"
                  name="senderName"
                  type="text"
                /> */}
                  {/* {!viewMode ? (
                    <>
                      <div id="signModal" onClick={handleShow2} >
                        {signMethod2 === 'draw' ? (
                          <>
                            {signImage2 ? (
                              <div className="empty-field ">
                                <img src={signImage2} className="img-set" />
                              </div>
                            ) : (
                              <div className="empty-field my-5 pb-3">
                                <img src={signImage2} />
                              </div>
                            )

                            }
                          </>


                        ) : (
                          <Form.Control className="form-control my-5 empty-field" type="text" value={signAsText2} />
                        )}

                      </div>


                    </>
                  ) : (
                    <>
                      {formData.isSignatureTyped2 === true ? (
                        <Form.Control
                          className="form-control my-5 empty-field "
                          type="text"
                          value={formData.signature2}
                          style={{ fontFamily: formData.signatureFont2 }}
                        />
                      ) : (
                        <div className="empty-field my-5 py-2">
                          <img src={formData.signature2} className="img-set " />
                        </div>
                      )}

                    </>
                  )

                  } */}

                  {/* <div className="d-flex my-5 text-field1 date-picker-set">
                    <label className="text-center font-italic pr-2 ">
                      Date:
                    </label>

                    <DatePicker
                      className="form-control"
                      name="currentDate"
                      selected={formik.values.SellerCurrentDate}
                      onChange={(date) => formik.setFieldValue('SellerCurrentDate', date)}
                      disabled={viewMode}
                    />
                  </div> */}
                </Col>
              </Row>
              {(signImage !== '' || signAsText !== '' || signImage2 !== '' || signAsText2 !== '') && !viewMode && (
                <Row className="bottomBar">
                  <Col md={12} className="py-3 d-flex justify-content-center">
                    <button class="btn btn-secondary" type="submit">
                      Submit
                    </button>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Please Confirm Full name and Signature</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="draw-modal">
          <Nav fill variant="tabs" defaultActiveKey={signTabState}>
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
                  height: 'auto',
                  className: 'sigCanvas'
                }}
                ref={sigPad}
              />
              <p style={{ paddingTop: 10, paddingLeft: 30 }}>
                I am {formik.values.fullName} and this is my legal representation of my
                Signature.
              </p>
              <div className="d-flex justify-content-center">
                <Button variant="secondary" onClick={clear} className="mr-3">
                  Clear
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
                  Clear{' '}
                </Button>
                <Button variant="primary" onClick={handleSignAsText}>
                  Insert Signature
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Please Confirm Full name and Signature Modal 2</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="draw-modal">
          <Nav fill variant="tabs" defaultActiveKey={signTabState2}>
            <Nav.Item>
              <Nav.Link onClick={toggleMethod2} eventKey="link-1">
                Draw
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={toggleField2} eventKey="link-2">
                Type
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {canvasShow2 && (
            <>
              <SignaturePad
                canvasProps={{
                  width: 400,
                  height: 'auto',
                  className: 'sigCanvas'
                }}
                ref={sigPad2}
              />
              <p style={{ paddingTop: 10, paddingLeft: 30 }}>
                I am {formik.values.fullName} and this is my legal representation of my
                Signature.
              </p>
              <div className="d-flex justify-content-center">
                <Button variant="secondary" onClick={clear2} className="mr-3">
                  Clear
                </Button>
                <Button variant="primary" onClick={genrateImage2}>
                  Insert Signature
                </Button>
              </div>
            </>
          )}

          {fieldShow2 && (
            <>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={signAsText2}
                  onChange={(e) => setSignAsText2(e.target.value)}
                  placeholder="Type your name here"
                  className="toggle-field apply-font"
                />
                <FontPicker
                  apiKey="AIzaSyBCM9e_yuN64gSRUQxGrmHTJtK1v2YKvL8"
                  activeFontFamily={activeFontFamily2}
                  onChange={(nextFont) => setActiveFontFamily2(nextFont.family)}
                />
              </div>
              <p style={{ paddingTop: 10, paddingLeft: 30 }}>
                I am {formik.values.fullName} and this is my legal representation of my
                Signature.
              </p>
              <div className="d-flex justify-content-center">
                <Button variant="secondary" onClick={clear2} className="mr-3">
                  Clear{' '}
                </Button>
                <Button variant="primary" onClick={handleSignAsText2}>
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

export default Form6;
