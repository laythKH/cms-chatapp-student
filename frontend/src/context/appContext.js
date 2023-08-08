import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
// import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useTranslation } from "react-i18next";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const [listChats, setListChats] = useState([]);
  const [refetch, setRefetch] = useState(false);

  // console.log(user || 'user');

  const defaultValue = {
    _id: "648f36d1a19039c85a133b8b",
    email: "salim@gmail.com",
    name: "salim Alkhouy",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    role: "admin",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGYzNmQxYTE5MDM5Yzg1YTEzM2I4YiIsImlhdCI6MTY4NzQ0MjcxMCwiZXhwIjoxNjg3NTI5MTEwfQ.k7C8mVb2Wq3kfp9TfcPc8u7RQjhrD_Sc4URm_74agZ4",
  };

  const history = createBrowserHistory();

  // const handleRedirect = useCallback((path) => {
  //    history.push(path);
  // }, [history]);

  const handleRedirect = useCallback((path) => {
    if (window.location.pathname !== path) {
      window.location.href = path;
    }
  }, []);

  const user1 = {
    _id: 938591985092,
    name: "mario abood",
    firstName: "mario",
    lastName: "abood",
    phoneNumber: "0000000000",
    studentNumber: "1020001",
    picture: "",
    gender: "male",
    password: "300200100",
    role: "admin",
    courses: [],
    dateOfBirth: "",
  };

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(user1));
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      handleRedirect("/login");
    }

    console.log(user);

    setUser(userInfo);
  }, [handleRedirect, setUser]);

  const { t, i18n } = useTranslation();

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        showAlert,
        setShowAlert,
        alertText,
        setAlertText,
        isLoading,
        setIsLoading,
        selectedChat,
        setSelectedChat,
        listChats,
        setListChats,
        refetch,
        setRefetch,
        t,
        i18n,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
