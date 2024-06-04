import { React, useState, useContext } from "react";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  async function registerHandler(e) {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      console.log(name + email + password);
      if (password !== confirmPassword) {
        toast.error("Password do not match!");
      } else {
        try {
          const res = await axios.post(
            "http://localhost:8080/api/users/",
            {
              name,
              email,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("RegisterScreen", res.data);
          const userdata = JSON.stringify(res.data);
          localStorage.setItem("user", userdata);

          toast.success("Congratulations! Registered Successfully!");
          window.location.href = "/";
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      }
    } else {
      console.log("Please fill all the details");
    }
  }

  function handleRedirect() {
    window.location.href = "/login";
  }

  return (
    <FormContainer>
      <br />
      <h1>Sign Up</h1>

      <Form onSubmit={registerHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            className="mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="dark">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?
          <a
            onClick={handleRedirect}
            style={{
              cursor: "pointer",
              color: "black",
              textDecoration: "none",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            Login
          </a>{" "}
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
