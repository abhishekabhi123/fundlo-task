import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";

const NavBar = () => {
  const [cookies, setCookies, deleteCookies] = useCookies([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    deleteCookies("jwt");
  };
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/profile" activeStyle>
            Profile
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink onClick={handleLogout}>Logout</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default NavBar;
