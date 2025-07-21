import React, { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import pet1 from "../../assets/pet1.jpg"; // Default pet image
import { toast } from "sonner";
import useUserAndPetData from "../../hooks/useUserAndPetData"; // Adjust the import path as needed
import LoadingSpinner from "../dashboard/LoadingSpinner";
const API_BASE = import.meta.env.VITE_APP_API_BASE;


const ViewPetProfile = () => {
  const { pets, isLoading, error, refetchPets } = useUserAndPetData();
  const [selectedPet, setSelectedPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPet, setEditedPet] = useState(null);

  const handleEditPet = async () => {
    const token = localStorage.getItem("key");
    if (!token) {
      toast.error("Token not found in local storage");
      return;
    }
    try {
      await axios.put(
        `${API_BASE}/api/pets/${editedPet._id}`,
        editedPet,
        { headers: { Authorization: token } }
      );
      toast.success("Pet details updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing pet:", error.message);
      toast.error("Failed to update pet details");
    }
  };

  const handleDeletePet = async (petId) => {
    const token = localStorage.getItem("key");
    if (!token) {
      toast.error("Token not found in local storage");
      return;
    }
    try {
      await axios.delete(`${API_BASE}/api/pets/${petId}`, {
        headers: { Authorization: token },
      });
      toast.success("Pet deleted successfully");
      setSelectedPet(null);
      refetchPets(); // Refresh the pets list
    } catch (error) {
      console.error("Error deleting pet:", error.message);
      toast.error("Failed to delete pet");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedPet((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-bold mb-4">Pets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-200 transition hover:scale-105"
            onClick={() => {
              setSelectedPet(pet);
              setEditedPet(pet); // Initialize the edit form with pet details
            }}
          >
            <div className="flex justify-center mb-4">
              <img
                src={pet?.profilePicture || pet1}
                alt="Pet Profile Picture"
                className="w-44 h-44 rounded-full object-cover shadow-md"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold">{pet.name}</h3>
              <p className="text-gray-600">Age: {pet.age} years</p>
              <p className="text-gray-600">Breed: {pet.breed}</p>
              <p className="text-gray-600">Species: {pet.species}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPet && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 align-center">
          <div className="bg-white p-8 w-full max-w-lg rounded-lg shadow-lg relative ">
            <Button
              onClick={() => {
                setSelectedPet(null);
                setIsEditing(false);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white hover:text-red-500 hover:bg-white transition border border-red-500"
            >
              Close
            </Button>
            <h3 className="text-2xl font-bold mb-4">Pet Profile</h3>
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={editedPet?.name || ""}
                  onChange={handleEditChange}
                  className="p-2 border rounded"
                  placeholder="Pet Name"
                />
                <input
                  type="number"
                  name="age"
                  value={editedPet?.age || ""}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Pet Age"
                />
                <input
                  type="text"
                  name="breed"
                  value={editedPet?.breed || ""}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Pet Breed"
                />
                <select
                  name="species"
                  value={editedPet?.species || ""}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Species</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Fish">Fish</option>
                  <option value="Other">Other</option>
                </select>
                <div className="flex space-x-4">
                  <Button
                    onClick={handleEditPet}
                    className="bg-[#1a1a1a]/20 backdrop-blur-lg text-white hover:text-blue-500 hover:bg-white transition border border-blue-500"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white hover:text-gray-500 hover:bg-white transition border border-gray-500"
                  >
                    Cancel
                  </Button>
                </div>

              </div>
            ) : (
              <div className="text-left space-y-4">
                <p>
                  <strong>Name:</strong> {selectedPet.name}
                </p>
                <p>
                  <strong>Age:</strong> {selectedPet.age} years
                </p>
                <p>
                  <strong>Breed:</strong> {selectedPet.breed}
                </p>
                <p>
                  <strong>Species:</strong> {selectedPet.species}
                </p>
                <div className="flex space-x-4">
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#1a1a1a]/20 backdrop-blur-lg text-white hover:text-blue-500 hover:bg-white transition border border-blue-500"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeletePet(selectedPet._id)}
                    className="bg-red-500 text-white hover:text-red-500 hover:bg-white transition border border-red-500"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPetProfile;
