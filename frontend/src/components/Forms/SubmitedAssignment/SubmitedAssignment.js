import axios from 'axios'
import { useAppContext } from '../../../context/appContext'
import { useEffect, useState } from 'react'

import './submitedAssignment.css'

const SubmitedAssignment = () => {
   const { user, setAlertText, setShowAlert } = useAppContext()
   const [allSolutions, setAllSolutions] = useState()

   const getAllSolution = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/v1/solution/teacher/${user._id}/solutions`)

      if (data?.isThereCourses) {
         setAllSolutions(data.result)
      }
      console.log(data.result);
   }





   useEffect(() => {
      getAllSolution()
   }, [user])





   if (allSolutions?.length === 0) {
      return (
         <div style={{ height: '100v', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '70px', fontSize: '28px', fontWeight: 700 }}>There Is No Courses Yet</div>
      )
   }

   return (
      <>
         <div className='container'>

            {allSolutions && allSolutions.map((single, idx) => (
               <div className='course-holder' key={idx + single?.course}>
                  <div className='course-header'>
                     <h3>course : <span>{single?.course}</span></h3>
                     <h3>assignment : <span>{single?.assignment}</span></h3>
                  </div>
                  <div className='course-content'>
                     {single?.solutions.map((solution, idx) => (
                        <div className='single-solution-card' key={idx + solution?.dateSubmitted}>
                           <p>{solution?.student?.name}</p>
                           <div>
                              <button>show</button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </>
   )
}

export default SubmitedAssignment