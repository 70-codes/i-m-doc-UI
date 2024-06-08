import React, { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";
import { axiosWithHeader } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Doctor = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosWithHeader.get("/doctor/appointments/");
        setAppointments(response.data);
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

  return (
    <div className="container">
      <h1 className="mt-3">Doctor</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <h2 className="mt-5">Appointments</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Appointment Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              onClick={() => handlePatientClick(appointment.patient)}
            >
              <td>{appointment.id}</td>
              <td>{appointment.patient}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Doctor;
