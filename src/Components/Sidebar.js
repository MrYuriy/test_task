import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";


const Sidebar = (props) => {
  const { items } = props;

  const cards = items.map((item) => (
    <Card key={item.id} className="ap_card">
      <Card.Img variant="top" src={item.image} />
      <Card.ImgOverlay>
        <Card.Title>
          <p className="card_price">{item.price} грн/доба</p>
        </Card.Title>
      </Card.ImgOverlay>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.location}</Card.Text>
      </Card.Body>
    </Card>
  ));

  return <div className="side">{cards}</div>;
};

export default Sidebar;
