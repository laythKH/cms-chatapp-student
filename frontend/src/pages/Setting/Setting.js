import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import NavBar from "../../components/NavBar/NavBar";
import SettingSideBar from "../../components/SettingSideBar/SettingSideBar";
import SettingContent from "../../components/SettingContent/SettingContent";

function Setting({ handelLang, lang }) {
  const [changeSettingContent, setChangeSettingContent] = useState("");

  function handelSettingContent(option) {
    setChangeSettingContent(option);
  }

  const isMatch = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      <NavBar handelLang={handelLang} lang={lang} />
      {(isMatch || !isSelected) && (
        <SettingSideBar
          setChangeSettingContent={handelSettingContent}
          setIsSelected={setIsSelected}
        />
      )}
      {(isMatch || isSelected) && (
        <SettingContent
          option={changeSettingContent}
          isMatch={!isMatch}
          setIsSelected={setIsSelected}
        />
      )}
    </>
  );
}

export default Setting;
