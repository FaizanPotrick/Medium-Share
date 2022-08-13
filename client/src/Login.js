import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email_address: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    // const data = await res.json();
    // console.log(data);
    setIsLoading(false);
    if (res.status === 200) {
      setUser({
        email_address: "",
        password: "",
      });
      navigate("/post");
      window.location.reload();
    }
  };
  return (
    <div className="h-[92vh] flex justify-center items-center">
      <div className="w-full max-w-sm rounded-lg shadow-md p-8 bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={onSubmit}>
          <h5 className="text-xl font-medium text-white">
            Login to your account
          </h5>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email_address"
              className="border border-gray-500 text-sm rounded-lg w-full p-2.5 bg-gray-600 text-white"
              placeholder="Email Address"
              onChange={onChange}
              value={user.email_address}
              maxLength="150"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="border border-gray-500 text-sm rounded-lg w-full p-2.5 bg-gray-600 text-white"
              placeholder="Password"
              onChange={onChange}
              value={user.password}
              autoComplete="off"
              maxLength="10"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
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
