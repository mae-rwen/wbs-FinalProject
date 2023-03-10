import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { Card } from "react-bootstrap";
import { useRef, useState, useEffect, useContext } from "react";

import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/auth/login";

export default function LogInForm() {
  const { setAuth, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, { email, name, password });
      setUser(response.data);
      setName(response?.data?.name);

      const accessToken = response?.data?.accessToken;
      setAuth({ email, name, password, accessToken });
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
        // Perform login logic here and redirect to another page
        navigate(from, { replace: true });
      }, 1000);
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Missing Username/Email or Password");
      } else if (err.response?.status === 401) {
        setError("Unauthorized! check your email or password");
      } else if (err.response.status === 404) {
        setError("No account associated with the username/email address");
      } else {
        setError("Login Failed");
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
          Login to your account
        </Card.Title>

        <Form className="text-center" onSubmit={handleSubmit}>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="email">Email</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              id="pwd"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <label htmlFor="pwd">Password</label>
          </Form.Floating>

          {isClicked ? (
            <Button className="w-50 my-3" variant="secondary">
              <Spinner animation="border" size="sm" />
            </Button>
          ) : (
            <Button className="w-50 my-3" variant="secondary" type="submit">
              Login
            </Button>
          )}

          <Card.Text className="mb-2">
            <Form.Text className="text-muted">
              No account yet? Register{" "}
              <Link to="/register" className="signUpHere">
                here
              </Link>
              .
            </Form.Text>
          </Card.Text>
        </Form>
      </Card.Body>
    </Card>
  );
}
