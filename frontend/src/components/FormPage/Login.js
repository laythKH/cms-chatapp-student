import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import LoginLogo from "./login.gif";
import "./login.css";

function Login() {
  return (
    <Card
      className='card mt-4 height-auto mb-4'
      style={{ padding: "1rem", zIndex: "10" }}
    >
      <Card.Img className='w-75' src={LoginLogo} />
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
          <Form.Text className='text-muted'>
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>
        <Button
          style={{ backgroundColor: "rgb(116, 174, 255)", border: "none" }}
          type='submit'
        >
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default Login;
