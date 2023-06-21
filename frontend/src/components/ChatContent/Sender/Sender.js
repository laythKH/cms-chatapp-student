import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Messages from "../Messages/Messages";
import "./Sender.css";
function Sender({ id, message, img, state }) {
  return (
    <Container className={`sender-container ${state}`}>
      <Messages message={message} img={img} state={state} />
    </Container>
  );
}

export default Sender;
