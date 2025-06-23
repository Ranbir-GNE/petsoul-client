import { useState, useEffect, useContext } from "react";
import axios from "axios";
import userContext from "../context/UserContext";
const API_BASE = import.meta.env.VITE_APP_API_BASE;

const useUserAndPetData = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authContext = useContext(userContext);

  const userId = authContext?.userData?._id;

  const fetchPets = async () => {
    if (!userId) return;
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
    fetchPets();
    // eslint-disable-next-line
  }, [userId]);

  return { pets, isLoading, error, refetchPets: fetchPets };
};

export default useUserAndPetData;