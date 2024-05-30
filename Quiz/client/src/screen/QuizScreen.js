import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";

const QuizScreen = () => {
  const [response, setResponse] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const exam = JSON.parse(localStorage.getItem("exam"));
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
    const quesnum = e.target.name;
    const newResponse = response.map((res) =>
      res.quesnum === quesnum ? { ...res, answer } : res
    );
    if (!newResponse.find((res) => res.quesnum === quesnum)) {
      newResponse.push({ quesnum, answer });
    }
    setResponse(newResponse);
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
    <div className="container mx-auto p-6">
      <h1 className="text-center">
        {exam.title}
        <br />
        <span className="text-lg font-bold">Attempt All Questions</span>
        <br />
        <span className="text-sm">
          Time left: {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
        </span>
      </h1>
      <hr className="my-6" />
      <form onSubmit={submitHandler}>
        {exam.multiple.map((question, number) => (
          <div key={number} className="mb-6">
            <h4 className="font-bold">
              Q.{number + 1} {question.question}
            </h4>
            {[question.optionA, question.optionB, question.optionC, question.optionD].map(
              (option, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="radio"
                    id={`option${index + 1}_question${number}`}
                    name={`${number}`}
                    value={option}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor={`option${index + 1}_question${number}`}>{option}</label>
                </div>
              )
            )}
          </div>
        ))}
        <div className="text-center">
          <Button type="submit" variant="primary" className="py-2 px-6 rounded-full">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuizScreen;
