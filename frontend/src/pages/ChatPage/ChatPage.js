import React, { useState } from 'react'

import './chatPage.css'

import NavBar from '../../components/NavBar/NavBar'
import ChatSideBar from '../../components/ChatSideBar/ChatSideBar'
import ChatContent from '../../components/ChatContent/ChatContent'

const ChatPage = () => {

   return (
      <>
         <NavBar />
         <div className='main-container-chatpage'>
            <ChatSideBar
            />
            <ChatContent
            />
         </div>

      </>
   )
}

export default ChatPage