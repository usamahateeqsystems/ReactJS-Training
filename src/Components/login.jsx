import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState("");
  const [showAlert, setShowAlert] = useState("");
  const [retries, setRetries] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email.length == 0) {
      showErrorMessageAlert('Email is empty');
      return;
    }
    if(password.length == 0) {
      showErrorMessageAlert('Password is empty.');
      return;
    }
    if (email in retries && retries[email] >= 3)
    {
      showErrorMessageAlert(email + ' is blocked');
      return ;
    }
    if (props.loginUser(email, password) == false)
    {
      if (email in retries)
      {
        retries[email] += 1;
      }
      else{
        retries[email] = 1;
      }
      setRetries(retries);
      showErrorMessageAlert('Email / Password is incorrect');
      return;
    }
    else{
      showSuccessAlert(email + " logged in successfully");
    }
  };

  const showSuccessAlert = (message) => {
    setShowAlert(message);
    setTimeout(() => {
      setShowAlert('');
    }, 3000);
  };


  const showErrorMessageAlert = (message) => {
    setShowErrorAlert(message);
    setTimeout(() => {
      setShowErrorAlert('');
    }, 3000);
  };

  if (props.userStatus != "signin")
  {

    return (
    <div className="container row">
      <div className="col-6 mx-auto">
        <h3>Login</h3>
        {showErrorAlert && (
          <Alert
            variant="danger"
            dismissible
          >
            {showErrorAlert}
          </Alert>
        )}
        {showAlert && (
          <Alert
            variant="success"
            dismissible
          >
            {showAlert}
          </Alert>
        )}

        <div className="Control">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mt-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="mt-2">
            Login
          </Button>
        </Form>
        </div>
      </div>
    </div>
  );
  }
}

export default Login;