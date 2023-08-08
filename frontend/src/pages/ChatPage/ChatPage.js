import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./chatPage.css";

import NavBar from "../../components/NavBar/NavBar";
import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";
import ChatContent from "../../components/ChatContent/ChatContent";
import { useAppContext } from "../../context/appContext";
import axios from "axios";

<<<<<<< HEAD
const ChatPage = ({ handelLang }) => {
  const [select, setSelect] = useState(false);
  const { selectedChat, setSelectedChat, user, listChats, setListChats } =
    useAppContext();
=======
const ChatPage = () => {
  const [select, setSelect] = useState(false)
  const { setSelectedChat, user, listChats, setListChats} = useAppContext()
>>>>>>> 271f4697c73514c20968e78d91e9908bb6054075

  // console.log(selectedChat);

  const handleSelected = async (userId) => {
    setSelect(!select);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `http://127.0.0.1:5000/api/v1/chat`,
        { userId: userId },
        config
      );

      if (!listChats.find((c) => c._id === data._id))
        setListChats([data, ...listChats]);

      setSelectedChat(data);
    } catch (error) {
      console.log(error);
    }
  };

<<<<<<< HEAD
=======

>>>>>>> 271f4697c73514c20968e78d91e9908bb6054075
  const isMatch = useMediaQuery({
    query: "(min-width: 1000px)",
  });
  
  return (
    <>
      {(isMatch || !select) && <NavBar handelLang={handelLang} />}
      {/* {isMatch && <NavBar changeIcons={changeIcons} />} */}
      <div className='main-container-chatpage'>
        {(isMatch || !select) && (
          <ChatSideBar
            handleSelected={handleSelected}
            select={select}
            setSelect={setSelect}
          />
        )}
        {(isMatch || select) && (
          <ChatContent handleSelected={handleSelected} setSelect={setSelect} />
        )}
      </div>
    </>
  );
};

export default ChatPage;
