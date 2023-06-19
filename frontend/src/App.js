import React from "react";
import FormPage from "./components/FormPage/FormPage";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
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
