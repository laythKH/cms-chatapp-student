import React from "react";
import { Image } from "react-bootstrap";

function Friend({ personImage, handleSelected }) {
  return (
    <div className='single-card' onClick={handleSelected}>
      <Image
        src={personImage}
        roundedCircle
        style={{ width: "60px", height: "60px" }}
      />
      <div className='title'>
        <h2>Mario</h2>
        <h6>hello hello hello </h6>
      </div>
    </div>
  );
}

export default Friend;
