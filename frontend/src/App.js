import React from "react";
import FormPage from "./pages/LoginPage/FormPage";
import Error from "./pages/ErrorPage/Error";
import ChatApp from "./pages/ChatApp/ChatApp";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ChatPage from './pages/ChatPage/ChatPage';

export default function App() {
  return (
    <div style={{ backgroundColor: "white", height: "100vh", display: "flex" }}>
      <Routes>
        <Route path='/' element={<FormPage />} />
        <Route path='*' element={<Error />} />
        <Route path='/home' element={<ChatApp />} />
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </div>
  );
}
