import React, { useEffect } from "react";
import Login from "./Login";

function FormPage() {


  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <Login />
      <spline-viewer

        style={{ position: "absolute", height: "100vh" }}
        url='https://prod.spline.design/Mto4n348N2Uebs8j/scene.splinecode'
      ></spline-viewer>
    </div>
  );
}

export default FormPage;
