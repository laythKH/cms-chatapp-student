import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./chatPage.css";

import NavBar from "../../components/NavBar/NavBar";
import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";
import ChatContent from "../../components/ChatContent/ChatContent";
import { useAppContext } from "../../context/appContext";
import axios from "axios";

const ChatPage = () => {
  const [select, setSelect] = useState(false)
  const {selectedChat, setSelectedChat, user, listChats, setListChats} = useAppContext()

  // console.log(`SelectedChat ${selectedChat || 'empty'}`);

  const handleSelected = async (userId) => {
    
    setSelect(!select)

    // console.log(selectedChat);
    // console.log(userId);
    try {
      // setLoadingChat(true)

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.post(`http://127.0.0.1:5000/api/v1/chat`, {userId: userId}, config)

      // console.log(`d ata is ${data}`);

      if(!listChats.find((c) => c._id === data._id)) setListChats([data, ...listChats])

      setSelectedChat(data)
      // stop loading chat
      // console.log(data);

    } catch (error) {
      console.log(error);

      // console.log('eeeeeeeeeeerrrrrrrrrrrorrrrrrrrrrrrr');
    }
  };





  const isMatch = useMediaQuery({
    query: "(min-width: 1000px)",
  });
  return (
    <>
      {(isMatch || !select) && <NavBar />}
      {/* {isMatch && <NavBar changeIcons={changeIcons} />} */}
      <div className='main-container-chatpage'>
        {(isMatch || !select) && (
          <ChatSideBar handleSelected={handleSelected} />
        )}
        {(isMatch || select) && (
          <ChatContent handleSelected={handleSelected} setSelect={setSelect} />
        )}
      </div>
    </>
  );
};

export default ChatPage;
