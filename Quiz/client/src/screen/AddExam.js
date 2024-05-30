import React, { useState } from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const AddExam = ({ history, match }) => {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [answer, setAnswer] = useState("");
  const [marks, setMarks] = useState(0);
  const [exam, setExam] = useState(JSON.parse(localStorage.getItem("exam")));

  async function handleSubmit(e) {
    e.preventDefault();
    const multi = {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      marks,
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
        toast.success("Question added successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

 

  async function handleDelete(questionId) {
    console.log(questionId);
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/question/deleteExam/${exam._id}/${questionId}`
      );
      if (response) {
        console.log(response);
        // Update the exam object in localStorage after deleting the question
        const updatedExam = { ...exam };
        updatedExam.multiple = updatedExam.multiple.filter(
          (question) => question._id !== questionId
        );
        localStorage.setItem("exam", JSON.stringify(updatedExam));
        toast.success("Question deleted successfully");
        // Update the state to reflect the changes
        setExam(updatedExam);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">{exam.title} Question Paper Edit</h1>
      <h3 className="mb-4">Exam Type: {exam.instructions}</h3>
      <Row>
        <Col md={6}>
          <h2 className="mb-4">Add MCQ</h2>
          <Form onSubmit={handleSubmit} autoComplete="Off">
            <Form.Group controlId="question" className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="optionA" className="mb-3">
              <Form.Label>Option A</Form.Label>
              <Form.Control
                type="text"
                placeholder="Option A"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="optionB" className="mb-3">
              <Form.Label>Option B</Form.Label>
              <Form.Control
                type="text"
                placeholder="Option B"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="optionC" className="mb-3">
              <Form.Label>Option C</Form.Label>
              <Form.Control
                type="text"
                placeholder="Option C"
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="optionD" className="mb-3">
              <Form.Label>Option D</Form.Label>
              <Form.Control
                type="text"
                placeholder="Option D"
                value={optionD}
                onChange={(e) => setOptionD(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="answer" className="mb-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="marks" className="mb-3">
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type="number"
                placeholder="Marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2 className="mb-4">Multiple Choice Questions</h2>
          {exam.multiple !== undefined &&
            exam.multiple.map((question, i) => (
              <Card key={i} className="mb-4 p-4">
                <Card.Body>
                  <Card.Title>
                    <b>Question {i + 1}</b>: {question.question}
                  </Card.Title>
                  <Card.Text>Option A: {question.optionA}</Card.Text>
                  <Card.Text>Option B: {question.optionB}</Card.Text>
                  <Card.Text>Option C: {question.optionC}</Card.Text>
                  <Card.Text>Option D: {question.optionD}</Card.Text>
                  <Card.Text>Correct Answer: {question.answer}</Card.Text>
                  <Card.Text>Marks: {question.marks}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(question._id)}
                    className="mt-2"
                  >
                    <FaTrash />
                  </Button>
                </Card.Body>
              </Card>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default AddExam;
