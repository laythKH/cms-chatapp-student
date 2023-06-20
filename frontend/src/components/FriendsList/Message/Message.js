import React from "react";
import { Image } from "react-bootstrap";

function Message({ img, name, lastMessage, notification }) {
  return (
    <li>
      <div>
        <Image src={img} />
      </div>
      <div>
        <div>{name}</div>
        <div>
          {lastMessage} <span>{notification}</span>
        </div>
      </div>
    </li>
  );
}

export default Message;
