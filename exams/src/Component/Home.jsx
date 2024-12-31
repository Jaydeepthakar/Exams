import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 font-weight-bold">Welcome to the Blogging App</h1>
        <p className="lead text-muted">A platform to share your stories, ideas, and creativity!</p>
        <Link to="/newblog" className="btn btn-primary btn-lg mt-4">
          Create Your First Blog
        </Link>
      </div>

      {blogs.length > 0 ? (
        <div className="mt-5">
          <h3 className="text-center mb-4">Your Submitted Blogs</h3>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {blogs.map((blog, index) => (
              <div className="col" key={index}>
                <div className="card shadow-sm rounded-3">
                  <div className="card-header bg-primary text-white">
                    <h5>{blog.title}</h5>
                  </div>
                  <div className="card-body">
                    {blog.image && (
                      <img
                        src={blog.image}
                        alt="Uploaded"
                        className="img-fluid mb-3 rounded"
                      />
                    )}
                    <p className="card-text">
                      <strong>Description:</strong> {blog.description}
                    </p>
                    <p className="card-text">
                      <strong>Category:</strong>{" "}
                      {blog.category === "1"
                        ? "Technology"
                        : blog.category === "2"
                        ? "Lifestyle"
                        : "Education"}
                    </p>
                    <p className="card-text">
                      <strong>Date:</strong> {blog.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center mt-5 text-muted">No blogs submitted yet.</p>
      )}
    </div>
  );
};

export default Home;
