import React from "react";
import { Container } from "react-bootstrap";
import "./FriendsList.css";
import Message from "./Message/Message";

function FriendsList() {
  return (
    <Container className='h-100 friends-container d-flex'>
      <h4>Messages</h4>
      <ul>
        {/* <Message img="../assets/Dual Ball-1s-200px (1).svg" name="Mario"  /> */}
      </ul>
    </Container>
  );
}

export default FriendsList;
