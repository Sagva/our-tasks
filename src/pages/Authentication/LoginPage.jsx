import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import * as S from "./style";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // try to login the user with the specified credentials
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(`/`);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="text-center pt-5">
            <h2>Welcome to OurTask</h2>
            <span>Project managment system</span>
            <p className="pt-5 fw-bold fs-5">
              Please log in to see and create your projects
            </p>
          </div>
          <Card>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <div className="d-flex flex-column align-items-center">
                  <S.ButtonOutline disabled={loading} type="submit">
                    Log In
                  </S.ButtonOutline>

                  <S.ButtonSolid>
                    <Link to={`/signup`}>Register</Link>
                  </S.ButtonSolid>
                </div>
              </Form>

              <div className="text-center mt-3">
                <Link to={`/forgot-password`}>Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
