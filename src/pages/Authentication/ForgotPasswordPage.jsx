import React, { useRef, useState } from "react";
import { Row, Col, Form, Card, Alert } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
import * as S from "../../sharedStyle";

const ForgotPasswordPage = () => {
  const emailRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { resetPassword } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);

      setLoading(false);
      emailRef.current.value = "";
      setMessage("Password reset email sent!");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      // ..
    }
  };

  return (
    <div className="heigh100">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="text-center">
            <h2>Forgot password?</h2>
            <p className="pt-5 fw-bold fs-5">
              We'll email you instructions on how to reset it
            </p>
          </div>
          <Card>
            <Card.Body>
              {message && (
                <Alert variant="success" className="mb-3">
                  {message}
                </Alert>
              )}

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <div className="d-flex flex-column align-items-center">
                  <S.ButtonSolid disabled={loading} type="submit">
                    Reset password
                  </S.ButtonSolid>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPasswordPage;
