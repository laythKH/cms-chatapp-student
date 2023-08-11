import { useState, useEffect } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { Form } from "react-router-dom";
import { useAppContext } from "../../../context/appContext";
import "./showLecture.css";
import axios from "axios";

function ShowLecture() {
  const { user } = useAppContext();
  const [courses, setCourses] = useState();

  const { t } = useAppContext();

  const getAllFiles = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/file/student/${user?._id}`
    );

    setCourses(data);
  };

  useEffect(() => {
    if (user) {
      getAllFiles();
    }
  }, [user]);

  if (!courses) {
    return <h1>There is no Courses Yet</h1>;
  }

  return (
    <>
      <Container className='d-flex main-holder'>
        {courses?.map((course) => {
          return (
            <Container
              key={course.courseName}
              className='single-lecture-holder'
            >
              <div className='title d-flex justify-content-between align-items-center single-lecture-header'>
                <h5>{course.courseName}</h5>
              </div>
              {course?.files?.length > 0 ? (
                <>
                  <hr />
                  <div className='blocks-of-lectrues single-lecture-body w-100'>
                    {course.files &&
                      course.files.map((singleUrl) => (
                        <a
                          className='single-show-url w-100'
                          href={singleUrl.url}
                        >
                          {singleUrl.name}
                          <div className='download d-flex justify-content-center align-items-center'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              className='bi bi-download'
                              viewBox='0 0 16 16'
                            >
                              <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />
                              <path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z' />
                            </svg>
                          </div>
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
    </>
  );
}

export default ShowLecture;
