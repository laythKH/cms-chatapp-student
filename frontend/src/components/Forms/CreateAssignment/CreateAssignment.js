import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../context/appContext'
import { Button, Form } from 'react-bootstrap'

const CreateAssignment = () => {
   const { user, setAlertText, setShowAlert } = useAppContext()
   const [formData, setFormData] = useState({
      name: '',
      description: '',
      dueDate: '',
      course: '',
   })
   const [courses, setCourses] = useState()

   const getAllCourses = async () => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            }
         };
         const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/task/${user._id}`, config)

         console.log(data);

         setCourses(data)

      } catch (error) {
         setAlertText(error?.response?.data?.msg)
         setShowAlert(true)
      }
   }

   const handleCreateAssignment = async () => {
      if (!formData.name || !formData.description || !formData.dueDate || !formData.course) {
         setAlertText('Please Provide All The Values')
         setShowAlert(true)
      }
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            }
         };
         const { data } = await axios.post(`http://127.0.0.1:5000/api/v1/task/`, formData, config)

         console.log(data);

         setAlertText('Assignment Created Successfully')
         setShowAlert(true)

      } catch (error) {
         setAlertText(error?.response?.data?.msg)
         setShowAlert(true)
      }
   }

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevState) => ({
         ...prevState,
         [name]: value
      }));
   };

   useEffect(() => {
      if (user) {
         getAllCourses()
      }
   }, [user])

   return (
      <div>
         <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>Email address</Form.Label>
               <Form.Control
                  type="email"
                  placeholder="name or title for assignment"
                  name='name'
                  value={formData?.name}
                  onChange={handleChange}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
               <Form.Label>Example textarea</Form.Label>
               <Form.Control
                  as="textarea"
                  rows={8}
                  placeholder='here the description for assignment'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
               />
            </Form.Group>
            <Form.Select
               aria-label="Default select example"
               style={{ marginBottom: '15px' }}
               name='course'
               value={formData.course}
               onChange={handleChange}
            >
               <option>Select Course</option>
               {courses && courses.map((singleCourse) => (
                  <option value={singleCourse?._id}>{singleCourse.name}</option>
               ))}
            </Form.Select>
            <Form.Group controlId="dueDate" style={{ marginBottom: '15px' }}>
               <Form.Label>Due Date</Form.Label>
               <Form.Control
                  type="date"
                  placeholder="Enter due date"
                  name='dueDate'
                  value={formData.dueDate}
                  onChange={handleChange}
               />
            </Form.Group>
            <Button style={{ width: '100%', letterSpacing: '7px', backgroundColor: 'rgba(25, 84, 148, 0.84)' }} onClick={handleCreateAssignment}>Create Assignment</Button>
         </Form>
      </div>
   )
}

export default CreateAssignment