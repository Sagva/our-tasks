import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { QueryClient, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const LogoutPage = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(async () => {
    await logout();
    queryClient.removeQueries("projects");
    navigate(`/login`);
  }, []);

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Log Out</Card.Title>

              <Card.Text>
                Please wait while you're being logged out...
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LogoutPage;
