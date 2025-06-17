import { useState, useEffect } from "react";
import axios from "axios";
const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:3000";

const useUserAndPetData = () => {
  const [userData, setUserData] = useState({});
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("key");
    if (!token) {
      console.error("Token not found in local storage");
      setError("Token not found in local storage");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE}/api/users/token/${token}`,
        { headers: { Authorization: token } }
      );
      if (response.data) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPets = async (userId) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("key");
      const response = await axios.get(
        `${API_BASE}/api/pets/owner/${userId}`,
        { headers: { Authorization: token } }
      );
      if (response.data) {
        setPets(response.data);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userData && userData._id) {
      fetchPets(userData._id);
    }
  }, [userData]);

  return { userData, pets, isLoading, error };
};

export default useUserAndPetData;
