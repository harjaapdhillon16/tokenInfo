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
  const [visible, setVisible] = useState(false);
  const handleShow = () => {
    setShow(false);
    setVisible(true);
  };
   	const [inviteStatus, setInviteStatus] = useState(false);
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
                <Button variant="outline-secondary" className="send mr-4">
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
			<input type="text" class="form-control" placeholder="Name"  aria-describedby="basic-addon2"/>
			<div class="input-group-append px-2">
				<button class="btn btn-outline-secondary" type="button" className="p-1">
					<Search />
				</button>
			</div>
		</div>
        {/* <InputGroup className="mb-4 account-field">
            <FormControl id="inlineFormInputGroupUsername" placeholder="Name" />
			<span>
			<Search />
			</span>
        </InputGroup> */}
		<Row>
          {teamAccount.map((item) => (
			  <Col md={12}>
				<div className="team-list">
					<ul>
						<li>
							{item.name}
						</li>
						<li>
							{item.address}
							<Button 
								variant="outline-secondary" 
								className="send d-flex align-items-center justify-content-center float-right"
								onClick={() => setInviteStatus(true)}
							>
								{inviteStatus ?
									<>Invited!</>
									:
									<>Invite</>
								}
                			</Button>
						</li>
						<li>
						{item.city}
						</li>
					</ul>
				</div>
		   </Col>
          ))}
        </Row>
			<div class="input-group mb-3 account-details">
				<input type="text" class="form-control" placeholder="Email address(es) separated by commas" aria-describedby="basic-addon2"/>
				<div class="input-group-append px-2 send-append">
					<button class="btn-secondary" type="button" className="p-1">Send</button>
				</div>
			</div>
          </Form>
		  <p>Invite your teammates to join your team on Cribfox, even if they don't have an account yet</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="m-auto px-4"
            onClick={() => setVisible(false)}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default FormsScreen;
