import "./homeContent.css";
import CreateUser from "../Forms/CreateUser/CreateUser";
import SearchForUser from "../Forms/SearchForUser/SearchForUser";
import CreateCourse from "../Forms/CreateCourse/CreateCourse";
import AddRemoveCourseUser from "../Forms/AddCourseToUser/AddRemoveCourseUser";
import { Button, Image } from "react-bootstrap";

import backArrowSvg from "./back-arrow.svg";
import UpdateOrDeleteCourse from "../Forms/UpdateOrDeleteCourse/UpdateOrDeleteCourse";

const HomeContent = ({
  showOption,
  roles,
  setIsSelected,
  isSelected,
  isMatch,
}) => {
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
        <h1>Please Select Thing</h1>
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
      </div>
    </div>
  );
};

export default HomeContent;
