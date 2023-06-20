import React, { useState } from 'react'
import './ChatSideBar.css'
import CustomButton from '../CustomButton/CustomButton';
import Image from 'react-bootstrap/Image';
import personImage from './person.jpg'

const ChatSideBar = () => {
   const [add, setAdd] = useState(false)

   const handleClick = () => {
      setAdd(!add)
      console.log(add);
   }

   return (
      <div className={`sidebar display-none`}>
         <div className='sidebar-header'>
            <h3>Chats </h3>
            <CustomButton color='#6E2CF2' handleClick={handleClick}>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-house-door-fill size'
                  viewBox='0 0 16 16'
                  style={{
                     width: '15px',
                     height: '15px'
                  }}
               >
                  <path d='M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z' />
               </svg>
            </CustomButton>
         </div>
         <div className='main-btn-holder'>
            <div className={add ? `btn-holder show-btn-holder` : `btn-holder hide-btn-holder`} >
               <CustomButton color='#6E2CF2'>Add Person</CustomButton>
               <CustomButton color='#6E2CF2'>Create group</CustomButton>
            </div>
         </div>
         <div className='friends-container-holder'>
            <div className='upper-style'></div>
            <div className='down-style'></div>
            <div className='friends-container'>
               <div className='single-card'>
                  <Image src={personImage} roundedCircle style={{ width: '60px', height: '60px' }} />
                  <div className='title'>
                     <h2>Mario</h2>
                     <h6>hello hello hello </h6>
                  </div>
               </div>
               <div className='single-card'>
                  <Image src={personImage} roundedCircle style={{ width: '60px', height: '60px' }} />
                  <div className='title'>
                     <h2>Mario</h2>
                     <h6>hello hello hello </h6>
                  </div>
               </div>
               <div className='single-card'>
                  <Image src={personImage} roundedCircle style={{ width: '60px', height: '60px' }} />
                  <div className='title'>
                     <h2>Mario</h2>
                     <h6>hello hello hello </h6>
                  </div>
               </div>
               <div className='single-card'>
                  <Image src={personImage} roundedCircle style={{ width: '60px', height: '60px' }} />
                  <div className='title'>
                     <h2>Mario</h2>
                     <h6>hello hello hello </h6>
                  </div>
               </div>
               <div className='single-card'>
                  <Image src={personImage} roundedCircle style={{ width: '60px', height: '60px' }} />
                  <div className='title'>
                     <h2>Mario</h2>
                     <h6>hello hello hello </h6>
                  </div>
               </div>
               <div className='single-card'>
                  <Image src={personImage} roundedCircle style={{ width: '60px', height: '60px' }} />
                  <div className='title'>
                     <h2>Mario</h2>
                     <h6>hello hello hello </h6>
                  </div>
               </div>
               <div className='single-card'>
                  <Image src={personImage} roundedCircle style={{ width: '60px', height: '60px' }} />
                  <div className='title'>
                     <h2>Mario</h2>
                     <h6>hello hello hello </h6>
                  </div>
               </div>
               <div className='single-card'>
                  <Image src={personImage} roundedCircle style={{ width: '60px', height: '60px' }} />
                  <div className='title'>
                     <h2>Mario</h2>
                     <h6>hello hello hello </h6>
                  </div>
               </div>
               <div className='single-card'>
                  <Image src={personImage} roundedCircle style={{ width: '60px', height: '60px' }} />
                  <div className='title'>
                     <h2>Mario</h2>
                     <h6>hello hello hello </h6>
                  </div>
               </div>
               <div className='single-card'>
                  <Image src={personImage} roundedCircle style={{ width: '60px', height: '60px' }} />
                  <div className='title'>
                     <h2>Mario</h2>
                     <h6>hello hello hello </h6>
                  </div>
               </div>
               <div className='single-card'>
                  <Image src={personImage} roundedCircle style={{ width: '60px', height: '60px' }} />
                  <div className='title'>
                     <h2>Mario</h2>
                     <h6>hello hello hello </h6>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ChatSideBar