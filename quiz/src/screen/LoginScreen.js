import { React, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import "../App.css";
import "../bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// import { useUser } from "../context/userContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { updateUser } = useUser();
  async function loginHandler(e) {
    e.preventDefault();
    try {
      // Make an API request to check user authentication
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      console.log("response " + response);

      if (response) {
        console.log("User authenticated!", response.data);
        toast.success("Login Successfully");

        console.log("LoginScreen", response.data);
        const userdata = JSON.stringify(response.data);
        localStorage.setItem("user", userdata);
        // updateUser(response.data);
        window.location.href = "/";
        // history.push("/");
      } else {
        console.log("Authentication failed. Incorrect email or password.");
        toast.error("Incorrect email or password.");
      }
    } catch (error) {
      console.error("Error during authentication:", error.message);
      toast.error("Something went wrong! Try Again");
    }
  }

  return (
    <FormContainer>
      <br />
      <br />
      <h1>Sign In</h1>

      <Form onSubmit={loginHandler}>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
