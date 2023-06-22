import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./chatPage.css";

import NavBar from "../../components/NavBar/NavBar";
import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";
import ChatContent from "../../components/ChatContent/ChatContent";

const ChatPage = () => {
  const [selectedChat, setSelectChat] = useState(false);

  const handleSelected = () => {
    setSelectChat(!selectedChat);
  };

  const isMatch = useMediaQuery({
    query: "(min-width: 1000px)",
  });
  return (
    <>
      {(isMatch || !selectedChat) && <NavBar />}
      {/* {isMatch && <NavBar changeIcons={changeIcons} />} */}
      <div className='main-container-chatpage'>
        {(isMatch || !selectedChat) && (
          <ChatSideBar handleSelected={handleSelected} />
        )}
        {(isMatch || selectedChat) && (
          <ChatContent handleSelected={handleSelected} />
        )}
      </div>
    </>
  );
};

export default ChatPage;
