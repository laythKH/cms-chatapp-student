import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./SettingContent.css";
import Modal from "react-bootstrap/Modal";
import GeneralSetting from "../GeneralSetting/GeneralSetting";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import { useAppContext } from "../../context/appContext";

function SettingContent({ option, isMatch, setIsSelected }) {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [modalText, setModalText] = useState("");
  const [show, setShow] = useState(false);
  const [color, setColor] = useState(false);
  const [generalFinish, setGeneralFinish] = useState({});

  const { t } = useAppContext();

  function handelsubmit(e) {
    e.preventDefault();
    if (input1 === input2) {
      setColor(true);
      setModalText("change password successfuly");
      setShow(true);
    } else {
      setColor(false);
      setModalText("the confirmation password does not match");
      setShow(true);
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
                type='password'
                placeholder={`${t("Setting.changePassword.input1")}...`}
              />
            </Form.Group>
            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Label>{t("Setting.changePassword.input2")}</Form.Label>
              <Form.Control
                onChange={(e) => setInput1(e.target.value)}
                type='password'
                placeholder={`${t("Setting.changePassword.input2")}...`}
              />
            </Form.Group>
            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Label>{t("Setting.changePassword.input3")}</Form.Label>
              <Form.Control
                onChange={(e) => setInput2(e.target.value)}
                type='password'
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
    </>
  );
}

export default SettingContent;
