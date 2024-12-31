import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ShowData() {
    const navigate = useNavigate();
    
    const [items, setItems] = useState(() => {
        const storedData = localStorage.getItem("data");
        return storedData ? JSON.parse(storedData) : [];
    });

    const [edit, setEdit] = useState({
        name: "",
        email: ""
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editForm, setEditForm] = useState(false);

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(items));
    }, [items]);

    const handleDelete = (i) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            const updatedData = items.filter((_, index) => index !== i);
            setItems(updatedData);
        }
    };

    const handleForm = (e) => {
        e.preventDefault();

        if (!edit.name || !edit.email) {
            alert("Please fill in both name and email.");
            return;
        }

        const updatedItems = [...items];
        if (editForm) {
            updatedItems[editIndex] = edit;
        } else {
            updatedItems.push(edit);
        }

        setItems(updatedItems);
        setEdit({
            name: "",
            email: ""
        });
        setEditForm(false);
        setEditIndex(null);
    };

    const handleEdit = (i) => {
        setEditIndex(i);
        setEdit(items[i]);
        setEditForm(true);
    };

    const addmore = () => {
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-dark">Employee Data</h1>

            {items.length === 0 ? (
                <div className="alert alert-info text-center shadow-sm">
                    <strong>No employee data found.</strong>
                </div>
            ) : (
                <div className="card shadow-lg">
                    <div className="card-body">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr className="table-primary">
                                    <th>Sr No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((ele, i) => (
                                    <tr key={i} className="table-light">
                                        <td>{i + 1}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm shadow-sm"
                                                onClick={() => handleEdit(i)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm ms-2 shadow-sm"
                                                onClick={() => handleDelete(i)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {editForm && (
                <div className="card mt-4 shadow-lg">
                    <div className="card-header bg-warning text-white text-center">
                        <h4>Edit Employee</h4>
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
                                    value={edit.name}
                                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    required
                                    placeholder="Enter Employee Email"
                                    value={edit.email}
                                    onChange={(e) => setEdit({ ...edit, email: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100 shadow-sm">
                                Update Employee
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-4 text-center">
                <button className="btn btn-success btn-lg shadow-sm" onClick={addmore}>
                    Add New Employee
                </button>
            </div>
        </div>
    );
}

export default ShowData;
