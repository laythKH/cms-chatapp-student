import React from "react";
import { Container, Image } from "react-bootstrap";
import "./Messages.css";

function Messages({ message, img, state }) {
  return (
    <>
      {/* <Image className='sender-img' roundedCircle src={img} /> */}
      <Container className={`${state} message-container`}>{message}</Container>
    </>
  );
}

export default Messages;
