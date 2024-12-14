import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();  // useNavigate is used for navigation

  // Logout function
  const handleLogout = () => {
    // Remove the token from sessionStorage
    sessionStorage.removeItem('token');
    
    // Redirect the user to the login page
    navigate('/');
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToSummary = () => {
    navigate("/summary");
  };

  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Management App</h1>
        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={goToDashboard}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Dashboard
          </button>

          <button
            onClick={goToSummary}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Summary
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
