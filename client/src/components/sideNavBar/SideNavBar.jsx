import React, { useEffect, useState } from "react";
import "./sidenavbar.css";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SideNavBar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies, deleteCookies] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          deleteCookies("jwt");
          navigate("/admin");
        } else toast("Hi admin", { theme: "dark" });
      }
    };
    verifyUser();
  }, [cookies, navigate, deleteCookies]);
  const handleLogout = () => {
    deleteCookies("jwt");
    navigate("/admin ");
  };
  const menuItems = [
    {
      text: "Users",
      icon: "icons/admin-avatar.svg",
    },
    {
      text: "Products",
      icon: "icons/shopping-cart.svg",
    },
  ];
  const [isExpanded, setExpanded] = useState(true);
  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
    >
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded && (
            <div className="nav-brand">
              <h1>Admin Panel</h1>
            </div>
          )}
          <button
            className={
              isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
            }
            onClick={() => setExpanded(!isExpanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-menu">
          {menuItems.map(({ text, icon }, items) => (
            <Link
              key={items}
              to={`/${text}`}
              className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
            >
              <img className="menu-item-icon" src={icon} alt="" srcSet="" />
              {isExpanded && <p>{text}</p>}
              {!isExpanded && <div className="tooltip">{text}</div>}
            </Link>
          ))}
        </div>
      </div>
      <div className="nav-footer">
        <img
          onClick={handleLogout}
          className="logout-icon"
          src="icons/logout.svg"
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default SideNavBar;
