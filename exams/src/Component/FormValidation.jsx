import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FormValidation() {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        email: ""
    });

    const [arr, setArr] = useState(() => {
        const storedData = localStorage.getItem("data");
        return storedData ? JSON.parse(storedData) : [];
    });

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(arr));
    }, [arr]);

    const handleForm = (e) => {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        setArr([...arr, input]);
        setInput({
            name: "",
            email: ""
        });
    };

    const showData = () => {
        navigate("/profile");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add Employee</h1>

            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center">
                            <h2>Add New Employee</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleForm}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Employee Name"
                                        value={input.name}
                                        onChange={(e) => setInput({ ...input, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Employee Email"
                                        value={input.email}
                                        onChange={(e) => setInput({ ...input, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100 mb-3">
                                    Submit
                                </button>
                            </form>
                            <div className="text-center">
                                <button onClick={showData} className="btn btn-secondary w-100">
                                    Show Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormValidation;
