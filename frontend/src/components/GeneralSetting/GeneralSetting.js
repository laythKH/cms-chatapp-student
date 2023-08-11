import React, { useEffect, useReducer, useRef, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import "./GeneralSetting.css";
import Logo from "./choosejpg.jpg";
import PhonePrefix from "./PhonePrefix.json";
import { useAppContext } from "../../context/appContext";
import axios from 'axios'

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
  CITY: "city"
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
    case ACTIONS.CITY:
      return { ...state, city: action.payload.city };
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
  const [userData, setUserData] = useState('')
  const { t, user, setAlertText, setShowAlert, refetch, setRefetch } = useAppContext();
  const [showUpdateBtn, setShowUpdateBtn] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    profileImg: "",
    firstName: "",
    lastName: "",
    phoneCode: "",
    phoneNumber: "",
    email: "",
    birthday: "",
    gender: "",
    city: ""
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));

  }

  function finishChanges() {
    handelFinish(state);
    setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    dispatch({ type: ACTIONS.FINISH });

    return () => clearTimeout(timer);
  }

  const setDate = (dateOfBirth) => {
    if (dateOfBirth) {
      const newDate = new Date(dateOfBirth).toISOString().split('T')[0]
      return newDate
    } else {
      return ''
    }
  }

  const handleSaveChanges = async () => {
    // if (user.city === state.city && user.phoneNumber === state.phoneNumber && user.email === state.email) {
    //   setShowUpdateBtn(false)
    //   setAlertText('There Is No Changes')
    //   setShowAlert(true)
    //   return
    // }
    // console.log('New Changes');

    console.log(state);

    try {
      const { data } = await axios.patch(`http://localhost:5000/api/v1/auth/updateUserInfo/${user._id}`, { city: userData.city, phoneNumber: userData.phoneNumber, email: userData.email })
      console.log(data);
      if (data.updated) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        userInfo.city = data.user.city
        userInfo.phoneNumber = data.user.phoneNumber
        userInfo.email = data.user.email

        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        setRefetch(!refetch)
      }
      setAlertText('User Updated')
      setShowAlert(true)
      setShowUpdateBtn(false)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const isThereDifference = () => {
    if (user.city !== userData?.city || user.phoneNumber !== userData.phoneNumber || user.email !== userData.email) {
      setShowUpdateBtn(true)
    } else {
      setShowUpdateBtn(false)
    }
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
          birthday: setDate(user?.dateOfBirth),
          city: user?.city,
        },
      },

    });

    setUserData(user)
  }, [user]);



  useEffect(() => {
    if (user !== userData && userData !== '') {
      isThereDifference()
    }
  }, [userData])


  if (!user) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
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
              disabled
              readOnly
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
              disabled
              readOnly
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
              disabled
              readOnly
            />
            <Form.Label className='mt-3'>{t("Home.User.createUser.city")}</Form.Label>
            <Form.Control
              value={userData?.city}
              name="city"
              onChange={(e) => handleChange(e)}
              className='mb-4'
              placeHolder={`${t("Home.User.createUser.city")}...`}
            />
          </Form>
        </Container>
        <Container className='side2 mb-5 m-3'>
          <Form.Label className=''>
            {t("Home.User.createUser.phoneNumber")}:
          </Form.Label>
          {/*<div className='d-flex gap-2 mb-3'>
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
            </div>*/}
          <Form.Control
            value={userData?.phoneNumber}
            name="phoneNumber"
            onChange={(e) => handleChange(e)}
            className="gap-2 mb-3"
            placeholder="00000000000"
          />
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Label>{t("Home.User.createUser.email")}:</Form.Label>
            <Form.Control
              value={userData?.email}
              name="email"
              type='email'
              placeHolder={`${t("Home.User.createUser.email")}...`}
              onChange={(e) => handleChange(e)}
            />
            <Form.Label className='mt-4'>
              {t("Home.User.createUser.date")}:
            </Form.Label>
            <Form.Control

              name="dateOfBirth"
              type='date'
              disabled
              readOnly
            />
            <Form.Label className='mt-4'>
              {t("Home.User.createUser.Gender.selectGen")}:
            </Form.Label>
            <Form.Select
              value={state.gender}
              disabled
              readOnly
            >
              <option>{t("Home.User.createUser.Gender.op1")}</option>
              <option>{t("Home.User.createUser.Gender.op2")}</option>
            </Form.Select>
            {showUpdateBtn && <Button
              className="mt-4 w-100"
              style={{ fontWeight: '600', letterSpacing: '1.2px' }}
              onClick={() => handleSaveChanges()}
            >{t("Setting.generalSetting.changeBtn")}</Button>}
          </Form>
        </Container>
      </Container>





    </>
  );
}

export default GeneralSetting;
