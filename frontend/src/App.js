import React from "react";
import FormPage from "./pages/LoginPage/FormPage";
import Error from "./pages/ErrorPage/Error";
import ChatApp from "./pages/ChatApp/ChatApp";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage/ChatPage";

export default function App() {
  return (
    <div style={{ backgroundColor: "white", height: "100vh", display: 'flex' }}>
      <Routes>
        <Route path='/' element={<FormPage />} />
        <Route path='*' element={<Error />} />
<<<<<<< HEAD
        <Route path='/chatapp' element={<ChatApp />} />
=======
        <Route path='/home' element={<Home />} />
        <Route path='/chat' element={<ChatPage />} />
>>>>>>> c9a4869feef307734303d797c5c5a76ed81f8bf8
      </Routes>
    </div>
  );
}
