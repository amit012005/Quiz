import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const AboutScreen = () => {
  return (
    <Container className="my-5">
      <h1 className="mb-4 text-3xl font-bold text-center">About ThinkTank</h1>
      <Row className="justify-content-center">
        <Col md={8}>
          <p className="text-lg">
            ThinkTank is a comprehensive online examination system that enables
            individuals to conduct examinations efficiently and effectively. Our
            platform offers a seamless way to create, manage, and analyze exams,
            making the process straightforward and user-friendly.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutScreen;
