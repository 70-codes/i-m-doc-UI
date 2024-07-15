import React, { useEffect, useState } from "react";
import { axiosWithHeader } from "../../api/axios";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./PatientsList.css";

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
      <div className="patients-list">
        <div className="patients-list-header">
          <div>Name</div>
          <div>Phone Number</div>
          <div>Date of Birth</div>
        </div>
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="patient-row"
            onClick={() => handleRowClick(patient.id)}
          >
            <div>{patient.name}</div>
            <div>{patient.phone_number}</div>
            <div>{patient.date_of_birth}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
