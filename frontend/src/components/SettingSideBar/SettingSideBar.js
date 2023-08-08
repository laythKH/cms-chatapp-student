import React, { useRef, useState } from "react";
import "./SettingSideBar.css";
import { useAppContext } from "../../context/appContext";

function SettingSideBar({ setChangeSettingContent, setIsSelected }) {
  // const [isSelected, setIsSelected] = useState(false);
  const general = useRef();
  const info = useRef();
  const password = useRef();

  const { t } = useAppContext();

  function handelSetting(option) {
    let all = [general, info, password];
    all.map((ele) => ele.current.classList.remove("selected"));
    option.current.classList.add("selected");
    setChangeSettingContent(option.current.dataset.name);
    setIsSelected(true);
  }

  return (
    <div className={`sidebar`}>
      <div className='sidebar-header'>
        <h3>{t("Setting.title")}</h3>
      </div>
      <div className='friends-container-holder'>
        <div className='upper-style'></div>
        <div className='down-style'></div>
        <div className='friends-container setting-list'>
          <h5
            data-name='general'
            onClick={() => handelSetting(general)}
            ref={general}
          >
            {t("Setting.generalSetting.title")}
          </h5>
          <h5 data-name='info' onClick={() => handelSetting(info)} ref={info}>
            {t("Setting.personalInfo.title")}
          </h5>
          <h5
            data-name='password'
            onClick={() => handelSetting(password)}
            ref={password}
          >
            {t("Setting.changePassword.title")}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default SettingSideBar;
