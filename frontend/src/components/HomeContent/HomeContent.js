import "./homeContent.css";
import CreateUser from "../Forms/CreateUser/CreateUser";
import SearchForUser from "../Forms/SearchForUser/SearchForUser";
import CreateCourse from "../Forms/CreateCourse/CreateCourse";
import AddRemoveCourseUser from "../Forms/AddCourseToUser/AddRemoveCourseUser";
import { Button, Image } from "react-bootstrap";

import backArrowSvg from "./back-arrow.svg";
import UpdateOrDeleteCourse from "../Forms/UpdateOrDeleteCourse/UpdateOrDeleteCourse";
import CreateAssignment from "../Forms/CreateAssignment/CreateAssignment";
import SubmitedAssignment from "../Forms/SubmitedAssignment/SubmitedAssignment";
import SubmitAssignment from "../Forms/SubmitAssignment/SubmitAssignment";
import AddLecture from "../Forms/AddLecture/AddLecture";
import { useAppContext } from "../../context/appContext";
import ShowLecture from "../Forms/ShowLecture/ShowLecture";

// const HomeContent = ({ showOption, roles, setIsSelected, isSelected, isMatch }) => {

const HomeContent = ({
  showOption,
  roles,
  setIsSelected,
  isSelected,
  isMatch,
}) => {
  const { t } = useAppContext();
  if (!isSelected) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>{t("Home.content.title")}</h1>
      </div>
    );
  }

  return (
    <div
      className='home-content-main'
      style={{ padding: isMatch ? "0px" : "20px" }}
    >
      {isMatch && (
        <div className='btn-back-holder'>
          <Image
            src={backArrowSvg}
            width='50px'
            onClick={() => setIsSelected(false)}
          />
        </div>
      )}
      <div style={{ padding: "10px 0" }}>
        {showOption === "createUser" && <CreateUser />}
        {showOption === "searchForUser" && <SearchForUser />}
        {showOption === "createCourse" && <CreateCourse />}
        {showOption === "addAndDelCourseToUser" && <AddRemoveCourseUser />}
        {showOption === "updateOrDeleteCourse" && <UpdateOrDeleteCourse />}
        {showOption === "createAssignment" && <CreateAssignment />}
        {showOption === "getAllSubmitedAssignment" && <SubmitedAssignment />}
        {showOption === "submitAssignment" && <SubmitAssignment />}
        {showOption === "addLecture" && <AddLecture />}
        {showOption === "showLectures" && <ShowLecture />}
      </div>
    </div>
  );
};

export default HomeContent;
