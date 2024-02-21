import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-hot-toast";

const EditExamScreen = ({ history }) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [examCode, setExamCode] = useState("");
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  function handleShow() {
    setShow(true);
  }
  const [exams, setExams] = useState([]);
  const examList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/question", {
        params: { creator: userInfo.email }, // Correctly pass query parameters
      });
      console.log("ExamList", response.data);
      toast.success("loaded successfully");
      setExams(response.data); // Assuming setExams is defined and handles the response correctly
      console.log("useEffect", exams);
    } catch (error) {
      console.error("Failed to load examList:", error);
      toast.error("Failed to load examList");
    }
  };

  useEffect(() => {
    examList();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const creator = userInfo.email;
    console.log(title, examCode, time, duration, instructions, creator);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/question",
        {
          title,
          examCode,
          time,
          duration,
          instructions,
          creator,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Successfully created");
      setShow(false);
      window.location.reload();
    } catch (error) {
      console.log("cannot post");
    }
  }
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        const res = await axios.delete(
          `http://localhost:8080/api/question/${id}`
        );
        if (res) {
          toast.success(res.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    window.location.reload();
  };
  const editExam = async (exam) => {
    const data = JSON.stringify(exam);
    localStorage.setItem("exam", data);
    window.location.href = `/addExam/${exam._id}`;
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} autoComplete="Off">
            <Form.Group controlId="title">
              <Form.Label>Exam Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Exam Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="examCode">
              <Form.Label>Exam Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Exam Code"
                value={examCode}
                onChange={(e) => setExamCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="examDate">
              <Form.Label>Exam Date</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Small text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="examDuration">
              <Form.Label>Exam Duration</Form.Label>
              <Form.Control
                type="Number"
                placeholder="120 (in minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="instructions">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="container">
        <br></br>
        <br></br>
        <br></br>
        <Row>
          <Col>
            <h3>Edit Exam Papers</h3>
            <hr />
            <br></br>
          </Col>
          <div className="ml-auto">
            {/* <Link to='/edits/exam'> */}
            <Button outline className="ml-auto" onClick={handleShow}>
              <span className="fa fa-pencil fa-lg"></span>Add Exams
            </Button>
            {/* </Link> */}
          </div>
        </Row>

        <>
          <Row>
            {exams !== undefined &&
              exams.map((exam) => (
                <Col sm={12} md={6} lg={6} xl={6}>
                  <Card
                    body
                    inverse
                    style={{
                      // width: '20rem','#ABA5CF'
                      backgroundColor: "#6c61ff",
                      borderRadius: "5%",
                      borderWidth: "5px",
                      color: "white",
                      margin: "5%",
                      fontSize: "20px",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>Subject: {exam.title}</Card.Title>
                      <Card.Text>Course Code: {exam.examCode}</Card.Text>
                      <Card.Text>Exam Date: {exam.time}</Card.Text>
                      <Card.Text>Duration: {exam.duration} minutes</Card.Text>
                      <Card.Text>Description: {exam.instructions}</Card.Text>
                      {userInfo ? (
                        <>
                          <Button
                            variant="light"
                            style={{
                              borderRadius: "10px",
                              fontSize: "19px",
                              margin: "1rem",
                              color: "black",
                            }}
                            onClick={() => editExam(exam)}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="danger"
                            // variant='danger'
                            style={{
                              borderRadius: "10px",
                              fontSize: "19px",
                              margin: "1rem",
                              color: "black",
                            }}
                            onClick={() => deleteHandler(exam._id)}
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <Link to="/login">
                          <Button
                            variant="primary"
                            style={{
                              borderRadius: "2rem",
                            }}
                          >
                            Edit
                          </Button>
                        </Link>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );
};

export default EditExamScreen;
