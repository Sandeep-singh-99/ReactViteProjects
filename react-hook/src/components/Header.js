import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-orange-600 flex items-center justify-center py-5 mx-10 rounded-md">
      <Link to="/">
        <h1 className="text-white text-3xl font-semibold">React Hook</h1>
      </Link>
    </div>
  );
}

export default Header;
