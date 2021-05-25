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
  FormControl
} from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import AppCard from "../card/card";
import Header from "../header/header";
import AppContext from "../../context/appContext";
import * as emailjs from 'emailjs-com';
import { API, graphqlOperation } from "aws-amplify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';

const SendReminder = ({itemData}) => {
//  console.log(itemData);
 let base_url = window.location.origin;
 const { user} = useContext(AppContext);
 const [reminderStatus, setReminderStatus] = useState(false);

 const handleReminderSent = async (item) => {
    
    let SERVICE_ID = "service_tjry678";
    let TEMPLATE_ID = "template_difn49p";
    let USER_ID = "user_xtMibwUvYsK5NraUVFG1J";
  

    let emailData = {
      from_name: user.username,
      to_name: item.receiverName,
      message:`${base_url}/formSubmission/${item.receiverId}`,
      reply_to: user.attributes.email,
      to_email: item.receiverEmail,
    };

    console.log('emailData', emailData);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID).then(
      function (response) {
        console.log(response);
        console.log(response.status, response.text);
        
        setReminderStatus(true);
        setTimeout(function(){ 
        setReminderStatus(false);
        }, 2500);

      },
      function (err) {
        console.log(err);
      }
    );
  }

  return ( 
        <>
        {!reminderStatus ?
        <Button variant="outline-secondary cf-black" 
            onClick={() => handleReminderSent(itemData)}
        >
            Send Reminder
        </Button>
        :
        <Button variant="outline-secondary cf-black">
            Reminder Sent!
        </Button>
        }
        </>

  );
};

export default SendReminder;
