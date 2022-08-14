import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);
  return (
    <nav className="flex justify-around items-center h-[8vh] bg-slate-800">
      <Link to="/" className="text-white text-2xl">
        Web GDSC
      </Link>
      {cookies.user_id === undefined || cookies.user_id === null ? (
        <div className="flex items-center gap-6 font-medium text-sm">
          <Link to="/post" className="rounded-lg px-5 py-2.5 bg-white">
            All Post
          </Link>
          <Link to="/register" className="rounded-lg px-5 py-2.5 bg-white">
            Register
          </Link>
          <Link to="/login" className="rounded-lg px-5 py-2.5 bg-white">
            Login
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-6 font-medium text-sm">
          <Link to="/post" className="rounded-lg px-5 py-2.5 bg-white">
            All Post
          </Link>
          <Link to="/mypost" className="rounded-lg px-5 py-2.5 bg-white">
            My Post
          </Link>
          <Link to="/addpost" className="rounded-lg px-5 py-2.5 bg-white">
            Add Post
          </Link>
          <button
            className="rounded-lg px-5 py-2.5 bg-white"
            onClick={() => {
              removeCookie("user_id");
              navigate("/login");
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
