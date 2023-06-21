import React, { useState } from "react";
import "./ChatSideBar.css";
import CustomButton from "../CustomButton/CustomButton";
import Image from "react-bootstrap/Image";
import personImage from "./person.jpg";
import Friend from "../Friend/Friend";

const ChatSideBar = ({ handleSelected }) => {
  const [add, setAdd] = useState(false);

  const handleClick = () => {
    setAdd(!add);
  };

  return (
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
          <CustomButton color='rgb(25, 85, 148)'>Add Person</CustomButton>
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
  );
};

export default ChatSideBar;
