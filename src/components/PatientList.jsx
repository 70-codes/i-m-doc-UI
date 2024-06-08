import React, { useEffect, useState } from "react";
import { axiosWithHeader } from "../api/axios";
import { Table, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosWithHeader.get("/patients/");
        setPatients(response.data);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching patients");
      }
    };

    fetchPatients();
  }, []);
  const navigate = useNavigate();
  const handleRowClick = (patientId) => {
    navigate(`/patient-detail/${patientId}`);
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              onClick={() => handleRowClick(patient.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.phone_number}</td>
              <td>{patient.date_of_birth}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientsList;
