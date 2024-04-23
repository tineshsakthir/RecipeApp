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
    <header className="bg-gray-900">
      <nav className="container mx-auto flex justify-between items-center py-4">
        <div>
          <Link to="/">
            <img
              className="h-16"
              src="https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png"
              alt="Good Food Logo"
            />
          </Link>
        </div>
        <ul className="flex gap-4 text-white">
          <li>
            <NavLink
              to="/"
              ClassName="font-bold"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-recipe"
              ClassName="font-bold"
            >
              Create Recipe
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-recipe"
              ClassName="font-bold"
            >
              Saved Recipe
            </NavLink>
          </li>
        </ul>
        <div>
          <ul className="text-white">
            <li>
              {!cookie.access_token ? (
                <NavLink
                  to="/auth"
                  ClassName="font-bold"
                >
                  Login/Register
                </NavLink>
              ) : (
                <button
                  onClick={logout}
                  className="font-bold"
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
