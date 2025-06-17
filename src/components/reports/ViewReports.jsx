import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Button } from "../ui/button";
import useUserAndPetData from "../../hooks/useUserAndPetData";
const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:3000";


// Subcomponents for modularity
const VitalSigns = ({ vitalSigns }) => (
  <div>
    <h3 className="font-semibold">Vital Signs</h3>
    <p>Temperature: {vitalSigns.temperature}</p>
    <p>Heart Rate: {vitalSigns.heartRate}</p>
    <p>Respiratory Rate: {vitalSigns.respiratoryRate}</p>
    <p>Weight: {vitalSigns.weight}</p>
    <p>Body Condition Score: {vitalSigns.bodyConditionScore}</p>
    <p>Hydration Status: {vitalSigns.hydrationStatus}</p>
  </div>
);

const PhysicalExam = ({ physicalExamination }) => (
  <div>
    <h3 className="font-semibold">Physical Examination</h3>
    {Object.entries(physicalExamination).map(([key, value]) => (
      <p key={key}>
        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
      </p>
    ))}
  </div>
);

const AdditionalTests = ({ additionalTests }) => (
  <div>
    <h3 className="font-semibold">Additional Tests</h3>
    {Object.entries(additionalTests).map(([key, value]) => (
      <p key={key}>
        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
      </p>
    ))}
  </div>
);

const LabTests = ({ laboratoryTests }) => (
  <div>
    <h3 className="font-semibold">Laboratory Tests</h3>
    {Object.entries(laboratoryTests).map(([key, value]) => (
      <p key={key}>
        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
      </p>
    ))}
  </div>
);

const Lightbox = ({ report, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Report Details</h2>
        <Button onClick={onClose} className="text-red-500 hover:text-red-700">
          <FaTimes />
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <VitalSigns vitalSigns={report.vitalSigns} />
          <PhysicalExam physicalExamination={report.physicalExamination} />
        </div>
        <AdditionalTests additionalTests={report.additionalTests} />
        <LabTests laboratoryTests={report.laboratoryTests} />
      </div>
    </div>
  </div>
);

const ViewReports = () => {
  const { userData, pets, isLoading, error } = useUserAndPetData();
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoadingReports, setIsLoadingReports] = useState(false);

  // Fetch reports for a selected pet
  const fetchPetReports = async (petId) => {
    setIsLoadingReports(true);
    setReports([]);
    const token = localStorage.getItem("key");
    if (!token) {
      console.error("Token not found in local storage");
      setIsLoadingReports(false);
      return;
    }
    try {
      const response = await axios.get(
        `${API_BASE}/api/pets/reports/${petId}`,
        { headers: { Authorization: token } }
      );
      if (response.data && response.data.reports) {
        setReports(response.data.reports);
      } else {
        console.warn(`No reports found for pet with ID: ${petId}`);
      }
    } catch (error) {
      console.error("Error fetching pet reports:", error.message);
    } finally {
      setIsLoadingReports(false);
    }
  };

  const handlePetClick = (petId) => {
    if (selectedPetId === petId) return; // Avoid refetching
    setSelectedPetId(petId);
    fetchPetReports(petId);
  };


  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

  const closeLightbox = () => {
    setSelectedReport(null);
  };

  return (
    <div className="relative flex flex-col p-4">
      {/* Pets Section */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pets</h2>
        </div>
        {isLoading ? (
          <p>Loading pets...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className={`flex flex-col items-center space-y-2 bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${selectedPetId === pet._id ? "bg-gray-200 p4 rounded-lg" : ""
                  }`}
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
                  View Reports
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reports Section */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Reports</h2>
        {isLoadingReports ? (
          <div className="text-gray-500 italic">Fetching reports...</div>
        ) : reports.length > 0 ? (
          <ul className="space-y-4">
            {reports.map((report) => (
              <li
                key={report._id}
                className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleReportClick(report)}
              >
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(report.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Report ID:</strong> {report._id}
                </p>
              </li>
            ))}
          </ul>
        ) : selectedPetId ? (
          <div className="text-gray-500 italic">No reports found for this pet.</div>
        ) : (
          <div className="text-gray-500 italic">Select a pet to view reports.</div>
        )}
      </div>

      {/* Lightbox Popup */}
      {selectedReport && (
        <Lightbox report={selectedReport} onClose={closeLightbox} />
      )}
    </div>
  );
};

export default ViewReports;
