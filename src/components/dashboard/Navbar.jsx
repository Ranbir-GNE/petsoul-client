import React, { useEffect, useState, useCallback } from "react";
import logo from "../../assets/logo.png";
import defaultProfile from "../../assets/profilePicture.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaBars } from "react-icons/fa";

const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:3000";

const Navbar = ({ onMenuClick }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [profilePicture, setProfilePicture] = useState(defaultProfile);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("key");
    if (!token) return;

    try {
      const { data } = await axios.get(`${API_BASE}/api/users/token/${token}`, {
        headers: { Authorization: `${token}` },
      });
      setProfilePicture(data.profilePicture || defaultProfile);
      setIsLogin(true);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setIsLogin(false);
      toast.error("Session expired. Please log in again.");
      navigate("/login");
      localStorage.removeItem("key");
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="bg-gray-900 text-white shadow-md w-full">
      <div className="flex justify-between items-center px-4 py-2">
        {/* Left: Hamburger and Logo */}
        <div className="flex items-center space-x-4">
          <button
            className="text-white text-xl md:hidden"
            onClick={onMenuClick}
          >
            <FaBars />
          </button>
          <img src={logo} alt="logo" className="h-10 w-auto" />
        </div>

        {/* Right: Nav links & profile */}
        <ul className="flex items-center space-x-6">
          <li>
            <button className="hover:text-blue-300 transition-colors">
              Blogs
            </button>
          </li>
          <li>
            <button className="hover:text-blue-300 transition-colors">
              Community
            </button>
          </li>
          {isLogin ? (
            <li>
              <div className="flex items-center space-x-2">
                <span className="hidden sm:block text-sm text-gray-300">
                  Welcome!
                </span>
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover border-2 border-blue-500"
                />
              </div>
            </li>
          ) : (
            <li className="relative group">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover border-2 border-blue-500"
                />
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-md hidden group-hover:block text-black z-10">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => {
                    localStorage.removeItem("key");
                    setIsLogin(false);
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
