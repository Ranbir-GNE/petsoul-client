import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaDog,
  FaNotesMedical,
  FaFileAlt,
  FaSyringe,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("key");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/pets", label: "Pets", icon: <FaDog /> },
    { path: "/record", label: "Health Records", icon: <FaNotesMedical /> },
    { path: "/reports", label: "Reports", icon: <FaFileAlt /> },
    { path: "/vaccination", label: "Vaccinations", icon: <FaSyringe /> },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white shadow-lg w-64">
      {/* Logo / Header */}
      <div className="flex items-center justify-center p-4 bg-gray-800 border-b border-gray-700">
        <h1 className="text-xl font-bold text-blue-400">Pet Care</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 p-4">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`flex items-center space-x-3 py-2 px-4 rounded-lg cursor-pointer transition ${location.pathname === item.path
                ? "bg-gray-800"
                : "hover:bg-gray-800"
                }`}
              onClick={() => {
                navigate(item.path);
                closeSidebar?.();
              }}
            >
              <span className="text-blue-400">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Profile and Logout */}
      <div className="p-4 border-t border-gray-700">
        <ul className="space-y-4">
          <li
            className={`flex items-center space-x-3 py-2 px-4 rounded-lg cursor-pointer transition ${location.pathname === "/profile"
              ? "bg-gray-800"
              : "hover:bg-gray-800"
              }`}
            onClick={() => {
              navigate("/profile");
              closeSidebar?.();
            }}
          >
            <FaUser className="text-blue-400" />
            <span>Profile</span>
          </li>
          <li
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-blue-400" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
