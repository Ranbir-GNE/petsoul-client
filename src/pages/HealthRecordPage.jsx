// src/pages/HealthRecordPage.jsx
import React, { useState } from "react";
import DashboardLayout from "../pages/DashboardLayout";
import AddRecordForm from "@/components/healthRecord/AddRecordForm";
import ViewHealthRecord from "@/components/healthRecord/ViewHealthRecord";

const HealthRecordPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <DashboardLayout>
      <div className="text-center">
        <button
          onClick={handleToggleVisibility}
          className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-white hover:text-blue-500 transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {isVisible ? "Hide Record Form" : "Show Record Form"}
        </button>
        {isVisible && <AddRecordForm />}
      </div>
      <ViewHealthRecord />
    </DashboardLayout>
  );
};

export default HealthRecordPage;
