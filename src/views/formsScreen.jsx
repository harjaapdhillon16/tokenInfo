import React, { useEffect, useState, useContext } from 'react';
import { IconBuilding, IconEmail, IconSmartphone, IconMenu } from '../assets/icons/icons';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Header from '../components/header/header';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { API, graphqlOperation } from 'aws-amplify';
import { listFormDatas } from '../graphql/queries';
import AppContext from '../../src/context/appContext';
import * as emailjs from 'emailjs-com';
import Moment from 'react-moment';
import { updateFormData } from "../graphql/mutations";
import _ from 'lodash';
import Loader from "../components/Loader/Loader";

const FormsScreen = () => {
  const { user, formItems, onFormItemsUpdate, onFormItemUnitUpdate } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [formsData,setFormsData] = useState([]);
  const [reminderStatus, setReminderStatus] = useState(false);

  useEffect(() => {
    handleFormsData();
  }, []);

  const handleFormsData = async () => {
    setLoading(true);
    try {
      const newFormsData = await API.graphql(
        graphqlOperation(listFormDatas)
      );
      console.log('listforms', newFormsData.data.listFormDatas.items );

      onFormItemsUpdate(newFormsData.data.listFormDatas.items);
      // setFormsData(newFormsData.data.listFormDatas.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleReminderSent = async (itemData) => {
    let SERVICE_ID = "service_tjry678";
    let TEMPLATE_ID = "template_difn49p";
    let USER_ID = "user_xtMibwUvYsK5NraUVFG1J";
  

    let emailData = {
      from_name: user.username,
      to_name: itemData.receiverName,
      message:`http://localhost:3000/formSubmission/${itemData.receiverId}`,
      reply_to: user.attributes.email,
      to_email: itemData.receiverEmail,
    };

    console.log('emailData', emailData);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, USER_ID).then(
      function (response) {
        console.log(response);
        console.log(response.status, response.text);
        handleReminderStatus(itemData);
      },
      function (err) {
        console.log(err);
      }
    );
  }

  const handleReminderStatus = async(contactUserData) =>{
    if(!reminderStatus){
      let data = {};
      data.id = contactUserData.id;
      data.status= "REMINDERSENT";
      console.log(data);

      try {
        const checkReminderStatus = await API.graphql(
          graphqlOperation(updateFormData, { input: data })
        );
        console.log("checkReminderStatus", checkReminderStatus.data.updateFormData);
        if(data.id === checkReminderStatus.data.updateFormData.id){
          const updateForm = [...formItems, checkReminderStatus.data.updateFormData];
          console.log('updateForm', updateForm);
          onFormItemUnitUpdate(updateForm);
        }

      } catch (err) {
        console.log(err, "Error updating Form View status");
      }
    }
  }



 
var base_url = window.location.origin;
console.log('formItems context', formItems);
const sortedForms = _.orderBy( formItems, ['createdAt'],['desc']);
console.log('sortedForms', sortedForms);
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
          <Col md={12} className="dashboardCards pt-5">
            <div className="d-flex">
              <h5>Forms</h5>
              <Dropdown>
                <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                  All Statuses
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                  All clients
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                  All forms
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle className="drop-btn pt-0 pl-5">
                  Most recent
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
        {sortedForms.map(item =>  <Row className="w-100 border-bottom pb-3 mt-5 ">
          <Col md={5}>
            <h6>{item.formName}</h6>
          
             <Link to="#">{item.receiverName}</Link>
            
          </Col>
          <Col md={3} className="text-center">
          
            {item.status === "SENT" &&
              <Badge variant="danger sent-option text-center">Sent</Badge>
            }

            {item.status === "VIEWED" &&
              <Badge variant="warning sent-option text-center">Viewed</Badge>
            }

            {item.status === "SIGNED" &&
              <Badge variant="success sent-option text-center">Signed</Badge>
            }
            <p style={{ fontSize: 13 }}><Moment fromNow>{item.updatedAt}</Moment></p>
          </Col>
          <Col md={4} className="text-right">
            <Button variant="outline-secondary invite view-form mr-3">
              <a  target="_blank" href={`${base_url}/formSubmission/${item.id}`}>View Form</a>
            </Button>

            {/* {item.status === "SENT" || item.status === "VIEWED" ?
              <>
                {!reminderStatus  ? (
                  <Button variant="outline-secondary options" 
                    onClick={() => handleReminderSent(item.receiverId, item.receiverName, item.receiverEmail)}
                  >
                    Reminder Sent!
                  </Button>
                ):(
                  <Button variant="outline-secondary options" 
                    onClick={() => handleReminderSent(item.receiverId, item.receiverName, item.receiverEmail)}
                  >
                    Send Reminder
                  </Button>
                )}
              </>
           
            : null
            
            }  */}
            {item.status === "SENT" &&
             <Button variant="outline-secondary cf-black" 
                onClick={() => handleReminderSent(item)}
              >
                Send Reminder
              </Button>
            }

            {item.status === "VIEWED" &&
             <Button variant="outline-secondary cf-black" 
                onClick={() => handleReminderSent(item)}
              >
                Send Reminder
              </Button>
            }

            {item.status === "SIGNED" &&
             <Button variant="outline-secondary cf-black">
                Share
              </Button>
            }

            {/* {item.status === "REMINDERSENT" ?
              <Button variant="outline-secondary options">
                Reminder Sent!
              </Button>
            :
            <Button variant="outline-secondary options" 
              onClick={() => handleReminderSent(item)}
            >
              Send Reminder
            </Button>
            } */}
          </Col>
        </Row>
        )}
      </Container>
    </Container>
  );
};

export default FormsScreen;
