import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ResponseDetail = () => {
  const { exam } = useParams();
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/response/faculty/${exam}`);
        if (response.data) {
          setResults(response.data);
        }
      } catch (error) {
        toast.error("Error in fetching result details");
      }
    };

    fetchResults();
  }, [exam]);

  const handleViewResponse = (response) => {
    setSelectedResponse(response);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResponse(null);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Results Details</h1>
      {results.length > 0 ? (
        results.map((result) => (
          <Card className="mb-4" key={result._id}>
            <Card.Body>
              <Card.Title>Exam Title: {result.examName}</Card.Title>
              <Card.Text>Student ID: {result.name}</Card.Text>
              <Card.Text>Marks Obtained: {result.obtain}/{result.total}</Card.Text>
              <Button onClick={() => handleViewResponse(result.multiple)}>
                View Detailed Response
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Loading...</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detailed Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedResponse && selectedResponse.length > 0 ? (
            selectedResponse.map((item, idx) => (
              <div key={idx} className="mb-4">
                <h5>Question {item.question}</h5>
                <p><strong>Correct Answer:</strong> {item.answer}</p>
                <p><strong>Your Response:</strong> {item.response}</p>
              </div>
            ))
          ) : (
            <p>No detailed responses available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ResponseDetail;
