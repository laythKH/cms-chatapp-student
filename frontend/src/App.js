import React from "react";
import Login from "./components/FormPage/Login";
import FormPage from "./components/FormPage/FormPage";
import { Routes, Route } from "react-router-dom";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import "./App.css";

export default function App() {
  return (
    <div style={{ backgroundColor: "white", height: '100vh' }}>
      <Routes>
        <Route path='/' element={<FormPage />} />
        <Route path='*' element={<Error />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}
