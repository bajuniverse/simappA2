import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProgramsHook } from "../../hooks/programHook";
import { useMentorsHook } from "../../hooks/mentorHook";
import { useApplicationsHook } from "../../hooks/applicationHook";

const AdminDashboard = () => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    const { programsQuery } = useProgramsHook();
    const { mentorsQuery } = useMentorsHook();
    const { applicationsQuery } = useApplicationsHook();

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

    // extract data states from Programs Query
    const { data: programs } = programsQuery;
    const { data: mentors } = mentorsQuery;
    const { data: applications } = applicationsQuery;

    return (
        <div className="container py-5">
        <h2 className="mb-4 fw-bold text-primary">Admin Dashboard</h2>
        <div className="row">
            <div className="col-md-4">
            <Card className="shadow-sm rounded-4">
                <Card.Body className="text-center">
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
                        Active Programs: <strong>{programs?.length ?? 0 }</strong>
                    </li>
                    <li className="list-group-item">
                        Registered Mentors: <strong>{mentors?.length ?? 0}</strong>
                    </li>
                    <li className="list-group-item">
                        Total Applications: <strong>{applications?.length ?? 0}</strong>
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
