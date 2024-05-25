import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          Scientific Data Management
        </div>
        <div>
          <Link
            to="/dashboard"
            className="text-white px-3 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/add-data"
                className="text-white px-3 py-2 rounded hover:bg-gray-700"
              >
                Add Scientific Data
              </Link>
              <button
                onClick={handleLogout}
                className="text-white px-3 py-2 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white px-3 py-2 rounded hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white px-3 py-2 rounded hover:bg-gray-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
