import axios from 'axios'
import { useAppContext } from '../../../context/appContext';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';

import './submitAssignment.css'

const SubmitAssignment = () => {
   const { user, setAlertText, setShowAlert } = useAppContext()
   const [courseWithAssgnment, setCourseWithAssignment] = useState()
   const [showAssignment, setShowAssignment] = useState(false)
   const [selectedAssignment, setSelectedAssignment] = useState()
   const [assignmentSolution, setAssignmentSolution] = useState('')

   const [showSubmitAssignment, setShowSubmitAssignment] = useState(false)
   const [isThereSolution, setIsThereSolution] = useState(false)


   const handleShowAssignment = (singleAssignment) => {
      setShowAssignment(true)
      setSelectedAssignment(singleAssignment)
      console.log(singleAssignment);
   }

   const handleCloseShowAssignment = () => {
      setShowAssignment(false)
      setSelectedAssignment('')
   }

   const handleCloseAssignmentSolutionModal = () => {
      setAssignmentSolution('')
      setShowSubmitAssignment(false)
   }

   const handleShowSubmitAssigment = async (singleAssignment) => {
      setShowSubmitAssignment(true)
      setSelectedAssignment(singleAssignment)

      // console.log(selectedAssignment);
      const { data } = await axios.get(`http://localhost:5000/api/v1/solution/${singleAssignment?.assignment?._id}/${user?._id}`)

      if (data?.isThereSolution) {
         setIsThereSolution(true)
         setAssignmentSolution(data?._doc?.content)

      } else {
         setIsThereSolution(false)
      }
   }

   const handleSubmitAssignmentSolution = async () => {
      if (!assignmentSolution) {
         setAlertText('Please Provide The Solution')
      }

      let status = ''
      const dateOfSubmitAssignment = new Date()
      const dueDateForAssignment = new Date(selectedAssignment?.assignment?.dueDate)
      if (dateOfSubmitAssignment <= dueDateForAssignment) {
         status = 'Pending'
      } else {
         status = 'OutOfDate'
      }
      console.log(status);

      const { data } = await axios.post('http://localhost:5000/api/v1/solution/', {
         content: assignmentSolution,
         studentId: user?._id,
         assignmentId: selectedAssignment?.assignment?._id,
         status
      })
      console.log(data);
      setAssignmentSolution('')
      setShowSubmitAssignment(false)
   }



   function extractDate(dateString) {
      const dateParts = dateString.split('T');
      return dateParts[0];
   }

   const getAllTask = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/v1/solution/${user._id}`)
      console.log(data);
      const filteredArray = data?.courses?.filter(course => course.assignment);
      if (filteredArray) {
         setCourseWithAssignment(filteredArray)
      }
   }

   useEffect(() => {
      if (user?._id) {
         getAllTask()
      }
   }, [user])

   useEffect(() => {

   }, [selectedAssignment])


   return (
      <>
         <Table striped="columns" className="styled-table">
            <thead>
               <tr>
                  <th style={{ width: '10px !important' }} >#</th>
                  <th>course_name</th>
                  <th>assignment_title</th>
                  <th>due_Date</th>
                  <th>show_assignment</th>
                  <th>sub_assignment</th>
               </tr>
            </thead>
            <tbody>
               {courseWithAssgnment && courseWithAssgnment?.map((single, idx) => (
                  <tr key={idx + single?.name}>
                     <td style={{ width: '10px' }}>{idx + 1}</td>
                     <td>{single?.name}</td>
                     <td>{single?.assignment?.name?.slice(0, 20)}...</td>
                     <td>{extractDate(single?.assignment?.dueDate)}</td>
                     <td className='align-center'><Button variant="outline-success" onClick={() => handleShowAssignment(single)}>show</Button></td>
                     <td className='align-center' onClick={() => handleShowSubmitAssigment(single)}><Button variant="info" style={{ color: 'white' }}>Submit</Button></td>
                  </tr>
               ))}
            </tbody>
            <tfoot>
            </tfoot>
         </Table>


         <Modal
            size="lg"
            show={showAssignment}
            onHide={() => handleCloseShowAssignment()}
            aria-labelledby="example-modal-sizes-title-lg"
         >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>

               <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Mentor</Form.Label>
                     <Form.Control
                        type="text"
                        value={selectedAssignment?.teacher?.name}
                        disabled
                        readOnly
                     />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Assignment Title</Form.Label>
                     <Form.Control
                        type="text"
                        value={selectedAssignment?.assignment?.name}
                        disabled
                        readOnly
                     />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Assignment Description</Form.Label>
                     <Form.Control
                        as="textarea" rows={3}
                        value={selectedAssignment?.assignment?.description}
                        disabled
                        readOnly
                     />
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: '14px' }}>
               click Any Where To Close
            </Modal.Footer>
         </Modal>



         <Modal
            size="lg"
            show={showSubmitAssignment}
            onHide={() => handleCloseAssignmentSolutionModal()}
            aria-labelledby="example-modal-sizes-title-lg"
         >
            <Modal.Header closeButton>
               <Modal.Title id="example-modal-sizes-title-lg">
                  {selectedAssignment?.assignment?.name}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Assignment Solution</Form.Label>
                     <Form.Control
                        as="textarea" rows={15}
                        placeholder='please answer the assignment here'
                        value={assignmentSolution}
                        onChange={(e) => setAssignmentSolution(e.target.value)}
                        readOnly={isThereSolution ? true : false}
                     />
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               {isThereSolution
                  ?
                  <p style={{ color: '#d32f2f', fontSize: '14px', fontWeight: '600' }}>You Have Already Submit The Assignment</p>
                  :
                  <Button style={{ width: '100%', backgroundColor: 'rgba(25, 84, 148, 0.84)', fontWeight: '500', letterSpacing: '10px' }} onClick={handleSubmitAssignmentSolution}>Submit Assignment</Button>
               }
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default SubmitAssignment