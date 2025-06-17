import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useUserAndPetData from "../../hooks/useUserAndPetData";
const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:3000";


const Lightbox = ({ vaccination, onClose, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVaccination, setEditedVaccination] = useState(vaccination);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVaccination((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    onEdit(editedVaccination);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEditing ? "Edit Vaccination" : "Vaccination Details"}
          </h2>
          <Button onClick={onClose} className="text-red-500 hover:text-red-700">
            <FaTimes />
          </Button>
        </div>
        {isEditing ? (
          <div className="space-y-4">
            <select
              name="vaccinationName"
              value={editedVaccination.vaccinationName}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="rabies">Rabies</option>
              <option value="dhpp">DHPP</option>
              <option value="corona">Corona</option>
              <option value="leptospirosis">leptospirosis</option>
              <option value="lyme">lyme</option>
              <option value="bordetella">bordetella</option>
              <option value="giardia">giardia</option>
              <option value="feline leukemia">feline leukemia</option>
              <option value="feline distemper">feline distemper</option>
              <option value="feline rabies">feline rabies</option>
              <option value="feline calicivirus">feline calicivirus</option>
              <option value="feline chlamydia">feline chlamydia</option>
            </select>
            <select
              label="Vaccination Type"
              name="vaccinationType"
              value={editedVaccination.vaccinationType}
              onChange={handleInputChange}
            >
              <option value="one-time">One Time</option>
              <option value="annual">Annual</option>
              <option value="bi-annual">Bi Annual</option>
              <option value="tri-annual">Tri Annual</option>
            </select>
            <Input
              label="Vaccination Date"
              name="vaccinationDate"
              type="date"
              value={new Date(editedVaccination.vaccinationDate).toISOString().split("T")[0]}
              onChange={handleInputChange}
            />
            <Input
              label="Next Vaccination Date"
              name="nextVaccinationDate"
              type="date"
              value={editedVaccination.nextVaccinationDate.split("T")[0]}
              onChange={handleInputChange}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vaccine Status
              </label>
              <select
                name="vaccineStatus"
                value={editedVaccination.vaccineStatus}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <Button onClick={saveEdit} className="bg-green-500 text-white">
              Save
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p>
              <strong>Vaccination Name:</strong> {vaccination.vaccinationName}
            </p>
            <p>
              <strong>Vaccination Type:</strong> {vaccination.vaccinationType}
            </p>
            <p>
              <strong>Vaccination Date:</strong>{" "}
              {new Date(vaccination.vaccinationDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Next Vaccination Date:</strong>{" "}
              {new Date(vaccination.nextVaccinationDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {vaccination.vaccineStatus}
            </p>
            <div className="flex space-x-4">
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white"
              >
                <FaEdit className="mr-2" />
                Edit
              </Button>
              <Button
                onClick={() => onDelete(vaccination._id)}
                className="bg-red-500 text-white"
              >
                <FaTrash className="mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ViewVaccination = () => {
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [vaccinations, setVaccinations] = useState([]);
  const [selectedVaccination, setSelectedVaccination] = useState(null);
  const [isLoadingPets, setIsLoadingPets] = useState(false);
  const [isLoadingVaccinations, setIsLoadingVaccinations] = useState(false);

  const { pets } = useUserAndPetData();

  const fetchPetVaccinations = async (petId) => {
    setIsLoadingVaccinations(true);
    setVaccinations([]);
    const token = localStorage.getItem("key");
    if (!token) {
      console.error("Token not found in local storage");
      setIsLoadingVaccinations(false);
      return;
    }
    try {
      const response = await axios.get(
        `${API_BASE}/api/vaccinations/${petId}`,
        { headers: { Authorization: token } }
      );
      if (response.data && response.data.vaccinations) {
        setVaccinations(response.data.vaccinations);
      } else {
        console.warn(`No vaccinations found for pet with ID: ${petId}`);
      }
    } catch (error) {
      console.error("Error fetching pet vaccinations:", error.message);
    } finally {
      setIsLoadingVaccinations(false);
    }
  };

  const handlePetClick = (petId) => {
    setSelectedPetId(petId);
    fetchPetVaccinations(petId);
  };

  const handleVaccinationClick = (vaccination) => {
    setSelectedVaccination(vaccination);
  };

  const closeLightbox = () => {
    setSelectedVaccination(null);
  };

  const editVaccination = async (updatedVaccination) => {
    let toastId;
    try {
      toastId = toast.loading("Saving...");
      const token = localStorage.getItem("key");
      await axios.put(
        `${API_BASE}/api/vaccinations/${updatedVaccination._id}`,
        updatedVaccination,
        { headers: { Authorization: token } }
      );
      fetchPetVaccinations(selectedPetId);
      toast.success("Vaccination updated successfully.", { id: toastId });
    } catch (error) {
      toast.error("Failed to update vaccination.", { id: toastId });
    }
  };

  const deleteVaccination = async (vaccinationId) => {
    const token = localStorage.getItem("key");
    try {
      await axios.delete(
        `${API_BASE}/api/vaccinations/${vaccinationId}`,
        { headers: { Authorization: token } }
      );
      // Refresh vaccinations
      fetchPetVaccinations(selectedPetId);
    } catch (error) {
      console.error("Error deleting vaccination:", error.message);
    }
  };

  return (
    <div className="relative flex flex-col p-4">
      {/* Pets Section */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pets</h2>
        </div>
        {isLoadingPets ? (
          <p>Loading pets...</p>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="flex flex-col items-center space-y-2 bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handlePetClick(pet._id)}
              >
                <img
                  src={pet.profilePicture || "https://via.placeholder.com/150"}
                  alt={`${pet.name}'s profile`}
                  className="w-20 h-20 rounded-full"
                />
                <p className="text-lg font-medium">{pet.name}</p>
                <Button className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                  <FaSearch className="inline-block mr-2" />
                  View Vaccinations
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vaccinations Section */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Vaccinations</h2>
        {isLoadingVaccinations ? (
          <p>Loading vaccinations...</p>
        ) : vaccinations.length > 0 ? (
          <ul className="space-y-4">
            {vaccinations.map((vaccination) => (
              <li
                key={vaccination._id}
                className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleVaccinationClick(vaccination)}
              >
                <p>
                  <strong>Vaccination Name:</strong>{" "}
                  {vaccination.vaccinationName}
                </p>
                <p>
                  <strong>Status:</strong> {vaccination.vaccineStatus}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Select a pet to view its vaccinations.</p>
        )}
      </div>

      {selectedVaccination && (
        <Lightbox
          vaccination={selectedVaccination}
          onClose={closeLightbox}
          onEdit={editVaccination}
          onDelete={deleteVaccination}
        />
      )}
    </div>
  );
};

export default ViewVaccination;

