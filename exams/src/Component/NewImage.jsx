import React, { useState } from "react";

const NewImage = () => {
    const [imageTitle, setImageTitle] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleTitleChange = (e) => {
        setImageTitle(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            setImageFile(null);  
        } else {
            setError("");  
            setImageFile(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!imageTitle || !imageFile) {
            alert("Please provide both title and image.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const newImage = {
                title: imageTitle,
                file: reader.result,
            };

            const storedImages = JSON.parse(localStorage.getItem("images")) || [];
            storedImages.push(newImage);
            localStorage.setItem("images", JSON.stringify(storedImages));

            setImageTitle("");
            setImageFile(null);
            setSuccess(true); 

            setTimeout(() => {
                setSuccess(false); 
            }, 3000);
        };

        reader.readAsDataURL(imageFile);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center">
                            <h2>Upload a New Image</h2>
                        </div>
                        <div className="card-body">
                            {success && <div className="alert alert-success">Image uploaded successfully!</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="imageTitle" className="form-label">
                                        Image Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageTitle"
                                        value={imageTitle}
                                        onChange={handleTitleChange}
                                        placeholder="Enter image title"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="uploadImage" className="form-label">
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="uploadImage"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Upload
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewImage;
