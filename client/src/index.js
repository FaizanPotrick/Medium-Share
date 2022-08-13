import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import AddPost from "./AddPost";
import Post from "./Post";
import MyPost from "./MyPost";
import { CookiesProvider } from "react-cookie";
import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/mypost" element={<MyPost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addpost" element={<AddPost />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
