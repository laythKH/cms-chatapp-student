import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import Friend from "../../Friend/Friend";
import { useEffect, useState } from "react";
import { Col, FloatingLabel, Image, InputGroup, Row } from "react-bootstrap";
import { useAppContext } from "../../../context/appContext";
import axios from "axios";
import DeleteSvg from "./icons8-delete.svg";

const CreateCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchInputField, setSearchInputField] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();
  const {
    t,
    isLoading,
    setIsLoading,
    setAlertText,
    alertText,
    setShowAlert,
    user,
  } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    teacher: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseShowModel = () => {
    setShowModal(false);
    setSearchInputField("");
    setSearchResult([]);
  };

  const handleSearch = async () => {
    if (!searchInputField) {
      setAlertText("Please Fill The Field");
      setShowAlert(true);
      return;
    }

    try {
      setIsLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://127.0.0.1:5000/api/v1/auth?search=${searchInputField}`,
        config
      );

      setIsLoading(false);
      setSearchResult(data);
    } catch (error) {
      setAlertText("Failed To Get Search Result");
      setShowAlert(true);
    }
  };

  const handleSelected = (singleUserResult) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      teacher: singleUserResult._id,
    }));

    setSelectedTeacher(singleUserResult);
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      };
<<<<<<< HEAD

      if (formData.teacher) {
        const { data } = await axios.post(
          `http://127.0.0.1:5000/api/v1/course/`,
          { ...formData },
          config
        );
      } else {
        const { data } = await axios.post(
          `http://127.0.0.1:5000/api/v1/course/`,
          { name: formData?.name, description: formData?.description },
          config
        );
      }
=======
>>>>>>> 7a6b414d4fc21b14418adc190454a9a48bde7dae

      if (formData.teacher) {
        const { data } = await axios.post(`http://127.0.0.1:5000/api/v1/course/`, { ...formData }, config)
      } else {
        const { data } = await axios.post(`http://127.0.0.1:5000/api/v1/course/`, { name: formData?.name, description: formData?.description }, config)
      }


      setAlertText('Course Created')
      setShowAlert(true)
    } catch (error) {
      setAlertText(error.response.data.msg)
      setShowAlert(true)
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    console.log(selectedTeacher);
  }, [formData, setFormData, selectedTeacher]);

  return (
    <>
      <Form style={{ padding: "20px 0" }}>
        <Form.Group className='mb-3' controlId='formGridAddress1'>
          <Form.Label>{t("Home.Courses.createCourse.courseName")}: </Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder={t("Home.Courses.createCourse.courseName")}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>{t("Home.Courses.createCourse.CourseDes")}</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder={t("Home.Courses.createCourse.CourseDes")}
          />
        </Form.Group>

=======


  return (
    <>
      <Form>
>>>>>>> 7a6b414d4fc21b14418adc190454a9a48bde7dae
        <Form.Group
          className='mb-3'
          controlId='exampleForm.ControlTextarea1'
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #6c757d",
            paddingTop: "10px",
          }}
        >
          <Form.Label>{t("Home.Courses.createCourse.addMentor")}</Form.Label>
          <Button variant='primary' onClick={(e) => handleShowModal(e)}>
            {t("Home.Courses.createCourse.addMentorBtn")}
          </Button>
        </Form.Group>
        {selectedTeacher && (
          <Row style={{ alignItems: "center" }}>
            <Col lg={10} xl={10}>
              <Friend singleUserResult={selectedTeacher} isGroupCard={true} />
            </Col>
            <Col lg={2} xl={2}>
              <div
                style={{
                  backgroundColor: "#e57373",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={() => setSelectedTeacher()}
              >
                <Image src={DeleteSvg} width='50px' />
              </div>
            </Col>
          </Row>
        )}

        <Button
          variant='primary'
          type='submit'
          onClick={(e) => handleCreateCourse(e)}
        >
          {t("Home.Courses.createCourse.create")}
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseShowModel}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold" }}>
            {t("Home.Courses.createCourse.courseModal.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='align-items-center'>
            <Col xs={12} md={10} style={{ paddingBottom: "15px" }}>
              <FloatingLabel
                controlId='floatingInput'
                label={t("Home.Courses.createCourse.courseModal.input")}
              >
                <Form.Control
                  type='text'
                  value={searchInputField}
                  onChange={(e) => setSearchInputField(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col xs={12} md={2} style={{ paddingBottom: "15px" }}>
              <Button
                onClick={handleSearch}
                variant='secondary'
                size='lg'
                style={{ width: "100%", fontWeight: "bold" }}
              >
                {t("Home.Courses.createCourse.courseModal.btn")}
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "scroll",
            padding: "0 20px",
          }}
        >
          {isLoading && <h1>Loading...</h1>}
          {!isLoading &&
            searchResult &&
            searchResult?.map((singleUserResult) => (
              <Friend
                key={singleUserResult.name + singleUserResult.studentNumber}
                singleUserResult={singleUserResult}
                handleSelected={() => {
                  handleSelected(singleUserResult);
                  handleCloseShowModel();
                }}
                isGroupCard={false}
              />
            ))}
        </div>
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
};

export default CreateCourse;
