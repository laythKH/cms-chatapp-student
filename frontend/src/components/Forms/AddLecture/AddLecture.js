import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useAppContext } from "../../../context/appContext";

function AddLecture() {
  const [courses, setCourses] = useState([
    { title: "math", Url: "", lectureTitle: "" },
    { title: "Net & web", Url: "", lectureTitle: "" },
    { title: "Programming", Url: "", lectureTitle: "" },
  ]);
  //   const [updatedCourse, setUpdatedCourse] = useState({});
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
    <Container
      style={{
        flexWrap: "wrap",
        gap: "10px",
      }}
      className='d-flex'
    >
      {courses?.map((course) => {
        return (
          <Container
            key={course.title}
            style={{
              width: "350px",
              padding: "20px",
              border: "1px solid black",
              height: "300px",
            }}
          >
            <div className='title d-flex justify-content-between align-items-center'>
              <h5>{course.title}</h5>
              <Button onClick={() => handelAddLecture(course.title)}>
                add lecture
              </Button>
            </div>
            <hr />
            <div className='blocks-of-lectrues'>
              <Form.Label style={{ marginTop: "20px" }}>
                Google Drive URL
              </Form.Label>
              <br />
              {course.lectureTitle}:
              <a
                style={{
                  padding: "10px",
                  marginTop: "5px",
                  width: "10%",
                }}
                href='#'
              >
                <br />
                {course.Url}
              </a>
            </div>
            <hr />
          </Container>
        );
      })}

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
    </Container>
  );
}

export default AddLecture;
