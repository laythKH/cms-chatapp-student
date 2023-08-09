import React, { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { Form } from "react-router-dom";
import { useAppContext } from "../../../context/appContext";
import "./showLecture.css";

function ShowLecture() {
  const [courses, setCourses] = useState([
    { title: "الإنترنت والويب", Url: "", lectureTitle: "MARIO" },
    { title: "برمجة 1", Url: "", lectureTitle: "LAYITH" },
    { title: "لغات البرمحة", Url: "", lectureTitle: "" },
  ]);

  const { t } = useAppContext();

  return (
    <>
      <Container className='d-flex main-holder'>
        {courses?.map((course) => {
          return (
            <Container key={course.title} className='single-lecture-holder'>
              <div className='title d-flex justify-content-between align-items-center single-lecture-header'>
                <h5>{course.title}</h5>
              </div>
              <hr />
              <div className='blocks-of-lectrues single-lecture-body w-100'>
                {course.lectureTitle && (
                  <a className='single-show-url w-100' href={course.Url}>
                    {course.lectureTitle}
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
                )}
              </div>
              <hr />
            </Container>
          );
        })}
      </Container>
    </>
  );
}

export default ShowLecture;
