import React from "react";
import "./Error.css";
import { Container } from "react-bootstrap";
import errorGif from "../assets/dribbble_1.gif";

export default function Error() {
  return (
    <Container className='error'>
      <h1>Oops!</h1>
      <img className='error-img' src={errorGif} alt='icon' />
      <p>THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST.</p>
    </Container>
  );
}
