import React, { useEffect, useState } from "react";
import "./ChatSideBar.css";
import CustomButton from "../CustomButton/CustomButton";
import personImage from "./person.jpg";
import Friend from "../Friend/Friend";
import { useAppContext } from "../../context/appContext";

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
  const [search, setSearch] = useState('')
  const { user } = useAppContext()

  useEffect(() => {

  }, [])

  const handleClick = () => {
    setAdd(!add);
  };

  const handleClose = () => setShow(false);

  const handleAddPerson = () => {
    setAdd(false)
    setShow(true)
  }

  const handleSearch = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      };

      const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/auth?search=${search}`, config)

      console.log(data);

    } catch (error) {
      console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    }
  }




  return (
    <>
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
            <Friend personImage={personImage} handleSelected={handleSelected} />
            <Friend personImage={personImage} handleSelected={handleSelected} />
            <Friend personImage={personImage} handleSelected={handleSelected} />
          </div>
        </div>
      </div>



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
                <Form.Control type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
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
          <Friend personImage={personImage} />
          <Friend personImage={personImage} />
          <Friend personImage={personImage} />
          <Friend personImage={personImage} />
          <Friend personImage={personImage} />
          <Friend personImage={personImage} />
          <Friend personImage={personImage} />
        </div>
        <Modal.Footer style={{ color: 'rgb(25, 85, 148)', fontSize: '14px', fontWeight: 'bold' }}>
          Click Any Where to Close
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChatSideBar;
