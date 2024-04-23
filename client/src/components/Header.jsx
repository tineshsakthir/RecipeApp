import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [cookie, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth");
  };
  return (
    <header>
      <nav className="flex justify-between items-center">
        <div className="bg-slate-600">
          <img
            className="h-16 "
            src="https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png"
            alt=""
          />
        </div>
        <ul className="flex justify-between gap-4 bg-slate-600">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "active" : "inactive"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-recipe"
              className={({ isActive }) =>
                `${isActive ? "active" : "inactive"}`
              }
            >
              Create Recipe
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-recipe"
              className={({ isActive }) =>
                `${isActive ? "active" : "inactive"}`
              }
            >
              Saved Recipe
            </NavLink>
          </li>
        </ul>
        <div className="bg-slate-600">
          <ul>
            <li>
              {!cookie.access_token ? (
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    `${isActive ? "active" : "inactive"}`
                  }
                >
                  Login/Register
                </NavLink>
              ) : (
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
