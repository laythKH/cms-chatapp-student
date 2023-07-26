
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
    updateOrDeleteCourse: true,
    addAndDelCourseToUser: true,
    assignment: false,
    createAssignment: false,
    submitAssignment: false
  },
  manager: {
    user: true,
    createUser: false,
    searchForUser: true,
    course: true,
    createCourse: true,
    updateOrDeleteCourse: true,
    addAndDelCourseToUser: true,
    assignment: false,
    createAssignment: false,
    submitAssignment: false
  },
  teacher: {
    user: false,
    createUser: false,
    searchForUser: false,
    course: false,
    createCourse: false,
    updateOrDeleteCourse: true,
    addAndDelCourseToUser: false,
    assignment: true,
    createAssignment: true,
    submitAssignment: false
  },
  student: {
    user: false,
    createUser: false,
    searchForUser: false,
    course: false,
    createCourse: false,
    updateOrDeleteCourse: true,
    addAndDelCourseToUser: false,
    assignment: true,
    createAssignment: false,
    submitAssignment: true
  },
};

const HomePage = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [roles, setRoles] = useState(rolesOption)
  const [showOption, setShowOption] = useState('')

  const { user, refetch, setRefetch } = useAppContext()



  // console.log(showNavBasedOnRole);
  const isMatch = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  console.log(isMatch, isSelected);

  useEffect(() => {
    setRefetch(!refetch)
    console.log('refetch');
  }, [user, isMatch])


  return (
    <div style={{ display: 'flex', position: 'relative', overflow: 'hidden', height: '100vh', width: '100%' }}>
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
            isSelected={isSelected}
            showOption={showOption}
          />
        )}
      </div>

      <AlertShow />
    </div>
  )
}

export default HomePage