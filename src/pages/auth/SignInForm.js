import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import axios from "axios"; // Assuming you're using Axios for API requests

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

function SignInForm() {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  // Handle form input changes
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Frontend validation
    const newErrors = {};
    if (!username) newErrors.username = ["This field may not be blank."];
    if (!password) newErrors.password = ["This field may not be blank."];

    // If there are frontend errors, stop the form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Backend request
    try {
      await axios.post("/dj-rest-auth/login/", signInData); // Adjust URL for login API
      history.push("/"); // Redirect to home or dashboard on successful login
    } catch (err) {
      // Capture backend validation errors
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: ["Something went wrong. Please try again later."] });
      }
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Sign In</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className={styles.Input}
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

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className={styles.Input}
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
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
              Sign In
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
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
          alt="Sign In Illustration"
        />
      </Col>
    </Row>
  );
}

export default SignInForm;
