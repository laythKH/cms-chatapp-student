import React, { useEffect, useReducer, useRef, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import "./GeneralSetting.css";
import Logo from "./choosejpg.jpg";
import PhonePrefix from "./PhonePrefix.json";
import { useAppContext } from "../../context/appContext";

const ACTIONS = {
  PROFILEIMG: "profileImg",
  FIRSTNAME: "firstName",
  LASTNAME: "lastName",
  PHONECODE: "phoneCode",
  PHONENUMBER: "phoneNumber",
  EMAIL: "email",
  BIRTHDAY: "birthday",
  GENDER: "gender",
  FINISH: "finish",
  SETUSERINFO: "setUserInfo",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.PROFILEIMG:
      return { ...state, profileImg: action.payload.url };
      break;
    case ACTIONS.SETUSERINFO:
      return { ...state, ...action.payload.userInfo };
      break;
    case ACTIONS.FIRSTNAME:
      return { ...state, firstName: action.payload.first };
      break;
    case ACTIONS.LASTNAME:
      return { ...state, lastName: action.payload.last };
      break;
    case ACTIONS.PHONECODE:
      return { ...state, phoneCode: action.payload.code };
      break;
    case ACTIONS.PHONENUMBER:
      return { ...state, phoneNumber: action.payload.number };
      break;
    case ACTIONS.EMAIL:
      return { ...state, email: action.payload.email };
      break;
    case ACTIONS.BIRTHDAY:
      return { ...state, birthday: action.payload.birthday };
      break;
    case ACTIONS.GENDER:
      return { ...state, gender: action.payload.gender };
      break;
    case ACTIONS.FINISH:
      return {
        profileImg: "",
        firstName: "",
        lastName: "",
        phoneCode: "",
        phoneNumber: "",
        email: "",
        birthday: "",
        gender: "",
      };
      break;
    default:
      return;
      break;
  }
}

function GeneralSetting({ handelFinish }) {
  const [phoneCode, setPhoneCode] = useState();
  const { t, user } = useAppContext();
  // console.log(user);
  const [state, dispatch] = useReducer(reducer, {
    profileImg: "",
    firstName: "",
    lastName: "",
    phoneCode: "",
    phoneNumber: "",
    email: "",
    birthday: "",
    gender: "",
  });

  const icon = useRef();
  const inp = useRef();

  useEffect(() => {
    setPhoneCode(PhonePrefix.countries);
  }, []);

  function handelImg(e) {
    dispatch({
      type: ACTIONS.PROFILEIMG,
      payload: { url: e.target.files[0] },
    });
  }

  const [showAlert, setShowAlert] = useState(false);

  function finishChanges() {
    handelFinish(state);
    setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    dispatch({ type: ACTIONS.FINISH });

    return () => clearTimeout(timer);
  }

  useEffect(() => {
    dispatch({
      type: ACTIONS.SETUSERINFO,
      payload: {
        userInfo: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          profileImg: user?.picture,
          email: user?.email,
          gender: user?.gender,
          phoneNumber: user?.phoneNumber,
          birthday: user?.dateOfBirth,
        },
      },
    });
  }, [user]);

  if (!user) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      {showAlert && (
        <div className='change-message'>
          {t("Setting.generalSetting.alertChange")}
        </div>
      )}
      <Container className='main-container d-flex align-items-start'>
        <Container className='side1 mb-5 m-3'>
          <div className='img-container d-flex justify-content-center align-items-center mb-2'>
            <Image
              className={state.profileImg}
              ref={icon}
              src={state.profileImg}
              roundedCircle
            />
            {/* state.profileImg && (
              <Image
                src={URL.createObjectURL(state.profileImg)}
                roundedCircle
              />
            ) */}
          </div>
          <Form
            onSubmit={(e) => e.preventDefault()}
            className='d-flex align-items-center gap-3'
          >
            <input
              className='mt-3 mb-4'
              ref={inp}
              onChange={(e) => handelImg(e)}
              type='file'
            />
          </Form>
          <Form onSubmit={(e) => e.preventDefault()} className='mt-3 '>
            <Form.Label>{t("Home.User.createUser.firstName")}</Form.Label>
            <Form.Control
              value={state.firstName}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.FIRSTNAME,
                  payload: { first: e.target.value },
                })
              }
              className='mb-4'
              placeHolder={`${t("Home.User.createUser.firstName")}...`}
            />
            <Form.Label>{t("Home.User.createUser.lastName")}:</Form.Label>
            <Form.Control
              value={state.lastName}
              placeHolder={`${t("Home.User.createUser.lastName")}...`}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.LASTNAME,
                  payload: { last: e.target.value },
                })
              }
            />
          </Form>
        </Container>
        <Container className='side2 mb-5 m-3'>
          <Form.Label className=''>
            {t("Home.User.createUser.phoneNumber")}:
          </Form.Label>
          <div className='d-flex gap-2 mb-3'>
            <Form.Select
              value={state.phoneCode}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.PHONECODE,
                  payload: { code: e.target.value },
                })
              }
              size='sm'
              className='select-code'
            >
              {phoneCode?.map((ele) => {
                return <option>{ele.code}</option>;
              })}
            </Form.Select>
            <Form.Control
              value={state.phoneNumber}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.PHONENUMBER,
                  payload: { number: e.target.value },
                })
              }
              type='number'
              placeHolder={`${state.phoneCode}000000000`}
            />
          </div>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Label>{t("Home.User.createUser.email")}:</Form.Label>
            <Form.Control
              value={state.email}
              type='email'
              placeHolder={`${t("Home.User.createUser.email")}...`}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.EMAIL,
                  payload: { email: e.target.value },
                })
              }
            />
            <Form.Label className='mt-4'>
              {t("Home.User.createUser.date")}:
            </Form.Label>
            <Form.Control
              value={state.birthday}
              type='date'
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.BIRTHDAY,
                  payload: { birthday: e.target.value },
                })
              }
            />
            <Form.Label className='mt-4'>
              {t("Home.User.createUser.Gender.selectGen")}:
            </Form.Label>
            <Form.Select
              value={state.gender}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.GENDER,
                  payload: { gender: e.target.value },
                })
              }
            >
              <option>{t("Home.User.createUser.Gender.op1")}</option>
              <option>{t("Home.User.createUser.Gender.op2")}</option>
            </Form.Select>
          </Form>
        </Container>
      </Container>
      <Container className='submit-container'>
        <Button
          onClick={() => finishChanges()}
          className='submit-btn w-100 p-2'
        >
          <span>{t("Setting.generalSetting.changeBtn")}</span>
        </Button>
      </Container>
    </>
  );
}

export default GeneralSetting;
