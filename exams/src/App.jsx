import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Component/Home";
import NewBlog from "./Component/NewBlog";
import Image from "./Component/Image";
import NewImage from "./Component/NewImage";
import Login from "./Component/FormValidation";
import ShowData from "./Component/ShowData";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [images, setImages] = useState([]);

  const handleBlogSubmit = (data) => {
    setBlogs((prevBlogs) => [...prevBlogs, data]);
  };

  const addImage = (newImage) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Blogging App
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/newblog">
                  New Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/image">
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/newimage">
                  New Image
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route path="/newblog" element={<NewBlog onBlogSubmit={handleBlogSubmit} />} />
        <Route path="/image" element={<Image images={images} />} />
        <Route path="/newimage" element={<NewImage addImage={addImage} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ShowData />} />
      </Routes>
    </>
  );
};

export default App;
