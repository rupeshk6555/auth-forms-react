import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Auth App</h1>
        <div className="space-x-4 pr-10">
          <Link to="/login" className="hover:text-blue-200 text-lg">
            Login
          </Link>
          <Link to="/signup" className="hover:text-blue-200 text-lg">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
