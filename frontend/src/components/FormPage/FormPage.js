import React, { useState } from "react";
import Login from "./Login";
import Image from "../assets/sign up-07.jpg";
import Alert from "react-bootstrap/Alert";
import "./formPage.css";
import AlertShow from "./AlertShow";
import { Container } from "react-bootstrap";

function FormPage() {
  const [alertText, setAlertText] = useState("");
  const [show, setShow] = useState(false);

  return (
    <Container
      fluid
      className='d-flex'
      style={{
        height: "100vh",
      }}
    >
      <div
        style={{
          minWidth: "450px",
          backgroundColor: "",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "-100px",
          position: "relative",
        }}
      >
        <Login
          alertText={alertText}
          setAlertText={setAlertText}
          setShow={setShow}
        />
        <AlertShow alertText={alertText} show={show} setShow={setShow} />
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <img
          className='largImg'
          src={Image}
          style={{ width: "100%", objectFit: "cover" }}
          alt='imag'
        />
      </div>
    </Container>
  );
}

export default FormPage;
