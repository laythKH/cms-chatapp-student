import React from "react";
import "./Error.css";
import { Container } from "react-bootstrap";
import errorGif from "./dribbble_1.gif";

export default function Error() {
  return (
    <Container className='error'>
      <h1 className='opps'>Oops!</h1>
      <img className='error-img' src={errorGif} alt='icon' />
      <p className='p-error'>THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST.</p>
    </Container>
  );
}
