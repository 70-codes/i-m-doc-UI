import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { axiosWithHeader } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./Doctor.css";
import convertTo12HourFormat from "../../components/convertDate/12hourFormat";

const Doctor = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const fetchPatientName = async (patientId) => {
    try {
      const response = await axiosWithHeader.get(
        `/patient-full-name/${patientId}/`
      );
      return response.data.full_name;
    } catch (error) {
      console.error(`Error fetching patient name for ID ${patientId}`, error);
      return "Unknown";
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosWithHeader.get("/doctor/appointments/");
        const appointmentsData = response.data;
        console.log(appointmentsData);

        // Fetch patient names
        const updatedAppointments = await Promise.all(
          appointmentsData.map(async (appointment) => {
            const fullName = await fetchPatientName(appointment.patient);
            return {
              ...appointment,
              patientName: fullName,
            };
          })
        );

        setAppointments(updatedAppointments);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching appointments");
      }
    };

    fetchAppointments();
  }, []);

  const navigate = useNavigate();

  const handlePatientClick = (patientId) => {
    navigate(`/patient-details-doc/${patientId}`);
  };

  // Function to render status with colored background span
  const getStatusElement = (status) => {
    let statusClassName = "";
    let statusText = "";

    switch (status) {
      case "CONFIRMED":
        statusClassName = "status-confirmed";
        statusText = "CONFIRMED";
        break;
      case "PENDING":
        statusClassName = "status-pending";
        statusText = "PENDING";
        break;
      case "CANCELED":
        statusClassName = "status-canceled";
        statusText = "CANCELLED";
        break;
      default:
        break;
    }

    return <span className={`status ${statusClassName}`}>{statusText}</span>;
  };

  return (
    <div className="container">
      <h1 className="mt-3">Doctor</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <h2 className="mt-5">Appointments</h2>
      <div className="appointments-list">
        <div className="appointments-list-header">
          <div>Patient Name</div>
          <div>Appointment Date</div>
          <div>Status</div>
        </div>
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="appointment-row"
            onClick={() => handlePatientClick(appointment.patient)}
          >
            <div>{appointment.patientName}</div>
            <div>{convertTo12HourFormat(appointment.appointment_date)}</div>
            <div>{getStatusElement(appointment.status)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctor;
