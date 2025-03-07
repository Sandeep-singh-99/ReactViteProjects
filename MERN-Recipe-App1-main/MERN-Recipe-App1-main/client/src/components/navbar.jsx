import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <nav className="bg-blue-900 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Nav Links */}
        <div className="space-x-8 flex items-center text-white">
          <Link to="/" className="text-lg font-semibold hover:text-blue-300">
            Home
          </Link>
          <Link
            to="/create-recipe"
            className="text-lg font-semibold hover:text-blue-300"
          >
            Create Recipe
          </Link>
          <Link
            to="/saved-recipes"
            className="text-lg font-semibold hover:text-blue-300"
          >
            Saved Recipes
          </Link>
        </div>

        {/* Auth Button */}
        <div className="flex items-center space-x-4">
          {!cookies.access_token ? (
            <Link
              to="/auth"
              className="text-white px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition-all"
            >
              Login/Register
            </Link>
          ) : (
            <button
              onClick={logout}
              className="text-white px-4 py-2 bg-red-600 rounded-md hover:bg-red-500 transition-all"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
