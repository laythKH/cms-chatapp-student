import React, { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import "./ChatContent.css";
import Image from "react-bootstrap/Image";
import DarkImage from "./193331.jpg";
import Form from "react-bootstrap/Form";
import Logo from "./193331.jpg";
import { Button, Col, FloatingLabel, InputGroup, Modal, Row } from "react-bootstrap";
import Sender from "./Sender/Sender";
import { useAppContext } from "../../context/appContext";
import moreInfoIcon from './more-info-icon.svg'
import Friend from '../Friend/Friend'
import Lottie from 'lottie-react';
import typingLoading from '../../animations/typing.json'
import plusSVG from './plus-white.svg'
import xSvg from './x-white.svg'
import backArrow from './back-arrow.svg'
import axios from "axios";
import MessagesContainer from "./Messages/messagesContainer/MessagesContainer";

import AlertShow from '../Alert/AlertShow'

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const ChatContent = ({ handleSelected, setSelect}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const { setSelectedChat, selectedChat, user, setRefetch, refetch, setAlertText, setShowAlert, showAlert } = useAppContext()
  const [searchInputAddFriendGroup, setSearchInputAddFriendGroup] = useState('')
  const [changeGroupName, setChangeGroupName] = useState('')
  const [searchResultAddFriend, setSearchResultAddFriend] = useState([])

  // Send Messages States
  const [inputMessageValue, setInputMessageValue] = useState("");
  const [messages, setMessages] = useState([])
  
  // Socket.io
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false) 

  const personInfo = selectedChat?.users[0]._id === user?._id ? selectedChat?.users[1] : selectedChat?.users[0]

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', user?._id)
    socket.on('connected', () => setSocketConnected(true))
    socket.on('typing', () => setIsTyping(true))
    socket.on('stop typing', () => setIsTyping(false))
  }, [user])

  useEffect(() => {
    console.log(`FetchAllMessages UseEffect`);
    fetchAllMessages()
    
    selectedChatCompare = selectedChat
  }, [selectedChat])

  useEffect(() => {
    socket.on('message received', (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // Notification
      } else {
        console.log('=======================================');
        console.log(messages);
        console.log('=======================================');
        const newMessageGroup = [...messages, newMessageRecieved]
        console.log(newMessageGroup);
        setMessages(() => newMessageGroup);
      }
    });
  });

  
  const handleShowMoreInfo = () => {
    setShowMoreInfo(true)
  }

  const handleCloseMoreInfo = () => {
    setShowMoreInfo(false)
    setSearchInputAddFriendGroup('')
    setSearchResultAddFriend([])
    setChangeGroupName('')
  }

  const handleSearchGroupMembers = async (query) => {
    setSearchInputAddFriendGroup(query)
    if(!query) {
      return
    }
    try {
      // loading
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      };
      const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/auth?search=${searchInputAddFriendGroup}`, config)
      // console.log(data);
      setSearchResultAddFriend(data)

    } catch (error) {
      console.log('Hello dsfsdfsfsd');
      console.log(error);
    }
  }

  const handleAddPerson = async (singleUser) => {
    if(selectedChat?.users?.some(u => u._id === singleUser._id)) {
      console.log('User Already Exists');
      setAlertText('User Already Exists')
      setShowAlert(true)
      return
    }
    // console.log(singleUser);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      };
      
      const { data } = await axios.put(
        `http://127.0.0.1:5000/api/v1/chat/groupadd`, 
        {userId: singleUser._id, chatId: selectedChat._id}, 
      config
    )
    setSelectedChat(data)
    setSearchInputAddFriendGroup('')
    setSearchResultAddFriend([])
    setRefetch(!refetch)

    } catch (error) {
      setAlertText('Field To Add Friend Try again later')
      console.log('Field To Add Friend Try again later');
      setShowAlert(true)
    }

  }

  const removeFromGroup = async (singleUser) => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
    };

    const { data } = await axios.put(
      `http://127.0.0.1:5000/api/v1/chat/groupremove`, 
      {userId: singleUser._id, chatId: selectedChat._id}, 
      config
    )
    console.log('remove Person Done');
    console.log(data);
    setSelectedChat(data)
    singleUser._id === user._id ? setSelectedChat() : setSelectedChat(data);
    setRefetch(!refetch)
    } catch (error) {
     setAlertText('Failed To Remove Check Your conn or try again ')
     setShowAlert(true)
     console.log(error);
    }
  }

  const handleChangeGroupName = async () => {
    if(!changeGroupName) {
      setAlertText('please Input The new Name')
      console.log("please Input The new Name");
      setShowAlert(true)
      return
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
    };

    const { data } = await axios.put(
      `http://127.0.0.1:5000/api/v1/chat/rename`, 
      {chatName: changeGroupName, chatId: selectedChat._id}, 
      config
    )
    
    setSelectedChat(data)
    setRefetch(!refetch)
    } catch (error) {
      setAlertText('Failed To Change Group Name Try Again')
      console.log(error);
      setShowAlert(true)
    }
  }

  const fetchAllMessages = async () => {
    if(!selectedChat) {
      return
    }

    try {
      const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
      };

      const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/message/${selectedChat._id}`, config)

      setMessages(data)

      // console.log(data);
      setMessages(data)

      socket.emit('join chat', selectedChat._id)

    } catch (error) {
      setAlertText('display Occured')
      showAlert(true)
      console.log('display Occured');
    }
  }

  const sendMessage = async (e) => {
    if(e.key === 'Enter' && inputMessageValue) {
      e.preventDefault();
      console.log('Enter');
      socket.emit('stop typing', selectedChat._id)
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          'http://127.0.0.1:5000/api/v1/message',
          {content: inputMessageValue, chatId: selectedChat._id},
          config
        )

        setInputMessageValue('')
        // console.log('==================================');
        // console.log(`new Message`);
        // console.log(data);
        // console.log('==================================');
        socket.emit('new message', data)
        const updatedMessages = [...messages, data];
        setMessages(updatedMessages)

        // console.log(data);

      } catch (error) {
        console.log(error.message);
        console.log('Failed To Load The message');
        setAlertText('Failed To Load The message try again')
        showAlert(true)
      }

    } 
  }

  const inputMessageHandler = (e) => {
    setInputMessageValue(e.target.value)
    // console.log(inputMessageValue);

    if(!socketConnected) return

    if(!typing) {
      setTyping(true)
      socket.emit('typing', selectedChat._id)
    }
    let lastTypingTime = new Date().getTime()
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime()
      var timeDiff = timeNow - lastTypingTime

      if(timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id)
        setTyping(false)
      }
    }, timerLength)
  }

  const deleteChat = async () => {

    try {
      const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

      const { data } = await axios.post(
        'http://127.0.0.1:5000/api/v1/chat/removechat',
        {chatId: selectedChat._id},
        config
      )
      
      if(data.deleteResult.deletedCount) {
        setSelectedChat()
        setRefetch(!refetch)
      }

    } catch (error) {
      console.log('Error accoured');
    }
  }

  const getUserName = () => {
    const name = selectedChat?.users[0]?._id === user?._id ? selectedChat?.users[1]?.name : selectedChat?.users[0]?.name
    if(!name) {
      return 'Null'
    } else {
      return name
    }
  }
  

  if(!selectedChat) {
    return (
      <div style={{flex: 1,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h3>Select Chat Or Add Friend to Start Chat</h3>
      </div>
    )
  }

  return (
    <>
    <div className={`chat-container`}>
      <div className='chat-header'>
        <div className='back' onClick={() => setSelect(false)}>
          <Image src={backArrow} width='30px' height='30px' />
        </div>
        <div className='person-info-holder'>
          {/*<Image src={DarkImage} roundedCircle className='image-style' />*/}
          <div className='person-info'>
            {!selectedChat?.isGroupChat ? (
             <span>{getUserName}</span>
            ) : (
              <span>{selectedChat.chatName}</span>
            )}
          </div>
        </div>
        <Image src={moreInfoIcon} style={{width: '30px', height: '30px'}} onClick={handleShowMoreInfo}/>
      </div>
      <div className='chat-content'>
        <MessagesContainer messages={messages} />
       {isTyping 
          ? <Lottie 
              style={{width: '100px'}}
              animationData={typingLoading}
            />
          : (<></>)
        }
      </div>
      <div style={{padding: '16px 20px' }}>
        <Form 
          onKeyDown={sendMessage}
          style={{ bottom: '20px'}}>
          <InputGroup>
            <Image src={Logo} roundedCircle alt='icon' />
            <Form.Control
              value={inputMessageValue}
              onChange={(e) => inputMessageHandler(e)}
              placeholder='write your message...'
              aria-label="Recipient's username"
              aria-describedby='basic-addon2'
            />
            <Button variant='outline-secondary' id='button-addon2' style={{backgroundColor: 'rgb(25, 85, 148)', padding: '0 20px'}}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.11 13.6501L13.69 10.0601" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </Button>
          </InputGroup>
      </Form>
      </div>
    </div>



    {/* Show More Info For User */}
    {
      !selectedChat?.isGroupChat ? ( //! If Not Group
        <Modal show={showMoreInfo} onHide={handleCloseMoreInfo}>
        <Modal.Header closeButton>
          <Modal.Title>{`${personInfo.name} Info`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>name: {personInfo.email}</h1>
          <h1>name: {personInfo.role}</h1>
        </Modal.Body>
        <Modal.Footer 
          style={{
              display: 'flex', 
              justifyContent: 'center', 
              backgroundColor: '#f44336', 
              cursor: 'pointer'
            }}
        >
          <h4 style={{ fontSize: '18px', color: 'white', fontWight: 900, letterSpacing: '5px', padding: 0, margin: 0}} onClick={() => deleteChat()}>Delete Chat</h4>
        </Modal.Footer>
        </Modal>
      ) : user._id === selectedChat.groupAdmin._id ? ( //! if group admin
          <Modal show={showMoreInfo} onHide={handleCloseMoreInfo} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{selectedChat.chatName}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              {/* ==== Group Members ===== */}
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
                    <Image src={xSvg} style={{marginLeft: '5px', cursor: 'pointer'}} onClick={() => removeFromGroup(singleUser)}  />
                  </div>
                ))
              }
              </div> 
              {/* ==== Change Group Name ==== */}
              <div>
                <h5>Change Group Name</h5>
                <Row className="align-items-center">
                  <Col xs={12} md={10} style={{ paddingBottom: '15px' }}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Student Number OR Name"
                    >
                      <Form.Control type="text" value={changeGroupName} onChange={(e) => setChangeGroupName(e.target.value)}  />
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} md={2} style={{ paddingBottom: '15px' }}>
                    <Button size="lg" style={{ width: '100%', fontWeight: 'bold', backgroundColor: '#f44336', cursor: 'pointer' }} onClick={handleChangeGroupName}>
                      SET
                    </Button>
                  </Col>
                </Row>
              </div>
              {/* ==== Add New People To Group ==== */}
              <div>
                <h5>Add Friends</h5>
                <FloatingLabel controlId="floatingInput" label="Add Users">
                <Form.Control type="text" value={searchInputAddFriendGroup} onChange={(e) => handleSearchGroupMembers(e.target.value)} />
                </FloatingLabel>
              </div>
              {/* ====== Search Result Here ====== */}
              <div style={{ maxHeight: '250px', overflowY: 'scroll', padding: '0 20px' }}>
                {searchResultAddFriend && (
                  searchResultAddFriend.map((singleUserResult) => (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                    <Friend 
                      key={singleUserResult.name + singleUserResult.studentNumber} 
                      singleUserResult={singleUserResult}  
                      isGroupCard={true}
                    />
                    <Button style={{marginLeft: '10px', borderRadius: '50%', padding: '5px',}} onClick={() => handleAddPerson(singleUserResult)}>
                      <Image src={plusSVG} roundedCircle width="25px" height="25px" />
                    </Button>
                    </div>
                  ))
                )}
              </div>
            </Modal.Body>
            <Modal.Footer style={{display: 'flex', justifyContent: 'center', backgroundColor: '#f44336', cursor: 'pointer'}}>
              <h4 style={{ fontSize: '18px', color: 'white', fontWight: 900, letterSpacing: '5px', padding: 0, margin: 0}}>Leave Group</h4>
            </Modal.Footer>
          </Modal>
        ) : ( //! if person in group but not admin
          <Modal show={showMoreInfo} onHide={handleCloseMoreInfo} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title style={{textTransform: 'capitalize'}}>{selectedChat.chatName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ maxHeight: '550px', overflowY: 'scroll', padding: '0 20px' }}>
                {selectedChat && (
                  selectedChat?.users.map((singleUserResult) => (
                    <Friend 
                      key={singleUserResult.name + singleUserResult.studentNumber} 
                      singleUserResult={singleUserResult}  
                      isGroupCard={true}
                    />
                  ))
                )}
              </div>
            </Modal.Body>
             <Modal.Footer style={{display: 'flex', justifyContent: 'center', backgroundColor: '#f44336', cursor: 'pointer'}}  onClick={() => removeFromGroup(user)}>
              <h4 style={{ fontSize: '18px', color: 'white', fontWight: 900, letterSpacing: '5px', padding: 0, margin: 0}}>Leave Group</h4>
            </Modal.Footer>
          </Modal>
        )
    }

    <AlertShow />
    
    </>
  );
};

// {selectedChat?.users[0]._id === user?._id ? selectedChat?.users[1].name : selectedChat?.users[0].name}

export default ChatContent;


