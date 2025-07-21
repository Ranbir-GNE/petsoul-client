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

// Floating mobile dock for navigation
const MobileDock = () => {
  const authContext = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("key");
    authContext.setUserData(null);
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt size={20} /> },
    { path: "/pets", label: "Pets", icon: <FaDog size={20} /> },
    { path: "/record", label: "Health", icon: <FaNotesMedical size={20} /> },
    { path: "/reports", label: "Reports", icon: <FaFileAlt size={20} /> },
    { path: "/vaccination", label: "Vaccines", icon: <FaSyringe size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-md rounded-t-xl shadow-lg flex justify-around items-center py-2 md:hidden">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`flex flex-col items-center px-2 py-1 text-xs focus:outline-none transition ${location.pathname === item.path
            ? "text-[#ffb347]"
            : "text-white hover:text-[#ffb347]"}`}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <span className="mt-1">{item.label}</span>
        </button>
      ))}
      <button
        className={`flex flex-col items-center px-2 py-1 text-xs text-white hover:text-[#ffb347]`}
        onClick={() => navigate("/profile")}
      >
        <FaUser size={20} />
        <span className="mt-1">Profile</span>
      </button>
      <button
        className="flex flex-col items-center px-2 py-1 text-xs text-[#E50000] hover:text-red-400"
        onClick={handleLogout}
      >
        <FaSignOutAlt size={20} />
        <span className="mt-1">Logout</span>
      </button>
    </nav>
  );
};

export default MobileDock;
