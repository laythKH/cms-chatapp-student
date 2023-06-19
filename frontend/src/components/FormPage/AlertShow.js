import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import './Alert.css';

function AlertShow({ alertText, show, setShow }) {
   useEffect(() => {
      const timer = setTimeout(() => {
         setShow(false);
      }, 1000);
      console.log('h');

      return () => clearTimeout(timer);
   }, [show]);

   return (
      <Alert
         style={{
            position: 'absolute',
            bottom: show ? '50px' : '-100px',
            transition: '0.5s',
            left: '50%',
            transform: "translateX(-50%)",
         }}
      >
         {alertText}
      </Alert>
   );
}

export default AlertShow;