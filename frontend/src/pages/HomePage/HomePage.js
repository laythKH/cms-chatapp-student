
import NavBar from '../../components/NavBar/NavBar'
import HomeContent from '../../components/HomeContent/HomeContent'
import HomeSideBar from '../../components/HomeSideBar/HomeSideBar'
import './homepage.css'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/appContext'
import AlertShow from '../../components/Alert/AlertShow'

const rolesOption = {
      admin: {
          user: true,
          createUser: true,
          searchForUser: true,
          course: true,
          createCourse: true,
          searchForCourse: false,
          assignment: false,
          createAssignment: false,
          submitAssignment: false
      },
      manager: {
          user: false,
          createUser: false,
          searchForUser: true,
          course: true,
          createCourse: true,
          searchForCourse: true,
          assignment: false,
          createAssignment: false,
          submitAssignment: false
      },
      teacher: {
          user: false,
          createUser: false,
          searchForUser: true,
          course: false,
          createCourse: false,
          searchForCourse: false,
          assignment: true,
          createAssignment: true,
          submitAssignment: false
      },
      student: {
          user: false,
          createUser: false,
          searchForUser: true,
          course: false,
          createCourse: false,
          searchForCourse: false,
          assignment: true,
          createAssignment: false,
          submitAssignment: true
      },
};

const HomePage = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [roles, setRoles] = useState(rolesOption)
  const [showOption, setShowOption] = useState('')

  const { user } = useAppContext()




  // console.log(showNavBasedOnRole);
  const isMatch = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  
  useEffect(() => {
    console.log(roles);
  }, [user])


  return (
    <>
      <NavBar />
      <div className='home-page'>
        {(isMatch || !isSelected) && (
          <HomeSideBar
            setIsSelected={setIsSelected}
            roles={roles}
            setShowOption={setShowOption}
          />
        )}
        {(isMatch || isSelected) && (
          <HomeContent
            isMatch={!isMatch}
            roles={roles}
            setIsSelected={setIsSelected}
            showOption={showOption}
          />
        )}
      </div>

      <AlertShow /> 
    </>
  )
}

export default HomePage