import React, { useEffect, useState } from "react";
import "./ChatSideBar.css";
import CustomButton from "../CustomButton/CustomButton";
import plusSVG from "./plus-white.svg";
import xSvg from "./x-white.svg"
import Friend from "../Friend/Friend";
import SingleChatCard from "../SingleChatCard/SingleChatCard";
import { useAppContext } from "../../context/appContext";
import AlertShow from "../Alert/AlertShow"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Col, Image } from "react-bootstrap";
import axios from "axios";


const ChatSideBar = ({ handleSelected, setSelect }) => {
  const [add, setAdd] = useState(false);

  // This States For Add Friend Or Person
  const [showAddSingleUser, setShowAddSingleUser] = useState(false);
  const [searchInputField, setSearchInputField] = useState('')
  const [searchResult, setSearchResult] = useState()

  // This States For Creating Group 
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [selectUsersGroup, setSelectedUsersGroup] = useState([]);
  const [groupNameInput, setGroupNameInput] = useState('');
  const [searchGroup, setSearchGroup] = useState('');
  const [searchResultGroup, setSearchResultGroup] = useState([])


  const { user, setShowAlert, setAlertText, isLoading, setIsLoading, listChats, setListChats, refetch } = useAppContext()

  const handleClick = () => {
    setAdd(!add);
  };

  // When down seaching it will clear all the field and return it to default values
  const handleCloseAddPerson = () => {
    setShowAddSingleUser(false)
    setIsLoading(false)
    setSearchResult(null)
    setSearchInputField('')
  };

  const handleCloseCreateGroup = () => {
    setShowCreateGroup(false)
    setSearchResultGroup([])
    setSearchGroup('')
    setSelectedUsersGroup([])
  }

  // To display the Modal of adding new Person
  const handleAddPerson = () => {
    setAdd(false)
    setShowAddSingleUser(true)
  }

  // Show The Model Of Creating A Group
  const handleCreateGroup = () => {
    setAdd(false)
    setShowCreateGroup(true)
  }

  // Here searching for group members
  const handleSearchGroupMembers = async (query) => {
    setSearchGroup(query)
    if(!query) {
      return
    }
    // console.log(searchGroup);
    try {
      // loading
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      };
      // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
      const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/auth?search=${searchGroup}`, config)
      // console.log(data);
      setSearchResultGroup(data)

    } catch (error) {
      console.log('Hello dsfsdfsfsd');
      console.log(error);
    }
  }

  // Here we are submit create a group
  const handleSubmitCreateGroup = async () => {
    if(!groupNameInput || !selectUsersGroup) {
      console.log('please fill all the fields');
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(groupNameInput);
      console.log(selectUsersGroup);
      console.log('=====================');

      const { data } = await axios.post(
        `http://127.0.0.1:5000/api/v1/chat/group`, 
        {
          name: groupNameInput, 
          users: JSON.stringify(selectUsersGroup.map((u) => u._id)) 
        }, 
        config
      )

      console.log('===========================');

      setListChats([data, ...listChats])

      handleCloseCreateGroup()

    } catch (error) {
      console.log(error);
    }
  }

  // Search For New Friends
  const handleSearch = async () => {
    if (!searchInputField) {
      setAlertText('Please Fill The Field')
      setShowAlert(true)
      return
    }

    try {
      setIsLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      };
      const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/auth?search=${searchInputField}`, config)

      setIsLoading(false)
      setSearchResult(data)

    } catch (error) {
      // console.log(error);
      setAlertText('Failed To Get Search Result')
      setShowAlert(true)
    }
  }

  const handleAddPersonToSelectUsersGroup = (addedUser) => {
    if(selectUsersGroup.includes(addedUser)) {
      console.log('User Already exists');
      return
    }

    setSelectedUsersGroup([...selectUsersGroup, addedUser])

    console.log(selectUsersGroup);
  }

  const handleDeleteSelectUserGroup = (singleUser) => {
    setSelectedUsersGroup(selectUsersGroup.filter((e) => e._id !== singleUser._id))
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

      // console.log(data);
      setListChats(data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAllChats()
  }, [user, refetch])

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
            <CustomButton color='rgb(25, 85, 148)' handleClick={handleCreateGroup}>Create group</CustomButton>
          </div>
        </div>
        <div className='friends-container-holder'>
          <div className='upper-style'></div>
          <div className='down-style'></div>
          <div className='friends-container'>
            {listChats.map((singleChat) => <SingleChatCard singleChat={singleChat}  setSelect={setSelect} />)}
          </div>
        </div>
      </div>


      {/* here to add Person */}
      <Modal show={showAddSingleUser} onHide={handleCloseAddPerson}>
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
                handleSelected={() => {handleSelected(singleUserResult._id); handleCloseAddPerson()}} 
                isGroupCard={false}
              />
            ))
          )}
        </div>
        <Modal.Footer style={{ color: 'rgb(25, 85, 148)', fontSize: '14px', fontWeight: 'bold' }}>
          Click Any Where to Close
        </Modal.Footer>
     </Modal>


      {/* here to Create Group */}
      <Modal show={showCreateGroup} onHide={handleCloseCreateGroup} >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 'bold' }}>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding: '20px 20px 0 20px'}}>
          <Row className="align-items-center">
            <Col style={{ paddingBottom: '15px' }}>
              <FloatingLabel
                controlId="floatingInput"
                label="Group Name"
              >
                <Form.Control style={{marginBottom: '15px'}} type="text" value={groupNameInput} onChange={(e) => setGroupNameInput(e.target.value)} />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Add Users"
              >
                <Form.Control type="text" onChange={(e) => handleSearchGroupMembers(e.target.value)} />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <div style={{ padding: '10px 20px', display: 'flex', flexWrap: 'wrap'}}>
          {selectUsersGroup?.map((singleUser) => (
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
              <Image src={xSvg} style={{marginLeft: '5px'}} onClick={() => handleDeleteSelectUserGroup(singleUser)} />
            </div>
          ))}
        </div>
        <div style={{ maxHeight: '350px', overflowY: 'scroll', padding: '0 20px' }}>
          {searchResultGroup && (
            searchResultGroup.map((singleUserResult) => (
              <div style={{display: 'flex', alignItems: 'center'}}>
              <Friend 
                key={singleUserResult.name + singleUserResult.studentNumber} 
                singleUserResult={singleUserResult}  
                isGroupCard={true}
              />
              <Button style={{marginLeft: '10px', borderRadius: '50%', padding: '5px',}} onClick={() => handleAddPersonToSelectUsersGroup(singleUserResult)}>
                <Image src={plusSVG} roundedCircle width="25px" height="25px" />
              </Button>
              </div>
            ))
          )}
        </div>
        <Button style={{margin: '10px', fontWeight: 700, letterSpacing: '2px'}} onClick={handleSubmitCreateGroup}>Create Group</Button>
        <Modal.Footer style={{ color: 'rgb(25, 85, 148)', fontSize: '14px', fontWeight: 'bold' }}>
          Click Any Where to Close
        </Modal.Footer>
      </Modal>



      <AlertShow />
    </>
  );
};

export default ChatSideBar;
