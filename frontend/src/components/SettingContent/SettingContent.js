import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./SettingContent.css";
import Modal from "react-bootstrap/Modal";
import GeneralSetting from "../GeneralSetting/GeneralSetting";

function SettingContent({ option, isMatch, setIsSelected }) {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [modalText, setModalText] = useState("");
  const [show, setShow] = useState(false);
  const [color, setColor] = useState(false);
  const [generalFinish, setGeneralFinish] = useState({});

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
    console.log(state);
  }

  let handelClose = () => setShow(false);
  return (
    <>
      <Container className={`setting-content show-${option}`}>
        <Container className='general' style={{ position: "absolute" }}>
          <div className='head mb-5 m-3 d-flex align-items-center gap-4'>
            {isMatch && (
              <span onClick={() => setIsSelected(false)} className='back'>
                back
              </span>
            )}
            <h1>General Setting</h1>
          </div>
          <GeneralSetting handelFinish={handelGeneralFinish} />
        </Container>
        <Container className='info' style={{ position: "absolute" }}>
          <div className='head mb-5 m-3 d-flex align-items-center gap-4'>
            {isMatch && (
              <span onClick={() => setIsSelected(false)} className='back'>
                back
              </span>
            )}
            <h1>Personal Info</h1>
          </div>
        </Container>
        <Container className='password' style={{ position: "absolute" }}>
          <div className='head mb-5 m-3 d-flex align-items-center gap-4'>
            {isMatch && (
              <span onClick={() => setIsSelected(false)} className='back'>
                back
              </span>
            )}
            <h1>Change Password</h1>
          </div>
          <Form onSubmit={handelsubmit} className='change-password mb-5 m-3'>
            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Label>Old password</Form.Label>
              <Form.Control type='password' placeholder='old password...' />
            </Form.Group>
            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Label>New password</Form.Label>
              <Form.Control
                onChange={(e) => setInput1(e.target.value)}
                type='password'
                placeholder='new password...'
              />
            </Form.Group>
            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Label>confirm new password</Form.Label>
              <Form.Control
                onChange={(e) => setInput2(e.target.value)}
                type='password'
                placeholder='confirm new password...'
              />
            </Form.Group>
            <Button
              onClick={handelsubmit}
              style={{ backgroundColor: "rgb(25, 85, 148)" }}
              type='submit'
            >
              Change
            </Button>
          </Form>
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
