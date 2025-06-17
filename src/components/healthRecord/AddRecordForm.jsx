import { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { toast } from "sonner";
import useUserAndPetData from "../../hooks/useUserAndPetData";
const API_BASE = import.meta.env. VITE_APP_API_BASE  ;


const AddRecordForm = ({ onSubmit }) => {
  const { pets, isLoading } = useUserAndPetData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    petId: "",
    ownerInformation: {
      name: "",
      contactInformation: "",
    },
    medicalHistory: {
      allergies: [""],
      medications: [""],
      vaccinations: [""],
      surgeries: [""],
      illnesses: [""],
      behavioralIssues: [""],
      dietaryRestrictions: [""],
    },
    checkupInformation: {
      dateOfCheckup: "",
      vitalSigns: {
        temperature: "",
        heartRate: "",
        respiratoryRate: "",
        weight: "",
        bodyConditionScore: "",
      },
      physicalExamFindings: "",
      laboratoryResults: "",
      diagnosticTests: "",
      treatmentPlan: "",
    },
    additionalFields: {
      behavioralNotes: [""],
    },
  });

  function setNestedValue(obj, path, value) {
    const keys = path.split(".");
    let temp = obj;
    keys.slice(0, -1).forEach((key) => {
      if (!temp[key]) temp[key] = {};
      temp = temp[key];
    });
    temp[keys[keys.length - 1]] = value;
    return { ...obj };
  }

  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: prev[section][field].map((item, i) =>
            i === index ? value : item
          ),
        },
      }));
    } else if (section.includes(".")) {
      setFormData((prev) => setNestedValue(prev, `${section}.${field}`, value));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleArrayChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], value],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { vitalSigns, dateOfCheckup } = formData.checkupInformation;
    const { petId } = formData;
    const isVitalSignsEmpty = Object.values(vitalSigns).some(
      (value) => value === ""
    );
    if (isVitalSignsEmpty || !dateOfCheckup) {
      toast.error("Please fill in all vital signs and checkup date.");
      return;
    }

    const token = localStorage.getItem("key");
    if (!token) {
      console.error("Token not found in local storage");
      toast.error("Authentication token not found. Please log in again.");
      // setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE}/api/healthRecords`,
        formData,
        { headers: { Authorization: token } }
      );
      if (response) {
        toast.success("Health record added successfully!");
        if (onSubmit) {
          onSubmit(response.data);
        }
      }
    } catch (err) {
      console.error("Error fetching pet data:", error);
      toast.error(`Error fetching pet record: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-screen-lg mx-auto p-6 bg-white"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Add New Health Record
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Pet ID
        </label>
        <select
          value={formData.petId}
          onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
        >
          <option value="">Select Pet</option>
          {pets.map((pet) => (
            <option key={pet._id} value={pet._id}>
              {pet.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Medical History</h3>
        {Object.keys(formData.medicalHistory).map((field) => (
          <div key={field} className="mt-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            {formData.medicalHistory[field].map((item, index) => (
              <Input
                key={index}
                type="text"
                value={item}
                placeholder={`Enter ${field}`}
                onChange={(e) =>
                  handleChange("medicalHistory", field, e.target.value, index)
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            ))}
            <button
              type="button"
              onClick={() => handleArrayChange("medicalHistory", field, "")}
              className="text-blue-500 text-sm mt-1"
            >
              + Add More
            </button>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Checkup Information</h3>
        <label className="block text-sm font-medium text-gray-700 mt-2">
          Date of Checkup
        </label>
        <Input
          type="date"
          value={formData.checkupInformation.dateOfCheckup}
          onChange={(e) =>
            handleChange("checkupInformation", "dateOfCheckup", e.target.value)
          }
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />

        <div className="grid grid-cols-3 gap-3 mt-4">
          {Object.keys(formData.checkupInformation.vitalSigns).map((field) => (
            <div key={field} className="mt-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              <Input
                type="text"
                value={formData.checkupInformation.vitalSigns[field]}
                onChange={(e) =>
                  handleChange(
                    "checkupInformation.vitalSigns",
                    field,
                    e.target.value
                  )
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Additional Fields</h3>
        {formData.additionalFields.behavioralNotes.map((note, index) => (
          <Input
            key={index}
            type="text"
            value={note}
            onChange={(e) =>
              handleChange(
                "additionalFields",
                "behavioralNotes",
                e.target.value,
                index
              )
            }
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        ))}
        <button
          type="button"
          onClick={() =>
            handleArrayChange("additionalFields", "behavioralNotes", "")
          }
          className="text-blue-500 text-sm mt-1"
        >
          + Add More
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Health Record"}
      </button>
    </form>
  );
};

export default AddRecordForm;
