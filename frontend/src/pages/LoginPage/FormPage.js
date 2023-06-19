import React, { useState } from "react";
import Login from "./Login";
import Image from './assets/sign up-07.jpg';

import './formPage.css'
import AlertShow from "./AlertShow";



function FormPage() {
  const [alertText, setAlertText] = useState('')
  const [show, setShow] = useState(false)

  return (
    <div
      style={{
        backgroundColor: "",
        height: "100vh",
        display: 'flex',
      }}
    >
      <div style={{
        minWidth: '450px',
        backgroundColor: '',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: '-100px',
        position: 'relative'
      }}
      >
        <Login alertText={alertText} setAlertText={setAlertText} setShow={setShow} />
        <AlertShow alertText={alertText} show={show} setShow={setShow} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <img src={Image} style={{ width: '100%', objectFit: 'cover' }} alt="imag" />
      </div>
    </div>
  );
}

export default FormPage;
