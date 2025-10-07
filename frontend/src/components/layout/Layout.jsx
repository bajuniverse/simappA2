import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import DashboardNavbar from '../navigation/DashboardNavbar';
import Sidebar from '../navigation/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

import '../../styles/layout.css';

// Layout Component
const Layout = ({ children }) => {
    const { user } = useAuth();

    const location = useLocation();
    const isLandingPage = location.pathname === "/";

    const [activeItem, setActiveItem] = useState('Dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <>
            <div style={{ minHeight: '100vh' }}>
                {!isLandingPage && (
                    <DashboardNavbar toggleSidebar={toggleSidebar} />
                )}

                <Container fluid>
                    {user ? (
                        <div className="row">
                            <Sidebar
                                activeItem={activeItem}
                                setActiveItem={setActiveItem}
                                isOpen={sidebarOpen}
                                closeSidebar={closeSidebar}
                            />
                            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                {children}
                            </main>
                        </div>
                    ) : (
                        <div className="row">
                            <main className="col-12">{children}</main>
                        </div>
                    )}
                </Container>

            </div>
        </>
    );
};

export default Layout;