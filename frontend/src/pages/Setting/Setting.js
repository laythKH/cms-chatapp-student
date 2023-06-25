import React, { useEffect, useState } from "react";

import NavBar from "../../components/NavBar/NavBar";
import SettingSideBar from "../../components/SettingSideBar/SettingSideBar";
import SettingContent from "../../components/SettingContent/SettingContent";

function Setting() {
  const [phoneCode, setPhoneCode] = useState([]);
  const [changeSettingContent, setChangeSettingContent] = useState("");

  function handelSettingContent(option) {
    setChangeSettingContent(option);
  }

  return (
    <>
      <NavBar />
      <SettingSideBar setChangeSettingContent={handelSettingContent} />
      <SettingContent option={changeSettingContent} />
    </>
  );
}

export default Setting;
