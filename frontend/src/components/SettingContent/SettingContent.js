import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./SettingContent.css";
import Modal from "react-bootstrap/Modal";
import GeneralSetting from "../GeneralSetting/GeneralSetting";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import { useAppContext } from "../../context/appContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import AlertShow from "../Alert/AlertShow";


function SettingContent({ option, isMatch, setIsSelected }) {
  const navigate = useNavigate();
  const { user, setAlertText, setShowAlert } = useAppContext()
  const [oldPassword, setOldPassword] = useState('')
  const [newPass, setNewPass] = useState('');
  const [confimNewPass, setConfrimNewPass] = useState('');


  const [modalText, setModalText] = useState("");
  const [show, setShow] = useState(false);
  const [color, setColor] = useState(false);
  const [generalFinish, setGeneralFinish] = useState({});

  const { t } = useAppContext();

  const handelsubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPass || !confimNewPass) {
      setAlertText('Please Provide All Values')
      setShowAlert(true)
      return
    }
    if (newPass !== confimNewPass) {
      setAlertText('Please Check Your confirm and new password')
      setShowAlert(true)
    }


    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/update-password',
        { oldPassword, newPassword: newPass, id: user?._id }
      )

      if (data?.updated === true) {
        localStorage.removeItem('userInfo')
        navigate('/login')
      }

      console.log(data);
    } catch (error) {
      setAlertText(error?.response?.data?.msg)
      setShowAlert(true)
    }
  }

  function handelGeneralFinish(state) {
    setGeneralFinish(state);
  }

  let handelClose = () => setShow(false);
  return (
    <>
      <Container className={`setting-content show-${option}`}>
        <Container className='general' style={{ position: "absolute" }}>
          <div className='head mb-5 m-3 d-flex align-items-center gap-4'>
            {isMatch && (
              <span onClick={() => setIsSelected(false)} className='back'>
                {t("Setting.back")}
              </span>
            )}
            <h1>{t("Setting.generalSetting.title")}</h1>
          </div>
          <GeneralSetting handelFinish={handelGeneralFinish} />
        </Container>
        <Container className='info' style={{ position: "absolute" }}>
          <div className='head mb-5 m-3 d-flex align-items-center gap-4'>
            {isMatch && (
              <span onClick={() => setIsSelected(false)} className='back'>
                {t("Setting.back")}
              </span>
            )}
            <h1> {t("Setting.personalInfo.title")}</h1>
          </div>
          <PersonalInfo />
        </Container>
        {/* //change password */}

        <Container className='password' style={{ position: "absolute" }}>
          <div className='head mb-5 m-3 d-flex align-items-center gap-4'>
            {isMatch && (
              <span onClick={() => setIsSelected(false)} className='back'>
                {t("Setting.back")}
              </span>
            )}
            <h1> {t("Setting.changePassword.title")}</h1>
          </div>
          <Form onSubmit={handelsubmit} className='change-password mb-5 m-3'>
            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Label>{t("Setting.changePassword.input1")}</Form.Label>
              <Form.Control
                type='text'
                placeholder={`${t("Setting.changePassword.input1")}...`}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Label>{t("Setting.changePassword.input2")}</Form.Label>
              <Form.Control
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                type='text'
                placeholder={`${t("Setting.changePassword.input2")}...`}
              />
            </Form.Group>
            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Label>{t("Setting.changePassword.input3")}</Form.Label>
              <Form.Control
                value={confimNewPass}
                onChange={(e) => setConfrimNewPass(e.target.value)}
                type='text'
                placeholder={`${t("Setting.changePassword.input3")}...`}
              />
            </Form.Group>
            <Button
              onClick={handelsubmit}
              style={{ backgroundColor: "rgb(25, 85, 148)" }}
              type='submit'
            >
              {t("Setting.changePassword.btn")}
            </Button>
          </Form>
          {/*  modal */}
          <Modal show={show} onHide={handelClose}>
            <Modal.Header
              style={{
                backgroundColor: color
                  ? "rgb(83, 241, 83)"
                  : "rgb(247, 48, 48)",
              }}
              closeButton
            ></Modal.Header>
            <Modal.Body
              style={{
                backgroundColor: color
                  ? "rgb(83, 241, 83)"
                  : "rgb(247, 48, 48)",
              }}
            >
              {modalText}
            </Modal.Body>
            <Modal.Footer
              style={{
                backgroundColor: color
                  ? "rgb(83, 241, 83)"
                  : "rgb(247, 48, 48)",
              }}
            >
              click anywhere to exit
            </Modal.Footer>
          </Modal>
        </Container>
      </Container>


      {<AlertShow />}
    </>
  );
}

export default SettingContent;
