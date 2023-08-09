import React, { useEffect, useState, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";

import "./homeSideBar.css";
import { useAppContext } from "../../context/appContext";

const HomeSideBar = ({ roles, setShowOption, setIsSelected }) => {
  const { t, user } = useAppContext();
  const [permissions, setPermissions] = useState({});

  const createUser = useRef();
  const searchForUser = useRef();
  const createCourse = useRef();
  const addAndDelCourseToUser = useRef();
  const updateOrDeleteCourse = useRef();
  const createAssignment = useRef();
  const getAllSubmitedAssignment = useRef();
  const submitAssignment = useRef();
  const showLectures = useRef();
  const addLectures = useRef();

  const NavBarBasedOnUserRole = () => {
    const role = user?.role;
    const permissions = roles[role];
    setPermissions(permissions);
  };

  const handleShow = (s) => {
    let all = [
      createUser,
      addLectures,
      showLectures,
      searchForUser,
      createCourse,
      addAndDelCourseToUser,
      updateOrDeleteCourse,
      createAssignment,
      getAllSubmitedAssignment,
      submitAssignment,
    ];
    all.map((ele) => ele?.current?.classList?.remove("selected"));
    s.current.classList.add("selected");
    setShowOption(s.current.dataset.name);
    setIsSelected(true);
  };

  useEffect(() => {
    NavBarBasedOnUserRole();
  }, [user]);

  return (
    <div className='sidebar'>
      <h3 className='sidebar-header'>{t("Home.title")}</h3>
      <div className='navs-container'>
        <Accordion defaultActiveKey={["0"]} alwaysOpen className='drop-down'>
          {permissions?.user && (
            <Accordion.Item eventKey='0' style={{ marginBottom: "15px" }}>
              <Accordion.Header>{t("Home.User.title")}</Accordion.Header>
              <Accordion.Body>
                {permissions?.createUser && (
                  <div
                    className='dropdown-singleCard'
                    data-name='createUser'
                    ref={createUser}
                    onClick={() => handleShow(createUser)}
                  >
                    {t("Home.User.createUser.title")}
                  </div>
                )}
                {permissions?.searchForUser && (
                  <div
                    className='dropdown-singleCard'
                    data-name='searchForUser'
                    ref={searchForUser}
                    onClick={() => handleShow(searchForUser)}
                  >
                    {t("Home.User.searchForUser.title")}
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          )}
          {permissions?.course && (
            <Accordion.Item eventKey='1' style={{ marginBottom: "15px" }}>
              <Accordion.Header>{t("Home.Courses.title")}</Accordion.Header>
              <Accordion.Body>
                {permissions?.createCourse && (
                  <div
                    className='dropdown-singleCard'
                    data-name='createCourse'
                    ref={createCourse}
                    onClick={() => handleShow(createCourse)}
                  >
                    {t("Home.Courses.createCourse.title")}
                  </div>
                )}
                {permissions?.addAndDelCourseToUser && (
                  <div
                    className='dropdown-singleCard'
                    data-name='addAndDelCourseToUser'
                    ref={addAndDelCourseToUser}
                    onClick={() => handleShow(addAndDelCourseToUser)}
                  >
                    {t("Home.Courses.addDelCourse.title")}
                  </div>
                )}
                {permissions?.updateOrDeleteCourse && (
                  <div
                    className='dropdown-singleCard'
                    data-name='updateOrDeleteCourse'
                    ref={updateOrDeleteCourse}
                    onClick={() => handleShow(updateOrDeleteCourse)}
                  >
                    {t("Home.Courses.UpdateCourse.title")}
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          )}
          <Accordion.Item eventKey='2' style={{ marginBottom: "15px" }}>
            <Accordion.Header>{t("Home.lectures.title")}</Accordion.Header>
            <Accordion.Body>
              <div
                className='dropdown-singleCard'
                data-name='addLecture'
                ref={addLectures}
                onClick={() => handleShow(addLectures)}
              >
                {t("Home.lectures.addLectures")}
              </div>
              <div
                className='dropdown-singleCard'
                data-name='showLectures'
                ref={showLectures}
                onClick={() => handleShow(showLectures)}
              >
                {t("Home.lectures.showLectures")}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {permissions?.assignment && (
            <Accordion.Item eventKey='3' style={{ marginBottom: "15px" }}>
              <Accordion.Header>{t("Home.assignment.title")}</Accordion.Header>
              <Accordion.Body>
                {permissions?.createAssignment && (
                  <div
                    className='dropdown-singleCard'
                    data-name='createAssignment'
                    ref={createAssignment}
                    onClick={() => handleShow(createAssignment)}
                  >
                    {t("Home.assignment.createAssignment.title")}
                  </div>
                )}
                {permissions?.getAllSubmitedAssignment && (
                  <div
                    className='dropdown-singleCard'
                    data-name='getAllSubmitedAssignment'
                    ref={getAllSubmitedAssignment}
                    onClick={() => handleShow(getAllSubmitedAssignment)}
                  >
                    {t("Home.assignment.getAllSubmit.title")}
                  </div>
                )}
                {permissions?.submitAssignment && (
                  <div
                    className='dropdown-singleCard'
                    data-name='submitAssignment'
                    ref={submitAssignment}
                    onClick={() => handleShow(submitAssignment)}
                  >
                    {t("Home.assignment.submitAssignment.title")}
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default HomeSideBar;
