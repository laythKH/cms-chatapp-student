import React, { useEffect, useState } from "react";
import "./ChatSideBar.css";
import CustomButton from "../CustomButton/CustomButton";
// import personImage from "./person.jpg";
import Friend from "../Friend/Friend";
import { useAppContext } from "../../context/appContext";
import AlertShow from "../Alert/AlertShow"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Col } from "react-bootstrap";
import axios from "axios";


const ChatSideBar = ({ handleSelected }) => {
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [searchInputField, setSearchInputField] = useState('')
  const [searchResult, setSearchResult] = useState()
  const { user, setShowAlert, setAlertText, isLoading, setIsLoading, listChats, setListChats } = useAppContext()

  // console.log(user);
  // to the button { addPerson, createGroup }
  const handleClick = () => {
    setAdd(!add);
  };

  // When down seaching it will clear all the field and return it to default values
  const handleClose = () => {
    setShow(false)
    setIsLoading(false)
    setSearchResult(null)
    setSearchInputField('')
  };

  // To display the Modal of adding new Person
  const handleAddPerson = () => {
    setAdd(false)
    setShow(true)
  }

  // Search For New Friends
  const handleSearch = async () => {
    // console.log(searchInputField);
    if (!searchInputField) {
      setAlertText('Please Fill The Field')
      setShowAlert(true)
      // console.log('Please Fill The Field');
      return
    }

    try {
      setIsLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      };
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
      const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/auth?search=${searchInputField}`, config)

      console.log(data);
      setIsLoading(false)
      setSearchResult(data)

    } catch (error) {
      // console.log(error);
      setAlertText('Failed To Get Search Result')
      setShowAlert(true)
    }
  }

  // get All Chats Friends to put it inside the chat List
  const getAllChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      };

      const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/chat`, config)

      console.log(data);
      setListChats(data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAllChats()
  }, [user])

  return (
    <>
      {/* Main ChatSideBar */}
      <div className={`sidebar display-none`}>
        <div className='sidebar-header'>
          <h3>Messages </h3>
          <CustomButton color='rgb(25, 85, 148)' handleClick={handleClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className={`${add} bi bi-caret-down-fill`}
              viewBox='0 0 16 16'
            >
              <path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
            </svg>
          </CustomButton>
        </div>
        <div className='main-btn-holder'>
          <div
            className={
              add ? `btn-holder show-btn-holder` : `btn-holder hide-btn-holder`
            }
          >
            <CustomButton color='rgb(25, 85, 148)' handleClick={handleAddPerson}>Add Person</CustomButton>
            <CustomButton color='rgb(25, 85, 148)'>Create group</CustomButton>
          </div>
        </div>
        <div className='friends-container-holder'>
          <div className='upper-style'></div>
          <div className='down-style'></div>
          <div className='friends-container'>
            {listChats?.map((singleChat) => <Friend singleChat={singleChat} />)}
          </div>
        </div>
      </div>


      {/* here to add Person */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 'bold' }}>Searching For Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center">
            <Col xs={12} md={10} style={{ paddingBottom: '15px' }}>
              <FloatingLabel
                controlId="floatingInput"
                label="Student Number OR Name"
              >
                <Form.Control type="text" value={searchInputField} onChange={(e) => setSearchInputField(e.target.value)} />
              </FloatingLabel>
            </Col>
            <Col xs={12} md={2} style={{ paddingBottom: '15px' }}>
              <Button onClick={handleSearch} variant="secondary" size="lg" style={{ width: '100%', fontWeight: 'bold' }}>
                GO
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <div style={{ maxHeight: '400px', overflowY: 'scroll', padding: '0 20px' }}>
          {isLoading && <h1>Loading...</h1>}
          {(!isLoading && searchResult) && (
            searchResult?.map((singleUserResult) => (
              <Friend 
                key={singleUserResult.name + singleUserResult.studentNumber} 
                singleUserResult={singleUserResult} 
                handleSelected={() => {handleSelected(singleUserResult._id); handleClose()}} 
              />
            ))
          )}
        </div>
        <Modal.Footer style={{ color: 'rgb(25, 85, 148)', fontSize: '14px', fontWeight: 'bold' }}>
          Click Any Where to Close
        </Modal.Footer>
      </Modal>


      {/* Here the alert will be show based on the showAlert & setShowAlert */}
      <AlertShow />

    </>
  );
};

export default ChatSideBar;
