import React from "react";
import {
  Row,
  Col,
  Image,

} from "react-bootstrap";

const AboutScreen = () => {
  return (
    <>
      <h1 style={{ marginLeft: "30px" }}>About ThinkTank</h1>
      <Row>
        <Col md={6}>
          <Image
            src="/images/b.jpg"
            alt="online"
            style={{ margin: "30px", width: "50vw", height: "80vh" }}
            fluid
          />
        </Col>
        <Col md={6}>
          <div className="container">
            <p style={{ margin: "30px", fontSize: "24px", textAlign: "left" }}>
              ThinkTank is an online examination system where someone can conduct
              examination for other. 
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AboutScreen;
