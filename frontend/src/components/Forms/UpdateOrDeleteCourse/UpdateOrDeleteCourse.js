import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import addSvg from "./plus-icon.svg";
import { useAppContext } from "../../../context/appContext";
import axios from "axios";
import deleteSvg from "./delete-icon.svg";
import "./updateOrDeleteCourse.css";
import Friend from "../../Friend/Friend";
import { useMediaQuery } from "react-responsive";

const UpdateOrDeleteCourse = () => {
  const [inputModalSearch, setInputModalSearch] = useState(" ");
  const [searchCourseResult, setSearchCourseResult] = useState([]);
  const [selectTypeOfSearch, setSelectTypeOfSearch] = useState("name");
  const [inputSearchTable, setInputSearchTable] = useState("");
  const [searchResults, setSearchResults] = useState();

  const [showModal, setShowModal] = useState(false);
  const [modalInfoValue, setModalInfoValue] = useState({});
  const [viewSearchBar, setViewSearchBar] = useState(false);
  const [searchInputFieldModal, setSearchInputFieldModal] = useState("");
  const [searchModalResult, setSearchModalResult] = useState();

  const { t, user, setAlertText, setShowAlert } = useAppContext();

  const hideModal = () => {
    setShowModal(false);
    setSearchInputFieldModal("");
    setViewSearchBar(false);
    setSearchModalResult();
  };

  const handleShowModal = (singleCourse) => {
    setModalInfoValue(singleCourse);
    setShowModal(true);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setModalInfoValue((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSearchCourse = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(`in axios =======> ${inputModalSearch}`);
      const { data } = await axios.get(
        `http://127.0.0.1:5000/api/v1/course/${inputModalSearch}`,
        config
      );
      console.log(data);

      if (data) {
        setSearchCourseResult(data);
        setSearchResults(data);
        console.log(data);

        setShowModal(false);
        setSearchInputFieldModal("");
        setViewSearchBar(false);
        setSearchModalResult();
        setAlertText("Course has been updated");
        setShowAlert(true);

        // handleSearchCourse();
      }
    } catch (error) {
      console.log(error);
      // setAlertText(error.response.data.msg)
      setShowAlert(true);
    }
  };

  const handleSearchModal = async () => {
    // console.log(searchInputField);
    if (!searchInputFieldModal) {
      setAlertText("Please Fill The Field");
      setShowAlert(true);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
      const { data } = await axios.get(
        `http://127.0.0.1:5000/api/v1/auth?search=${searchInputFieldModal}`,
        config
      );

      console.log(data);
      // setIsLoading(false)
      setSearchModalResult(data);
    } catch (error) {
      // console.log(error);
      setAlertText("Failed To Get Search Result");
      setShowAlert(true);
    }
  };

  const handleDeleteTeacher = () => {
    setModalInfoValue((oldValues) => ({ ...oldValues, teacher: null }));
  };

  const handleSelectTeacherModal = (teacher) => {
    setModalInfoValue((oldValues) => ({ ...oldValues, teacher: teacher }));
    setInputModalSearch("");
    setSearchModalResult();
    setViewSearchBar(false);
  };

  const handleRadioChange = (event) => {
    setSelectTypeOfSearch(event.target.value);
    console.log(selectTypeOfSearch);
  };

  const handleSearchTable = () => {
    if (searchCourseResult) {
      const filteredData = searchCourseResult.filter((item) => {
        // Check if the user input is an empty string
        if (!inputSearchTable) {
          return true;
        }
        // Check if the item's property matches the search input
        let itemValue;
        if (selectTypeOfSearch === "name") {
          itemValue = item[selectTypeOfSearch];
        } else {
          itemValue = item?.teacher?.name;
        }
        // console.log(`itemValue ==> ${itemValue}`);
        if (
          itemValue !== "" &&
          typeof itemValue !== "undefined" &&
          itemValue !== null
        ) {
          const searchValue = inputSearchTable.toLowerCase();
          return itemValue.toString().toLowerCase().includes(searchValue);
        }
        return false;
      });
      setSearchResults(filteredData);
    }
  };

  const handleUpdateCourse = async (singleCourse) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const { data } = await axios.patch(
        `http://127.0.0.1:5000/api/v1/course/${singleCourse._id}`,
        {
          name: singleCourse?.name,
          description: singleCourse?.description,
          teacher: singleCourse?.teacher?._id,
        },
        config
      );

      console.log(data);

      setShowModal(false);
      setSearchInputFieldModal("");
      setViewSearchBar(false);
      setSearchModalResult();
      setAlertText("Course has been updated");
      setShowAlert(true);

      handleSearchCourse();
    } catch (error) {
      console.log(error);
      // Handle error response
    }
  };

  const handleDeleteCourse = async (singleCourse) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `http://127.0.0.1:5000/api/v1/course/${singleCourse._id}`,
        config
      );

      console.log(data);

      setAlertText("Course has been deleted");
      setShowAlert(true);

      handleSearchCourse();
    } catch (error) {
      console.log(error);
      // Handle error response
    }
  };

  useEffect(() => {
    handleSearchCourse();
  }, []);

  useEffect(() => {

  }, [searchResults, setSearchResults]);

  useEffect(() => {
    handleSearchTable();
  }, [inputSearchTable, selectTypeOfSearch]);

  const isMatch = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  return (
    <>
      <div>
        <InputGroup className='mb-3'>
          <Form.Control
            style={{
              width: !isMatch ? "100%" : "auto",
              marginBottom: !isMatch ? "8px" : "0px",
            }}
            placeholder={t("Home.Courses.UpdateCourse.input")}
            aria-label="Recipient's username"
            aria-describedby='basic-addon2'
            value={inputSearchTable}
            onChange={(e) => setInputSearchTable(e.target.value)}
          />
          <InputGroup.Text id='basic-addon2'>
            <Form.Check
              inline
              label={t("Home.Courses.UpdateCourse.mentor")}
              name='group1'
              value='teacher'
              type='radio'
              id={`inline-radio-1`}
              checked={selectTypeOfSearch === "teacher"}
              onChange={handleRadioChange}
            />
          </InputGroup.Text>
          <InputGroup.Text id='basic-addon2'>
            <Form.Check
              inline
              label={t("Home.Courses.UpdateCourse.student")}
              name='group1'
              value='name'
              type='radio'
              id={`inline-radio-2`}
              checked={selectTypeOfSearch === "name"}
              onChange={handleRadioChange}
            />
          </InputGroup.Text>
        </InputGroup>
      </div>
      <Table striped='rows' className='styled-table'>
        <thead>
          <tr>
            <th style={{ width: "10px !important" }}>#</th>
            <th>{t("Home.Courses.UpdateCourse.table.name")}</th>
            <th>{t("Home.Courses.UpdateCourse.table.description")}</th>
            <th>{t("Home.Courses.UpdateCourse.table.mentor")}</th>
            <th>{t("Home.Courses.UpdateCourse.table.update")}</th>
            <th>{t("Home.Courses.UpdateCourse.table.delete")}</th>
          </tr>
        </thead>
        <tbody>
          {searchResults?.map((singleCourse, idx) => (
            <tr key={idx + singleCourse?.name}>
              <td style={{ width: "10px" }}>{idx + 1}</td>
              <td>{singleCourse?.name}</td>
              <td>{singleCourse?.description.slice(0, 20)}...</td>
              <td>{singleCourse?.teacher?.name}</td>
              <td>
                <Button
                  variant='outline-success'
                  onClick={() => handleShowModal(singleCourse)}
                >
                  {t("Home.Courses.UpdateCourse.table.update")}
                </Button>
              </td>
              <td>
                <Button
                  variant='danger'
                  onClick={() => handleDeleteCourse(singleCourse)}
                >
                  {t("Home.Courses.UpdateCourse.table.delete")}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Home.Courses.UpdateCourse.modal.head")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>
                {t("Home.Courses.UpdateCourse.modal.courseTitle")}
              </Form.Label>
              <Form.Control
                type='text'
                placeholder={t("Home.Courses.UpdateCourse.modal.courseTitle")}
                value={modalInfoValue?.name}
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>
                {t("Home.Courses.UpdateCourse.modal.courseDes")}
              </Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={modalInfoValue?.description}
              />
            </Form.Group>
            {modalInfoValue?.teacher && (
              <Row style={{ alignItems: "center" }}>
                <Col lg={10} xl={10}>
                  <Friend
                    singleUserResult={modalInfoValue?.teacher}
                    isGroupCard={true}
                  />
                </Col>
                <Col lg={2} xl={2}>
                  <div
                    style={{
                      backgroundColor: "#e57373",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={deleteSvg}
                      width='50px'
                      onClick={handleDeleteTeacher}
                    />
                  </div>
                </Col>
              </Row>
            )}
            {!modalInfoValue?.teacher && !viewSearchBar && (
              <Button
                style={{
                  width: "100%",
                  fontWeight: "600",
                  letterSpacing: "7px",
                  backgroundColor: "#26A69A",
                  borderColor: "#3949AB",
                }}
                onClick={() => setViewSearchBar(true)}
              >
                {t("Home.Courses.UpdateCourse.modal.addTeacher")}
              </Button>
            )}
            {viewSearchBar && (
              <Row className='align-items-center'>
                <Col xs={12} md={10} style={{ paddingBottom: "15px" }}>
                  <FloatingLabel
                    controlId='floatingInput'
                    label='Mentor Number OR Name'
                  >
                    <Form.Control
                      type='text'
                      value={searchInputFieldModal}
                      onChange={(e) => setSearchInputFieldModal(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col xs={12} md={2} style={{ paddingBottom: "15px" }}>
                  <Button
                    variant='secondary'
                    size='lg'
                    style={{ width: "100%", fontWeight: "bold" }}
                    onClick={handleSearchModal}
                  >
                    {t("Home.Courses.UpdateCourse.modal.Go")}
                  </Button>
                </Col>
              </Row>
            )}
            {searchModalResult &&
              searchModalResult?.map((item) => (
                <div>
                  <Friend
                    singleUserResult={item}
                    isGroupCard={false}
                    handleSelected={() => handleSelectTeacherModal(item)}
                  />
                </div>
              ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              width: "100%",
              fontWeight: "600",
              letterSpacing: "7px",
              backgroundColor: "#3F51B5",
              borderColor: "#3949AB",
            }}
            onClick={() => handleUpdateCourse(modalInfoValue)}
          >
            {t("Home.Courses.UpdateCourse.modal.updateBtn")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateOrDeleteCourse;
