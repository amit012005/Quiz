import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ResultDetail() {
  const { exam, student } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        console.log("Fetching result for exam:", exam, "and student:", student);
        
        const response = await axios.get(`http://localhost:8080/response/student/${exam}/${student}`);
        
        console.log("API Response:", response);
        if (response.data.length) {
          console.log("Response Data:", response.data);
          setResult(response.data);
        } else {
          console.log("No data received from API");
        }
      } catch (error) {
        toast.error("Error in fetching result details");
      }
    };

    fetchResult();
  }, [exam, student]);

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Result Details</h1>
      {result ? (
        <Card>
          <Card.Body>
            <Card.Title>Exam Title: {result[0].examName}</Card.Title>
            <Card.Text>
              Marks Obtained: {result[0].obtain}/{result[0].total}
            </Card.Text>
            <div className="mt-4">
              <h5>Question Details</h5>
              {result[0].multiple.map((item, index) => (
                <div key={index} className="mb-3 p-3 border rounded">
                  <strong>Question {item.question}:</strong>
                  <p>Correct Answer: {item.answer}</p>
                  <p>Your Response: {item.response}</p>
                </div>
              ))}
            </div>
            <Button variant="primary" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default ResultDetail;
