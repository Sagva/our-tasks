import React, { useRef, useState } from "react";
import { Row, Col, Form, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import * as S from "../../sharedStyle";
import { updateProfile } from "firebase/auth";

const SignupPage = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // make sure user has entered the same password in both input fields
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("The passwords does not match");
    }

    setError(null);

    // try to sign up the user with the specified credentials
    try {
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      navigate(`${process.env.PUBLIC_URL}/projects`);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="text-center">
            <h2>Welcome to OurTask</h2>
            <span>Project managment system</span>
            <p className="pt-5 fw-bold fs-5">
              Please register an account or log in to see and create your
              projects
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
                <Form.Group id="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" ref={nameRef} required />
                </Form.Group>

                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Form.Group id="password-confirm" className="mb-3">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>

                <div className="d-flex flex-column align-items-center">
                  <S.ButtonOutline disabled={loading} type="submit">
                    Register
                  </S.ButtonOutline>
                  <S.ButtonSolid>
                    <Link to={`${process.env.PUBLIC_URL}/login`}>Log In</Link>
                  </S.ButtonSolid>
                </div>
              </Form>

              <div className="text-center mt-3">
                <Link to={`${process.env.PUBLIC_URL}/forgot-password`}>Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SignupPage;
