import React from "react";

import "./chatPage.css";

import NavBar from "../../components/NavBar/NavBar";
import FriendsList from "../../components/FriendsList/FriendsList";

const ChatPage = () => {
  return (
    <>
      <NavBar />
      <div className='main-container-chatpage'>
        <FriendsList />
        <div>chat</div>
      </div>
    </>
  );
};

export default ChatPage;
