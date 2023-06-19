import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadingSvg from "./assets/Spinner-1s-200px.svg";
import titleSvg from "./assets/Dual Ball-1s-200px (1).svg";
import "./Login.css";

function Login({ alertText, setAlertText, setShow }) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ stdNumber: "", password: "" });
  let navigate = useNavigate();
  const handleChange = (e) => {
    // console.log(e);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const { stdNumber, password } = values;
    if (!stdNumber || !password) {
      setAlertText("Please fill all fields");
      setShow(true);
      setLoading(false);
      console.log("please fill all fields");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/v1/auth/login",
        { studentNumber: stdNumber, password },
        config
      );
      console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);

      navigate("/home");
    } catch (error) {
      console.log(error.response.data.msg);
      // show alert for error message
      // stop loading
      setAlertText(error.response.data.msg);
      setShow(true);
      setLoading(false);
    }
  };

  return (
    <Card
      className=' mt-5'
      style={{ padding: "40px 20px", width: "90%", height: "500px" }}
    >
      <Form noValidate onSubmit={onSubmit}>
        <div className='title d-flex justify-content-center align-items-center'>
          <h3
            style={{
              textAlign: "center",
              fontWeight: 800,
              fontSize: "35px",
              marginRight: "7px",
            }}
          >
            Welcome Back
          </h3>
          <img src={titleSvg} width='90px' alt='alert' />
        </div>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Student Number</Form.Label>
          <Form.Control
            type='email'
            name='stdNumber'
            value={values.stdNumber}
            onChange={handleChange}
            placeholder='000000000'
            className='stdId'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            placeholder='Password'
            className='stdPass'
          />
          <Form.Text className='text-muted'>
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>
        {/*<Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>*/}
        <Button
          className='w-100 d-flex justify-content-center align-items-center'
          style={{
            backgroundColor: "rgb(116, 174, 255)",
            border: "none",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "7px 0 7px 0",
          }}
          type='submit'
        >
          Login
          {loading && <img src={loadingSvg} width='40px' alt='alert' />}
        </Button>
      </Form>
    </Card>
  );
}

export default Login;
