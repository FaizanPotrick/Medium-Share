import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (
      cookies.user_id === undefined ||
      cookies.user_id === null ||
      cookies.user_id === ""
    ) {
      if (document.cookie === "") {
        return setIsLogin(false);
      }
    }
    return setIsLogin(true);
  }, [location]);

  return (
    <nav className="flex justify-around items-center p-2.5 bg-slate-800 text-white font-semibold">
      <Link to="/" className="text-2xl md:text-3xl">
        Medium Share
      </Link>
      <div className="flex items-center justify-center gap-4 text-sm sm:text-base">
        {!isLogin ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to={`/post/${cookies.user_id}`}>My Post</Link>
            <Link to="/post/add">Add Post</Link>
            <button
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
