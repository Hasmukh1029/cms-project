import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles.css";

/* Pages */
import HomePage from "./pages/HomePage.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Categories from "./pages/Categories.jsx";
import Posts from "./pages/Posts.jsx";
import EditPost from "./pages/EditPost.jsx";

/* Public User Pages */
import PublicHome from "./pages/PublicHome.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      {/* Homepage */}
      <Route path="/" element={<HomePage />} />

      {/* Admin */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/edit-post/:id" element={<EditPost />} />

      {/* Normal User */}
      <Route path="/public-home" element={<PublicHome />} />

    </Routes>
  </BrowserRouter>
);
