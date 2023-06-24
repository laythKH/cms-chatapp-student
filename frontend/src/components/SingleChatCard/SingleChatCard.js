import React from 'react'
import { Image } from 'react-bootstrap';
import { useAppContext } from '../../context/appContext';


const SingleChatCard = ({ singleChat, setSelect }) => {
   const { user, selectedChat, setSelectedChat } = useAppContext();
   const { isGroupChat, chatName, users, _id } = singleChat;


   const getSender = () => {
      return users[0]._id === user._id ? users[1].name : users[0].name;
   }

   const selectedChatStyle = {
       border: '2px dotted #195594',
      color: '#195594'
   }

   const handleSelectChat = () => {
      setSelectedChat(singleChat)
      setSelect(true)
   }

   return (
    <div className='single-card' style={selectedChat?._id === _id ? selectedChatStyle : {}} onClick={handleSelectChat} >
      <Image
        src={"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
        roundedCircle
        style={{ width: "60px", height: "60px" }}
      />
      <div className='title'>
        <h2>{!isGroupChat ? getSender() : chatName}</h2>
        <h6> asdasd</h6>
      </div>
    </div>
  );

}

export default SingleChatCard