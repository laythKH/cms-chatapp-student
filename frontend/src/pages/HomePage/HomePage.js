
import NavBar from '../../components/NavBar/NavBar'
import HomeContent from '../../components/HomeContent/HomeContent'
import HomeSideBar from '../../components/HomeSideBar/HomeSideBar'
import './homepage.css'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/appContext'

const HomePage = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [showNavBasedOnRole, setShowNavBasedOnRole] = useState(false)

  const { user } = useAppContext()

  // console.log(showNavBasedOnRole);
  const isMatch = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  useEffect(() => {
    if(user?.role === 'student') {
      setShowNavBasedOnRole(false)
    } else {
      setShowNavBasedOnRole(true)
    }

  }, [user])


  return (
    <>
      <NavBar />
      <div className='home-page'>
      {(isMatch || !isSelected) && (showNavBasedOnRole) && (
        <HomeSideBar
          setIsSelected={setIsSelected}
        />
      )}
      {(isMatch || isSelected) && (
        <HomeContent
          isMatch={!isMatch}
          setIsSelected={setIsSelected}
        />
      )}
      </div>
    </>
  )
}

export default HomePage