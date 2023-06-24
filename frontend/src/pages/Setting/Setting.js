import React, { useEffect, useState } from "react";
import PhonePrefix from "./PhonePrefix.json";
import NavBar from "../../components/NavBar/NavBar";
import SettingSideBar from "../../components/SettingSideBar/SettingSideBar";
import SettingContent from "../../components/SettingContent/SettingContent";

function Setting() {
  const [phoneCode, setPhoneCode] = useState([]);
  const [changeSettingContent, setChangeSettingContent] = useState("");

  function handelSettingContent(option) {
    setChangeSettingContent(option);
  }
  useEffect(() => {
    setPhoneCode(PhonePrefix.countries);
  }, []);
  return (
    <>
      <NavBar />
      <SettingSideBar setChangeSettingContent={handelSettingContent} />
      <SettingContent option={changeSettingContent} />
    </>
  );
}

export default Setting;
