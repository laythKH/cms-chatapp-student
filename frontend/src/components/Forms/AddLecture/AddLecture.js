import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useAppContext } from "../../../context/appContext";

import "./addLecture.css";

function AddLecture() {
  const [courses, setCourses] = useState([
    { title: "الإنترنت والويب", Url: "", lectureTitle: "" },
    { title: "برمجة 1", Url: "", lectureTitle: "" },
    { title: "لغات البرمحة", Url: "", lectureTitle: "" },
  ]);
  const [titleOfLecture, setTitleOfLecture] = useState("");
  const [googleURL, setGoogleURL] = useState("");
  const [showModal, setShowModal] = useState({
    case: false,
    key: "",
  });

  const { t } = useAppContext();

  function handelAddLecture(course) {
    setShowModal({ case: true, key: course });
  }

  function closeModal() {
    setShowModal({ case: false, key: "" });
  }

  function handelSubmit() {
    courses.map((course) => {
      if (course.title === showModal.key) {
        course.Url = googleURL;
        course.lectureTitle = titleOfLecture;
      }
    });

    closeModal();
  }

  return (
    <>
      <Container className='d-flex main-holder'>
        {courses?.map((course) => {
          return (
            <Container key={course.title} className='single-lecture-holder'>
              <div className='title d-flex justify-content-between align-items-center single-lecture-header'>
                <h5>{course.title}</h5>
                <Button onClick={() => handelAddLecture(course.title)}>
                  Add Lecture
                </Button>
              </div>
              <hr />
              <div className='blocks-of-lectrues single-lecture-body'>
                {course.lectureTitle && (
                  <a className='single-url' href={course.Url}>
                    {course.lectureTitle}
                  </a>
                )}
              </div>
              <hr />
            </Container>
          );
        })}
      </Container>

      <Modal show={showModal.case} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold" }}>Add Lecture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handelSubmit}>
            <Form.Label style={{ marginTop: "20px" }}>
              Title of The Lecture
            </Form.Label>
            <Form.Control
              onChange={(e) => setTitleOfLecture(e.target.value)}
              type='text'
              placeholder='Enter...'
            />
            <Form.Label style={{ marginTop: "20px" }}>
              Google Drive URL
            </Form.Label>
            <Form.Control
              onChange={(e) => setGoogleURL(e.target.value)}
              type='text'
              placeholder='Enter...'
            />
            <Button
              onClick={handelSubmit}
              style={{ marginTop: "20px", width: "100%" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer
          style={{
            color: "rgb(25, 85, 148)",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {t("Home.Courses.createCourse.courseModal.modalFooter")}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddLecture;
