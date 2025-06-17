import { useState, useCallback } from "react";
import { Input } from "../ui/input";
import LoadingButton from "../dashboard/LoadingButton";
import axios from "axios";
import { toast } from "sonner";
import useUserAndPetData from "../../hooks/useUserAndPetData";
const API_BASE = import.meta.env. VITE_APP_API_BASE  ;

// Reusable input group component
const InputGroup = ({ sectionName, data, onChange, columns = 2 }) => (
  <div className={`grid grid-cols-${columns} gap-3`}>
    {Object.entries(data).map(([key, value]) => (
      <div key={key} className="mt-2">
        <label className="block text-sm text-gray-600 capitalize">
          {key}
        </label>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(sectionName, key, e.target.value)}
        />
      </div>
    ))}
  </div>
);

// Section components
const VitalSignsForm = ({ data, onChange }) => (
  <>
    <h3 className="text-lg font-semibold">Vital Signs</h3>
    <InputGroup sectionName="vitalSigns" data={data} onChange={onChange} columns={3} />
  </>
);

const PhysicalExamForm = ({ data, onChange }) => (
  <>
    <h3 className="text-lg font-semibold">Physical Examination</h3>
    <InputGroup sectionName="physicalExamination" data={data} onChange={onChange} columns={3} />
  </>
);

const LaboratoryTestsForm = ({ data, onChange }) => (
  <>
    <h3 className="text-lg font-semibold">Laboratory Tests</h3>
    <InputGroup sectionName="laboratoryTests" data={data} onChange={onChange} columns={2} />
  </>
);

const AdditionalTestsForm = ({ data, onChange }) => (
  <>
    <h3 className="text-lg font-semibold">Additional Tests</h3>
    <InputGroup sectionName="additionalTests" data={data} onChange={onChange} columns={2} />
  </>
);

const AddReportForm = ({ onSubmit }) => {
  const { pets } = useUserAndPetData();
  const [formData, setFormData] = useState({
    petId: "",
    reportType: "regular",
    vitalSigns: {
      temperature: "",
      heartRate: "",
      respiratoryRate: "",
      weight: "",
      bodyConditionScore: "",
      hydrationStatus: "",
    },
    physicalExamination: {
      eyes: "",
      ears: "",
      nose: "",
      mouth: "",
      lungs: "",
      heart: "",
      abdomen: "",
      musculoskeletalSystem: "",
      skinAndCoat: "",
    },
    laboratoryTests: {
      completeBloodCount: "",
      chemistryPanel: "",
      urinalysis: "",
      fecalExamination: "",
    },
    additionalTests: {
      thyroidFunctionTest: "",
      heartwormTest: "",
      felvFivTest: "",
      radiographs: "",
      ultrasound: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if (!formData.petId) errors.push("pet");
    if (Object.values(formData.vitalSigns).some((v) => !v)) errors.push("vital signs");
    if (Object.values(formData.physicalExamination).some((v) => !v)) errors.push("physical examination");
    if (Object.values(formData.laboratoryTests).some((v) => !v)) errors.push("laboratory tests");

    if (errors.length > 0) {
      toast.error(`Please fill out the following: ${errors.join(", ")}.`);
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("key");
    if (!token) {
      toast.error("Authentication token not found.");
      setIsLoading(false);
      return;
    }

    // Only send non-empty additionalTests fields
    const payload = {
      ...formData,
      additionalTests: Object.fromEntries(
        Object.entries(formData.additionalTests).filter(([, val]) => val)
      ),
    };

    try {
      const response = await axios.post(
        `${API_BASE}/api/reports`,
        payload,
        {
          headers: { Authorization: token },
        }
      );
      if (response) {
        toast.success("Report Added Successfully");
        onSubmit && onSubmit(response.data);
      }
    } catch (err) {
      console.error("Error adding report:", err);
      toast.error("Failed to add report.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-screen-lg mx-auto p-6 bg-white"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Add New Report
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Report Type
        </label>
        <select
          value={formData.reportType}
          onChange={(e) =>
            setFormData({ ...formData, reportType: e.target.value })
          }
          className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
        >
          <option value="regular">Regular</option>
          <option value="consultation">Consultation</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Pet</label>
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

        <VitalSignsForm data={formData.vitalSigns} onChange={handleChange} />
      </div>

      <div className="mb-6">
        <PhysicalExamForm data={formData.physicalExamination} onChange={handleChange} />
      </div>

      <div className="mb-6">
        <LaboratoryTestsForm data={formData.laboratoryTests} onChange={handleChange} />
      </div>

      <div className="mb-6">
        <AdditionalTestsForm data={formData.additionalTests} onChange={handleChange} />
      </div>

      <LoadingButton
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none"
      >
        Submit Report
      </LoadingButton>
    </form>
  );
};

export default AddReportForm;