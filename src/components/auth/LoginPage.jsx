import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../dashboard/LoadingButton";
import userContext from "../../context/UserContext";
import image from "../../assets/pet1.jpg";
import { Input } from "../ui/input";
const API_BASE = import.meta.env. VITE_APP_API_BASE;

const FormField = ({ label, type, ...props }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="mb-4 relative">
      <label className="block mb-2 font-semibold text-white">{label}</label>
      <Input
        {...props}
        type={isPassword ? (show ? "text" : "password") : type}
        disabled={props.disabled}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white pr-10"
      />
      {isPassword && (
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-200"
          onClick={() => setShow((s) => !s)}
        >
          {show ? (
            // Eye-slash SVG
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.233.938-4.675m2.062-2.062A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.336 3.233-.938 4.675m-2.062 2.062A9.956 9.956 0 0112 21c-2.21 0-4.267-.72-5.938-1.938M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
            </svg>
          ) : (
            // Eye SVG
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

const LoginRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(userContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    const token = localStorage.getItem("key");
    if (token) {
      //   navigate("/home");
    }
  }, []);

  const handleInputChange = (e, formType) => {
    setErrorMessage(""); // Clear error message on input change
    const { name, value } = e.target;
    if (formType === "login") {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE}/api/users/login`,
        {
          email: loginData.email,
          password: loginData.password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("key", token);
      authContext.setUserData(response.data);
      toast.success("Login Success");

      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE}/api/users/register`,
        {
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
        }
      );
      if (!response) {
        toast.error("Registration failed. Please try again.");
        return;
      }
      toast.success("Registration Success");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-4xl p-4 bg-black border-2 border-slate-900 rounded-lg shadow-lg flex flex-col lg:flex-row mx-2 items-center">
        {/* Left Side - Form Section */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="flex justify-around mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                setErrorMessage("");
              }}
              className={`${isLogin
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-500"
                } font-bold text-lg pb-2`}
              disabled={isLoading}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setErrorMessage("");
              }}
              className={`${!isLogin
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-500"
                } font-bold text-lg pb-2`}
              disabled={isLoading}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <FormField
                label="Email"
                type="email"
                name="email"
                value={loginData.email}
                onChange={(e) => handleInputChange(e, "login")}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address"
              />
              <FormField
                label="Password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleInputChange(e, "login")}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <LoadingButton
                isLoading={isLoading}
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold disabled:brightness-50 hover:bg-green-600 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Login"
                )}
              </LoadingButton>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <FormField
                label="Username"
                type="text"
                name="username"
                value={registerData.username}
                onChange={(e) => handleInputChange(e, "register")}
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
              <FormField
                label="Email"
                type="email"
                name="email"
                value={registerData.email}
                onChange={(e) => handleInputChange(e, "register")}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address"
              />
              <FormField
                label="Password"
                type="password"
                name="password"
                value={registerData.password}
                onChange={(e) => handleInputChange(e, "register")}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <FormField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={(e) => handleInputChange(e, "register")}
                placeholder="Confirm your password"
                required
                disabled={isLoading}
              />
              <LoadingButton
                isLoading={isLoading}
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Register"
                )}
              </LoadingButton>
            </form>
          )}
        </div>

        {/* Right Side - Image Section */}
        <div className="hidden lg:flex w-1/2 p-6 bg-black items-center justify-center">
          <img
            src={image}
            alt="diary"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
