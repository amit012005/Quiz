import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const QuizScreen = () => {
  const location = useLocation();
  const { exam } = location.state; 
  const [response, setResponse] = useState([]);
  const [attempts, setAttempts] = useState(0);
  
  const [min, setMin] = useState(exam.duration - 1);
  const [sec, setSec] = useState(59);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  useEffect(() => {
    if (!exam) {
      window.location.href = "/";
    }
  }, [exam]);

  const handleChange = (e) => {
    const answer = e.target.value;
    let quesnum = e.target.name;
    let num = parseInt(quesnum) + 1;
    quesnum = num.toString();
    const newResponse = response.map((res) =>
      res.quesnum === quesnum ? { ...res, answer } : res
    );
    if (!newResponse.find((res) => res.quesnum === quesnum)) {
      newResponse.push({ quesnum, answer });
    }
    setResponse(newResponse);
    console.log(newResponse);
  };

  const submitAnswer = async () => {
    response.sort((a, b) => (a.quesnum > b.quesnum ? 1 : -1));
    const ans = exam.multiple.map((q, i) =>
      response.find((res) => res.quesnum == i + 1)?.answer || "Not answered"
    );
    const finalResponse = exam.multiple.map((q, i) => ({
      question: q.question,
      answer: q.answer,
      marks: q.marks,
      response: ans[i],
    }));

    const count = finalResponse.reduce(
      (acc, q) => (q.response === q.answer ? acc + q.marks : acc),
      0
    );
    const total = exam.multiple.reduce((acc, q) => acc + q.marks, 0);

    const result = [count, total];

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        "http://localhost:8080/response",
        {
          finalResponse,
          user_id: user._id,
          name: user.name,
          exam_id: exam._id,
          attempts,
          obtain: count,
          examName: exam.title,
          total,
        },
        config
      );
      await axios.post(
        "http://localhost:8080/result",
        {
          examName: exam.title,
          result,
          user_id: user._id,
          exam_id: exam._id,
        },
        config
      );
      toast.success("Submitted successfully");
    } catch (error) {
      toast.error("Cannot post response in database");
    }
    localStorage.removeItem("exam");
    localStorage.setItem("ResultInfo", JSON.stringify(result));
    localStorage.setItem("ResponseInfo", JSON.stringify(finalResponse));
    window.location.href = "/";
  };

  const submitHandler = (e) => {
    e.preventDefault();
    submitAnswer();
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 17 || event.keyCode === 44 || event.keyCode === 91) {
      setAttempts((prev) => prev + 1);
      alert("Forbidden action detected. Repeated attempts will end the test.");
    }
  };

  const handleClick = (event) => {
    if (event.which === 3) {
      setAttempts((prev) => prev + 1);
      alert("Forbidden action detected. Repeated attempts will end the test.");
    }
  };

  const handleOver = (e) => {
    if (e.screenY < 90 || e.screenY > 725) {
      setAttempts((prev) => prev + 1);
      alert("Don't change tab!!");
    }
  };

  const func1 = () => {
    if (document.visibilityState !== "visible") {
      alert("You tried to change the tab");
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleOver);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("visibilitychange", func1);
    return () => {
      window.removeEventListener("mousemove", handleOver);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("visibilitychange", func1);
    };
  }, []);

  useEffect(() => {
    if (exam.duration) {
      const timer = setInterval(() => {
        if (sec === 0) {
          setSec(59);
          setMin((prev) => prev - 1);
        } else {
          setSec((prev) => prev - 1);
        }
        if (min === 0 && sec === 0) {
          submitAnswer();
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [min, sec]);

  useEffect(() => {
    if (exam.duration) {
      setMin(exam.duration - 1);
      setSec(59);
    }
  }, [exam.duration]);

  return (
    <div className="quiz-screen">
      <div className="quiz-header">
        <h1>{exam.title}</h1>
        <h4>Attempt All Questions</h4>
        <h5>Time left: {`${min} : ${sec}`}</h5>
      </div>
      <hr />
      <Form onSubmit={submitHandler}>
        {exam.multiple.map((question, number) => (
          <div className="quiz-question" key={number}>
            <h4>{`Q.${number + 1} ${question.question}`}</h4>
            <Form.Check
              type="radio"
              id={`option1 ${number}`}
              name={`${number}`}
              value={question.optionA}
              label={question.optionA}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              id={`option2 ${number}`}
              name={`${number}`}
              value={question.optionB}
              label={question.optionB}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              id={`option3 ${number}`}
              name={`${number}`}
              value={question.optionC}
              label={question.optionC}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              id={`option4 ${number}`}
              name={`${number}`}
              value={question.optionD}
              label={question.optionD}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="submit-button">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default QuizScreen;
