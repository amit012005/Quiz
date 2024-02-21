import React, { useEffect, useState } from "react";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
function HomeScreen() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("front",user._id);
  // const [results, setResults] = useState([{}]);
  
  useEffect(() => {
    const getResults = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:8080/result/${user._id}`,
            {
              _id: user._id,
            }
          );
          if (response) {
            console.log(response);
            const data = JSON.stringify(response.data);
            localStorage.setItem("results", data);
          }
        } catch (error) {
          toast.error("Error in fetching results");
        }
      }
    };
    getResults();
  }, []);
  const results = JSON.parse(localStorage.getItem("results"));
  console.log(results);
  return (
    <div className="container">
      {!user ? (
        <div className="container" style={{ textAlign: "center" }}>
          <br></br>
          <br></br>
          <h1>ThinkTank: An Online Examination Platform</h1>
          <br></br>
          <br></br>
          <em>
            A project,<br></br>
            trying to use the learned concepts in making real world projects
          </em>
          <br></br>
          <strong>
            that could really make a difference in the lives of people around
            us.
          </strong>

          <br></br>
          <br></br>
          <em>by</em>

          <br></br>
          <br></br>
          <strong>AMIT KUMAR</strong>
          <br></br>

          <br></br>
          <br></br>
          <h3>
            MOTILAL NEHRU NATIONAL INSTITUTE<br></br>
            OF TECHNOLOGY<br></br>
            ALLAHABAD<br></br>
            <br></br>
          </h3>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      ) : (
        <div>
          <br />
          <br />
          <div className="container">
            <h1>Hi, Welcome to ThinkTank ...</h1>
            <h3>{user.name}</h3>

            <hr />
          </div>

          <>
            <div className="container">
              <h1>Your Results</h1>

              {results.map((result, index) => (
                <div key={index} className="p-3 bg-secondary my-2 rounded">
                  <Toast>
                    <ToastHeader style={{ backgroundColor: "pink" }}>
                      Exam Title: {result.examName}
                    </ToastHeader>
                    <ToastBody>
                      Marks Obtained: {result.score}/{result.maxScore}
                      <br />
                      <Link to={`/result/${result.exam}/${result.student}`}>
                        <Button style={{ margin: "0px" }}>Response</Button>
                      </Link>
                    </ToastBody>
                  </Toast>
                </div>
              ))}
            </div>
            <br />
            <br />
          </>

          <br />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
