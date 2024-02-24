// https://github.com/aman3027/quizz
import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

import toast from "react-hot-toast";

const ExamScreen = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  if (userInfo) console.log("user Email", userInfo.name);

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [examCode, setExamCode] = useState("");
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  // const dispatch = useDispatch()
  // const examList = useSelector((state) => state.examList)
  // const { loading, error, exams } = examList
  // localStorage.removeItem("ResponseInfo");
  // localStorage.removeItem("ResultInfo");
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

  // const {examList}=axios.get("http://localhost:8080/api/question");
  useEffect(() => {
    examList();
    // console.log("useEffect", exams);
  }, []);
  function handleShow() {
    if (userInfo) {
      setShow(true);
    } else {
      toast.error("Sign In to your account");
      window.location.href = "/login";
    }
  }

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
    } catch (error) {
      console.log("cannot post");
    }
  }
  const handleStart = (exam) => {
    const data = JSON.stringify(exam);
    localStorage.setItem("exam", data);
    const currDate = new Date();
    const examdate = exam.time.substring(0, 10);
    const hrs = +exam.time.substring(11, 13);
    const mins = +exam.time.substring(14, 17);

    const examDate = new Date(examdate);
    examDate.setHours(hrs);
    examDate.setMinutes(mins);
    examDate.setSeconds(0); // Set seconds to 0
    examDate.setMilliseconds(0); // Set milliseconds to 0

    // console.log("examDate", examDate);
    // console.log("currDate", currentDate);

    if (examDate > currDate) {
      alert(
        "You are not allowed to give this test now. Please have a look on the date and time of your test."
      );
    } else {
      window.location.href = `/quiz/${exam._id}`;
    }
    
  };

  return (
    <>
      <div
        className="ml-auto"
        style={{ display: "block", position: "initial" }}
      >
        <Button variant="primary" onClick={handleShow}>
          Create Quiz
        </Button>

        <Modal
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
        >
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
                  placeholder="dd-mm-yyyy --:--"
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
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Instructions"
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
      </div>
      <div className="container">
        <br></br>
        <br></br>
        <br></br>
        <Row>
          <Col>
            <h3>Active Exam Papers</h3>
            <hr />
            <br></br>
          </Col>
          {userInfo && userInfo.isAdmin ? (
            <div className="ml-auto">
              <Link to="/edits/exam">
                <Button outline className="ml-auto" onClick={handleShow}>
                  <span className="fa fa-pencil fa-lg"></span>Edit Exam papers
                </Button>
              </Link>
            </div>
          ) : (
            <div className="ml-auto">
              <Button
                outline
                className="ml-auto"
                onClick={() => {
                  alert("You are not an admin");
                }}
              >
                <span className="fa fa-pencil fa-lg"></span>Edit Exam papers
              </Button>
            </div>
          )}
        </Row>
        (
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
                      <Card.Title>
                        <p>Subject: {exam.title}</p>
                      </Card.Title>
                      <Card.Text>Course Code: {exam.examCode}</Card.Text>
                      <Card.Text>Exam Date: {exam.time}</Card.Text>
                      <Card.Text>Duration: {exam.duration} minutes</Card.Text>
                      <Card.Text>Description: {exam.instructions}</Card.Text>
                      {userInfo ? (
                        <Button
                          variant="light"
                          style={{
                            borderRadius: "10px",
                            fontSize: "19px",
                            margin: "1rem",
                            color: "black",
                          }}
                          onClick={() => handleStart(exam)}
                          id="quiz"
                        >
                          Start
                        </Button>
                      ) : (
                        <Link to="/login">
                          <Button
                            variant="light"
                            style={{
                              borderRadius: "10px",
                              fontSize: "19px",
                              margin: "1rem",
                              color: "black",
                            }}
                          >
                            Start
                          </Button>
                        </Link>
                      )}
                      {userInfo.isAdmin ? (
                        <Link to={`/response/${exam._id}`}>
                          <Button
                            variant="light"
                            style={{
                              borderRadius: "10px",
                              fontSize: "19px",
                              margin: "1rem",
                              color: "black",
                            }}
                          >
                            Response
                          </Button>
                        </Link>
                      ) : (
                        <></>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </>
        )<br></br>
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

export default ExamScreen;
