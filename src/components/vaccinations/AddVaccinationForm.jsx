import React, { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import LoadingButton from "../dashboard/LoadingButton";
import { toast } from "sonner";
import useUserAndPetData from "../../hooks/useUserAndPetData";
const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:3000";

const vaccinationTypes = ["one-time", "annual", "bi-annual", "tri-annual"];


const vaccinationNames = [
  "rabies",
  "dhpp",
  "corona",
  "leptospirosis",
  "lyme",
  "bordetella",
  "giardia",
  "lymphoma",
  "feline leukemia",
  "feline immunodeficiency",
  "feline distemper",
  "feline rabies",
  "feline herpes",
  "feline calicivirus",
  "feline chlamydia",
];
const vaccineStatuses = ["Pending", "Completed"];

// Reusable Dropdown Component
const Dropdown = ({ label, name, options, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
      required
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const AddVaccinationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    petId: "",
    vaccinationType: "",
    vaccinationName: "",
    vaccinationDate: "",
    vaccinationImmunity: "",
    nextVaccinationDate: "",
    vaccineStatus: "",
  });

  const { pets } = useUserAndPetData();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key] === "") {
        toast.error("Please fill out all fields before submitting.");
        setIsLoading(false);
        return;
      }
    }

    const token = localStorage.getItem("key");
    if (!token) {
      console.error("Token not found in local storage");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE}/api/vaccinations`,
        formData,
        {
          headers: { Authorization: token },
        }
      );
      if (response) {
        console.log(response.data, "Vaccination Added Successfully");
        toast.success("Vaccination Added Successfully");
        onSubmit && onSubmit(response.data);
      }
    } catch (err) {
      console.error("Error adding vaccination:", err);
      toast.error("Failed to add vaccination. Please try again.");

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-screen-lg mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Add New Vaccination
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          label="Pet"
          name="petId"
          options={
            pets ? pets.map((pet) => ({ value: pet._id, label: pet.name })) : []
          }
          value={formData.petId}
          onChange={handleChange}
        />
        <Dropdown
          label="Vaccination Type"
          name="vaccinationType"
          options={vaccinationTypes.map((type) => ({
            value: type,
            label: type,
          }))}
          value={formData.vaccinationType}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          label="Vaccination Name"
          name="vaccinationName"
          options={vaccinationNames.map((name) => ({
            value: name,
            label: name,
          }))}
          value={formData.vaccinationName}
          onChange={handleChange}
        />
        <Dropdown
          label="Vaccine Status"
          name="vaccineStatus"
          options={vaccineStatuses.map((status) => ({
            value: status,
            label: status,
          }))}
          value={formData.vaccineStatus}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vaccination Date
          </label>
          <Input
            type="date"
            name="vaccinationDate"
            value={formData.vaccinationDate}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Next Vaccination Date
          </label>
          <Input
            type="date"
            name="nextVaccinationDate"
            value={formData.nextVaccinationDate}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Vaccination Immunity (in months)
        </label>
        <Input
          type="number"
          name="vaccinationImmunity" // <-- FIXED
          value={formData.vaccinationImmunity}
          onChange={handleChange}
          className="mt-1"
          required
        />
      </div>

      <LoadingButton
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none"
      >
        Add Vaccination
      </LoadingButton>
    </form>
  );
};

export default AddVaccinationForm;
