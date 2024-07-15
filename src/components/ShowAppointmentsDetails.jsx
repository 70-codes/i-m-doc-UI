import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { axiosWithHeader } from "../api/axios"; // Import your custom axios instance
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ShowAppointmentsDetails = () => {
  const [chartData, setChartData] = useState({
    labels: ["Pending", "Confirmed", "Canceled", "Closed"],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:8000/doctor/appointments/";

        const response = await axiosWithHeader.get(apiUrl);

        // Process the data for the doughnut chart
        const appointments = response.data;

        // Count the number of appointments in each status
        const statusCounts = {
          PENDING: 0,
          CONFIRMED: 0,
          CANCELED: 0,
          CLOSED: 0,
        };

        appointments.forEach((appointment) => {
          statusCounts[appointment.status] += 1;
        });

        setChartData({
          labels: ["Pending", "Confirmed", "Canceled", "Closed"],
          datasets: [
            {
              label: "Number of Appointments",
              data: [
                statusCounts.PENDING,
                statusCounts.CONFIRMED,
                statusCounts.CANCELED,
                statusCounts.CLOSED,
              ],
              backgroundColor: [
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
              ],
              borderColor: [
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching appointments data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h3 className="text-black text-center opacity-50 mt-4">
        Appointments Status
      </h3>
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Appointments by Status" },
          },
        }}
      />
    </div>
  );
};

export default ShowAppointmentsDetails;
