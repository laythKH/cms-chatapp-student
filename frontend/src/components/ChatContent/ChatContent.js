import React, { useState } from "react";
import "./ChatContent.css";
import Image from "react-bootstrap/Image";
import DarkImage from "./193331.jpg";
import Form from "react-bootstrap/Form";
import Logo from "./193331.jpg";
import { Button, InputGroup, Modal } from "react-bootstrap";
import Sender from "./Sender/Sender";
import { useAppContext } from "../../context/appContext";
import moreInfoIcon from './more-info-icon.svg'

const ChatContent = ({ handleSelected, setSelect}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const { setSelectedChat, selectedChat, user } = useAppContext()
  const [inputValue, setInputValue] = useState("");
  const [messagesObject, setMessagesObject] = useState([
    { id: 0, message: "", img: "", state: "" },
  ]);



  const personInfo = selectedChat?.users[0]._id === user?._id ? selectedChat?.users[1] : selectedChat?.users[0]


  console.log(selectedChat);

  function handelForm(e) {
    e.preventDefault();
    setMessagesObject([
      ...messagesObject,
      {
        id: Math.floor(Math.random() * Date.now()),
        message: inputValue,
        img: Logo,
        state: "sender",
      },
    ]);
    console.log(messagesObject);
    setInputValue("");
  }

  const handleShowMoreInfo = () => {
    setShowMoreInfo(true)
  }
  const handleCloseMoreInfo = () => {
    setShowMoreInfo(false)
  }

  if(!selectedChat) {
    return (
      <h1>Please Select Chat</h1>
    )
  }

  return (
    <>
    <div className={`chat-container`}>
      <div className='chat-header'>
        <div className='back' onClick={() => setSelect(false)}>
          back
        </div>
        <div className='person-info-holder'>
          {/*<Image src={DarkImage} roundedCircle className='image-style' />*/}
          <div className='person-info'>
            { /*!selectedChat?.isGroupChat ? (
             <span>{selectedChat?.users[0]._id === user?._id ? selectedChat?.users[1].name : selectedChat?.users[0].name}</span>
            ) : (
              <span>{selectedChat.chatName}</span>
            )*/}
          </div>
        </div>
        <Image src={moreInfoIcon} style={{width: '30px', height: '30px'}} onClick={handleShowMoreInfo}/>
      </div>
      <div className='chat-content'>
        {messagesObject.map((ele) => {
          return (
            <Sender
              id={ele.id}
              message={ele.message}
              img={ele.img}
              state={ele.state}
            />
          );
        })}
        <Form className='mx-2' onSubmit={handelForm}>
          <InputGroup className='mb-3'>
            <Image src={Logo} roundedCircle alt='icon' />
            <Form.Control
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='write your message...'
              aria-label="Recipient's username"
              aria-describedby='basic-addon2'
            />
            <Button variant='outline-secondary' id='button-addon2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-send'
                viewBox='0 0 16 16'
              >
                <path d='M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z' />
              </svg>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>

    {/* Show More Info For User */}
    {/* Here Show Information About Single User */}
    {
      !selectedChat?.isGroupChat ? (
        <Modal show={showMoreInfo} onHide={handleCloseMoreInfo}>
        <Modal.Header closeButton>
          <Modal.Title>{`${personInfo.name} Info`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>name: {personInfo.email}</h1>
          <h1>name: {personInfo.role}</h1>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      ) : user._id === selectedChat.groupAdmin._id ? (
          <Modal show={showMoreInfo} onHide={handleCloseMoreInfo}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedChat.chatName}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <h4>Members</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '15px' }}>
        { 
          selectedChat.users?.map((singleUser) => (
            <div
              style={{
                backgroundColor: '#fd0d6e', 
                padding: '3px 12px',
                borderRadius: '9px', 
                fontWeight: 600, 
                color: 'white',
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                margin: '3px'
              }}
            >
              <span>{singleUser.name}</span>
              <Image src={Logo} style={{marginLeft: '5px', width: '15px', height: '15px'}}  />
            </div>
          ))
        }
        </div> 
        <h5>Add Friends</h5>
        <div>
          
        </div>
        </Modal.Body>
        <Modal.Footer>
          <h6>Click any where to close</h6>
        </Modal.Footer>
          </Modal>
        ) : (
          <h1>user in Group</h1>
        )
      
    }

    </>
  );
};

// {selectedChat?.users[0]._id === user?._id ? selectedChat?.users[1].name : selectedChat?.users[0].name}

export default ChatContent;


