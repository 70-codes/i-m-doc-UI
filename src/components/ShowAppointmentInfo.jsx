import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { axiosWithHeader } from "../api/axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ShowAppointmentInfo = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:8000/appointments-per-day-data/";

        const response = await axiosWithHeader.get(apiUrl);

        const appointmentsData = response.data.appointments_per_day;
        const labels = appointmentsData.map(
          (item) => item.appointment_date__date
        );
        const data = appointmentsData.map((item) => item.total_appointments);

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Appointments",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching appointments data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className="text-black text-center opacity-50 mt-4">Appointments </h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Appointments Per Day" },
          },
        }}
      />
    </div>
  );
};

export default ShowAppointmentInfo;
