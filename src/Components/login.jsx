import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

function Login({ loginUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState("");
  const [retries, setRetries] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if(username.length == 0) {
      showErrorMessageAlert('Username is empty');
      return;
    }
    if(password.length == 0) {
      showErrorMessageAlert('Password is empty.');
      return;
    }
    if (username in retries && retries[username] >= 3)
    {
      showErrorMessageAlert(username + ' is blocked');
      return ;
    }
    if (loginUser(username, password) == false)
    {
      if (username in retries)
      {
        retries[username] += 1;
      }
      else{
        retries[username] = 1;
      }
      setRetries(retries);
      showErrorMessageAlert('Username / Password is incorrect');
      return;
    }
  };

  const showErrorMessageAlert = (message) => {
    setShowErrorAlert(message);
    setTimeout(() => {
      setShowErrorAlert('');
    }, 3000);
  };

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
        <div className="Control">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

export default Login;