import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import LoginLogo from "../assets/login.gif";
import "./login.css";
import { useState } from "react";


function Login() {
  const [values, setValues] = useState({ stdNumber: '', password: '' })

  const handleChange = (e) => {
    // console.log(e);
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { stdNumber, password } = values
    if (!stdNumber || !password) {
      return
    }



    console.log(values);
  }




  return (
    <Card
      className='card mt-4 height-auto mb-4'
      style={{ padding: "1rem", zIndex: "10" }}
    >
      <Card.Img className='w-75' src={LoginLogo} />
      <Form noValidate onSubmit={onSubmit}>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Student Number</Form.Label>
          <Form.Control
            type='email'
            name="stdNumber"
            value={values.stdNumber}
            onChange={handleChange}
            placeholder='000000000'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder='Password'
          />
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
