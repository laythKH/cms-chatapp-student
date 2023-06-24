import React, { useEffect, useState } from "react";
import PhonePrefix from "./PhonePrefix.json";
import NavBar from "../../components/NavBar/NavBar";

function Setting() {
  const [phoneCode, setPhoneCode] = useState([]);
  useEffect(() => {
    setPhoneCode(PhonePrefix.countries)
  }, []);
  return (
    <>
      <NavBar />
      <h1>mario</h1>
    </>
  );
}

export default Setting;
