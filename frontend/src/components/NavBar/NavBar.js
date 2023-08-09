import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/Logo.png";

import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

function NavBar({ handelLang, lang }) {
  const { user, setUser } = useAppContext();

  function handleLogout() {
    localStorage.removeItem("userInfo");
    setUser({});
  }

  return (
    <Navbar className='h-100  text-center'>
      <Navbar.Brand className='m-2'>
        <Image src={Logo} rounded />
      </Navbar.Brand>
      <Nav>
        <NavLink
          to='/'
          style={(isActive) => {
            return isActive.isActive
              ? {
                  borderRadius: "4px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }
              : {};
          }}
          data-name='Home'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            className='bi bi-house-door-fill'
            viewBox='0 0 16 16'
          >
            <path d='M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z' />
          </svg>
        </NavLink>
        <NavLink
          to='/chat'
          data-name='chating'
          style={(isActive) => {
            return isActive.isActive
              ? {
                  borderRadius: "4px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }
              : {};
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            className='bi bi-chat-fill'
            viewBox='0 0 16 16'
          >
            <path d='M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z' />
          </svg>
        </NavLink>
        <NavLink
          onClick={handelLang}
          style={{ textDecoration: "none" }}
          data-name='translate'
        >
          <svg
            style={{ marginBottom: "5px" }}
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-translate'
            viewBox='0 0 16 16'
          >
            <path d='M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z' />
            <path d='M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z' />
          </svg>
          {lang ? "AR" : "EN"}
        </NavLink>
        <div className='position-absolute'>
          <NavLink
            style={(isActive) => {
              return isActive.isActive
                ? {
                    borderRadius: "4px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }
                : {};
            }}
            to='/setting'
            data-name='setting'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z' />
            </svg>
          </NavLink>
          <NavLink
            to='/login'
            data-name='Log out'
            className='logOut'
            onClick={() => {
              handleLogout();
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              className='bi bi-box-arrow-left'
              viewBox='0 0 16 16'
            >
              <path
                fill-rule='evenodd'
                d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z'
              />
              <path
                fill-rule='evenodd'
                d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
              />
            </svg>
          </NavLink>
        </div>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
