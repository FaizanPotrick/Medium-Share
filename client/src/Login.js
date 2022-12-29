import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email_address: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAlert, setIsAlert] = useState({
    isShow: false,
    message: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsAlert({
      isShow: false,
      message: "",
    });
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setIsLoading(false);
    if (response.status === 200) {
      setUser({
        email_address: "",
        password: "",
      });
      navigate("/");
      window.location.reload();
    } else {
      setIsAlert({
        isShow: true,
        message: data,
      });
    }
  };

  return (
    <div className="h-[92vh] flex justify-center items-center">
      <div className="w-full max-w-sm rounded-xl shadow-md py-8 px-5 bg-gray-800 border-gray-700">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="text-xl font-medium text-white">Login</div>
          {isAlert.isShow && (
            <div className="text-red-700">{isAlert.message}</div>
          )}
          <input
            type="email"
            name="email_address"
            className="border border-gray-500 text-sm rounded-lg w-full p-2 bg-gray-600 text-white"
            placeholder="Email Address"
            onChange={onChange}
            value={user.email_address}
            maxLength="320"
            required
          />
          <input
            type="password"
            name="password"
            className="border border-gray-500 text-sm rounded-lg w-full p-2 bg-gray-600 text-white"
            placeholder="Password"
            onChange={onChange}
            value={user.password}
            autoComplete="off"
            maxLength="10"
            required
          />
          <button
            type="submit"
            className="w-full text-white font-medium rounded-lg text-sm px-5 py-2 text-center bg-blue-600"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <div className="text-sm text-gray-300 text-center">
            Not registered?{" "}
            <Link to="/register" className="text-blue-500">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
