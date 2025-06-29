import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy, useState, useContext, useEffect } from "react";
import { Toaster } from "sonner";
import axios from "axios";

import userPetContext from "./context/UserPetContext";
import userContext from "./context/UserContext";
import LoadingPage from "./pages/LoadingPage";

const API_BASE = import.meta.env. VITE_APP_API_BASE ;

const LoginPage = lazy(() => import("./components/auth/LoginPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PetProfilePage = lazy(() => import("./pages/PetProfilePage"));
const OtpPage = lazy(() => import("./components/auth/OtpPage"));
const HealthRecordPage = lazy(() => import("./pages/HealthRecordPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const ChartComponent = lazy(() => import("./components/dashboard/ChartComponent"));
const VaccinationPage = lazy(() => import("./pages/VaccinationPage"));
const Chatbot = lazy(() => import("./components/dashboard/Chatbot"));

const ProtectedRoute = ({ element: Element }) => {
  const { userData } = useContext(userContext);
  return userData ? <Element /> : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
      <Route path="/reports" element={<ProtectedRoute element={ReportPage} />} />
      <Route path="/profile" element={<ProtectedRoute element={ProfilePage} />} />
      <Route path="/pets" element={<ProtectedRoute element={PetProfilePage} />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/record" element={<ProtectedRoute element={HealthRecordPage} />} />
      <Route path="/chart" element={<ProtectedRoute element={ChartComponent} />} />
      <Route path="/vaccination" element={<ProtectedRoute element={VaccinationPage} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  const [userData, setUserData] = useState();
  const [pets, setPets] = useState([]);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("key");

    if (token) {
      axios.get(`${API_BASE}/api/users/token/${token}`, {
        headers: { Authorization: token },
      })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.error("Failed to auto-login:", err);
          localStorage.removeItem("key"); 
        })
        .finally(() => {
          setIsAuthLoading(false);
        });
    } else {
      setIsAuthLoading(false);
    }
  }, []);

  if (isAuthLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <userPetContext.Provider value={{ pets, setPets }}>
        <userContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter
            future={{
              v7_startTransition: true,
            }}
          >
            <Suspense fallback={<LoadingPage />}>
              <AppRoutes />
            </Suspense>
          </BrowserRouter>
        </userContext.Provider>
      </userPetContext.Provider>
      <Toaster />
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </>
  );
}

export default App;
