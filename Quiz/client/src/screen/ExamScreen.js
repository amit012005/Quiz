import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ExamScreen = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [examCode, setExamCode] = useState("");
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [exams, setExams] = useState([]);

  const examList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/question", {
        params: { creator: userInfo.email },
      });
      setExams(response.data);
      toast.success("Exams loaded successfully");
    } catch (error) {
      console.error("Failed to load exams:", error);
      toast.error("Failed to load exams");
    }
  };

  useEffect(() => {
    console.log(userInfo);
    examList();
  }, []);

  const handleShow = () => {
    if (userInfo) {
      setShow(true);
    } else {
      toast.error("Please sign in to your account");
      window.location.href = "/login";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creator = userInfo.email;
    try {
      await axios.post(
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
          }
        }
      );
      toast.success("Exam created successfully");
      setShow(false);
      examList(); 
    } catch (error) {
      console.error("Failed to create exam:", error);
      toast.error("Failed to create exam");
    }
  };

  const handleStart = (exam) => {
    const data = JSON.stringify(exam);
    localStorage.setItem("exam", data);
    const currDate = new Date();
    const examdate = exam.time.substring(0, 10);
    const hrs = +exam.time.substring(11, 13);
    const mins = +exam.time.substring(14, 16);
    const examDate = new Date(examdate);
    examDate.setHours(hrs);
    examDate.setMinutes(mins);
    examDate.setSeconds(0);
    examDate.setMilliseconds(0);

    if (examDate > currDate) {
      alert("You are not allowed to give this test now. Please check the date and time of your test.");
    } else {
      window.location.href = `/quiz/${exam._id}`;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-right mb-4">
      {userInfo.isAdmin ? (
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleShow}
      >
        Create Quiz
      </button>
    ) : null}
      </div>

      <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group controlId="title">
              <Form.Label>Exam Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Exam Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="examCode">
              <Form.Label>Exam Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Exam Code"
                value={examCode}
                onChange={(e) => setExamCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="examDate">
              <Form.Label>Exam Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="examDuration">
              <Form.Label>Exam Duration</Form.Label>
              <Form.Control
                type="number"
                placeholder="120 (in minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="instructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </Form.Group>
            <button             type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-3"
          >
            Submit
          </button>
        </Form>
      </Modal.Body>
    </Modal>

    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold">Active Exam Papers</h3>
      {userInfo && userInfo.isAdmin ? (
        <Link to="/edits/exam">
          <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">
            <i className="fa fa-pencil fa-lg"></i> Edit Exam Papers
          </button>
        </Link>
      ) :null}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map((exam) => (
        <div
          key={exam._id}
          className="bg-purple-600 text-white p-6 rounded-lg shadow-md"
        >
          <h4 className="text-xl font-bold mb-2">Subject: {exam.title}</h4>
          <p className="mb-2">Course Code: {exam.examCode}</p>
          <p className="mb-2">Exam Date: {exam.time}</p>
          <p className="mb-2">Duration: {exam.duration} minutes</p>
          <p className="mb-4 overflow-hidden max-w-[200px] overflow-ellipsis" >Description: {exam.instructions}</p>
          {userInfo ? (
            <button
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => handleStart(exam)}
            >
              Start
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Start
              </button>
            </Link>
          )}
          {userInfo.isAdmin && (
            <Link to={`/response/faculty/${exam._id}`}>
              <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl mt-4">
                Response
              </button>
            </Link>
          )}
        </div>
      ))}
    </div>
  </div>
);
};

export default ExamScreen;

             
