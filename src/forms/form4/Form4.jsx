import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  Button,
  Image,
} from "react-bootstrap";
import Logo from "../../assets/FormImages/og_image.png";
import "./css/style4.css";
const Form4 = () => {
  return (
    <Container className="form4">
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
              New York State Disclosure Form for Buyer and Seller
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
                  acting as agents of buyers or sellers of property to advise
                  the potential buyers or sellers with whom they work of the
                  nature of their agency relationship and the rights and
                  obligations it creates. This disclosure will help you to make
                  informed choices about your relationship with the real estate
                  broker and its sales agents.{" "}
                </p>
                <p>
                  Throughout the transaction you may receive more than one
                  disclosure form. The law may require each agent assisting in
                  the transaction to present you with this disclosure form. A
                  real estate agent is a person qualified to advise about real
                  estate.
                </p>
                <p>
                  If you need legal, tax or other advice, consult with a
                  professional in that field.
                </p>
              </div>
              <div className="pt-3 ">
                <h5 className="py-2 mb-0 text-center font-weight-bold">
                  Disclosure Regarding Real Estate Agency Relationships
                </h5>
                <h6 className="mb-0 font-weight-bold">Seller’s Agent</h6>
                <p>
                  A seller’s agent is an agent who is engaged by a seller to
                  represent the seller’s interests. The seller’s agent does this
                  by securing a buyer for the seller’s home at a price and on
                  terms acceptable to the seller. A seller’s agent has, without
                  limitation, the following fiduciary duties to the seller:
                  reasonable care, undivided loyalty, confidentiality, full
                  disclosure, obedience and duty to account. A seller’s agent
                  does not represent the interests of the buyer. The obligations
                  of a seller’s agent are also subject to any specific
                  provisions set forth in an agreement between the agent and the
                  seller. In dealings with the buyer, a seller’s agent should
                  (a) exercise reasonable skill and care in performance of the
                  agent’s duties; (b) deal honestly, fairly and in good faith;
                  and (c) disclose all facts known to the agent materially
                  affecting the value or desirability of property, except as
                  otherwise provided by law.
                </p>
              </div>
              <div className="pt-3 ">
                <h6 className="font-weight-bold">Buyer’s Agent</h6>
                <p>
                  A buyer’s agent is an agent who is engaged by a buyer to
                  represent the buyer’s interest. The buyer’s agent does this by
                  negotiating the purchase of a home at a price and on terms
                  acceptable to the buyer. A buyer’s agent has, without
                  limitation, the following fiduciary duties to the buyer:
                  reasonable care, undivided loyalty, confidentiality, full
                  disclosure, obedience and duty to account. A buyer’s agent
                  does not represent the interest of the seller. The obligations
                  of a buyer’s agent are also subject to any specific provisions
                  set forth in an agreement between the agent and the buyer. In
                  dealings with the seller, a buyer’s agent should (a) exercise
                  reasonable skill and care in performance of the
                </p>
                <p>
                  function as the seller’s agent representing the interests of
                  and advocating on behalf of the seller in the negotiations
                  between the buyer and seller. A designated sales agent cannot
                  provide the full range of fiduciary duties to the landlord or
                  tenant. A designated sales agent cannot provide full range of
                  fiduciary duties to the buyer or seller. The designated sales
                  agent must explain that like the dual agent
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="pt-3 ">
                <p>
                  agent’s duties; (b) deal honestly, fairly and in good faith;
                  and (c) disclose all facts known to the agent materially
                  affecting the buyer’s ability and/or willingness to perform a
                  contract to acquire seller’s property that are not consistent
                  with the agent’s fiduciary duties to the buyer
                </p>
                <h6 className="font-weight-bold">Broker’s Agents</h6>
                <p>
                  A broker’s agent is an agent that cooperates or is engaged by
                  a listing agent or a buyer’s agent (but does not work for the
                  same firm as the listing agent or buyer’s agent) to assist the
                  listing agent or buyer’s agent in locating a property to sell
                  or buy, respectively, for the listing agent’s seller or the
                  buyer agent’s buyer. The broker’s agent does not have a direct
                  relationship with the buyer or seller and the buyer or seller
                  cannot provide instructions or direction directly to the
                  broker’s agent. The buyer and the seller therefore do not have
                  vicarious liability for the acts of the broker’s agent. The
                  listing agent or buyer’s agent do provide direction and
                  instruction to the broker’s agent and therefore the listing
                  agent or buyer’s agent will have liability for the acts of the
                  broker’s agent.{" "}
                </p>
                <h6 className="mb-0 font-weight-bold">Dual Agent</h6>
                <p>
                  A real estate broker may represent both the buyer and the
                  seller if both the buyer and seller give their informed
                  consent in writing. In such a dual agency situation, the agent
                  will not be able to provide the full range of fiduciary duties
                  to the buyer and seller. The obligations of an agent are also
                  subject to any specific provisions set forth in an agreement
                  between the agent, and the buyer and seller. An agent acting
                  as a dual agent must explain carefully to both the buyer and
                  seller that the agent is acting for the other party as well.
                  The agent should also explain the possible effects of dual
                  representation, including that by consenting to the dual
                  agency relationship the buyer and seller are giving up their
                  right to undivided loyalty. A buyer or seller should carefully
                  consider the possible consequences of a dual agency
                  relationship before agreeing to such representation. A seller
                  or buyer may provide advance informed consent to dual agency
                  by indicating the same on this form.{" "}
                </p>
                <h6 className="mb-0 font-weight-bold">
                  Dual Agent with Designated Sales Agents
                </h6>
                <p>
                  If the buyer and seller provide their informed consent in
                  writing, the principals and the real estate broker who
                  represents both parties as a dual agent may designate a sales
                  agent to represent the buyer and another sales agent to
                  represent the seller. A sales agent works under the
                  supervision of the real estate broker. With the informed
                  consent of the buyer and the seller in writing, the designated
                  sales agent for the buyer will function as the buyer’s agent
                  representing the interests of and advocating on behalf of the
                  buyer and the designated sales agent for the seller will
                </p>
                <p>
                  under whose supervision they function, they cannot provide
                  undivided loyalty. A buyer or seller should carefully consider
                  the possible consequences of a dual agency relationship with
                  designated sales agents before agreeing to such
                  representation. A seller or buyer provide advance informed
                  consent to dual agency with designated sales agents by
                  indicating the same on this form.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="pt-4">
            {/* <div className="pt-3 text-bottom-border"></div> */}
            <Col md={12}>
              <form class="form-inline submit-form">
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
                          <Form.Control
                            class="form-control mb-2 mr-sm-2"
                            id="senderName"
                            name="senderName"
                            type="text"
                          />
                        </span>
                        <p className="text-center">(Print Name of Licensee) </p>
                      </li>
                      <li>
                        <p className="apply-font"> of</p>
                      </li>
                      <li>
                        <span>
                          <Form.Control
                            class="form-control mb-2 mr-sm-2"
                            type="text"
                            id="senderCompany"
                            name="senderCompany"
                          />
                        </span>
                        <p className="text-center">
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
                    <div className="align-items-md-center d-flex cf-text-wrapper flex-column  my-2">
                      <div className="my-2">
                        <Form.Control type="checkbox" className="mr-2 " />
                        <span className="font-weight-lighter mt-3">
                          Seller as a (check relationship below)
                        </span>
                      </div>
                      <div className="my-2">
                        <Form.Control
                          type="checkbox"
                          className="mr-2  cf-small-box"
                          name="seller"
                        />
                        <span className="font-weight-lighter mt-3">
                          Seller’s Agent
                        </span>
                      </div>
                      <div className="my-2">
                        <Form.Control
                          type="checkbox"
                          className="mr-2  cf-small-box"
                          name="broker"
                        />
                        <span className="font-weight-lighter mt-3">
                          Broker’s Agent
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}></Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Form4;
