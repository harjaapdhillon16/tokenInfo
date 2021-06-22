import React, { useEffect, useState, useContext } from "react";

import { IconPlus } from "../../assets/icons/icons";
import {
  Container,
  Modal,
  InputGroup,
  Form,
  Row,
  Col,
  Button,
  FormControl,
} from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import AppCard from "../card/card";
import Header from "../header/header";
import ShareForm from "../../components/shareForm/shareForm";
import AppContext from "../../context/appContext";
import * as emailjs from "emailjs-com";
import { API, graphqlOperation } from "aws-amplify";
import { ContactActions } from "../../assets/icons/icons";
import { deleteFormData } from "../../graphql/mutations";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/style.css";

const ShareButton = ({ itemData, item, itemUrl }) => {
  //  console.log(itemData);
  let base_url = window.location.origin;
  const { user, onDeleteForm } = useContext(AppContext);
  const [shareFormItem, setShareFormItem] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = value => {
    console.log(value);
    setShow(!value);
    //setShow(value)
  }

  console.log("itemData",itemData);
  console.log("item",item);
  console.log("itemUrl",itemUrl);
  const [reminderStatus, setReminderStatus] = useState(false);

  const handleShared = (item) => {
    console.log("handleshare function",item);
    setShareFormItem(item);
    handleShow();
  };

  // const handleReminderSent = async (item) => {
  //   let SERVICE_ID = "service_tjry678";
  //   let TEMPLATE_ID = "template_difn49p";
  //   let USER_ID = "user_xtMibwUvYsK5NraUVFG1J";

  //   let emailData = {
  //     from_name: user.username,
  //     to_name: item.receiverName,
  //     message: `${base_url}/formSubmission/${item.receiverId}`,
  //     reply_to: user.attributes.email,
  //     to_email: item.receiverEmail,
  //   };

  //   console.log("emailData", emailData);

  //   emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID).then(
  //     function (response) {
  //       console.log(response);
  //       console.log(response.status, response.text);

  //       setReminderStatus(true);
  //       setTimeout(function () {
  //         setReminderStatus(false);
  //       }, 2500);
  //     },
  //     function (err) {
  //       console.log(err);
  //     }
  //   );
  // };

  const handleDeleteForm = async (formid) => {
    const data = {
      id: formid,
    };
    try {
      const deleteFormDataRes = await API.graphql(
        graphqlOperation(deleteFormData, { input: data })
      );
      onDeleteForm(deleteFormDataRes.data.deleteFormData["id"]);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <>
      <Button
        variant="outline-secondary cf-black px-5"
        onClick={() => handleShow()}
      >
        Share

      </Button>
      <Dropdown className="dotaction d-inline-block">
        <Dropdown.Toggle className="drop-btn">
          <ContactActions />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/* <Dropdown.Item >
          <a
            className="dropdown-item p-0"
                    target="_blank"
                    href={`${base_url}/formSubmission/${itemUrl}&download=true`}
                  >
                  Download
                  </a>
           
            </Dropdown.Item> */}

          <Dropdown.Item onClick={() => handleDeleteForm(itemData.id)}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ShareForm
        show={show}
        handleClose={handleClose}
        url={itemUrl}
        formData={shareFormItem}
      />
    </>
  );
};

export default ShareButton;
