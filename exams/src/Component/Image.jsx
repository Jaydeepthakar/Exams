import React, { useState, useEffect } from "react";

const Image = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem("images")) || [];
        setImages(storedImages);
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Blog Gallery</h2>
            <div className="row">
                {images.length === 0 ? (
                    <p className="text-center">No images uploaded yet!</p>
                ) : (
                    images.map((image, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card shadow">
                                {/* Display the image */}
                                <img
                                    src={image.file}
                                    className="card-img-top"
                                    alt={image.title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{image.title}</h5>   
                                    <p className="card-text">
                                        {image.description || "This is a short description of the blog. Learn more about the topic!"}
                                    </p>
                                    <button className="btn btn-primary w-100">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Image;
