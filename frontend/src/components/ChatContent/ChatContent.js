import React from 'react'
import './ChatContent.css'
import Image from 'react-bootstrap/Image';
import DarkImage from './193331.jpg'

const ChatContent = ({ handleSelected }) => {
   return (
      <div className={`chat-container`}>
         <div className='chat-header'>
            <div className='back' onClick={handleSelected}>back</div>
            <div className='person-info-holder'>
               <Image src={DarkImage} roundedCircle className='image-style' />
               <div className='person-info'>
                  <span>layth kh</span>
                  <span>last seen</span>
               </div>
            </div>
            <span>more info</span>
         </div>
         <div className='chat-content'></div>
      </div>
   )
}

export default ChatContent