import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import ChatPage from "../ChatPage/ChatPage";

function ChatApp() {
  const [icon, setIcons] = useState("");

  function changeIcons(icon) {
    switch (icon) {
      case "Home":
        setIcons("Home");
        break;
      case "chating":
        setIcons("chating");
        break;
      default:
        setIcons("");
        break;
    }
    console.log(icon);
  }

  return (
    <>
      <NavBar changeIcons={changeIcons} />
      {/* here should be one component and change the content depend on props and mario */}
      {/* {icon === "Home" && <SideBar props={""} />} */}
      {/* icon === "Home" && <ChatPage props={""} /> */}
    </>
  );
}

export default ChatApp;
