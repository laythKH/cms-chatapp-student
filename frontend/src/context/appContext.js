import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
// import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const [listChats, setListChats] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const handleRedirect = useCallback((path) => {
    if (window.location.pathname !== path) {
      window.location.href = path;
    }
  }, []);
  // const user1 = {
  //   _id: 938591985092,
  //   name: "mario abood",
  //   firstName: "mario",
  //   lastName: "abood",
  //   phoneNumber: "0000000000",
  //   studentNumber: "1020001",
  //   picture: "",
  //   gender: "male",
  //   password: "300200100",
  //   role: "admin",
  //   courses: [],
  //   dateOfBirth: "",
  // };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (!userInfo) {
      handleRedirect("/login")
    }
    setUser(userInfo)
  }, [])
  // useEffect(() => {
  //   localStorage.setItem("userInfo", JSON.stringify(user1));
  // });

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  //   if (!userInfo) {
  //     handleRedirect("/login");
  //   }

  //   console.log(user);

  //   setUser(userInfo);
  // }, [handleRedirect, setUser]);

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
