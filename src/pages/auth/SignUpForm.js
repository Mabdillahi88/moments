import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Frontend validation
    const newErrors = {};
    if (!username) newErrors.username = ["This field may not be blank."];
    if (!password1) newErrors.password1 = ["This field may not be blank."];
    if (!password2) newErrors.password2 = ["This field may not be blank."];
    if (password1 && password2 && password1 !== password2) {
      newErrors.password2 = ["Passwords do not match."];
    }

    // If there are frontend errors, set them and stop the form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no frontend errors, continue with the backend submission
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      // Capture backend validation errors (e.g., username already exists)
      setErrors(err.response?.data || { general: ["Something went wrong."] });
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={`${styles.Header} text-center text-primary`}>SIGN UP</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                id="username"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert
                key={idx}
                variant="warning"
                className="text-center"
                style={{ backgroundColor: "#FFF3CD", borderRadius: "5px" }}
              >
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                id="password1"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert
                key={idx}
                variant="warning"
                className="text-center"
                style={{ backgroundColor: "#FFF3CD", borderRadius: "5px" }}
              >
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                id="password2"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert
                key={idx}
                variant="warning"
                className="text-center"
                style={{ backgroundColor: "#FFF3CD", borderRadius: "5px" }}
              >
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} mt-3`}
              type="submit"
            >
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert
                key={idx}
                variant="warning"
                className="mt-3 text-center"
                style={{ backgroundColor: "#FFF3CD", borderRadius: "5px" }}
              >
                {message}
              </Alert>
            ))}
            {errors.general?.map((message, idx) => (
              <Alert
                key={idx}
                variant="danger"
                className="mt-3 text-center"
                style={{ borderRadius: "5px" }}
              >
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"}
          alt="Sign Up Illustration"
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
