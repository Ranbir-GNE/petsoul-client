import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ChartComponent from "./ChartComponent";
import userPetContext from "../../context/UserPetContext";
const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:3000";
import defaultPet from "../../assets/cat.jpg"; // create this if not present

const Grid = () => {
  const [userData, setUserData] = useState();
  const [pets, setPets] = useState([]);
  const [vaccinationData, setVaccinationData] = useState({});
  const [fetchedPetIds, setFetchedPetIds] = useState(new Set());
  const userPetData = useContext(userPetContext);
  const [tabIndex, setTabIndex] = useState(0);

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("key");
    if (!token) return;

    try {
      const { data } = await axios.get(`${API_BASE}/api/users/token/${token}`, {
        headers: { Authorization: token }
      });
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  }, []);

  const fetchPets = async () => {
    const token = localStorage.getItem("key");
    const userId = userData?._id;
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE}/api/pets/owner/${userId}`,
        { headers: { Authorization: token } }
      );
      if (response.data.length === 0) {
        console.log("No pets found");
      } else {
        setPets(response.data);
        userPetData.setPets(response.data);
      }
    } catch (error) {
      console.error("Error fetching pets:", error.message);
    }
  };

  const fetchVaccinationData = async (petId) => {
    if (fetchedPetIds.has(petId)) return;

    const token = localStorage.getItem("key");
    if (!token || !petId) {
      console.error("Missing token or petId");
      return;
    }
    try {
      const response = await axios.get(
        `${API_BASE}/api/healthRecords/vaccination/${petId}`,
        { headers: { Authorization: token } }
      );
      setVaccinationData((prevData) => ({
        ...prevData,
        [petId]: response.data.vaccinationRecord,
      }));
      setFetchedPetIds((prev) => new Set(prev).add(petId));
    } catch (error) {
      console.error("Error fetching vaccination data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (userData?._id) {
      fetchPets();
    }
  }, [userData?._id]);

  useEffect(() => {
    if (pets.length > 0 && pets[tabIndex]) {
      fetchVaccinationData(pets[tabIndex]._id);
    }
  }, [pets, tabIndex]);

  return (
    <div className="m-3 space-y-6 ">
      {/* Pets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {pets.map((pet, index) => (
          <div
            key={index}
            className="bg-[#fffff0] rounded-lg shadow-md p-4 flex items-center justify-between space-x-3"
          >
            <div>
              <p className="text-sm font-medium text-slate-800">Name: {pet.name}</p>
              <p className="text-sm text-slate-700">Age: {pet.age}</p>
              <p className="text-sm text-slate-700">Breed: {pet.breed}</p>
              <p className="text-sm text-slate-700">Species: {pet.species}</p>
            </div>
            <div>
              <img
                src={pet.profilePicture || defaultPet}
                alt="Pet"
                className="h-16 w-16 object-cover rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Vaccination and Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Chart */}
        <div className="bg-[#fffff0] p-4 rounded-lg shadow-md lg:col-span-3">
          <ChartComponent />
        </div>

        {/* Vaccination Details */}
        <div className="bg-[#fffff0] p-3 rounded-lg shadow-md ">
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList className="flex space-x-2 overflow-x-auto ">
              {pets.map((pet, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    `cursor-pointer py-1 px-2 text-sm rounded-lg shadow-sm transition ${selected
                      ? "bg-blue-200 text-[#fffff0] px-4 py-2"
                      : "bg-white text-slate-800 px-4 py-2"
                    }`
                  }
                >
                  <span className="px-2">{pet.name}</span>
                </Tab>
              ))}
            </TabList>
            {pets.map((pet, index) => (
              <TabPanel key={index}>
                <div className="p-2 bg-white rounded-md space-y-2">
                  {vaccinationData[pet._id]?.length ? (
                    vaccinationData[pet._id].map((record, idx) => (
                      <div
                        key={idx}
                        className="border p-3 rounded-lg bg-gray-50 space-y-1"
                      >
                        <p className="font-semibold text-slate-800">
                          {record.vaccineName}
                        </p>
                        <p className="text-slate-600 text-sm">
                          Date:{" "}
                          {new Date(
                            record.vaccinationDate
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-slate-600 text-sm">
                          Next Due Date:{" "}
                          {new Date(
                            record.nextVaccinationDate
                          ).toLocaleDateString()}
                        </p>
                        <p
                          className={`font-semibold text-sm ${record.vaccineStatus === "completed"
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                        >
                          Status: {record.vaccineStatus}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500">No vaccination records found.</p>
                  )}
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Grid;