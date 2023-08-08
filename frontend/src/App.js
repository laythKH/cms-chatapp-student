import React, { useEffect, useState } from "react";
import FormPage from "./pages/LoginPage/FormPage";
import Error from "./pages/ErrorPage/Error";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage/ChatPage";
import Setting from "./pages/Setting/Setting";
import HomePage from "./pages/HomePage/HomePage";
import { useAppContext } from "./context/appContext";

const App = () => {
  const [lang, setLang] = useState(false);

  const { i18n } = useAppContext();

  function handelLang() {
    if (lang) {
      i18n.changeLanguage("ar");
      document.querySelector("html").dir = "rtl";
    } else {
      i18n.changeLanguage("en");
      document.querySelector("html").dir = "ltr";
    }
    setLang((prevLang) => !prevLang);
    console.log("mario");
  }
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        display: "flex",
        width: "100%",
      }}
    >
      <Routes>
        <Route path='/' element={<HomePage handelLang={handelLang} />} />
        <Route
          path='/login'
          element={<FormPage lang={lang} handelLang={handelLang} />}
        />
        <Route path='/chat' element={<ChatPage handelLang={handelLang} />} />
        <Route path='/setting' element={<Setting handelLang={handelLang} />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
};
export default App;
