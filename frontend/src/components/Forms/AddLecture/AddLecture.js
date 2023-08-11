import { useState, useEffect } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useAppContext } from "../../../context/appContext";
import axios from "axios";

import "./addLecture.css";

function AddLecture() {
  const { user, setAlertText, setShowAlert } = useAppContext();
  const [courses, setCourses] = useState();

  //   const [updatedCourse, setUpdatedCourse] = useState({});
  const [titleOfLecture, setTitleOfLecture] = useState("");
  const [googleURL, setGoogleURL] = useState("");
  const [courseId, setCourseId] = useState();
  const [showModal, setShowModal] = useState({
    case: false,
    key: "",
  });

  const { t } = useAppContext();

  function handelAddLecture(course) {
    setShowModal({ case: true, key: course });
    setCourseId(course?.courseId);
  }

  function closeModal() {
    setShowModal({ case: false, key: "" });
    setGoogleURL("");
    setTitleOfLecture("");
  }

  const handelSubmit = async () => {
    if (!googleURL || !titleOfLecture) {
      setAlertText("Please Provide All Values");
      setShowAlert(true);
      return;
    }

    const request = await axios.post("http://localhost:5000/api/v1/file/", {
      name: titleOfLecture,
      url: googleURL,
      courseId: courseId,
    });

    setAlertText("file created");
    setShowAlert(true);

    getAllInfo();
    closeModal();
  };

  const getAllInfo = async () => {
    try {
      const { data } = await axios(
        `http://localhost:5000/api/v1/file/${user._id}`
      );
      setCourses(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllInfo();
  }, [user]);

  if (!courses) {
    return <h1>There Is No Courses Yet</h1>;
  }

  return (
    <>
      <Container className='d-flex main-holder'>
        {courses &&
          courses?.map((course) => {
            return (
              <Container
                key={course?.courseName}
                className='single-lecture-holder'
              >
                <div className='title d-flex justify-content-between align-items-center single-lecture-header'>
                  <h5>{course?.courseName}</h5>
                  <Button onClick={() => handelAddLecture(course)}>
                    {t("Home.lectures.addLectures")}
                  </Button>
                </div>
                {course?.files?.length > 0 ? (
                  <>
                    <hr />
                    <div className='blocks-of-lectrues single-lecture-body'>
                      {course.files &&
                        course.files.map((singleUrl) => (
                          <a
                            className='single-url'
                            href={singleUrl.url}
                            target='_blank'
                          >
                            {singleUrl.name}
                          </a>
                        ))}
                    </div>
                    <hr />
                  </>
                ) : (
                  <div className='no-files'>There is no Files Yet</div>
                )}
              </Container>
            );
          })}
      </Container>

      <Modal show={showModal.case} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold" }}>
            {t("Home.lectures.modal.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handelSubmit}>
            <Form.Label style={{ marginTop: "20px" }}>
              {t("Home.lectures.modal.titleLec")}
            </Form.Label>
            <Form.Control
              onChange={(e) => setTitleOfLecture(e.target.value)}
              type='text'
              placeholder={t("Home.lectures.modal.titleLec")}
            />
            <Form.Label style={{ marginTop: "20px" }}>
              {t("Home.lectures.modal.google")}
            </Form.Label>
            <Form.Control
              onChange={(e) => setGoogleURL(e.target.value)}
              type='text'
              placeholder={t("Home.lectures.modal.google")}
            />
            <Button
              onClick={handelSubmit}
              style={{ marginTop: "20px", width: "100%" }}
            >
              {t("Home.lectures.modal.btn")}
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
