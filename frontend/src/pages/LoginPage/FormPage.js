import React, { useState } from "react";
import Login from "./Login";
import Image from "./assets/sign up-07.jpg";

import "./formPage.css";
import AlertShow from "./AlertShow";
import { Container } from "react-bootstrap";

function FormPage() {
  const [alertText, setAlertText] = useState("");
  const [show, setShow] = useState(false);

  return (
    <Container
      fluid
      className='FormPage d-flex'
      style={{
        height: "100vh",
      }}
    >
      <div className='subContainer d-flex justify-content-center align-items-center'>
        <Login
          alertText={alertText}
          setAlertText={setAlertText}
          setShow={setShow}
        />
        <AlertShow alertText={alertText} show={show} setShow={setShow} />
      </div>
      <div
        className='largScreenImg d-flex align-items-center'
        style={{ flex: 1 }}
      >
        <img
          className='w-100'
          src={Image}
          style={{ objectFit: "cover" }}
          alt='imag'
        />
      </div>
    </Container>
  );
}

export default FormPage;
