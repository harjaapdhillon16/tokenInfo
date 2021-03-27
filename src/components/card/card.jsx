import React from 'react';
import { Card } from 'react-bootstrap';
 const AppCard = (props) => {
 
    return ( 
        <Card className="mt-4">
            <Card.Body>
              <div className="cardBoxIcon ">
                {/* <IconBuilding /> */}
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
     );
}
 
export default AppCard;