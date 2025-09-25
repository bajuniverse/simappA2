import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faUser, faBars, faBuilding } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ collapsed, onCollapse }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gray-800 text-white transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <button
            onClick={() => onCollapse(!collapsed)}
            className="flex items-center focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
            {!collapsed && (
              <span className="ml-2 text-lg font-semibold">
                Startup Incubation
              </span>
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-2">
          <Link
            to="/"
            className={`flex items-center rounded-lg p-2 text-sm font-medium transition-colors hover:bg-gray-700 ${
              isActive('/') ? 'bg-gray-700' : ''
            }`}
          >
            <FontAwesomeIcon icon={faHome} className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && <span>Home</span>}
          </Link>

          {user && (
            <>
              <Link
                to="/applications"
                className={`flex items-center rounded-lg p-2 text-sm font-medium transition-colors hover:bg-gray-700 ${
                  isActive('/applications') ? 'bg-gray-700' : ''
                }`}
              >
                <FontAwesomeIcon icon={faFile} className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && <span>Applications</span>}
              </Link>

              <Link
                to="/startup"
                className={`flex items-center rounded-lg p-2 text-sm font-medium transition-colors hover:bg-gray-700 ${
                  isActive('/startup') ? 'bg-gray-700' : ''
                }`}
              >
                <FontAwesomeIcon icon={faBuilding} className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && <span>Startup</span>}
              </Link>

              <Link
                to="/profile"
                className={`flex items-center rounded-lg p-2 text-sm font-medium transition-colors hover:bg-gray-700 ${
                  isActive('/profile') ? 'bg-gray-700' : ''
                }`}
              >
                <FontAwesomeIcon icon={faUser} className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && <span>Profile</span>}
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );

};export default Sidebar;