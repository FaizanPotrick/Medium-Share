import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);
  return (
    <nav className="flex justify-around items-center h-[8vh] bg-gray-900">
      <Link to="/" className="text-white text-2xl">
        Web GDSC
      </Link>
      {cookies.user_id === undefined || cookies.user_id === null ? (
        <div className="flex items-center gap-6">
          <Link
            to="/register"
            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600"
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <Link
            to="/post"
            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600"
          >
            All Post
          </Link>
          <Link
            to="/mypost"
            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600"
          >
            My Post
          </Link>
          <Link
            to="/addpost"
            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600"
          >
            Add Post
          </Link>
          <button
            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600"
            onClick={() => {
              removeCookie("user_id");
              window.location.reload();
            }}
          >
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
