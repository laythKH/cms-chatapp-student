import React, { useState } from "react";
import "./ChatContent.css";
import Image from "react-bootstrap/Image";
import DarkImage from "./193331.jpg";
import Form from "react-bootstrap/Form";
import Logo from "./193331.jpg";
import { Button, InputGroup } from "react-bootstrap";
import Sender from "./Sender/Sender";

const ChatContent = ({ handleSelected }) => {
  const [inputValue, setInputValue] = useState("");
  const [messagesObject, setMessagesObject] = useState([
    { id: 0, message: "", img: "", state: "" },
  ]);

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
  return (
    <div className={`chat-container`}>
      <div className='chat-header'>
        <div className='back' onClick={handleSelected}>
          back
        </div>
        <div className='person-info-holder'>
          <Image src={DarkImage} roundedCircle className='image-style' />
          <div className='person-info'>
            <span>layth kh</span>
            <span>last seen</span>
          </div>
        </div>
        <span>more info</span>
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
  );
};

export default ChatContent;
