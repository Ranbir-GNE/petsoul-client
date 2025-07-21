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
const SidebarMobile = () => {
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
        <nav className="fixed bottom-1 z-50 bg-[#1a1a1a]/20 backdrop-blur-lg rounded-t-xl shadow-lg flex items-center py-2 md:hidden">
            {navItems.map((item) => (
                <button
                    key={item.path}
                    className={`flex flex-col items-center px-2 py-1 text-xs focus:outline-none transition ${location.pathname === item.path
                        ? "text-yellow-500"
                        : "text-white hover:text-blue-500"}`}
                    onClick={() => navigate(item.path)}
                >
                    {item.icon}
                    <span className="mt-1">{item.label}</span>
                </button>
            ))}
            <button
                className={`flex flex-col items-center px-2 py-1 text-xs text-white hover:text-green-600`}
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

export default SidebarMobile;
