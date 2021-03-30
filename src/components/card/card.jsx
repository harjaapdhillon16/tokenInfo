import React from 'react';
import { Card } from 'react-bootstrap';
import {Link} from "react-router-dom";
 const AppCard = (props) => {
 
    return ( 
      <Link to={props.sectionPath}>
        <Card className="mt-4 cardtext">
            <Card.Body>
              <div className="cardBoxIcon ">
                {props.icon}
              </div>
              <Card.Title>
                <h6>{props.title}</h6>
              </Card.Title>
              <Card.Text>
              {props.desc}
              </Card.Text>
            </Card.Body>
          </Card>
          </Link>
     );
}
 
export default AppCard;