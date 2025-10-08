import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch admin profile (you can replace this with API call)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.role === "Admin") {
        setAdmin(storedUser);
        } else {
        navigate("/login");
        }
    }, [navigate]);

    if (!admin) return null;

    return (
        <div className="container py-5">
        <h2 className="mb-4 fw-bold text-primary">Admin Dashboard</h2>
        <div className="row">
            <div className="col-md-4">
            <Card className="shadow-sm rounded-4">
                <Card.Body className="text-center">
                <img
                    src={admin.avatar || ""}
                    alt="Admin"
                    className="rounded-circle mb-3"
                    width="100"
                    height="100"
                />
                <h5>{admin.name || "Admin User"}</h5>
                <p className="text-muted mb-2">{admin.email}</p>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate("/profile")}
                >
                    Edit Profile
                </Button>
                </Card.Body>
            </Card>
            </div>

            <div className="col-md-8">
            <Card className="shadow-sm rounded-4">
                <Card.Body>
                <h5 className="fw-bold mb-3">Quick Actions</h5>
                <div className="d-flex flex-wrap gap-3">
                    <Button variant="primary" onClick={() => navigate("/programs")}>
                    Manage Programs
                    </Button>
                    <Button variant="success" onClick={() => navigate("/mentor")}>
                    View Mentors
                    </Button>
                    <Button variant="info" onClick={() => navigate("/reports")}>
                    Generate Reports
                    </Button>
                    <Button variant="warning" onClick={() => navigate("/users")}>
                    Manage Users
                    </Button>
                </div>
                </Card.Body>
            </Card>

            <Card className="shadow-sm rounded-4 mt-4">
                <Card.Body>
                <h5 className="fw-bold mb-3">System Overview</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Active Programs: <strong></strong>
                    </li>
                    <li className="list-group-item">
                    Registered Mentors: <strong>12</strong>
                    </li>
                    <li className="list-group-item">
                    Total Applications: <strong>47</strong>
                    </li>
                </ul>
                </Card.Body>
            </Card>
            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;
