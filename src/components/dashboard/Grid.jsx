import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ChartComponent from "./ChartComponent";
import userPetContext from "../../context/UserPetContext";
import defaultPet from "../../assets/cat.jpg";
import userContext from "../../context/UserContext";
const API_BASE = import.meta.env.VITE_APP_API_BASE;

const Grid = () => {
  const [pets, setPets] = useState([]);
  const [vaccinationData, setVaccinationData] = useState({});
  const [fetchedPetIds, setFetchedPetIds] = useState(new Set());
  const [tabIndex, setTabIndex] = useState(0);
  const [addPets, setAddPets] = useState(false);
  const [userData, setUserData] = useState(null);

  const userPetData = useContext(userPetContext);
  const authContext = useContext(userContext);
  const userId = authContext.userData?._id;
  const navigate = useNavigate();


  const fetchUserData = async () => {
    const token = localStorage.getItem("key");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    try {
      const response = await axios.get(`${API_BASE}/api/users/token/${token}`, {
        headers: { Authorization: token },
      });
      if (!response.data || !response.data._id) {
        console.error("Invalid user data received:", response.data);
        return;
      }
      console.log("User data fetched successfully:", response.data);
      authContext.setUserData(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchPets = async () => {
    const token = localStorage.getItem("key");
    const userId = userData?._id || authContext.userData?._id;
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
        setAddPets(true);
      } else {
        setAddPets(false);
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
    if (userId) {
      fetchPets();
    }
  }, [userId]);

  useEffect(() => {
    if (pets.length > 0 && pets[tabIndex]) {
      fetchVaccinationData(pets[tabIndex]._id);
    }
  }, [pets, tabIndex]);

  return (
    <div className="m-3 space-y-6 ">
      {/* Pets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.map((pet, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a]/20 backdrop-blur-lg rounded-lg shadow-md p-4 flex items-center justify-between space-x-3 text-sm text-white "
          >
            <div>
              <p className=" font-medium">Name: {pet.name}</p>
              <p >Age: {pet.age}</p>
              <p >Breed: {pet.breed}</p>
              <p >Species: {pet.species}</p>
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
        {addPets && (
          <div className="bg-[#1a1a1a]/20 backdrop-blur-lg rounded-lg shadow-md p-4 flex items-center justify-center space-x-3">
            <p className="text-sm font-medium text-slate-800">No pets found. Please add a pet.</p>
            <button
              onClick={() =>
                navigate("/pets")
              }
              className="bg-[#1a1a1a]/20 backdrop-blur-lg text-white px-2 py-1 rounded-lg hover:bg-white hover:text-blue-500 border transition"
            >
              Add Pet
            </button>
          </div>
        )}
      </div>

      {/* Vaccination and Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        {/* Chart */}
        <div className="bg-white/80 backdrop-blur-lg p-4 rounded-lg shadow-md lg:col-span-1">
          <ChartComponent />
        </div>

        {/* Vaccination Details */}
        <div className="bg-[#1a1a1a]/20 backdrop-blur-lg p-3 rounded-lg shadow-md ">
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
                <div className="p-2  rounded-md space-y-2">
                  {vaccinationData[pet._id]?.length ? (
                    vaccinationData[pet._id].map((record, idx) => (
                      <div
                        key={idx}
                        className=" p-3 rounded-lg bg-gray-50 space-y-1"
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