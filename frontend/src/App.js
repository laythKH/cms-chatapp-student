import React from "react";
import FormPage from "./pages/LoginPage/FormPage";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <Routes>
        <Route path='/' element={<FormPage />} />
        <Route path='*' element={<Error />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}
