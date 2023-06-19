import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";

function Home() {
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
      {/* here should be one component and change the content depend on props */}
      {icon === "Home" && <SideBar props={""} />}
    </>
  );
}

export default Home;
