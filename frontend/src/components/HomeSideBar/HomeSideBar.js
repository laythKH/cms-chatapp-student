import React, { useEffect, useState, useRef } from 'react'
import Accordion from 'react-bootstrap/Accordion';


import './homeSideBar.css'
import { useAppContext } from '../../context/appContext';

const HomeSideBar = ({roles, setShowOption}) => {
  const { user } = useAppContext()
  const [ permissions, setPermissions ] = useState({})

  const createUser = useRef()
  const searchForUser = useRef()
  const createCourse = useRef()

  
  const NavBarBasedOnUserRole = () => {
    const role = user?.role;
    const permissions = roles[role];
    setPermissions(permissions)
  }


  const handleShow = (s) => {
    let all = [createUser, searchForUser, createCourse];
    all.map((ele) => ele.current.classList.remove("selected"));
    s.current.classList.add("selected");
    setShowOption(s.current.dataset.name)
    console.log( `showOption :::  ${s.current.dataset.name}` );
  }


  useEffect(() => {
    NavBarBasedOnUserRole()
  }, [user])

  return (
    <div className='sidebar'>
    <h3 className='sidebar-header'>Home</h3>
    <div className='navs-container'>
      <Accordion defaultActiveKey={['0']} alwaysOpen className='drop-down'>
      {permissions?.user && <Accordion.Item eventKey="0"  style={{marginBottom: '15px'}}>
        <Accordion.Header>User</Accordion.Header>
        <Accordion.Body>
          {permissions?.createUser &&
            <div 
              className='dropdown-singleCard'
              data-name="createUser"
              ref={createUser}
              onClick={() => handleShow(createUser)}
            >Create User</div>
          }
          {permissions?.searchForUser && 
            <div 
              className='dropdown-singleCard'
              data-name="searchForUser"
              ref={searchForUser}
              onClick={() => handleShow(searchForUser)}
            >Search For User</div>
          }
        </Accordion.Body>
      </Accordion.Item>}
      {permissions?.course && <Accordion.Item eventKey="1">
        <Accordion.Header>Courses</Accordion.Header>
        <Accordion.Body>
          {permissions?.createCourse && 
            <div 
              className='dropdown-singleCard'
              data-name="createCourse"
              ref={createCourse}
              onClick={() => handleShow(createCourse)}
            >Create Course</div>
          }
          {permissions?.searchForCourse && <div className='dropdown-singleCard'>search For Course</div>}
        </Accordion.Body>
      </Accordion.Item>}
    </Accordion>
    </div>
    
    </div>
  )
}

export default HomeSideBar