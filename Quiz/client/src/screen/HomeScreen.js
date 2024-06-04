import React, { useEffect ,useState} from "react";
import { Toast, ToastBody, ToastHeader, Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function HomeScreen() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [results, setResults] = useState([{}]);

  useEffect(() => {
    const getResults = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:8080/result/${user._id}`);
          if (response) {
            setResults(response.data);
          }
        } catch (error) {
          toast.error("Error in fetching results");
        }
      }
    };
    getResults();
  }, []);

 
  

  return (
    <Container className="mt-5">
      {!user ? (
        <Container className="text-center p-5 bg-light rounded shadow-sm">
          <h1>ThinkTank: An Online Examination Platform</h1>
          <p className="lead">
            A project trying to use the learned concepts in making real world projects that could really make a difference in the lives of people around us.
          </p>
          <p>
            <strong>by</strong> ADEEB AHMAD & AMIT KUMAR
          </p>
          <p>
            <strong>MOTILAL NEHRU NATIONAL INSTITUTE OF TECHNOLOGY, ALLAHABAD</strong>
          </p>
        </Container>
      ) : (
        <div>
          <Container className="text-center p-5 bg-light rounded shadow-sm mb-4">
            <h1>Welcome to ThinkTank</h1>
            <h3>{user.name}</h3>
          </Container>
          <Container>
            <h2 className="mb-4">Your Results</h2>
            <Row>
              {results && results.map((result, index) => (
                <Col key={index} md={6} lg={4} className="mb-4">
                  <Card>
                    <Card.Header style={{ backgroundColor: "#ffcccc" }}>
                      Exam Title: {result.examName}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        Marks Obtained: {result.score}/{result.maxScore}
                      </Card.Text>
                      <Link to={`/response/student/${result.exam}/${result.student}`}>
                        <Button variant="primary">View Response</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </Container>
  );
}

export default HomeScreen;
