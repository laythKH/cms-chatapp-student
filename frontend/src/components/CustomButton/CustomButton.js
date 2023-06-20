import React from 'react'

const CustomButton = ({ title, color, children, handleClick }) => {
   return (
      <div
         style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: color,
            padding: '7px',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer'
         }}
         onClick={handleClick}
      >{children} {title}</div>
   )
}

export default CustomButton