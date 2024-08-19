import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    console.log("Redux:", data);
  }, [data]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  let Links = [
    { name: "Add Blog", link: "/addBlog" },
    { name: "View", link: "/view" },
    { name: "Profile", link: "/profile" },
  ];

  return (
    <div className="fixed w-full">
      <div className={`bg-slate-950 p-5 flex justify-between items-center `}>
        <NavLink to={"/"} className="flex items-center">
          <h1 className="font-semibold sm:text-xl lg:text-2xl text-white">
            Blog App
          </h1>
        </NavLink>

        <div className="text-white flex items-center sm:hidden">
          <NavLink to="/view">View Blog</NavLink>
          <NavLink to="/addBlog" className="pl-5">
            Add Blog
          </NavLink>
          <NavLink to="/profile" className="pl-5">
            Profile
          </NavLink>
        </div>

        <div className="text-white flex items-center sm:hidden">
         { !data ? ( <NavLink
            className="bg-orange-800 px-5 py-2 rounded-md font-semibold"
            to="/login"
          >
            Login
          </NavLink>
          ): ( <button
            onClick={handleLogout}
            className="bg-orange-800 px-5 py-2 rounded-md font-semibold text-white"
          >
            Logout
          </button>
         )}
        </div>

        <div
          className="text-3xl flex items-center cursor-pointer lg:hidden sm:block"
          onClick={toggleMenu}
        >
          <i className="ri-menu-3-line text-white text-xl"></i>
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`lg:hidden sm:flex sm:flex-col sm:items-center pb-5 w-full relative  bg-slate-950 rounded-b-md transition-all duration-300 ease-in-out ${
          isOpen ? "top-30" : "top-[-490px]"
        }`}
      >
        {Links.map((link) => (
          <li key={link.name} className="m-3">
            <a
              onClick={closeMenu}
              href={link.link}
              className="text-gray-800 hover:text-gray-400 duration-500"
            >
              {link.name}
            </a>
          </li>
        ))}

        {!data ? (
          <NavLink
            to={"/login"}
            onClick={closeMenu}
            className="bg-orange-800 px-5 py-2 rounded-md font-semibold text-white"
          >
            Login
          </NavLink>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-orange-800 px-5 py-2 rounded-md font-semibold text-white"
          >
            Logout
          </button>
        )}
      </ul>
    </div>
  );
}

export default Header;
