import { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import userPetContext from "../../context/UserPetContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const API_BASE = import.meta.env.VITE_APP_API_BASE;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const userPetData = useContext(userPetContext);
  const [checkupData, setCheckupData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCheckupData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("key");
      if (!token) {
        console.error("Token not found in local storage");
        setLoading(false);
        return;
      }

      const results = await Promise.all(
        userPetData.pets.map(async (pet) => {
          try {
            const response = await axios.get(
              `${API_BASE}/api/healthRecords/checkup/${pet._id}`,
              { headers: { Authorization: token } }
            );

            if (!response.data.checkupInformation) {
              console.warn(`No checkup information for pet ID: ${pet._id}`);
              return null;
            }

            return {
              petId: pet._id,
              checkupInfo: response.data.checkupInformation,
              petInfo: response.data.petInfo,
            };
          } catch (error) {
            console.error(`Error fetching checkup data for pet ID ${pet._id}:`, error.message);
            return null;
          }
        })
      );

      setCheckupData(results.filter(Boolean));
    } catch (error) {
      console.error("Error fetching checkup data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userPetData.pets.length > 0) {
      fetchCheckupData();
    }
  }, [userPetData.pets]);

  const chartOptions = (label) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: label },
    },
    scales: {
      y: { beginAtZero: true },
    },
  });

  const createChartData = (label, dataPoints, dates) => {
    const colors = {
      Temperature: ["rgb(255, 99, 132)", "rgba(255, 99, 132, 0.2)"],
      "Heart Rate": ["rgb(54, 162, 235)", "rgba(54, 162, 235, 0.2)"],
      "Respiratory Rate": ["rgb(75, 192, 192)", "rgba(75, 192, 192, 0.2)"],
      Weight: ["rgb(153, 102, 255)", "rgba(153, 102, 255, 0.2)"],
    };

    return {
      labels: dates.map((date) => (date ? new Date(date).toLocaleDateString() : "N/A")),
      datasets: [
        {
          label,
          data: dataPoints || [],
          fill: false,
          backgroundColor: colors[label]?.[0] || "rgb(75, 192, 192)",
          borderColor: colors[label]?.[1] || "rgba(75, 192, 192, 0.2)",
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] sm:min-h-[500px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      {checkupData.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <Tabs>
            <TabList className="flex flex-wrap gap-2 mb-4 text-sm sm:text-base">
              {checkupData.map((data, index) => (
                <Tab key={index}>Name: {data.petInfo}</Tab>))}
            </TabList>

            {checkupData.map((data, index) => (
              <TabPanel key={index}>
                {Array.isArray(data.checkupInfo) && data.checkupInfo.length > 0 ? (
                  data.checkupInfo.map((checkup, checkupIndex) => {
                    const vitalSigns = checkup.checkupInformation?.vitalSigns;
                    const dates = checkup.checkupInformation?.dateOfCheckup;

                    if (!vitalSigns || !dates) {
                      return (
                        <p key={checkupIndex} className="text-gray-600">
                          Incomplete checkup information.
                        </p>
                      );
                    }

                    const {
                      temperature = [],
                      heartRate = [],
                      respiratoryRate = [],
                      weight = [],
                    } = vitalSigns;

                    return (
                      <div
                        key={checkupIndex}
                        className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <h4 className="text-md font-semibold mb-1 col-span-full">
                          Checkup {checkupIndex + 1}
                        </h4>

                        {temperature.length > 0 && (
                          <div className="w-full max-w-full overflow-x-auto mb-4 h-[250px]">
                            <Line
                              data={createChartData("Temperature", temperature, dates)}
                              options={chartOptions("Temperature")}
                            />
                          </div>
                        )}
                        {heartRate.length > 0 && (
                          <div className="w-full max-w-full overflow-x-auto mb-4 h-[250px]">
                            <Line
                              data={createChartData("Heart Rate", heartRate, dates)}
                              options={chartOptions("Heart Rate")}
                            />
                          </div>
                        )}
                        {respiratoryRate.length > 0 && (
                          <div className="w-full max-w-full overflow-x-auto mb-4 h-[250px]">
                            <Line
                              data={createChartData("Respiratory Rate", respiratoryRate, dates)}
                              options={chartOptions("Respiratory Rate")}
                            />
                          </div>
                        )}
                        {weight.length > 0 && (
                          <div className="w-full max-w-full overflow-x-auto mb-4 h-[250px]">
                            <Line
                              data={createChartData("Weight", weight, dates)}
                              options={chartOptions("Weight")}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-600">No checkup information available.</p>
                )}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      ) : (
        <p className="text-gray-600">No pets found.</p>
      )}
    </div>
  );
};

export default ChartComponent;
