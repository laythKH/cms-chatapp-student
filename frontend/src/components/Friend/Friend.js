import React from "react";
import { Image } from "react-bootstrap";

function Friend({ handleSelected, singleChat }) {


  return (
    <div className='single-card' onClick={handleSelected}>
      <Image
        // src={user?.picture}
        roundedCircle
        style={{ width: "60px", height: "60px" }}
      />
      <div className='title'>
        <h2>Hello</h2>
        <h6>hello hello hello </h6>
      </div>
    </div>
  );

  

}

export default Friend;
