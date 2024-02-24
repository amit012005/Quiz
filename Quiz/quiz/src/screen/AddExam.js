import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";

const AddExam = ({ history, match }) => {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [answer, setAnswer] = useState("");
  const [marks, setMarks] = useState(0);

  const id = localStorage.getItem;

  const exam = JSON.parse(localStorage.getItem("exam"));
  async function handleSubmit(e) {
    e.preventDefault();
    const multi = {
      question: question,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,
      answer: answer,
      marks: marks,
      id: exam.id,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/question/addExam/${exam._id}`,
        {
          id: exam._id,
          question: multi,
        }
      );
      if (response) {
        console.log(response);
        const data = JSON.stringify(response.data);
        localStorage.setItem("exam", data);
        toast.success("Question Added successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{exam.title} Question Paper Edit</h1>
            <hr />
            <h3>Exam Type: {exam.instructions}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h1>Add MCQ</h1>
            <hr />
            <Form onSubmit={handleSubmit} autoComplete="Off">
              <Form.Group controlId="title">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="optionA">
                <Form.Label>Option A</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Option A"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="optionB">
                <Form.Label>Option B</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Option B"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="optionC">
                <Form.Label>Option C</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Option C"
                  value={optionC}
                  onChange={(e) => setOptionC(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="optionD">
                <Form.Label>Option D</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Option D"
                  value={optionD}
                  onChange={(e) => setOptionD(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="answer">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="marks">
                <Form.Label>Marks</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="col-6">
            <Row>
              <h3> Multiple Choice Questions Section </h3>
            </Row>
            <hr />(
            <>
              {exam.multiple !== undefined &&
                exam.multiple.map((question, i) => (
                  <>
                    <p>
                      {" "}
                      <b>Question {i + 1}</b> : {question.question}{" "}
                    </p>
                    <p>Option A : {question.optionA}</p>
                    <p>Option B : {question.optionB}</p>
                    <p>Option C : {question.optionC}</p>
                    <p>Option D : {question.optionD}</p>
                    <p>Correct Answer : {question.answer}</p>
                    <p>Marks : {question.marks}</p>
                    <hr />
                  </>
                ))}
            </>
            )
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExam;
