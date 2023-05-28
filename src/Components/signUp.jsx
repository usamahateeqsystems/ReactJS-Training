import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cnicDocument, setCNICDocument] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState("");

  const handleSubmit = ({ createUser }) => {
    e.preventDefault();
    if(username.length == 0) {
      showErrorMessageAlert('Username is empty');
      return;
    }
    if(password.length == 0) {
      showErrorMessageAlert('Password is empty.');
      return;
    }
    if(password != confirmPassword) {
      showErrorMessageAlert('Password and Confirm password do not match');
      return;
    }
    if(email.length == 0) {
      showErrorMessageAlert('Email is empty');
      return;
    }
    if (validateEmail() == false)
    {
      return ;
    }
    createUser({ username, password, address,email, cnic: cnicDocument });
  };

  const validateEmail = ()  => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return (true)
    }
      showErrorMessageAlert("You have entered an invalid email address!");
      return (false);
  }

  const showErrorMessageAlert = (message) => {
    setShowErrorAlert(message);
    setTimeout(() => {
      setShowErrorAlert('');
    }, 3000);
  };

  return (
    <div className="container row">
      <div className="col-6 mx-auto">
        <h3>Sign Up</h3>
        {showErrorAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
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
          <Form.Group controlId="repassword" className="mt-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="mt-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="address" className="mt-4">
            <Form.Label>Home Address</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Address"
              rows={5}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="cnic" className="mt-4">
            <Form.Label>CNIC Document</Form.Label>
            <Form.Control
              type="file"
              placeholder="CNIC Document"
              value={cnicDocument}
              onChange={(e) => setCNICDocument(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="mt-2">
            Submit
          </Button>
        </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;