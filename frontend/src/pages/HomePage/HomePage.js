import NavBar from "../../components/NavBar/NavBar";
import HomeContent from "../../components/HomeContent/HomeContent";
import HomeSideBar from "../../components/HomeSideBar/HomeSideBar";
import "./homepage.css";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import AlertShow from "../../components/Alert/AlertShow";

const rolesOption = {
  admin: {
    user: true,
    createUser: true,
    updateUserInfp: true,
    course: true,
    createCourse: true,
    updateOrDeleteCourse: true,
    addAndDelCourseToUser: true,
    assignment: true,
    createAssignment: true,
    submitAssignment: true,
    lecture: false,
    addLecture: false,
    showLectures: false
  },
  //change premission
  manager: {
    user: true,
    createUser: false,
    updateUserInfp: true,
    course: true,
    createCourse: true,
    updateOrDeleteCourse: true,
    addAndDelCourseToUser: true,
    assignment: false,
    createAssignment: false,
    getAllSubmitedAssignment: false,
    submitAssignment: false,
    lecture: false,
    addLecture: false,
    showLectures: false
  },
  teacher: {
    user: false,
    createUser: false,
    updateUserInfp: false,
    course: false,
    createCourse: false,
    updateOrDeleteCourse: true,
    addAndDelCourseToUser: false,
    assignment: true,
    createAssignment: true,
    getAllSubmitedAssignment: true,
    submitAssignment: false,
    lecture: true,
    addLecture: true,
    showLectures: false
  },
  student: {
    user: false,
    createUser: false,
    updateUserInfp: false,
    course: false,
    createCourse: false,
    updateOrDeleteCourse: true,
    addAndDelCourseToUser: false,
    assignment: true,
    createAssignment: false,
    getAllSubmitedAssignment: false,
    submitAssignment: true,
    lecture: true,
    addLecture: false,
    showLectures: true
  },
};

const HomePage = ({ handelLang, lang }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [roles, setRoles] = useState(rolesOption);
  const [showOption, setShowOption] = useState("");

  const { user, refetch, setRefetch } = useAppContext();
  // console.log(showNavBasedOnRole);
  const isMatch = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  useEffect(() => {
    setRefetch(!refetch);
  }, [user, isMatch]);

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        width: "100%",
      }}
    >
      {(isMatch || !isSelected) && (
        <NavBar handelLang={handelLang} lang={lang} />
      )}
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
  );
};

export default HomePage;
