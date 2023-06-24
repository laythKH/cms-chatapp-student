import React from "react";
import { Image } from "react-bootstrap";

function Friend({ handleSelected, singleUserResult, isGroupCard }) {

  if(isGroupCard) {
      return (
        <div className='single-card' style={{border: '3px dotted blue'}}>
          <Image
            src={singleUserResult?.picture}
            roundedCircle
            style={{ width: "60px", height: "60px" }}
          />
          <div className='title'>
            <h2>{singleUserResult?.name || 'asda'}</h2>
            <h6>{singleUserResult?.email || 'asdasd'}</h6>
          </div>
        </div>
      )
  }


    return (
      <div className='single-card' onClick={handleSelected}>
        <Image
          src={singleUserResult?.picture}
          roundedCircle
          style={{ width: "60px", height: "60px" }}
        />
        <div className='title'>
          <h2>{singleUserResult?.name || 'asda'}</h2>
          <h6>{singleUserResult?.email || 'asdasd'}</h6>
        </div>
      </div>
    )

}

export default Friend;
