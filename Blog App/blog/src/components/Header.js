import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="p-10">
        <div className="bg-slate-950 rounded-md p-5 flex justify-between">
          <NavLink to={"/"} className="flex items-center">
            <h1 className=" font-semibold sm:text-xl lg:text-2xl text-white">
              Blog App
            </h1>
          </NavLink>

          <div className="text-white flex items-center sm:hidden">
            <NavLink to="/view">View Blog </NavLink>
            <NavLink to={"addBlog"} className="pl-5">
              Add Blog
            </NavLink>
            <NavLink to={"profile"} className="pl-5">
              Profile
            </NavLink>
          </div>

          <div className="text-white flex items-center sm:hidden">
            <NavLink
              className="bg-orange-800 px-5 py-2 rounded-md font-semibold"
              to="/login"
            >
              Login
            </NavLink>
          </div>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="lg:hidden sm:block inline-flex"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <i class="ri-menu-3-line text-white text-xl"></i>
          </button>

          <div id="navbar-default" className=" lg:hidden sm:hidden flex flex-col">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
