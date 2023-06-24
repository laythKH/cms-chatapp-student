import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import "./SettingSideBar.css";

function SettingSideBar({ setChangeSettingContent }) {
  const general = useRef();
  const info = useRef();
  const password = useRef();

  function handelSetting(option) {
    let all = [general, info, password];
    all.map((ele) => ele.current.classList.remove("selected"));
    option.current.classList.add("selected");
    setChangeSettingContent(option.current.dataset.name);
  }
  return (
    <div className={`sidebar`}>
      <div className='sidebar-header'>
        <h3>Setting</h3>
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
            General Setting
          </h5>
          <h5 data-name='info' onClick={() => handelSetting(info)} ref={info}>
            Personal Info
          </h5>
          <h5
            data-name='password'
            onClick={() => handelSetting(password)}
            ref={password}
          >
            Change Password
          </h5>
        </div>
      </div>
    </div>
  );
}

export default SettingSideBar;
