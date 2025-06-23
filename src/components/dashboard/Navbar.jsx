import React, { useEffect, useState, useContext } from "react";
import logo from "../../assets/logo.png";
import defaultProfile from "../../assets/profilePicture.jpg";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import userContext from "../../context/UserContext";

const Navbar = ({ onMenuClick }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [profilePicture, setProfilePicture] = useState(defaultProfile);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(userContext);

  useEffect(() => {
    if (authContext?.userData?._id) {
      setIsLogin(true);
      setProfilePicture(authContext.userData.profilePicture || defaultProfile);
      setUsername(authContext.userData.username || "User");
    } else {
      setIsLogin(false);
      setProfilePicture(defaultProfile);
      setUsername("");
    }
  }, [authContext?.userData?._id, authContext?.userData?.profilePicture, authContext?.userData?.username]);

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