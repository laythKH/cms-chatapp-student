import React from 'react'
import Accordion from 'react-bootstrap/Accordion';


import './homeSideBar.css'

const HomeSideBar = () => {
  return (
    <div className='sidebar'>
    <h3 className='sidebar-header'>Home</h3>
    <div className='navs-container'>
      <Accordion defaultActiveKey={['0']} alwaysOpen className='drop-down'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>User</Accordion.Header>
        <Accordion.Body>
          Hello
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Course</Accordion.Header>
        <Accordion.Body>
          asda
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
    
    </div>
  )
}

export default HomeSideBar