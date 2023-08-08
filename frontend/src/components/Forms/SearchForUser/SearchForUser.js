import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useAppContext } from "../../../context/appContext";
import CreateUser from "../CreateUser/CreateUser";
import axios from "axios";

import "./searchField.css";

const SearchForUser = () => {
  const [searchInput, setSearchInput] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { t, user, setAlertText, setShowAlert } = useAppContext();

  const handleSearch = async () => {
    if (!searchInput) {
      setAlertText("Please Input Value");
      setShowAlert(true);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://127.0.0.1:5000/api/v1/auth?search=${searchInput}`,
        config
      );
      // console.log(data);
      // console.log(data[0]);
      if (data.length === 0) {
        setAlertText("there is no with this info");
        setShowAlert(true);
      } else {
        setUserInfo(data[0]);
        setShowUserInfo(true);
        setSearchInput("");
      }
    } catch (error) {
      setAlertText(error.response.data.msg);
      setShowAlert(true);
    }
  };

  useEffect(() => {}, [userInfo]);

  return (
    <div
      className='hide-scrollbar'
      style={{
        width: "100%",
        height: "100vh",
        overflow: "scroll",
        scrollbarWidth: "none",
        padding: "0 0 20px 0",
      }}
    >
      <h4>{t("Home.User.searchForUser.title")}</h4>
      <InputGroup className='mb-3'>
        <Form.Control
          placeholder={t("Home.User.searchForUser.input")}
          aria-label="Recipient's username"
          aria-describedby='basic-addon2'
          style={{ padding: "15px 10px" }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant='secondary' id='button-addon2' onClick={handleSearch}>
          {t("Home.User.searchForUser.button")}
        </Button>
      </InputGroup>
      <div style={{ padding: "20px" }}>
        {showUserInfo && (
          <CreateUser
            userInfo={userInfo}
            isUpdate={true}
            setShowUserInfo={setShowUserInfo}
          />
        )}
      </div>
    </div>
  );
};

export default SearchForUser;
