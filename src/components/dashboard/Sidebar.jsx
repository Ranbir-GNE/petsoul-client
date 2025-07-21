import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import userContext from "../../context/UserContext";
import {
  FaTachometerAlt,
  FaDog,
  FaNotesMedical,
  FaFileAlt,
  FaSyringe,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const authContext = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("key");
    authContext.setUserData(null);
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/pets", label: "Pets", icon: <FaDog /> },
    { path: "/record", label: "Health Records", icon: <FaNotesMedical /> },
    { path: "/reports", label: "Reports", icon: <FaFileAlt /> },
    { path: "/vaccination", label: "Vaccinations", icon: <FaSyringe /> },
  ];

  return (
    <div className="hidden md:flex flex-col h-full bg-[#1a1a1a]/20 backdrop-blur-lg text-white w-64 rounded-lg">
      <div className="flex items-center justify-center p-4">
        <h1 className="text-xl font-bold text-white">Pet Care</h1>
      </div>
      <div className="flex-1 p-4">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`flex items-center space-x-3 py-2 px-4 cursor-pointer transition ${location.pathname === item.path
                  ? "border-l-4 bg-[#1a1a1a]/50"
                  : "border-l-4 border-transparent hover:bg-[#1a1a1a]/30"
                }`}
              onClick={() => navigate(item.path)}
            >
              <span className="text-white">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        <ul className="space-y-4">
          <li
            className={`flex items-center space-x-3 py-2 px-4 cursor-pointer transition ${location.pathname === "/profile"
                ? "border-l-4 bg-[#1a1a1a]/50"
                : "border-l-4 border-transparent hover:bg-[#1a1a1a]/30"
              }`}
            onClick={() => navigate("/profile")}
          >
            <FaUser className="text-white" />
            <span>Profile</span>
          </li>
          <li
            className="flex items-center space-x-3 py-2 px-4 hover:border-l-4 hover:bg-[#E50000]/50 cursor-pointer transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-white" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
