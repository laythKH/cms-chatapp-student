import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useAppContext } from '../../../context/appContext';
import axios from 'axios';

const CreateUser = ({userInfo, isUpdate = false}) => {
   const {user, setAlertText, alertText, setShowAlert, isLoading, setIsLoading} = useAppContext()
   const [formData, setFormData] = useState({
      firstName: userInfo?.firstName || '',
      lastName: userInfo?.lastName || '',
      name: userInfo?.name || '',
      email: userInfo?.email || '',
      city: userInfo?.city || '',
      phoneNumber: userInfo?.phoneNumber || '',
      dateOfBirth: userInfo?.dateOfBirth || '',
      gender: userInfo?.gender || '',
      role: userInfo?.role || '',
      studentNumber: userInfo?.studentNumber || ''
   });

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
         ...prevFormData,
         [name]: value,
         name: formData.firstName + ' ' + formData.lastName
      }));
   };

   const createUser = async () => {
      const { firstName, lastName, name, email, city, phoneNumber, dateOfBirth, gender, role } = formData
         if(!firstName || !lastName || !role || !email) {
            setAlertText('Please Fill FirstName && LastName && Role')
            setShowAlert(true)
            return
         }  

         try {
            setIsLoading(true)
            const data = await axios.post(`http://127.0.0.1:5000/api/v1/auth/register`, { firstName, lastName, name, email, phoneNumber, gender, dateOfBirth, role})
            setIsLoading(false)
            setAlertText('User Created')
            setShowAlert(true)
         
         } catch (error) {
            setAlertText(error.response.data.msg)
            setShowAlert(true)
         }
   }


   const handleSubmit = async (event) => {
      event.preventDefault();
      if(isUpdate) {

         const config = {
         headers: {
            Authorization: `Bearer ${user.token}`,
         }
         };
         try {
            const {data} = await axios.put(`http://127.0.0.1:5000/api/v1/auth/updateUser/${userInfo._id}`, 
            {
               ...formData
            },
            config
            );

            console.log(data);
         } catch (err) {
            console.error(err);
         }
      } else {
         createUser()
      }
   };

   return (
      <Form style={{marginTop: '20px'}} onSubmit={handleSubmit}>
         <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
               <Form.Label>First Name:</Form.Label>
               <Form.Control 
                  type="text" 
                  placeholder="Enter Your First Name"
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
               />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
               <Form.Label>Last Name:</Form.Label>
               <Form.Control 
                  type="text" 
                  placeholder="Enter Your First Name" 
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
               />
            </Form.Group>
         </Row>

         <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Full Name: </Form.Label>
            <Form.Control 
               type='text' 
               placeholder='Full Name'
               name="name"
               value={formData.firstName + ' ' + formData.lastName}
               disabled 
               readOnly 
            />
         </Form.Group>

         <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Email: </Form.Label>
            <Form.Control 
               type='email'
               name='email'
               value={formData.email}
               onChange={handleChange}
               placeholder='Enter Your Email' 
            />
         </Form.Group>


         <Row className='mb-3'>
            <Form.Group className='mb-1' as={Col} controlId="formGridCity" lg={12} xl={4}>
               <Form.Label>City</Form.Label>
               <Form.Control 
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
               />
            </Form.Group>

            <Form.Group className='mb-1' as={Col} controlId="formGridState" lg={12} xl={4}>
               <Form.Label>Phone Number</Form.Label>
               <Form.Control 
                  type='tel' 
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
               />
            </Form.Group>

            <Form.Group className='mb-1' as={Col} controlId="formGridZip" lg={12} xl={4}>
               <Form.Label>Date Of Birth</Form.Label>
               <Form.Control 
                  type='date'
                  name='dateOfBirth'
                  value={formData.dateOfBirth}
                  onChange={handleChange}
               />
            </Form.Group>
         </Row>
         <Row className='mb-3'>
            <Form.Group as={Col} controlId="formGridState" lg={12} xl={6}>
               <Form.Select
                  aria-label="Default select example" 
                  className='mb-3'
                  name='gender'
                  value={formData.gender}
                  onChange={handleChange}
                  
               >
                  <option>Select Gender</option>
                  <option value="male">mail</option>
                  <option value="female">female</option>
               </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState" lg={12} xl={6}>
               <Form.Select
                  aria-label="Default select example" 
                  className='mb-3'
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
               >
                  <option>Select The Role Of Student</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
               </Form.Select>
            </Form.Group>
         </Row>
         <Button variant="primary" type="submit">
            {isUpdate ? 
               isLoading ? 'Loading...' : 'Update Info' : 
               isLoading ? 'Loading...' : 'Create User'
            }
         </Button>
      </Form>
   )
}

export default CreateUser