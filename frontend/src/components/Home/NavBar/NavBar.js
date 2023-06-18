import React, { useRef } from "react";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/person.jpg";
import "./NavBar.css";

function NavBar() {
  const icon1 = useRef();
  const icon2 = useRef();
  const icon3 = useRef();

  function handelIcons(icon) {
    let a = [icon1, icon2, icon3];
    a.map((icon) => icon.current.classList.remove("selected"));
    icon.current.classList.add("selected");
  }

  return (
    <Navbar className='h-100 position-absolute text-center'>
      <Navbar.Brand className='m-2'>
        <Image src={Logo} rounded />
      </Navbar.Brand>
      <Nav className=''>
        <Nav.Link ref={icon1} onClick={() => handelIcons(icon1)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-house-door-fill'
            viewBox='0 0 16 16'
          >
            <path d='M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z' />
          </svg>
        </Nav.Link>
        <Nav.Link
          ref={icon2}
          onClick={() => handelIcons(icon2)}
          className='selected'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            class='bi bi-chat-fill'
            viewBox='0 0 16 16'
          >
            <path d='M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z' />
          </svg>
        </Nav.Link>
        <Nav.Link ref={icon3} onClick={() => handelIcons(icon3)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            class='bi bi-box-arrow-left'
            viewBox='0 0 16 16'
          >
            <path
              fill-rule='evenodd'
              d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z'
            />
            <path
              fill-rule='evenodd'
              d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
            />
          </svg>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
