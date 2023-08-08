import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadingSvg from "./assets/Spinner-1s-200px.svg";
import titleSvg from "./assets/Dual Ball-1s-200px (1).svg";
import "./Login.css";
import { useAppContext } from "../../context/appContext";



function Login({ alertText, setAlertText, setShow }) {
  // const { socket } = useSocketContext()
  const { user, setUser } = useAppContext()
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ stdNumber: "", password: "" });
  const [userCount, setUserCount] = useState(0);
  let navigate = useNavigate();
  const handleChange = (e) => {
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

      // socket.emit('login', { collageNumber: stdNumber, password });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data)
      setLoading(false);

      console.log(data);

      navigate("/");
    } catch (error) {
      setAlertText(error.response?.data?.msg || 'Please Check You Connection')
      setShow(true)
      setLoading(false)
    }
  };


  // useEffect(() => {
  //   // if (socket) {
  //   socket.on('user-count', (count) => {
  //     setUserCount(count);
  //   });
  //   console.log('inside login useEffect socket');

  //   // Clean up the event listener on unmount
  //   return () => {
  //     socket.off('user-count');
  //   };
  //   // }
  // }, [socket]);

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
      {/*userCount === 1 ? <p>1 user online</p> : <p>{userCount} users online</p> */}
    </Card>
  );
}

export default Login;
