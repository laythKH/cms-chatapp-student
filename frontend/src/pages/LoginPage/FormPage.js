import React from "react";
import Login from "./Login";
import Image from "./assets/sign up-07.jpg";

import "./formPage.css";
import AlertShow from "../../components/Alert/AlertShow";
import { Container } from "react-bootstrap";
import { useAppContext } from "../../context/appContext";

function FormPage() {
  const { showAlert, setShowAlert, alertText, setAlertText } = useAppContext()

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
          setShow={setShowAlert}
        />
        <AlertShow alertText={alertText} show={showAlert} setShow={setShowAlert} />
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
