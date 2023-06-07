import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cnicDocument, setCNICDocument] = useState("");
  const [showAlert, setShowAlert] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name.length == 0) {
      showErrorMessageAlert('Name is empty');
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
      showErrorMessageAlert("You have entered an invalid email address!");
      return ;
    }
    if (props.createUser({ name, password, address, email, cnic: cnicDocument }) == false)
    {
      showErrorMessageAlert('Email already exists');
      return ;
    }
    else{
      showSuccessAlert(email + " created successfully");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const validateEmail = ()  => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return (true)
    }
      return (false);
  }

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

  if(props.userStatus == "signin")
  {
    return (
      <div className="container row">
        <div className="col-6 mx-auto">
          <h3>Sign Up</h3>
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
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
}

export default SignUp;