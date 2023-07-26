import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../context/appContext'
import { Button, Col, Form, Image, InputGroup, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import deleteSvg from './delete-icon.svg'
import addSvg from './plus-icon.svg'

import './addRemoveCourse.css'

const AddRemoveCourseUser = () => {
   const [searchInput, setSearchInput] = useState('')
   const [userInfo, setUserInfo] = useState({})
   const [showUserInfo, setShowUserInfo] = useState(false)
   const { user, setAlertText, setShowAlert } = useAppContext()

   const [showModal, setShowModal] = useState(false)
   const [inputModalSearch, setInputModalSearch] = useState('')
   const [searchCourseResult, setSearchCourseResult] = useState([])
   const [showCourseResult, setShowCourseResult] = useState(false)


   const hideModal = () => {
      setShowModal(false)
      setInputModalSearch('')
      setSearchCourseResult([])
      setShowCourseResult(false)
   }

   const handleSearch = async () => {
      if (!searchInput) {
         setAlertText('Please Input Value')
         setShowAlert(true)
         return
      }
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            }
         };

         const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/auth/${searchInput}`, config)

         console.log(data);

         if (data?.length === 0) {
            setAlertText('there is no user with this info')
            setShowAlert(true)
         } else {
            setUserInfo({
               _id: data[0]?._id,
               user: data[0]?.name,
               studentNumber: data[0]?.studentNumber,
               courses: data[0].courses
            })
            setShowUserInfo(true)
            setSearchInput('')
            console.log(user);
            console.log(userInfo);
         }
      } catch (error) {
         setAlertText(error.response.data.msg)
         setShowAlert(true)
      }
   }

   const handleSearchCourse = async () => {
      // e.preventDefault()
      setSearchCourseResult([])
      if (!inputModalSearch) {
         setShowCourseResult(false)
         return
      }

      try {
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            }
         };
         console.log(`in axios =======> ${inputModalSearch}`);
         const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/course/${inputModalSearch}`, config)
         console.log(data);
         if (data.length === 0 || !inputModalSearch) {
            setAlertText('There is no course with this name')
            setShowAlert(true)
            setShowCourseResult(false)
         } else {
            setSearchCourseResult(data)
            setShowCourseResult(true)
         }

      } catch (error) {
         // console.log(error);
         setAlertText(error.response.data.msg)
         setShowAlert(true)
      }
   }

   const handleAddCourseToUser = async (courseId) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            }
         };
         // console.log(`course ID =======> ${courseId}`);
         // console.log(`user ID =======> ${userInfo._id}`);
         const { data } = await axios.post(`http://127.0.0.1:5000/api/v1/auth/${userInfo._id}/courses/${courseId}`, config)

         setUserInfo({
            _id: data?._id,
            user: data?.name,
            studentNumber: data?.studentNumber,
            courses: data.courses
         })

         setAlertText("Courses Added")
         setShowAlert(true)
         hideModal()
      } catch (error) {
         // console.log(error);
         setAlertText(error.response.data.msg)
         setShowAlert(true)
      }
   }

   const handleRemoveCourseFromUser = async (courseId) => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            }
         };
         // console.log(`course ID =======> ${courseId}`);
         // console.log(`user ID =======> ${userInfo._id}`);
         const { data } = await axios.delete(`http://127.0.0.1:5000/api/v1/auth/${userInfo._id}/courses/${courseId}`, config)

         console.log(data);

         setUserInfo({
            _id: data?._id,
            user: data?.name,
            studentNumber: data?.studentNumber,
            courses: data.courses
         })

         setAlertText("Courses Deleted")
         setShowAlert(true)
      } catch (error) {
         setAlertText(error.response.data.msg)
         setShowAlert(true)
      }
   }

   useEffect(() => {
      handleSearchCourse()
   }, [inputModalSearch])

   useEffect(() => {
      console.log(searchCourseResult);
   }, [userInfo, setUserInfo, searchInput, showCourseResult])


   return (
      <>
         <div className='hide-scrollbar' style={{ width: '100%', height: '100vh', overflow: 'scroll', scrollbarWidth: 'none', padding: '0 0 20px 0' }}>
            <h4>Search For User</h4>
            <InputGroup className="mb-3">
               <Form.Control
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  style={{ padding: '15px 10px' }}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
               />
               <Button variant="secondary" id="button-addon2" onClick={handleSearch} >
                  Button
               </Button>
            </InputGroup>
            {showUserInfo &&
               <div>

                  <Card style={{ marginBottom: '20px' }}>
                     <Card.Body style={{ placeItems: 'flex-start' }}>
                        <div>User Name: <span style={{ fontSize: '18px', color: '#f50057', fontWeight: '800' }}>{userInfo?.user}</span></div>
                        <div>User Number: <span style={{ fontSize: '18px', color: '#f50057', fontWeight: '800' }}>{userInfo?.studentNumber}</span></div>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body style={{ placeItems: 'flex-start' }}>
                        <Card.Title>Student Courses</Card.Title>
                        <div style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                           <Row xs={1} md={2}>
                              {userInfo?.courses?.map((sCourse, idx) => (
                                 <Col key={idx}>
                                    <Card className="course-card" style={{ marginBottom: '10px' }}>
                                       <div className='remove-item'>
                                          <button className='remove-item-btn'>
                                             <Image src={deleteSvg} width='30px' onClick={() => handleRemoveCourseFromUser(sCourse._id)} />
                                          </button>
                                       </div>
                                       <Card.Body>
                                          <Card.Title>{sCourse?.name}</Card.Title>
                                          <Card.Text>{sCourse?.description}</Card.Text>
                                       </Card.Body>
                                    </Card>
                                 </Col>
                              ))}

                           </Row>
                        </div>
                     </Card.Body>
                  </Card>
                  <Button onClick={() => setShowModal(true)} style={{
                     width: '100%', marginTop: '10px', fontWeight: '600', letterSpacing: '8px', backgroundColor: '#f50057', borderColor: '#f50057'
                  }}>
                     Add New Courses
                  </Button>
               </div>
            }
         </div>


         <Modal
            show={showModal}
            onHide={hideModal}
            aria-labelledby="contained-modal-title-vcenter"
         >
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">
                  Using Grid in Modal
               </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
               <InputGroup className="mb-3">
                  <Form.Control
                     placeholder="Recipient's username"
                     aria-label="Recipient's username"
                     aria-describedby="basic-addon2"
                     style={{ padding: '10px 7px' }}
                     value={inputModalSearch}
                     onChange={(e) => { setInputModalSearch(e.target.value); }}
                  />
                  <Button variant="outline-secondary" id="button-addon2">
                     Search
                  </Button>
               </InputGroup>
               <Container className='course-holder'>
                  {(showCourseResult) && <Row style={{ alignContent: 'center' }}>
                     {searchCourseResult?.map((singleCourse) => (
                        <>
                           <Col xs={12} md={10} style={{ alignSelf: 'center' }}>
                              <Card className="course-card box-shadow" style={{ marginBottom: '10px' }}>
                                 <Card.Body>
                                    <Card.Title>{singleCourse?.name}</Card.Title>
                                    <Card.Text>{singleCourse?.description}</Card.Text>
                                 </Card.Body>
                              </Card>
                           </Col>
                           <Col xs={6} md={2} style={{ alignSelf: 'center' }}>
                              <Image src={addSvg} width='60px' style={{ marginTop: '-11px' }} onClick={() => handleAddCourseToUser(singleCourse._id)} />
                           </Col>
                        </>
                     ))}
                  </Row>}
               </Container>
            </Modal.Body>
            <Modal.Footer style={{ color: '#D32F2F', fontSize: '14px', fontWeight: '700' }}>
               Click Any Where to close
            </Modal.Footer>
         </Modal>




      </>
   )
}

export default AddRemoveCourseUser