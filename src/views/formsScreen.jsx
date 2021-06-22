import React, { useEffect, useState, useContext } from "react";
import {
  IconBuilding,
  IconEmail,
  IconSmartphone,
  IconMenu,
} from "../assets/icons/icons";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Header from "../components/header/header";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import ShareButton from "../components/ShareButton/shareButton";
import { API, graphqlOperation } from "aws-amplify";
import { listFormDatas } from "../graphql/queries";
import AppContext from "../../src/context/appContext";
import * as emailjs from "emailjs-com";
import Moment from "react-moment";
import { updateFormData } from "../graphql/mutations";
import _ from "lodash";
import Loader from "../components/Loader/Loader";
import ShareForm from "../components/shareForm/shareForm";
import SendReminder from "../components/sendReminder/sendReminder";

const FormsScreen = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { user, agent, formItems, onFormItemsUpdate, onFormItemUnitUpdate } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [formsData, setFormsData] = useState([]);
  const [shareFormItem, setShareFormItem] = useState("");
  const [statusValue, setStatusValue] = useState(null);
  const [filterKey, setFilterKey] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const [currentSorted, setCurrentSorted] = useState("desc");
  let base_url = window.location.origin;

  useEffect(() => {
    handleFormsData();
  }, []);

  const handleFormsData = async () => {
    setLoading(true);

    try {
      const newFormsData = await API.graphql(
        graphqlOperation(listFormDatas, {
          filter: { senderId: { eq: agent.id } },
        })
      );

      onFormItemsUpdate(newFormsData.data.listFormDatas.items);
      // setFormsData(newFormsData.data.listFormDatas.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleShared = (item) => {
    console.log(item);
    setShareFormItem(item);
    handleShow();
  };
  const handleFilter = (key, value) => {
    console.log(key, value);
    setFilterKey(key);
    setFilterValue(value);
  };

  console.log("formItems context", formItems);
  const sortedForms = _.orderBy(formItems, ["createdAt"], [currentSorted]);

  const filtered =
    filterKey !== null && filterValue !== null
      ? sortedForms.filter(function (item) {
          if (item[filterKey] === filterValue) {
            return item;
          }
        })
      : sortedForms;

  console.log("filteredForms", filtered);

  const labels = {
    SENT: "Sent",
    VIEWED: "Viewed",
    SIGNED: "Signed",
  };
  if (loading) return <Loader />;
  return (
    <Container fluid className="p-0">
      <Header />
      <Container>
        <Breadcrumb className="title-bar">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Form</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            <h5>Forms</h5>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="dashboardCards pt-5">
            <Dropdown>
              <Dropdown.Toggle className="drop-btn pt-0 pl-0">
                {/* {filterValue !== null ? filterValue: <> All forms</>} */}
                {filterKey === "formName" && filterValue != null
                  ? filterValue
                  : " All forms"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleFilter("formName", null)}>
                  All Forms
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleFilter("formName", "REBNY COVID Liability Form")
                  }
                >
                  REBNY COVID Liability Form
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleFilter(
                      "formName",
                      "New York Agency Disclosure Form for Buyer and Seller"
                    )
                  }
                >
                  New York Agency Disclosure Form for Buyer and Seller
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleFilter(
                      "formName",
                      "REBNY COVID Health Screening Form"
                    )
                  }
                >
                  REBNY COVID Health Screening Form
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleFilter(
                      "formName",
                      "New York State Disclosure form for Landlord and Tenant"
                    )
                  }
                >
                  New York State Disclosure form for Landlord and Tenant
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleFilter(
                      "formName",
                      "New York State Housing Discrimination Disclosure Form"
                    )
                  }
                >
                  New York State Housing Discrimination Disclosure Form
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col md={2} className="dashboardCards pt-5 text-center pr-0">
            <Dropdown>
              <Dropdown.Toggle className="drop-btn pt-0 pl-0">
                {filterKey === "status" && filterValue != null ? (
                  <p className="cf-label">{labels[filterValue]}</p>
                ) : (
                  "All"
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleFilter("status", null)}>
                  All
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilter("status", "SENT")}>
                  Sent
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilter("status", "VIEWED")}>
                  Viewed
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilter("status", "SIGNED")}>
                  Signed
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col
            md={4}
            className="dashboardCards pt-5 d-flex justify-content-end pl-0 pr-5"
          >
            <Dropdown>
              <Dropdown.Toggle className="drop-btn pt-0 pl-0">
                {currentSorted === "desc" ? "Most Recent" : "Most Dated"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setCurrentSorted("desc")}>
                  Most Recent
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setCurrentSorted("asc")}>
                  Most Dated
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        {filtered.length === 0 ? (
          <h3 className="d-flex justify-content-center mt-5">
            No Forms Data Here
          </h3>
        ) : (
          filtered.map((item) => (
            <Row className=" border-bottom pb-3 mt-5 ">
              <Col md={6}>
                <h6>{item.formName}</h6>
                <Link to="#">{item.receiverName}</Link>
              </Col>
              <Col md={2} className="text-center">
                {item.status === "SENT" && (
                  <Badge variant="danger sent-option text-center">Sent</Badge>
                )}

                {item.status === "VIEWED" && (
                  <Badge variant="warning sent-option text-center">
                    Viewed
                  </Badge>
                )}

                {item.status === "SIGNED" && (
                  <Badge variant="success sent-option text-center">
                    Signed
                  </Badge>
                )}
                <p style={{ fontSize: 13 }}>
                  <Moment fromNow>{item.updatedAt}</Moment>
                </p>
              </Col>
              <Col md={4} className="text-right pr-0">
                <Button variant="outline-secondary invite view-form mr-3">
                  <a
                    target="_blank"
                    href={`${base_url}/formSubmission/${item.id}`}
                  >
                    View Form
                  </a>
                </Button>

                {item.status === "SENT" && <SendReminder itemData={item} />}

                {item.status === "VIEWED" && <SendReminder itemData={item} />}

                {item.status === "SIGNED" && <ShareButton   itemData={item} item={item}  itemUrl={item.id} />}
              </Col>
            </Row>
          ))
        )}

      
      </Container>
    </Container>
  );
};

export default FormsScreen;
