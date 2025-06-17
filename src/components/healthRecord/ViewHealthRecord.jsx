import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import useUserAndPetData from "../../hooks/useUserAndPetData";
import { toast } from "sonner";
import pet1 from "../../assets/pet1.jpg";
const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:3000";

// Helper function to safely get nested values
const safeGet = (obj, path, defaultValue = "N/A") => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || defaultValue;
};

// Helper function to get auth token
const getAuthToken = () => {
  const token = localStorage.getItem("key");
  if (!token) {
    toast.error("Authentication token not found");
    return null;
  }
  return token;
};

// Helper function to format array values
const formatArrayValue = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "None";
  }
  return value || "N/A";
};

const ViewRecord = () => {
  const { pets, isLoading, error } = useUserAndPetData();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);

  // Transform raw record data into a normalized format
  const normalizeRecord = (record) => ({
    id: record._id,
    ownerInformation: {
      name: safeGet(record, 'ownerInformation.name'),
      contactInformation: safeGet(record, 'ownerInformation.contactInformation'),
    },
    medicalHistory: {
      allergies: safeGet(record, 'medicalHistory.allergies', []),
      medications: safeGet(record, 'medicalHistory.medications', []),
      vaccinations: safeGet(record, 'medicalHistory.vaccinations', []),
      surgeries: safeGet(record, 'medicalHistory.surgeries', []),
      illnesses: safeGet(record, 'medicalHistory.illnesses', []),
      behavioralIssues: safeGet(record, 'medicalHistory.behavioralIssues', []),
      dietaryRestrictions: safeGet(record, 'medicalHistory.dietaryRestrictions', []),
    },
    vitalSigns: {
      temperature: safeGet(record, 'checkupInformation.vitalSigns.temperature'),
      heartRate: safeGet(record, 'checkupInformation.vitalSigns.heartRate'),
      respiratoryRate: safeGet(record, 'checkupInformation.vitalSigns.respiratoryRate'),
      weight: safeGet(record, 'checkupInformation.vitalSigns.weight'),
      bodyConditionScore: safeGet(record, 'checkupInformation.vitalSigns.bodyConditionScore'),
      hydrationStatus: safeGet(record, 'checkupInformation.vitalSigns.hydrationStatus'),
    },
    checkupInfo: {
      dateOfCheckup: safeGet(record, 'checkupInformation.dateOfCheckup'),
      physicalExamFindings: safeGet(record, 'checkupInformation.physicalExamFindings'),
      laboratoryResults: safeGet(record, 'checkupInformation.laboratoryResults'),
      diagnosticTests: safeGet(record, 'checkupInformation.diagnosticTests'),
      treatmentPlan: safeGet(record, 'checkupInformation.treatmentPlan'),
    },
    behavioralNotes: safeGet(record, 'additionalFields.behavioralNotes', []),
  });

  const fetchPetRecord = async (petId) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await axios.get(
        `${API_BASE}/api/pets/records/${petId}`,
        { headers: { Authorization: token } }
      );

      const records = response.data?.records;
      if (records?.length > 0) {
        const normalizedRecord = normalizeRecord(records[0]);
        setSelectedRecord(normalizedRecord);
      } else {
        setSelectedRecord(null);
        toast.error("No records found for this pet");
      }
    } catch (error) {
      console.error("Error fetching pet record:", error);
      toast.error("Failed to fetch pet record");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    setEditedRecord(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSaveRecord = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      await axios.put(
        `${API_BASE}/api/healthRecords/${selectedRecord.id}`,
        editedRecord,
        { headers: { Authorization: token } }
      );

      toast.success("Record updated successfully!");
      setSelectedRecord(editedRecord);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating record:", error);
      toast.error("Failed to update record");
    }
  };

  const handleDeleteRecord = async () => {
    const token = getAuthToken();
    if (!token || !selectedRecord?.id) {
      toast.error("Cannot delete record - missing information");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_BASE}/api/healthRecords/${selectedRecord.id}`,
        { headers: { Authorization: token } }
      );

      setSelectedRecord(null);
      toast.success("Record deleted successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Failed to delete record");
    }
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedRecord({ ...selectedRecord });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedRecord(null);
  };

  // Render loading or error states
  if (isLoading) return <div className="p-6">Loading pets...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 space-y-6">
      {/* Pets Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Your Pets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="flex flex-col items-center space-y-3 bg-gray-50 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 hover:bg-gray-100"
              onClick={() => fetchPetRecord(pet._id)}
            >
              <img
                src={pet.profilePicture || pet1}
                alt={`${pet.name}'s profile`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <p className="text-lg font-medium text-center">{pet.name}</p>
              <Button
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  fetchPetRecord(pet._id);
                }}
              >
                <FaSearch className="mr-2" />
                View Record
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Health Record Display */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Health Record</h2>
          {selectedRecord && !isEditing && (
            <div className="flex gap-2">
              <Button
                onClick={startEditing}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                <FaEdit className="mr-2" />
                Edit
              </Button>
              <Button
                onClick={handleDeleteRecord}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <FaTrash className="mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>

        {selectedRecord ? (
          <div className="space-y-6">
            {isEditing ? (
              <EditForm
                record={editedRecord}
                onChange={handleEditChange}
                onSave={handleSaveRecord}
                onCancel={cancelEditing}
              />
            ) : (
              <RecordDisplay record={selectedRecord} />
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>Select a pet above to view its health record</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Separate component for displaying record information
const RecordDisplay = ({ record }) => {
  const sections = [
    {
      title: "Owner Information",
      fields: [
        { label: "Name", value: record.ownerInformation.name },
        { label: "Contact", value: record.ownerInformation.contactInformation },
      ]
    },
    {
      title: "Medical History",
      fields: [
        { label: "Allergies", value: formatArrayValue(record.medicalHistory.allergies) },
        { label: "Medications", value: formatArrayValue(record.medicalHistory.medications) },
        { label: "Vaccinations", value: formatArrayValue(record.medicalHistory.vaccinations) },
        { label: "Surgeries", value: formatArrayValue(record.medicalHistory.surgeries) },
        { label: "Behavioral Issues", value: formatArrayValue(record.medicalHistory.behavioralIssues) },
        { label: "Dietary Restrictions", value: formatArrayValue(record.medicalHistory.dietaryRestrictions) },
      ]
    },
    {
      title: "Vital Signs",
      fields: [
        { label: "Temperature", value: record.vitalSigns.temperature },
        { label: "Heart Rate", value: record.vitalSigns.heartRate },
        { label: "Respiratory Rate", value: record.vitalSigns.respiratoryRate },
        { label: "Weight", value: record.vitalSigns.weight },
        { label: "Body Condition Score", value: record.vitalSigns.bodyConditionScore },
        { label: "Hydration Status", value: record.vitalSigns.hydrationStatus },
      ]
    },
    {
      title: "Checkup Information",
      fields: [
        { label: "Date of Checkup", value: record.dateOfCheckup },
        { label: "Physical Exam Findings", value: record.physicalExamFindings },
        { label: "Laboratory Results", value: record.laboratoryResults },
        { label: "Diagnostic Tests", value: record.diagnosticTests },
        { label: "Treatment Plan", value: record.treatmentPlan },
        { label: "Behavioral Notes", value: formatArrayValue(record.behavioralNotes) },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sections.map((section, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">{section.title}</h3>
          <div className="space-y-2">
            {section.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">{field.label}</span>
                <span className="text-gray-800">{field.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default ViewRecord;