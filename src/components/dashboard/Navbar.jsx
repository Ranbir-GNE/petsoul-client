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
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("key");
    if (!token) {
      setIsLogin(false);
      setProfilePicture(defaultProfile);
      setUsername("");
      return;
    }

    try {
      const { data } = await axios.get(`${API_BASE}/api/users/token/${token}`, {
        headers: { Authorization: `${token}` },
      });
      setProfilePicture(data.profilePicture || defaultProfile);
      setUsername(data.username || "User");
      setIsLogin(true);
    } catch (error) {
      setIsLogin(false);
      setProfilePicture(defaultProfile);
      setUsername("");
      toast.error("Session expired. Please log in again.");
      navigate("/login");
      localStorage.removeItem("key");
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="bg-gray-900 text-slate-100 shadow-md w-full">
      <div className="flex justify-between items-center px-4 py-2">
        {/* Left: Hamburger and Logo */}
        <div className="flex items-center space-x-4">
          <button
            className="text-slate-100 text-xl md:hidden"
            onClick={onMenuClick}
          >
            <FaBars />
          </button>
          <img src={logo} alt="logo" className="h-10 w-auto" />
        </div>

        {/* Right: Nav links */}
        <ul className="flex items-center space-x-6">
          <li>
            <button className="hover:text-[#355c7d] transition-colors">
              Blogs
            </button>
          </li>
          <li>
            <button className="hover:text-[#355c7d] transition-colors">
              Community
            </button>
          </li>
          <li>
            {isLogin ? (
              <div className="flex items-center space-x-2">
                <img
                  src={profilePicture}
                  alt="profile"
                  className="h-8 w-8 rounded-full object-cover border border-slate-300"
                />
                <span className="text-sm">Welcome, {username}!</span>
              </div>
            ) : (
              <button
                className="bg-[#355c7d] hover:bg-[#2a4661] text-white px-4 py-1 rounded transition-colors"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
