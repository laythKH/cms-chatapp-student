import React from "react";
import FormPage from "./pages/LoginPage/FormPage";
import Error from "./pages/ErrorPage/Error";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage/ChatPage";
import Setting from "./pages/Setting/Setting";
import HomePage from "./pages/HomePage/HomePage";

export default function App() {
  return (
    <div style={{ backgroundColor: "white", height: "100vh", display: "flex" }}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<FormPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/setting' element={<Setting />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}
