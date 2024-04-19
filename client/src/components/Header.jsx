import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const [cookie, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate() ; 

  const logout = () => {
    setCookie("access_token" , "") ; 
    window.localStorage.removeItem("userId") ;
    navigate("/auth") ; 
  }
  return (
    <header>
      <nav>
        <ul className="flex justify-between">
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
              <button onClick={()=>{logout()}}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
