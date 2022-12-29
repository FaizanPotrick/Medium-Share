import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);
  const [isLogin, setIsLogin] = useState(
    cookies.user_id === undefined ||
      cookies.user_id === null ||
      cookies.user_id === ""
      ? false
      : true
  );
  return (
    <nav className="flex justify-around items-center h-[8vh] bg-slate-800 font-semibold">
      <Link to="/" className="text-white text-2xl md:text-3xl">
        Web GDSC
      </Link>
      <div className="flex items-center gap-6 font-medium text-sm">
        {!isLogin ? (
          <>
            <Link to="/register" className="text-white md:text-lg">
              Register
            </Link>
            <Link to="/login" className="text-white md:text-lg">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to={`/${cookies.user_id}`} className="text-white md:text-lg">
              My Post
            </Link>
            <Link to="/addpost" className="text-white md:text-lg">
              Add Post
            </Link>
            <button
              className="text-white md:text-lg"
              onClick={() => {
                removeCookie("user_id");
                setIsLogin(false);
                navigate("/login");
              }}
            >
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
