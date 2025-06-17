import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import LoadingButton from "../dashboard/LoadingButton";
import { toast } from "sonner";
const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:3000";
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET || "default_preset";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME || "default_cloud";



const speciesOptions = ["Dog", "Cat", "Bird", "Fish", "Other"];

const AddPetForm = ({ onPetAdded }) => {

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    profilePicture: null,
    age: "",
  });

  const fileInputRef = useRef();


  const isFormValid =
    formData.name && formData.species && formData.breed && formData.age;


  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("key");
    if (!token) return;

    try {
      const response = await axios.get(`${API_BASE}/api/users/token/${token}`, {
        headers: { Authorization: token },
      });
      if (response.data && response.data.data) setUserData(response.data.data); 
      else {
        toast.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("key");
    if (!token) {
      toast.error("Token not found. Please log in again.");
      setIsLoading(false);
      return;
    }
    try {
      let imageUrl = "";

      if (formData.profilePicture) {
        const imageFormData = new FormData();
        imageFormData.append("file", formData.profilePicture);
        imageFormData.append("upload_preset", UPLOAD_PRESET);

        if (
          formData.profilePicture &&
          !["image/jpeg", "image/png", "image/jpg"].includes(
            formData.profilePicture.type
          )
        ) {
          toast.error("Only JPEG, JPG, or PNG files are allowed.");
          setIsLoading(false);
          return;
        }

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
          imageFormData
        );
        if (!response) {
          toast.error("Failed to upload image.");
          setIsLoading(false);
          return;
        }

        imageUrl = response.data.secure_url;
      }

      const response = await axios.post(
        `${API_BASE}/api/pets`,
        { ...formData, profilePicture: imageUrl, ownerId: userData._id },
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Pet added successfully!");
      onPetAdded && onPetAdded(response.data);
      setFormData({
        name: "",
        species: "",
        breed: "",
        profilePicture: null,
        age: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error("Error adding pet:", error);
      toast.error("Failed to add pet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-screen-md mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Add New Pet</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Pet's Name"
          className="mt-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Species
        </label>
        <select
          name="species"
          value={formData.species}
          onChange={handleChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
          required
        >
          <option value="">Select Species</option>
          {speciesOptions.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Breed</label>
        <Input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="Pet's Breed"
          className="mt-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        <input
          ref={fileInputRef}
          type="file"
          name="profilePicture"
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <Input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Pet's Age"
          min="0"
          className="mt-1"
          required
        />
      </div>

      <LoadingButton
        type="submit"
        isLoading={isLoading}
        disabled={!isFormValid}
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Pet
      </LoadingButton>

    </form>
  );
};

export default AddPetForm;
