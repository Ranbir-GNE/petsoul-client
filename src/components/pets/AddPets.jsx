import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
const API_BASE = import.meta.env.VITE_APP_API_BASE;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET || "default_preset";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME || "default_cloud";
import userContext from "../../context/UserContext";

const speciesOptions = ["Dog", "Cat", "Bird", "Fish", "Other"];

const AddPetForm = ({ onPetAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    profilePicture: null,
    age: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const fileInputRef = useRef();
  const authContext = useContext(userContext);

  // Set userId from context when available
  useEffect(() => {
    if (authContext?.userData?._id) {
      setUserId(authContext.userData._id);
    }
  }, [authContext?.userData?._id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("key");
    if (!token || !userId) {
      setIsLoading(false);
      return;
    }
    let imageUrl = "";
    if (formData.profilePicture) {
      const imageFormData = new FormData();
      imageFormData.append("file", formData.profilePicture);
      imageFormData.append("upload_preset", UPLOAD_PRESET);
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
          imageFormData
        );
        imageUrl = res.data.secure_url;
      } catch {
        setIsLoading(false);
        return;
      }
    }
    try {
      await axios.post(
        `${API_BASE}/api/pets`,
        { ...formData, profilePicture: imageUrl, ownerId: userId },
        { headers: { Authorization: token } }
      );
      onPetAdded && onPetAdded();
      setFormData({
        name: "",
        species: "",
        breed: "",
        profilePicture: null,
        age: "",
      });
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch { }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-center mb-2">Add New Pet</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Pet's Name"
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="species"
        value={formData.species}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Species</option>
        {speciesOptions.map((species) => (
          <option key={species} value={species}>{species}</option>
        ))}
      </select>
      <input
        type="text"
        name="breed"
        value={formData.breed}
        onChange={handleChange}
        placeholder="Pet's Breed"
        className="w-full p-2 border rounded"
        required
      />
      <input
        ref={fileInputRef}
        type="file"
        name="profilePicture"
        onChange={handleChange}
        className="w-full"
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Pet's Age"
        min="0"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={isLoading || !formData.name || !formData.species || !formData.breed || !formData.age || !userId}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded disabled:opacity-50"
      >
        {isLoading ? "Adding..." : "Add Pet"}
      </button>
    </form>
  );
};

export default AddPetForm;