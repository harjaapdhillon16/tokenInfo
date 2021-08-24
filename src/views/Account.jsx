import React, { useContext, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { IconChecked, Search } from "../assets/icons/icons";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
} from "react-bootstrap";
import Editable from "../components/Editable";
import { Link } from "react-router-dom";
import Header from "../components/header/header";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Loader from "../components/Loader/Loader";
import appContext from "../context/appContext";
import { updateAgent } from "../graphql/mutations";
const teamAccount = [
  {
    name: "Joseph Rogan",
    address: "Mont sky real estate,",
    city: "New York",
  },
  {
    name: "Joseph doe",
    address: "Mont sky real estate,",
    city: "New York",
  },
];

const FormsScreen = (props) => {
  const [show, setShow] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [editPermissions, setEditPermissions] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleShow = () => {
    setShow(false);
    setVisible(true);
  };
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [inviteStatus, setInviteStatus] = useState(false);
  const [handleStatus, setHandleStatus] = useState();
  const [formSubmit, setFormSubmit] = useState(false);
  const { agent, setAgent } = useContext(appContext);

  function editAgent(updatedValue) {
    console.log(updatedValue, agent.id);
    setAgent({ ...agent, ...updatedValue });
    API.graphql(
      graphqlOperation(updateAgent, {
        input: { id: agent.id, ...updatedValue },
      })
    )
      .then(console.log)
      .catch(console.log);
  }
  console.log("values", formSubmit);

  if (!agent) return <Loader />;

  return (
    <Container fluid className="p-0">
      <Header />
      <Container>
        <Breadcrumb className="title-bar">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">Account</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col md={12} className="pt-5">
            <h5>Account</h5>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Editable
              label="Name"
              value={agent.name}
              onSave={(val) => editAgent({ name: val })}
            />
            <Editable
              label="Email"
              value={agent.email}
              onSave={(val) => editAgent({ email: val })}
            />
            <Editable
              label="Brokerage"
              value={agent.brokerageName}
              onSave={(val) => editAgent({ brokerageName: val })}
            />
            <Editable
              label="State of licensure"
              value={agent.stateOfLicensure}
              onSave={(val) => editAgent({ stateOfLicensure: val })}
            />
          </Col>
          <Col md={4} className="pt-4">
            <Card>
              <IconChecked />
              {formSubmit ? (
                <Card.Body>
                  <Card.Title className="pt-3">
                    <h6>Team lead of the oliver group</h6>
                  </Card.Title>
                  <Card.Text>
                    Review your teams forms on other data
                    <Link to="#">
                      <u>Learn more about teams</u>
                    </Link>
                  </Card.Text>
                  <Button
                    variant="outline-secondary"
                    className="send mr-3 p-1"
                    onClick={() => setShow(true)}
                  >
                    Add Members
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="send p-1"
                    onClick={() => setEditModal(true)}
                  >
                    Edit Members
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="send p-1 mt-3"
                    onClick={() => setDeleteModal(true)}
                  >
                    Delete Team
                  </Button>
                </Card.Body>
              ) : (
                <Card.Body>
                  <Card.Title className="pt-3">
                    <h6>Individual</h6>
                  </Card.Title>
                  <Card.Text>
                    Share forms and other data with your team.
                    <Link to="#">
                      <u>Learn more about teams</u>
                    </Link>
                  </Card.Text>
                  <Button
                    variant="outline-secondary"
                    className="send mr-4"
                    onClick={() => setShow(true)}
                  >
                    Join a team
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="send"
                    onClick={() => setShow(true)}
                  >
                    Start a team
                  </Button>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title className="m-auto">Name your team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="col-9">
            What do you want to call your team, office or brokerage?
          </h6>
          <Form.Group className="m-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="email"
              placeholder="Enter team name (optional)"
            />
          </Form.Group>
          <div class="form-check check-field">
            <input
              type="checkbox"
              className="form-check-input mt-2"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1 pt-1">
              I manage a brokerage or office
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="m-auto px-4"
            onClick={() => handleShow()}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={visible}>
        <Modal.Header>
          <Modal.Title className="m-auto">Add team Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div class="input-group mb-3 account-details">
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append px-2">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  className="p-1"
                >
                  <Search />
                </button>
              </div>
            </div>
            <Row>
              {teamAccount.map((item) => (
                <Col md={12}>
                  <div className="team-list">
                    <ul>
                      <li>{item.name}</li>
                      <li>
                        {item.address}
                        <Button
                          variant="outline-secondary"
                          className="send d-flex align-items-center justify-content-center float-right"
                          onClick={() => setInviteStatus(true)}
                        >
                          {inviteStatus ? <>Invited!</> : <>Invite</>}
                        </Button>
                      </li>
                      <li>{item.city}</li>
                    </ul>
                  </div>
                </Col>
              ))}
            </Row>
            <div class="input-group mb-3 account-details">
              <input
                type="text"
                class="form-control"
                placeholder="Email address(es) separated by commas"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append px-2 send-append">
                <button class="btn-secondary" type="button" className="p-1">
                  Send
                </button>
              </div>
            </div>
          </Form>
          <p>
            Invite your teammates to join your team on Cribfox, even if they
            don't have an account yet
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="m-auto px-4"
            onClick={() => {
              setVisible(false);
              setFormSubmit(true);
            }}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={deleteModal}>
        <Modal.Header>
          <Modal.Title className="m-auto">Confirm Delete Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="px-3">
            You and all of your team members will revert back to individual
            status, and you will no longer be able to view your team's forms and
            other data.
          </p>
          <h6 className="px-3">Please Confirm you wish to delete your team</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="m-auto px-4"
            onClick={() => {
              setDeleteModal(false);
              setFormSubmit(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={editModal} className="edit-details">
        {editRole ? (
          <>
            <Modal.Header>
              <Modal.Title className="m-auto">Change Member Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="form-check check-field">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Member
                </label>
              </div>
              <div class="form-check check-field">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck2"
                />
                <label class="form-check-label" for="exampleCheck2">
                  Team Lead
                </label>
              </div>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Header>
              <Modal.Title className="m-auto">Edit team members</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="border-bottom">
                <Col md={9}>
                  <ul>
                    <li>Ronald Storm</li>
                    <li>Mont Sky Real Estate</li>
                    <li>New York</li>
                  </ul>
                </Col>
                <Col
                  md={3}
                  className="d-flex justify-content-center align-items-center"
                >
                  <DropdownButton
                    variant="outline-secondary"
                    title="Active"
                    className="px-3 mr-5"
                  >
                    <Dropdown.Item onClick={() => setEditRole(true)}>
                      Edit Role
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setEditPermissions(true)}>
                      Permissions
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDeleteModal(true);
                        setEditModal(false);
                      }}
                    >
                      Remove
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              <Row className="pt-3">
                <Col md={9}>
                  <ul>
                    <li>Joseph Ragon</li>
                    <li>Mont Sky Real Estate</li>
                    <li>New York</li>
                  </ul>
                </Col>
                <Col
                  md={3}
                  className="d-flex justify-content-center align-items-center"
                >
                  <DropdownButton
                    variant="outline-secondary"
                    title="Pending"
                    className="px-3 mr-5"
                  >
                    <Dropdown.Item href="#/action-1">Cancel</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Resend</Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
            </Modal.Body>
          </>
        )}
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="m-auto"
            onClick={() => {
              setEditModal(false);
              setEditRole(false);
            }}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default FormsScreen;
