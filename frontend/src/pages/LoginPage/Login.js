import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadingSvg from "./assets/Spinner-1s-200px.svg";
import titleSvg from "./assets/Logo.png";
import "./Login.css";
import { useAppContext } from "../../context/appContext";

function Login({ alertText, setAlertText, setShow, handelLang, lang }) {
  const { t, user, setUser } = useAppContext();
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
      setUser(data);
      setLoading(false);

      console.log(data);

      navigate("/");
    } catch (error) {
      setAlertText(error.response?.data?.msg || "Please Check You Connection");
      setShow(true);
      setLoading(false);
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
      <div
        onClick={handelLang}
        style={{
          justifySelf: "flex-start",
          backgroundColor: "rgb(116, 174, 255)",
          padding: "7px 10px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        <svg
          style={{ marginRight: "6px" }}
          xmlns='http://www.w3.org/2000/svg'
          width='26'
          height='26'
          fill='currentColor'
          className='bi bi-translate'
          viewBox='0 0 16 16'
        >
          <path d='M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z' />
          <path d='M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z' />
        </svg>
        {lang ? "AR" : "EN"}
      </div>
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
            {t("Login.title")}
          </h3>
          <img
            style={{ margin: "0px 6px" }}
            src={titleSvg}
            width='90px'
            alt='alert'
          />
        </div>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>{t("Login.stdNum")}</Form.Label>

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
          <Form.Label>{t("Login.password")}</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            placeholder={t("Login.password")}
            className='stdPass'
          />
          <Form.Text className='text-muted'>{t("Login.txt")}</Form.Text>
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
          {t("Login.btn")}
          {loading && <img src={loadingSvg} width='40px' alt='alert' />}
        </Button>
      </Form>
      {/*userCount === 1 ? <p>1 user online</p> : <p>{userCount} users online</p> */}
    </Card>
  );
}

export default Login;
