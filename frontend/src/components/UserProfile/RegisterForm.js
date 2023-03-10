import React, { useRef, useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._!-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = "/auth/signup";

const RegisterForm = ({ setSetAccount }) => {
  const { setAuth, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const nameRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setError("");
  }, [name, email, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = NAME_REGEX.test(name);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setError("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(SIGNUP_URL, { name, email, password });

      const accessToken = response?.data?.accessToken;
      setUser({ email, name, password, accessToken });
      setAuth({ email, name, password, accessToken });
      navigate("/profile");
      // clear input fields
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 409) {
        setError("Username or Email Taken");
      } else {
        setError("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Card className="signUpCards">
      <Card.Body>
        <p
          ref={errRef}
          className={error ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {error}
        </p>
        <Card.Title className="my-4 text-center fw-bold">
          Create new account
        </Card.Title>

        <Form className="text-center" onSubmit={handleSubmit}>
          {/* username */}
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="username"
              ref={nameRef}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
            <label htmlFor="username">
              Username
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !name ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <p
              id="uidnote"
              className={
                nameFocus && name && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              4-24 characters. Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </Form.Floating>

          {/* email */}
          <Form.Floating className="mb-3">
            <Form.Control
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <label htmlFor="email">
              Email address
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              instructions about email - to be changed. Letters, numbers,
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="underscores">_</span>{" "}
              <span aria-label="period">.</span>{" "}
              <span aria-label="dash">-</span>{" "}
              <span aria-label="at symbol">@</span>
            </p>
          </Form.Floating>

          {/* password  */}
          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <label htmlFor="password">
              Password
              <span className={validPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <p
              id="pwdnote"
              className={
                passwordFocus && password && !validPassword
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              8 to 24 characters. Must include uppercase and lowercase letters,
              a number and special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dolar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPassword(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <label htmlFor="confirm_pwd">
              Confirm Password
              <span className={validMatch && matchPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validMatch || !matchPassword ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              Must match the first password input field.
            </p>
          </Form.Floating>
          <Button
            disabled={
              !validName || !validEmail || !validPassword || !validMatch
                ? true
                : false
            }
            className="w-50 my-3"
            variant="secondary"
            type="submit"
          >
            Sign Up
          </Button>
          <Card.Text className="mb-2">
            <Form.Text className="text-muted">
              Already have an account? Login{" "}
              <Link to="/login" className="signUpHere">
                here
              </Link>
              .
            </Form.Text>
          </Card.Text>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RegisterForm;
