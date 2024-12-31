import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    date: "",
    category: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    if (type === "file" && files.length > 0) {
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(formData.category)) {
      alert("Category must be a numeric value.");
      return;
    }

    if (!formData.image) {
      alert("Please select an image!");
      return;
    }

    const convertImageToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    convertImageToBase64(formData.image)
      .then((base64Image) => {
        const newBlog = { ...formData, image: base64Image };

        const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

        storedBlogs.push(newBlog);
        localStorage.setItem("blogs", JSON.stringify(storedBlogs));

        setFormData({
          title: "",
          description: "",
          image: null,
          date: "",
          category: "",
        });
        setImagePreview(null); 

        alert("Blog submitted successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error converting image to Base64", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header text-center bg-primary text-white">
              <h2>Create a New Blog</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="Enter blog title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Write your blog description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                    required
                  />
                  {imagePreview && (
                    <div className="mt-3 text-center">
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="img-fluid rounded"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="1">1 - Technology</option>
                    <option value="2">2 - Lifestyle</option>
                    <option value="3">3 - Education</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
