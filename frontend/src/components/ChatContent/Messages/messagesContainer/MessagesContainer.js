import React from 'react'

import ScrollableFeed from 'react-scrollable-feed'
import { useAppContext } from '../../../../context/appContext'
import { Image } from 'react-bootstrap'

const MessagesContainer = ({messages}) => {
   const { user } = useAppContext()
   // console.log(messages);
   const isSameSender = (messages, m, i, userId) => {
      return (
         i < messages.length - 1 &&
         (
            messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined
         ) &&
         messages[i].sender._id !== userId
      )
   }

   const isLastMessage = (messages, i, userId) => {
      return (
         i === messages.length - 1  &&
         messages[messages.length - 1].sender._id !== userId  &&
         messages[messages.length - 1].sender._id
      )
   }

   // console.log(messages.length);
   // console.log(messages.length());

   const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);
   if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
   )
      return 33;
   else if (
      (i < messages.length - 1 &&
         messages[i + 1].sender._id !== m.sender._id &&
         messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
   )
      return 0;
   else return "auto";
};

   const isSameUser = (messages, m, i) => {
      return i > 0 && messages[i - 1].sender._id === m.sender._id;
   };

   if(!messages) {
      return <h1>Loading</h1>
   }

  return (
     <ScrollableFeed>
        {messages && messages?.map((message, i) => (
         <div key={message._id} style={{ display: 'flex'}}>
            {(
               (isSameSender(messages,message,i,user._id) ||
               isLastMessage(messages, i, user._id)) && (
                  <Image src={message?.sender.picture} width='30px' roundedCircle style={{marginRight: '3px'}} />
               )
            )}
            <span 
               style={{
                  backgroundColor: `${message?.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'}`,
                  borderRadius: '20px',

                  padding: '5px 15px',
                  maxWidth: '75%',
                  marginLeft: isSameSenderMargin(messages, message, i , user._id),
                  marginTop: isSameUser(messages, message, i) ? '3px' : '20px',
                  display: 'inline-block'
               }}
            >
               {message.content}
            </span>
         </div>
         ))}
      </ScrollableFeed>
  )
}

export default MessagesContainer